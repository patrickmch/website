export const mtroWork = {
  "title": "Automating the work around a growing SaaS platform.",
  "summary": "For MTRO PRO, I built the daily automation that gathers each customer's account context before follow-up, the intake that turns in-app help requests into a review queue, and an AI-assisted QA practice that tests core product journeys in a real browser. The two automations have run in production since July, with health checks and alerts. The QA work produced more than a dozen test waves with written plans, screenshot evidence and retests.",
  "intro": "A rental software business has two recurring jobs: help customers get value from the product, and keep checking that the product works as it changes. I joined MTRO PRO part time in early 2026 as an engineer and technical advisor. Over the following months I shipped about seventy pull requests across five codebases and built the two systems below.",
  "sections": [
    {
      "heading": "Customer success starts with the account’s actual situation.",
      "paragraphs": [
        "Has the customer completed setup? Added properties? Connected payments? Replied to the last message or booked a call? The answers sit across product activity, customer records, calendars and communication channels.",
        "I built a daily job that gathers that context from seven sources, including email, text messages, the customer community, team chat, product activity, the CRM and the calendar, and prepares it before anyone drafts a message. Each part of the job records its own health, failures and recoveries raise alerts, and an external watchdog catches a silent stall. A separate intake process checks for in-app help requests every ten minutes and turns each one into a review-queue card exactly once. People assess the situation, edit the proposed follow-up and approve what goes to the customer."
      ]
    },
    {
      "heading": "QA follows the journeys customers depend on.",
      "paragraphs": [
        "I designed and ran an AI-assisted testing practice for the product: a written plan for each wave, automated browser execution of real product journeys, screenshots as evidence, a report with a verdict, and retests after fixes. More than a dozen waves ran between March and April, with over thirty written plans and reports covering booking, lease signing, payments, calendars and guest-facing behavior.",
        "One booking-flow review followed a lease from signing through checkout and payment status across nineteen cases, including notification checks and paths where the expected behavior did not occur. It surfaced seven defects, each reproducible with evidence, and the fixes were retested.",
        "The rules got stricter as the work went on. When an audit found that one wave had passed without touching a browser, I tightened them: screenshots are required, and code review cannot stand in for a browser run."
      ]
    },
    {
      "heading": "What the systems take on.",
      "paragraphs": [
        "Together, these systems take on account research, queue monitoring and repeated test execution. Human judgment stays in customer conversations, defect prioritization and release decisions. Both automations report their health every day. Hours saved have not been measured yet."
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
