#!/usr/bin/env node
/**
 * Portfolio screenshot capture — see docs/project-screenshots.md.
 *
 * Every image lands in public/images/projects/<slug>/<file>.webp.
 *
 * Featured-project covers (1600x1000, 16:10):
 *   xurl       xurl-fyi/cover.webp   — public landing page (deployed liveUrl)
 *   writerix   writerix/cover.webp   — run detail with the pipeline progress
 *                                      and token usage, from a LOCAL demo-mode
 *                                      stack (`make demo`, AI/Stripe faked,
 *                                      seed_demo's fictional workspace)
 *   veci-crm   veci-crm/cover.webp   — dashboard from a LOCAL disposable
 *                                      install seeded with
 *                                      `seed_crm_scenarios --profile showcase`
 *                                      (fictional companies, example.com
 *                                      contacts). Never the production app.
 *   innermost  innermost/cover.webp  — Golden Mind number board for a test
 *                                      account on a LOCAL stack (own Postgres),
 *                                      so no real players or leaderboard rows.
 *
 * Argus (public/images/projects/argus/):
 *   cover.webp     — storefront assistant answering a recorded prompt
 *                    (deployed argus-frontend, /assistant)
 *   inspector.webp — trace-first inspector, one tool call expanded and the
 *                    trace ID visible (deployed argus-agent-web)
 *   waterfall.webp — operations console span waterfall for one request
 *                    (local argus-frontend running against the local
 *                    replay core stack)
 *
 * Usage:
 *   node scripts/capture-screenshots.mjs [target ...|covers|all]
 *   targets: xurl writerix veci-crm innermost cover inspector waterfall
 *   `covers` = the four featured-project covers above; `cover` is Argus's.
 *
 * Environment (featured covers). Credentials are read at runtime, never
 * logged, never defaulted in this file:
 *   XURL_URL                default https://xurl.fyi
 *   WRITERIX_URL            default http://localhost:8031
 *   WRITERIX_EMAIL          login for the demo workspace seed_demo creates
 *   WRITERIX_PASSWORD
 *   VECI_URL                default http://127.0.0.1:8041
 *   VECI_USERNAME           a member of the seeded demo workspace
 *   VECI_PASSWORD
 *   INNERMOST_URL           default http://localhost:3300
 *   INNERMOST_EMAIL         a test account on that local stack
 *   INNERMOST_PASSWORD
 * WRITERIX_URL, VECI_URL and INNERMOST_URL must be localhost: the script
 * refuses to point those captures at a deployed (real-data) instance.
 *
 * Environment (Argus):
 *   ARGUS_STOREFRONT_URL  default https://argus.xurl.fyi
 *   ARGUS_INSPECTOR_URL   default https://argus-agent.xurl.fyi
 *   ARGUS_CONSOLE_URL     default http://localhost:3000
 *   ARGUS_OPS_PASSWORD    operations console password, waterfall only.
 *                         Read at runtime, never logged or written out.
 *   ARGUS_TRACE_ID        optional 32-hex trace identifier. When set, the
 *                         waterfall is captured from that existing Jaeger
 *                         trace instead of running the recorded scenario
 *                         again.
 *
 * The live demo only accepts the allowlisted recorded prompts, so the script
 * sends exactly the recorded binoculars prompt ("What current promotions are
 * available on binoculars?") and does so at most once per image — be gentle
 * with the public edge's rate limit.
 *
 * WebP conversion uses cwebp because sharp is not installed in this repo and
 * the pnpm workspace build settings are intentionally left untouched.
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { chromium } from 'playwright';

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(import.meta.dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'public', 'images', 'projects');
const RAW_DIR = path.join(os.tmpdir(), 'portfolio-captures');

const rawPath = (slug, file) => path.join(RAW_DIR, `${slug}-${file}.png`);

const XURL_URL = (process.env.XURL_URL ?? 'https://xurl.fyi').replace(/\/$/, '');
const WRITERIX_URL = (process.env.WRITERIX_URL ?? 'http://localhost:8031').replace(/\/$/, '');
const VECI_URL = (process.env.VECI_URL ?? 'http://127.0.0.1:8041').replace(/\/$/, '');
const INNERMOST_URL = (process.env.INNERMOST_URL ?? 'http://localhost:3300').replace(/\/$/, '');

const STOREFRONT_URL = (process.env.ARGUS_STOREFRONT_URL ?? 'https://argus.xurl.fyi').replace(/\/$/, '');
const INSPECTOR_URL = (process.env.ARGUS_INSPECTOR_URL ?? 'https://argus-agent.xurl.fyi').replace(/\/$/, '');
const CONSOLE_URL = (process.env.ARGUS_CONSOLE_URL ?? 'http://localhost:3000').replace(/\/$/, '');

// Recorded prompt, allowlisted at the public edge (deploy/public/proxy.py).
const PROMPT = 'What current promotions are available on binoculars?';

const VIEWPORT = { width: 1600, height: 1000 };
// One colour scheme for every capture. Neither Argus app reacts to
// prefers-color-scheme (fixed palettes, custom scrollbars), so this only
// keeps browser-level UI consistent across the three images.
const COLOUR_SCHEME = 'dark';
const MAX_BYTES = 150 * 1024;
const SETTLE_MS = 500;

const COVER_TARGETS = ['xurl', 'writerix', 'veci-crm', 'innermost'];

/** Best-effort dismissal of consent/cookie banners. */
async function dismissBanners(page) {
  const selectors = [
    '[aria-label*="cookie" i] button',
    '[id*="cookie" i] button',
    '[class*="cookie" i] button',
    '[data-testid*="consent" i] button',
    '[class*="banner" i] button',
  ];
  for (const selector of selectors) {
    for (const button of await page.locator(selector).all()) {
      try {
        await button.click({ timeout: 1_000 });
      } catch {
        // Not a dismissible banner — ignore.
      }
    }
  }
}

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(SETTLE_MS);
}

