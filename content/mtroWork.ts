export const mtroWork = {
  "title": "Customer problems turned into product improvements.",
  "summary": "I worked with MTRO PRO's customers and developers, helping operators get set up and turning product problems into repairs and repeatable tests. That work also led to daily account briefs and support intake, giving the team the context for its next customer conversation.",
  "intro": "I joined MTRO PRO, a rental software business, part time in early 2026 as an engineer and technical advisor. I worked directly with operators on setup and product use, and brought their feedback to the developers. The work ranged from helping a customer get started to fixing the software behind a stalled onboarding.",
  "sections": [
    {
      "heading": "Account context ready for the next customer conversation.",
      "paragraphs": [
        "Before following up, I needed to know how an account's setup was going and what had happened in the last conversation. A product event could show that payments were connected, while a message or booked call explained what to do next. Gathering that history repeatedly became a clear task to automate.",
        "I built a daily process that draws from seven sources to prepare an account brief, with incoming help requests collected into a review queue. Staff can check the context and proposed response before contacting the customer. Health checks and alerts make missing updates visible, so an empty brief is not mistaken for an inactive account."
      ]
    },
    {
      "heading": "Product defects the developers could reproduce and retest.",
      "paragraphs": [
        "Booking, lease signing and payment need to work as a connected journey. I built an AI-assisted testing process that follows those steps in a browser, captures what happened and gives developers enough detail to reproduce a failure. Repairs go through the same journey again.",
        "More than a dozen test rounds ran between March and April. One booking review found seven defects across lease signing, checkout and payment status. Written test plans, browser evidence and retesting made the findings useful for deciding what needed repair and checking that it worked."
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
  "lanes": [
    {
      "title": "Customer success",
      "caption": "Account context supports the next customer conversation. People review and approve communication.",
      "description": "Account evidence feeds automated preparation, then a review queue, followed by human review and customer communication. Support requests also enter the review queue.",
      "nodes": [
        [
          "Account evidence",
          "Product activity, customer records, messages and bookings"
        ],
        [
          "Gather and prepare",
          "Assemble context and prepare the next action"
        ],
        [
          "Review queue",
          "Support requests and proposed follow-ups"
        ],
        [
          "Human follow-through",
          "Review, approve and help the customer"
        ]
      ]
    },
    {
      "title": "Product quality",
      "caption": "Browser testing produces evidence for repairs and release decisions. Repaired behavior is tested again.",
      "description": "Product journeys and changes guide browser execution. Testing records evidence and reproducible failures, followed by retesting and a human decision on release readiness.",
      "nodes": [
        [
          "Journeys and changes",
          "Booking, lease signing, payments and guest flows"
        ],
        [
          "Browser execution",
          "Run scenarios and capture actual behavior"
        ],
        [
          "Findings and retest",
          "Document failures and check repairs"
        ],
        [
          "Release judgment",
          "Prioritize defects and decide readiness"
        ]
      ]
    }
  ],
  "metaTitle": "MTRO PRO: Customer Problems into Product Improvements | Patrick McHeyser",
  "description": "Customer onboarding, engineering repairs, account-research automation and browser testing for MTRO PRO, a rental software business."
} as const;
