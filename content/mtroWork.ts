export const mtroWork = {
  "title": "Product repairs, automated browser QA, and a daily seven-source account brief.",
  "summary": "I bridged customer operations and engineering for MTRO PRO, resolving onboarding blockers in the product and turning recurring failures into repeatable browser tests. To support daily customer follow-through, I also built an automated seven-source account brief and support intake queue.",
  "intro": "I joined MTRO PRO, a rental software business, in early 2026 as an engineer and technical advisor working across customer onboarding and product delivery. I worked directly with rental operators during setup, traced where onboarding stalled in the application, and shipped both product fixes and internal tooling for the team.",
  "sections": [
    {
      "heading": "A seven-source account brief, ready every morning.",
      "paragraphs": [
        "Before following up with an operator, I needed to see where setup stood and what had been agreed in the last conversation. A product event showed whether payments were connected, while a message or booked call explained the next step. Assembling that context across accounts every morning was a clear candidate for automation.",
        "I built a daily pipeline that pulls from seven sources to generate an account brief and collects incoming help requests into a review queue. Staff review the account history and draft response before replying to the customer. Health checks and alerts flag missing data feeds immediately, distinguishing a quiet account from a broken integration."
      ]
    },
    {
      "heading": "Product defects the developers could reproduce and retest.",
      "paragraphs": [
        "Booking, lease signing, and payment have to work as a single connected journey. I built an AI-assisted browser testing workflow that steps through those flows, records the evidence, and gives developers the exact state needed to reproduce a failure. Every repair runs through the same journey before release.",
        "More than a dozen test rounds ran between March and April. One booking review uncovered seven defects across lease signing, checkout, and payment status. Written test plans, browser captures, and automated retesting gave the team a reliable way to prioritize fixes and verify each release."
      ]
    },
    {
      "heading": "Property imports restored, with instructions for the team.",
      "paragraphs": [
        "When an upstream login change broke property imports, I reproduced the failure, shipped and verified an interim repair, and wrote setup documentation for the team. Another developer then migrated the integration to scoped API keys, and I prepared repository-level onboarding instructions for a new contractor joining the import work.",
        "The account-research and support-intake systems have run in production since July. Every morning, the team starts with current account context and queued support drafts, leaving staff to decide how to respond, which defects to prioritize, and when to release."
      ]
    }
  ],
  "metaTitle": "MTRO PRO: Product Repairs, Browser QA, and a Daily Account Brief | Patrick McHeyser",
  "description": "Customer onboarding, engineering repairs, account-research automation, and browser testing for MTRO PRO, a rental software business."
} as const;