async function newPage(browser) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    colorScheme: COLOUR_SCHEME,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(90_000);
  return page;
}

/** cwebp PNG -> WebP, stepping quality down until the file is under budget. */
async function toWebp(pngPath, webpPath) {
  for (const quality of [82, 72, 62, 52]) {
    await execFileAsync('cwebp', ['-quiet', '-q', String(quality), pngPath, '-o', webpPath]);
    const { size } = await stat(webpPath);
    if (size <= MAX_BYTES) {
      return { size, quality };
    }
  }
  const { size } = await stat(webpPath);
  throw new Error(`${path.basename(webpPath)} is ${size} bytes even at quality 52 — refusing to ship it oversized.`);
}

async function captureCover(browser) {
  const page = await newPage(browser);
  try {
    await page.goto(`${STOREFRONT_URL}/assistant`, { waitUntil: 'networkidle' });
    await dismissBanners(page);

    // Empty state: three recorded suggestion cards. Click the binoculars one —
    // it sends the recorded prompt as a fresh conversation.
    const suggestion = page.getByRole('button', { name: /Find current binocular offers/ });
    await suggestion.waitFor({ state: 'visible' });
    await suggestion.click();

    // Wait for the assistant's answer to fully render: the offer card, the
    // tool-call provenance line ("Checked Promotions"), and the answer bubble.
    await page.getByText('Here is the current offer from the field supply.').waitFor({ state: 'visible' });
    await page.getByText('Ridgeview 8x42 binoculars are 50% off this week.').waitFor({ state: 'visible' });
    await page.getByText('Checked Promotions').waitFor({ state: 'visible' });
    await page.getByText('Checking the field catalog…').waitFor({ state: 'hidden' });
    await settle(page);

    await page.screenshot({ path: rawPath('argus', 'cover') });
    console.log('cover: captured storefront assistant answer');
  } finally {
    await page.context().close();
  }
}

async function captureInspector(browser) {
  const page = await newPage(browser);
  try {
    await page.goto(INSPECTOR_URL, { waitUntil: 'networkidle' });
    await dismissBanners(page);

    // Empty state lists the three recorded prompts; click the exact text.
    const sample = page.getByRole('button', { name: PROMPT });
    await sample.waitFor({ state: 'visible' });
    await sample.click();

    // Wait for the answer and the collapsed "Trace & tools" panel to render.
    await page.getByText('Trace & tools').waitFor({ state: 'visible' });
    await page.getByText('Agent is choosing a tool…').waitFor({ state: 'hidden' });
    await page.getByText('Ridgeview 8x42', { exact: false }).first().waitFor({ state: 'visible' });

    // Expand the trace panel: one tool call, its arguments and result,
    // the metrics row, and the trace identifier.
    await page.locator('summary', { hasText: 'Trace & tools' }).click();

    const traceCode = page.locator('details code').first();
    await traceCode.waitFor({ state: 'visible' });
    const traceId = (await traceCode.textContent())?.trim() ?? '';
    if (!/^[0-9a-f]{32}$/.test(traceId)) {
      throw new Error(`Inspector did not return a trace ID (got: ${traceId || 'nothing'})`);
    }

    await page.getByText('get_ads', { exact: true }).waitFor({ state: 'visible' });
    await page.getByText('"category": "binoculars"').waitFor({ state: 'visible' });
    await page.getByText('Ridgeview 8x42 binoculars are 50% off this week.', { exact: false }).waitFor({ state: 'visible' });

    // Keep the expanded tool call inside the chat viewport.
    await page.evaluate(() => {
      const scroller = document.querySelector('section div.overflow-y-auto');
      if (scroller) scroller.scrollTop = scroller.scrollHeight;
    });
    await settle(page);

    await page.screenshot({ path: rawPath('argus', 'inspector') });
    console.log(`inspector: captured tool call expanded, trace ${traceId}`);
  } finally {
    await page.context().close();
  }
}

