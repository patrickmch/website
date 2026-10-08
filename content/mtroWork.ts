export const mtroWork = {
  "title": "Customer problems turned into fixes, tests and a morning brief.",
  "summary": "I worked with MTRO PRO's customers and developers, helping operators get set up and turning product problems into repairs and repeatable tests. That work also led to daily account briefs and support intake, giving the team the context for its next customer conversation.",
  "intro": "I joined MTRO PRO, a rental software business, part time in early 2026 as an engineer and technical advisor. I worked directly with operators on setup and product use, and brought their feedback to the developers. Sometimes that meant walking a customer through setup. Other times, it meant fixing the software that had stopped them.",
  "sections": [
    {
      "heading": "A seven-source account brief, ready every morning.",
      "paragraphs": [
        "Before following up, I needed to know how an account's setup was going and what had happened in the last conversation. The product could show that payments were connected, but I still needed the messages and booked calls to know what to do next. I was gathering the same history before each conversation, so I built a way to bring it together.",
        "I built a daily process that draws from seven sources to prepare an account brief, with incoming help requests collected into a review queue. Staff can check the context and proposed response before contacting the customer. Health checks and alerts make missing updates visible, so an empty brief is not mistaken for an inactive account."
      ]
    },
    {
      "heading": "Product defects the developers could reproduce and retest.",
      "paragraphs": [
        "Booking, lease signing and payment need to work as a connected journey. I built an AI-assisted testing process that follows those steps in a browser, captures what happened and gives developers enough detail to reproduce a failure. After a repair, the test runs through those steps again.",
        "More than a dozen test rounds ran between March and April. One booking review found seven defects across lease signing, checkout and payment status. The test plan and browser evidence gave developers a way to reproduce each problem. Retesting showed whether a repair worked."
      ]
    },
    {
      "heading": "Property imports restored, with instructions for the team.",
      "paragraphs": [
        "When a login change stopped property imports, I reproduced the failure, built and tested an interim repair, and supplied setup instructions to the team. Another developer then moved the integration to scoped API keys. I also prepared repository-based instructions for a new contractor joining the import work.",
        "The account-research and support-intake systems have run in production since July. They support the customer work alongside the engineering and testing, while people decide what to say, which defects to fix first and when to release. Hours saved have not been measured yet."
      ]
    }
  ],
  "metaTitle": "MTRO PRO: Customer Problems into Fixes, Tests and a Morning Brief | Patrick McHeyser",
  "description": "Customer onboarding, engineering repairs, account-research automation and browser testing for MTRO PRO, a rental software business."
} as const;
