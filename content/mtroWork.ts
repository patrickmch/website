export const mtroWork = {
  "title": "Automating the work around a growing SaaS platform.",
  "summary": "I helped MTRO PRO prepare for customer conversations and check the product behind them. Daily automation gathers account history before follow-up, while browser tests trace the steps from booking to payment. The account-research and support-intake systems have run in production since July.",
  "intro": "I joined MTRO PRO, a rental software business, part time in early 2026 as an engineer and technical advisor. My work connected two parts of the customer experience: helping the team understand each account and checking that customers could complete booking, lease signing and payment.",
  "sections": [
    {
      "heading": "A useful follow-up starts with what has already happened.",
      "paragraphs": [
        "Before contacting a customer, the team needs to know how setup is going, whether payments are connected and what happened in the last conversation. Those answers live across several systems. Product activity tells part of the story, while a message or a booked call may explain what should happen next.",
        "I built a daily process that gathers those pieces from seven sources, including product activity, messages, the CRM and calendars. It prepares an account brief for staff to review before drafting a follow-up. In-app help requests join the review queue through a separate process that checks every 10 minutes and avoids duplicate entries. Staff can assess the account, edit the proposed response and approve what goes to the customer.",
        "The brief needs to stay current to be useful. Both processes report their status and raise alerts when something fails, and a separate monitor checks whether the daily job has stopped running. This makes a missed update visible to the person responsible for keeping it running."
      ]
    },
    {
      "heading": "Testing follows a rental through the product.",
      "paragraphs": [
        "Booking, lease signing and payment are connected steps for a customer, so testing needs to follow the work across them. I designed an AI-assisted process that runs those journeys in a browser, records screenshots and reports what passed or failed. Each round starts with a written plan, and fixes are tested again.",
        "More than a dozen rounds ran between March and April. One booking review followed the work from lease signing through checkout and payment status across 19 cases. It found seven defects with enough detail to reproduce them, and the fixes were retested. The result was a record of how the product behaved that developers could use to make and check repairs.",
        "The testing process needed checking too. An audit found that one round had passed without a browser run. I tightened the requirements so screenshots must show that the browser tests ran. A pass now needs evidence from using the product."
      ]
    },
    {
      "heading": "The systems prepare the work for people to act on.",
      "paragraphs": [
        "The account-research and support-intake systems have run in production since July. They bring account information and incoming requests into a form staff can review, while the testing process gives developers evidence for repairs. People still decide what to say to customers, which defects to fix first and when to release a change. Hours saved have not been measured yet."
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
  ]
} as const;
