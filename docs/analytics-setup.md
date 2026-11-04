# Website analytics

## Current status

Prepared on `codex/site-analytics-umami`. Tracking is not installed on the live site.
Patrick has no Umami Cloud account. The previous Railway Umami project is absent from the current project list.
The current website runs in the existing Railway `mcheyser` project, `website` service, production environment.
The authenticated Railway account is `patrickmcheyser@gmail.com`. GitHub source is `patrickmch/website`.

Use the free hosted Hobby plan for one website. No new server or paid subscription is needed.
Verified provider limits on 4 November 2026: 100,000 monthly events and six months of retention.
Source: https://umami.is/pricing

## Connect the account

1. Create an account at https://cloud.umami.is and select the free Hobby plan.
2. Add a website named `McHeyser` with domain `mcheyser.com`.
3. Copy the website's tracking code. Its `data-website-id` value is public.
4. Set the Railway build variable `UMAMI_WEBSITE_ID` to that exact UUID. Do not store a password or API key in the site.
5. Run the checks and publish this branch to `main` when activation is authorized.
6. Verify the successful Railway deployment, then visit the homepage, a blog post, and `/cases/connected-manufacturing/`.
7. Confirm those exact page views appear in the Umami dashboard. A successful build alone does not prove collection.

The missing account and website ID prevent live activation. No tracking ID has been invented or provisioned.
Do not activate with the test UUID used by the checks.

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
Until the account is connected, collection and dashboard access remain unverified.

Remove `UMAMI_WEBSITE_ID` and rebuild to disable tracking. The missing value adds no tracking script to HTML.
For a full rollback, revert the integration commit and redeploy. No visitor data is stored in the website repository.
