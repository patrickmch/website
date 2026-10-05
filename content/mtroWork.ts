export const mtroWork = {
  "title": "Automating the work around a growing SaaS platform.",
  "summary": "For MTRO PRO, I built automation for customer-account research, follow-up preparation and support intake, alongside browser-based QA for core product journeys. The work brings customer context and test evidence into a form people can act on.",
  "intro": "A rental software business has two recurring jobs: help customers get value from the product, and keep checking that the product works as it changes. Both involve substantial work across systems.",
  "sections": [
    {
      "heading": "Customer success starts with the account’s actual situation.",
      "paragraphs": [
        "Has the customer completed setup? Added properties? Connected payments? Replied to the last message or booked a call? The answers sit across product activity, customer records, calendars and communication channels.",
        "I built automation to gather that account context and support the next follow-up. A separate support intake process brings in-app help requests into a review queue. People can assess the situation, edit a proposed response and approve communication with the customer."
      ]
    },
    {
      "heading": "QA follows the journeys customers depend on.",
      "paragraphs": [
        "I built and used an AI-assisted testing process that exercises browser workflows, records evidence, identifies failures and supports retesting after changes. The work includes booking, lease signing, payments, calendars and guest-facing behavior.",
        "One documented booking-flow review followed a lease from signing through checkout and payment status, including notification checks and paths where the expected behavior did not occur. The output was a reproducible account of what worked, what failed and what needed attention."
      ]
    },
    {
      "heading": "What the systems take on.",
      "paragraphs": [
        "Together, these systems take on account research, queue monitoring and repeated test execution, with adoption, business impact and time saved still being assessed. Human judgment remains in customer conversations, defect prioritization and release decisions."
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