async function captureWaterfall(browser) {
  const password = process.env.ARGUS_OPS_PASSWORD;
  if (!password) {
    throw new Error('ARGUS_OPS_PASSWORD is not set — the operations console cannot be opened.');
  }

  const page = await newPage(browser);
  try {
    await page.goto(`${CONSOLE_URL}/admin/login`, { waitUntil: 'networkidle' });

    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: 'Enter operations console' }).click();
    await page.waitForURL((url) => new URL(url).pathname === '/admin', { timeout: 60_000 });

    if (process.env.ARGUS_TRACE_ID) {
      // Reuse an existing Jaeger trace instead of running the scenario
      // again — navigating to a trace page does not consume a prompt.
      await page.goto(`${CONSOLE_URL}/admin/traces/${process.env.ARGUS_TRACE_ID}`, {
        waitUntil: 'networkidle',
      });
    } else {
      // Run the recorded binoculars scenario; the server action posts the
      // prompt server-side and redirects straight to the new trace.
      await page.goto(`${CONSOLE_URL}/admin/scenarios`, { waitUntil: 'networkidle' });
      await page.locator('form:has(input[name="scenario"][value="promotions"]) button').click();
      await page.waitForURL((url) => /\/admin\/traces\/[0-9a-f]{16,}/.test(new URL(url).pathname), {
        timeout: 120_000,
      });
    }

    // The trace page polls Jaeger itself; give it room, reloading if the
    // trace has not flushed yet (reloads do not consume prompts).
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const notFound = await page.getByText('Trace not found').isVisible().catch(() => false);
      if (!notFound) break;
      await page.waitForTimeout(2_000);
      await page.reload({ waitUntil: 'networkidle' });
    }
    await page.getByText('Span waterfall').waitFor({ state: 'visible' });
    const spans = page.locator('main details');
    await spans.first().waitFor({ state: 'visible' });
    const spanCount = await spans.count();
    if (spanCount < 3) {
      throw new Error(`Waterfall rendered only ${spanCount} spans — refusing to capture.`);
    }

    // Expand the first few spans — the agent root, its LLM call, the tool
    // execution, and the shop-api request it produced — so their timeline
    // bars are visible. Later spans stay collapsed as compact rows: with
    // every span expanded the page is ~6000px tall and cannot fit the WebP
    // byte budget, and the collapsed rows are how the console actually
    // presents a long trace until a span is opened.
    await page.evaluate(() => {
      document.querySelectorAll('main details').forEach((detail, index) => {
        detail.open = index < 4;
      });
    });
    await settle(page);

    await page.screenshot({ path: rawPath('argus', 'waterfall'), fullPage: true });
    console.log(`waterfall: captured ${spanCount} spans for one recorded request`);
  } finally {
    await page.context().close();
  }
}

/** Throws unless `url` points at this machine — guards real-data apps. */
function requireLocal(name, url) {
  const { hostname } = new URL(url);
  if (!['localhost', '127.0.0.1', '[::1]'].includes(hostname)) {
    throw new Error(`${name} must be captured from a local demo stack, not ${hostname}.`);
  }
}

function requireEnv(...names) {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(`${missing.join(', ')} not set — see the header of this script.`);
  }
  return names.map((name) => process.env[name]);
}

/** Removes the Next.js dev-server issues badge, a dev-only artifact. */
async function hideDevOverlay(page) {
  await page.evaluate(() => document.querySelectorAll('nextjs-portal').forEach((el) => el.remove()));
}

async function captureXurl(browser) {
  const page = await newPage(browser);
  try {
    await page.goto(`${XURL_URL}/`, { waitUntil: 'networkidle' });
    await dismissBanners(page);
    await page.getByRole('heading', { level: 1 }).waitFor({ state: 'visible' });
    await settle(page);
    await page.screenshot({ path: rawPath('xurl-fyi', 'cover') });
    console.log('xurl: captured public landing page');
  } finally {
    await page.context().close();
  }
}

