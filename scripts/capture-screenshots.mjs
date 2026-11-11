#!/usr/bin/env node
/**
 * Argus portfolio screenshot capture — see docs/project-screenshots.md.
 *
 * Produces in public/images/projects/argus/:
 *   cover.webp     — storefront assistant answering a recorded prompt
 *                    (deployed argus-frontend, /assistant)
 *   inspector.webp — trace-first inspector, one tool call expanded and the
 *                    trace ID visible (deployed argus-agent-web)
 *   waterfall.webp — operations console span waterfall for one request
 *                    (local argus-frontend running against the local
 *                    replay core stack)
 *
 * Usage:
 *   node scripts/capture-screenshots.mjs [cover|inspector|waterfall|all]
 *
 * Environment:
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
const OUT_DIR = path.join(ROOT, 'public', 'images', 'projects', 'argus');
const RAW_DIR = path.join(os.tmpdir(), 'argus-captures');

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

const targets = process.argv.slice(2);
const wanted = targets.length === 0 ? ['all'] : targets;
const wants = (name) => wanted.includes('all') || wanted.includes(name);

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

    await page.screenshot({ path: path.join(RAW_DIR, 'cover.png') });
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

    await page.screenshot({ path: path.join(RAW_DIR, 'inspector.png') });
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

    await page.screenshot({ path: path.join(RAW_DIR, 'waterfall.png'), fullPage: true });
    console.log(`waterfall: captured ${spanCount} spans for one recorded request`);
  } finally {
    await page.context().close();
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(RAW_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  try {
    if (wants('cover')) await captureCover(browser);
    if (wants('inspector')) await captureInspector(browser);
    if (wants('waterfall')) await captureWaterfall(browser);
  } finally {
    await browser.close();
  }

  const images = ['cover', 'inspector', 'waterfall'].filter((name) => wants(name));
  for (const name of images) {
    const png = path.join(RAW_DIR, `${name}.png`);
    const webp = path.join(OUT_DIR, `${name}.webp`);
    const { size, quality } = await toWebp(png, webp);
    console.log(`${name}.webp: ${(size / 1024).toFixed(1)} KB (cwebp quality ${quality})`);
  }
}

main().catch((error) => {
  console.error(`capture failed: ${error.message}`);
  process.exit(1);
});
