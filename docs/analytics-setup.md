# Website analytics

## Current status

Patrick supplied the Umami Cloud tracking code on 4 November 2026.
The public website ID is `052b579d-8c7a-493b-a013-e6cbdf4bfaf7`.
Tracking is live on mcheyser.com as of 4 November 2026.
Railway deployment `acb5c16e-c67e-41b3-adb1-47b79aa03a7b` succeeded for commit `5d11651`.
The current website runs in the existing Railway `mcheyser` project, `website` service, production environment.
The authenticated Railway account is `patrickmcheyser@gmail.com`. GitHub source is `patrickmch/website`.

Use the free hosted Hobby plan for one website. No new server or paid subscription is needed.
Verified provider limits on 4 November 2026: 100,000 monthly events and six months of retention.
Source: https://umami.is/pricing

## Configuration and activation

1. Create an account at https://cloud.umami.is and select the free Hobby plan.
2. Add a website named `McHeyser` with domain `mcheyser.com`.
3. Copy the website's tracking code. Its `data-website-id` value is public.
4. Set the Railway build variable `UMAMI_WEBSITE_ID` to that exact UUID. Do not store a password or API key in the site.
5. Run the checks and publish this branch to `main` when activation is authorized.
6. Verify the successful Railway deployment, then visit the homepage, a blog post, and `/cases/connected-manufacturing/`.
7. Confirm those exact page views appear in the Umami dashboard. A successful build alone does not prove collection.

Use the public website ID above. Do not activate with the test UUID used by the checks.
The Railway variable is live provider configuration. Its intended value is recorded here in the tracked repository.

## What you can see

Visits, page views, popular pages, and referring websites appear without changing existing links.
Some email, messaging, and QR visits may appear as direct traffic because they have no referring website.
Campaign tags distinguish future outreach. For example, a card could point to:

```text
https://mcheyser.com/cases/connected-manufacturing/?utm_source=handwritten-card&utm_medium=qr&utm_campaign=manufacturing
```

Existing sent links and printed QR codes remain unchanged. No backfilled attribution is claimed.
The Hobby plan does not include API or MCP access. Read reports in the Umami dashboard.

## Collection boundaries

The loader runs only on `mcheyser.com` and `www.mcheyser.com`.
It covers the React site, generated blog, and standalone public case study.
Client intake, the retained talk, localhost, preview hosts, and `review=1` visits stay excluded.
The tracker handles normal client-side navigation. Its before-send hook also excludes later navigation to intake pages.
Only the five standard campaign parameters survive URL filtering. Other query values and fragments are removed.
Referrer queries and fragments are removed. Form fields and contact details are not sent by this integration.
The tracker respects the browser's Do Not Track setting where present. No session replay or identification is enabled.
The privacy disclosure is updated in the canonical copy, React page, and standalone privacy HTML for activation together.

To exclude your own visits, open the browser console on mcheyser.com and run:

```js
localStorage.setItem('umami.disabled', '1');
```

Repeat in each browser profile you use. Remove that key to resume tracking your visits.
Source: https://docs.umami.is/docs/exclude-my-own-visits

## Verification and rollback

Run `npm run typecheck`, `node scripts/check-analytics.mjs`, and `npm run check`.
The focused checks cover public pages, excluded pages, campaign labels, private query removal, and missing or invalid configuration.
They also confirm repeated build injection adds only one loader per page.
Live checks on 4 November 2026 at 17:01 UTC confirmed HTTP 200 acceptance from `https://gateway.umami.is/api/send` for:

- homepage visits with campaign labels
- client-side navigation to `/about`
- the published blog article
- `/cases/connected-manufacturing/`

The sent homepage URL retained `utm_source` and `utm_medium` but removed the test query field and fragment.
Client intake, review mode, and the retained talk made no Umami requests. No page errors occurred.
The first live check ran before the deployment finished and timed out. Checks passed after Railway reported success.
Dashboard totals remain unverified because this session has no authenticated Umami dashboard access.
These checks created a few real page views. The tagged homepage visit uses `utm_source=setup-check` and `utm_medium=verification`.

Remove `UMAMI_WEBSITE_ID` and rebuild to disable tracking. The missing value adds no tracking script to HTML.
For a full rollback, revert the integration commit and redeploy. No visitor data is stored in the website repository.