async function captureWriterix(browser) {
  requireLocal('WriterIX', WRITERIX_URL);
  const [email, password] = requireEnv('WRITERIX_EMAIL', 'WRITERIX_PASSWORD');
  const page = await newPage(browser);
  try {
    await page.goto(`${WRITERIX_URL}/auth/login`, { waitUntil: 'networkidle' });
    await page.locator('input[type=email]').fill(email);
    await page.locator('input[type=password]').fill(password);
    await page.locator('button[type=submit]').first().click();
    await page.waitForURL((url) => new URL(url).pathname === '/dashboard');

    // Run IDs are new ULIDs on every seed, so open the newest run from the list.
    await page.goto(`${WRITERIX_URL}/runs`, { waitUntil: 'networkidle' });
    await page.locator('main a[href^="/runs/"]').first().click();
    await page.getByText('Progress', { exact: true }).waitFor({ state: 'visible' });
    await page.getByText('Usage', { exact: true }).waitFor({ state: 'visible' });
    await settle(page);

    await page.screenshot({ path: rawPath('writerix', 'cover') });
    console.log('writerix: captured run detail (pipeline progress + usage)');
  } finally {
    await page.context().close();
  }
}

async function captureVeci(browser) {
  requireLocal('Veci CRM', VECI_URL);
  const [username, password] = requireEnv('VECI_USERNAME', 'VECI_PASSWORD');
  const page = await newPage(browser);
  try {
    await page.goto(`${VECI_URL}/login/`, { waitUntil: 'networkidle' });
    await page.locator('input[name=username]').fill(username);
    await page.locator('input[type=password]').fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForURL((url) => new URL(url).pathname === '/dashboard/');

    await page.getByText('Open pipeline value').waitFor({ state: 'visible' });
    await page.getByText('Recent activity').waitFor({ state: 'visible' });
    await settle(page);

    await page.screenshot({ path: rawPath('veci-crm', 'cover') });
    console.log('veci-crm: captured dashboard');
  } finally {
    await page.context().close();
  }
}

/**
 * Golden Mind memorise board (numbers, not the dictionary-sampled word modes)
 * for a local test account; a Golden Mind game costs one credit, which guests
 * don't have.
 */
async function captureInnermost(browser) {
  requireLocal('InnerMost', INNERMOST_URL);
  const [email, password] = requireEnv('INNERMOST_EMAIL', 'INNERMOST_PASSWORD');
  const page = await newPage(browser);
  try {
    await page.goto(`${INNERMOST_URL}/`, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.locator('input[type=email]').fill(email);
    await page.locator('input[type=password]').fill(password);
    await page.locator('form button[type=submit]').click();
    await page.getByRole('button', { name: 'Sign in' }).waitFor({ state: 'hidden' });

    await page.getByRole('button', { name: 'Play', exact: true }).click();
    await page.getByRole('button', { name: /Golden Mind/ }).click();
    await page.getByRole('button', { name: 'Begin', exact: true }).click();
    await page.getByRole('button', { name: 'Proceed', exact: true }).waitFor({ state: 'visible' });

    // The "team auto-assigned" toast sits over the footer; it's transient.
    const dismiss = page.getByRole('button', { name: 'Dismiss' });
    if (await dismiss.isVisible()) await dismiss.click();
    await hideDevOverlay(page);
    await settle(page);

    await page.screenshot({ path: rawPath('innermost', 'cover') });
    console.log('innermost: captured Golden Mind number board');
  } finally {
    await page.context().close();
  }
}

const TARGETS = {
  xurl: { slug: 'xurl-fyi', file: 'cover', capture: captureXurl },
  writerix: { slug: 'writerix', file: 'cover', capture: captureWriterix },
  'veci-crm': { slug: 'veci-crm', file: 'cover', capture: captureVeci },
  innermost: { slug: 'innermost', file: 'cover', capture: captureInnermost },
  cover: { slug: 'argus', file: 'cover', capture: captureCover },
  inspector: { slug: 'argus', file: 'inspector', capture: captureInspector },
  waterfall: { slug: 'argus', file: 'waterfall', capture: captureWaterfall },
};

function resolveTargets(args) {
  if (args.length === 0 || args.includes('all')) return Object.keys(TARGETS);
  const names = args.flatMap((arg) => (arg === 'covers' ? COVER_TARGETS : [arg]));
  const unknown = names.filter((name) => !TARGETS[name]);
  if (unknown.length > 0) {
    throw new Error(`Unknown target(s): ${unknown.join(', ')}. Known: ${Object.keys(TARGETS).join(', ')}, covers, all.`);
  }
  return [...new Set(names)];
}

async function main() {
  const names = resolveTargets(process.argv.slice(2));
  await mkdir(RAW_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    for (const name of names) await TARGETS[name].capture(browser);
  } finally {
    await browser.close();
  }

  for (const name of names) {
    const { slug, file } = TARGETS[name];
    const outDir = path.join(IMAGES_DIR, slug);
    await mkdir(outDir, { recursive: true });
    const { size, quality } = await toWebp(rawPath(slug, file), path.join(outDir, `${file}.webp`));
    console.log(`${slug}/${file}.webp: ${(size / 1024).toFixed(1)} KB (cwebp quality ${quality})`);
  }
}

main().catch((error) => {
  console.error(`capture failed: ${error.message}`);
  process.exit(1);
});
