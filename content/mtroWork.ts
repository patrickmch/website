export const mtroWork = {
  "title": "Automating the work around a growing SaaS platform.",
  "summary": "For MTRO PRO, I automated daily account research and built a queue for in-app support requests. Both have run in production since July. I also developed an AI-assisted testing process for booking, lease signing and payments, with browser checks and retesting after fixes.",
  "intro": "I joined MTRO PRO, a rental software business, part time in early 2026 as an engineer and technical advisor. My work covered customer follow-up, support intake and testing the product as it changed.",
  "sections": [
    {
      "heading": "Customer follow-up starts with the account history.",
      "paragraphs": [
        "Before contacting a customer, the team needs to know how setup is going, whether payments are connected and what happened in the last conversation. Those answers sit across several systems.",
        "I built a daily job that gathers information from seven sources, including product activity, messages, the CRM and calendars. It prepares the account history before someone drafts a follow-up. A separate process checks for in-app help requests every 10 minutes and adds them to a review queue, avoiding duplicate entries. Staff review the information, edit the proposed response and approve what goes to the customer.",
        "Both processes report their status and raise alerts when something fails. A separate monitor also checks whether the daily job has stopped running."
      ]
    },
    {
      "heading": "Testing covers the work customers need to complete.",
      "paragraphs": [
        "I designed and ran an AI-assisted testing process for booking, lease signing, payments, calendars and guest-facing features. Each round had a written plan, browser tests, screenshots and a report of what passed or failed. More than a dozen rounds ran between March and April. Fixes were tested again.",
        "One review followed a booking from lease signing through checkout and payment status across 19 cases. It found seven defects with enough evidence to reproduce them. The fixes were then retested.",
        "I also tightened the process after an audit found that one round had passed based on code review alone. Screenshots are now required to show that the browser tests ran."
      ]
    },
    {
      "heading": "Staff review the work and decide what happens next.",
      "paragraphs": [
        "The systems gather account information, organize support requests and run repeated product checks. Staff handle customer conversations, decide which defects to fix first and approve releases. Both automations report their health every day. Hours saved have not been measured yet."
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
