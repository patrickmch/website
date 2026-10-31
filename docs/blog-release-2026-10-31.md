# Blog publication

## Outcome

Publish the approved article at `/blog/start-with-the-question-your-team-keeps-asking/`. Add a Blog link and a listing at `/blog/`.

## Implementation

Use the existing React components, fonts, colors, and spacing. Give the article a narrow reading column, author, publication date, and a link back to the listing. Preserve the approved paragraphs.

Store posts in `content/blogPosts.json`. Render the same components during the build so readers and link crawlers receive the article in the initial HTML. Include canonical URLs, article metadata, and a sitemap. No new hosting service or dependency is needed.

The existing checkout has no tracked changes. Work on `feature/blog-basics-first-2026-10-31` and preserve untracked `AGENTS.md` and `raw/`.

## Release steps

- [x] Add an HTTP and browser check that fails for the missing blog
- [x] Update the canonical copy document before adding the public content
- [x] Build the listing, article, navigation, and static HTML
- [x] Check real article content, direct links, missing posts, metadata, mobile navigation, keyboard access, and layout
- [x] Run type checking and the existing production checks
- [x] Complete independent code review and resolve findings
- [ ] Publish through the existing Railway service and verify the live article

## Baseline

Source: `9276b48` on `origin/main`. Existing production build passes. The browser checks initially stopped because the local Playwright browser was missing. Install the expected browser before rerunning.

Railway project: `mcheyser`, production environment, `website` service, `mcheyser.com`. The homepage responds with HTTP 200. Earlier deployment failures need checking before release.

Rollback: revert the blog release commit and push `main`, or restore the previous successful deployment through Railway. Do not rewrite shared history.

## Verification

`npm run typecheck` and `npm run check` passed on 31 October 2026. The existing checks cover routes, contact validation with mocked mail, navigation focus, diagrams, contrast, and transfer size. Home remains within its 600 KB decoded transfer budget at 590 KB.

The blog checks confirm the full article matches the approved draft, initial HTML metadata, structured article data, sitemap, real 404 responses, and reading with JavaScript disabled. Navigation and layout passed at 360, 390, 768, 1,024, and 1,440 pixels. Desktop and phone screenshots were visually checked.

The initial blog check failed because the direct URL returned the homepage title. It passes after implementation. A build-time Router module format error was fixed by loading its ESM exports through Vite's renderer. The fix follows [Vite's server rendering guidance](https://vite.dev/guide/ssr).

The approved article paragraphs match `content/blogPosts.json` exactly. New listing and navigation text passed the writing check with a score of 5.

Future posts use the same JSON collection and page components. See the publishing steps in `README.md`.

Independent review found no actionable defects. It checked all 21 paragraphs against the approved copy, canonical redirects, nested missing URLs, existing server behavior, and desktop/mobile keyboard focus. The static blog build also passed under Node 22.
