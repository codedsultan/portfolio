# Project screenshots

Cards, project pages and share previews can show images. All of it is optional per project: a project with no `cover` renders exactly as before.

## Fields (data/projects.ts)

- `cover`: shown at the top of the project card and the top of the project page, and used as the share image (Open Graph) for that page.
- `screenshots`: extra images shown under "Screenshots" on the project page, each with an optional caption.

Each image needs `src`, `alt`, `width` and `height` (the real pixel size of the file).

## Capture checklist

1. Capture from the deployed app, not localhost.
2. Cover: exactly 16:10, 1600x1000. Cards crop to 16:10 from the top, so keep the important content in the upper part.
3. Screenshots: 1600 px wide is plenty. Any height works on the project page.
4. Export as WebP, aim for under 150 KB each.
5. Before capturing, check the frame for: tokens, API keys, emails, cookie banners, real customer data, admin URLs.
6. Save to `public/images/projects/<slug>/` (e.g. `public/images/projects/argus/cover.webp`).
7. Write alt text that says what the image shows ("Span waterfall for one agent request"), not "screenshot of".

## Suggested set for Argus

- `cover.webp`: storefront assistant answering a question, with the tool call visible.
- `inspector.webp`: the trace-first inspector with one tool call expanded and the trace ID visible.
- `waterfall.webp`: the operations console span waterfall for a single request.

Uncomment the example block in the Argus entry once the files exist.

## GitHub social previews

Not part of the site code. Per repo: Settings, General, Social preview, upload a 1280x640 PNG or JPG. Use one template across argus-ai, argus-frontend and argus-agent-web so they read as a set. Put one hero image at the top of each README as well.
