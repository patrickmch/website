export const clientStories = [
  {
    "slug": "manufacturing-systems",
    "client": "Custom manufacturing",
    "title": "Custom quoting software. A repeatable way to build what comes next.",
    "label": "Custom manufacturing",
    "summary": "For a growing custom manufacturer, I serve as fractional CTO: technical direction, the automation team and hiring. Since August I have shipped a quoting application that matches the company's spreadsheet on ninety-nine archived quotes, corrected nearly thirty thousand reporting formulas, and set up an AI-assisted delivery process that runs about 1,500 automated tests and a live check on every release.",
    "metaTitle": "Manufacturing: Quoting and Software Delivery | Patrick McHeyser",
    "description": "As fractional CTO for a manufacturer: a quoting application matched against ninety-nine archived quotes, source-traceable reporting and an AI-assisted delivery process with about 1,500 automated tests.",
    "paragraphs": [
      "Quoting depended on a spreadsheet with almost ten thousand formulas and forty macros, and on the experienced people who knew how to use it. Management reporting had a different problem: figures on screen could not be traced back to the transactions behind them. The business needed someone who could work through both the operating details and the software behind them.",
      "I started with an assessment of the existing systems and technical work. The engagement grew into the fractional CTO role: I own the technical direction, lead the automation team, run hiring end to end and sit on the management team. Three connected areas of work followed.",
      "**A custom quoting application.** I inventoried the spreadsheet's behavior and wrote it down as 111 explicit rules and 37 reference tables, then built a web application around them: quote inputs, pricing calculations, quantity alternatives, vendor and freight lines, saved versions that cannot be overwritten, version comparison, versioned pricing and a customer-facing PDF. Before operators saw it, ninety-nine archived quotes were reproduced in a real browser against the spreadsheet's figures, with zero defects. Two operators are now testing it, and the first round of their feedback was fixed and deployed within two days.",
      "**Reporting that can be checked against its source.** I began by tracing management figures back to source transactions, and corrected nearly thirty thousand comparison formulas along the way. The errors were the kinds that make a dashboard untrustworthy: date cut-offs that dropped late-day transactions from a period comparison, a partial month inside a year-to-date total, a data feed that had stopped updating, duplicates from customer IDs that differed only in capitalization, and a metric counting order lines instead of orders. I also found daily reports being built before the data they depended on had arrived, and rescheduled twenty-three jobs so they run in order. With the owner I ratified a family of seven on-time delivery definitions, and I handed reporting ownership to an internal specialist with scoped read-only access.",
      "**An AI-assisted software delivery system.** I built the delivery process the team runs on: a bounded specification for each change, an AI-assisted build in an isolated copy of the code, separate tester and reviewer roles, browser-based QA that cannot start until a pre-check passes, and separate verdicts for the product, the evidence and the release. Findings return to the build for correction. Since mid-September every merge deploys automatically with a recorded live check and a rollback point. In its first four weeks the process ran about 135 QA runs, produced 35 formal summaries and some 2,800 screenshots, and caught a one-cent rounding error, a wrong width formula and a change that would have broken new quotes before any of them reached an operator. The test suite grew from 240 to about 1,500 automated tests across more than seventy merged pull requests.",
      "People supply the business rules, resolve ambiguous decisions and judge whether the result works for the operation. AI handles substantial implementation and checking within that structure.",
      "**Team, transitions and tooling.** Around the software, I ran the hiring process end to end with an evidence-first scoring rubric, interviews and a paid trial project, managed a developer transition with knowledge capture and credential handover into company-owned systems, recovered undocumented automation source into company version control, and ran evaluations of commercial estimating and design software against written go/no-go criteria. A bulk ERP update of more than six hundred records went through the API with a pre-check that rejected hundreds of invalid values and a readback that found zero mismatches.",
      "The quoting application is in operator testing, the rules are written down for the business to approve, and the roadmap continues."
    ],
    "table": {
      "headers": [
        "Manual friction",
        "What the system or engagement handles",
        "Human responsibility"
      ],
      "rows": [
        [
          "Re-explaining quoting rules for each change",
          "Explicit requirements and repeatable checks",
          "Resolve rules and exceptions"
        ],
        [
          "Repeating test steps after software changes",
          "Automated checks and browser QA with evidence",
          "Set acceptance criteria; assess gaps"
        ],
        [
          "Tracing dashboard figures back to source transactions",
          "Trace transactions, reconcile definitions and correct calculations",
          "Agree business meaning and source practices"
        ],
        [
          "Copying information between operational tools",
          "Integration assessment and scoped implementation",
          "Decide ownership and handoffs"
        ]
      ]
    }
  },
  {
    "slug": "shared-context",
    "client": "Healthcare services",
    "title": "An AI assistant connected to the information the business runs on.",
    "label": "Healthcare services",
    "summary": "For a healthcare services business, I built the data foundation its AI assistant runs on: records from four business systems matched into one store, refreshed nightly and reached through a read-only connection scoped to each person. I then moved the team's existing AI workflows onto it, so profile preparation, paperwork and evidence checks draw on the same current facts. The first staff seats are live, and rollout to the rest of the team is next.",
    "metaTitle": "Healthcare: Shared Context and AI Workflows | Patrick McHeyser",
    "description": "A client-owned data foundation built from four business systems, reached through a read-only, per-person AI connection, with the team's AI workflows moved onto it.",
    "paragraphs": [
      "Answering a routine operational question could mean checking a record in one tool, finding the supporting document in another and reconstructing what had happened. Preparing the next piece of work meant gathering much of that information again.",
      "I built a shared context system that connects that information to the team's AI workspace. Collectors pull records from four business systems, including the work-management boards, the CRM and document storage, into one store in the client's own cloud account: millions of rows, tens of thousands of documents, and thousands of PDFs converted to text in a single unattended overnight run.",
      "**The foundation makes the information usable.** Matching is the hard part. Records are never joined on an ID alone. Reviewed overrides merge known duplicates, and the few identities that conflict are held for a person to resolve. Along the way I found a source field that had been mislabeled as the identity key and fixed the matching logic. Every answer keeps its source references and distinguishes unresolved information from confirmed facts. A field-validation gate, a source-priority resolver, a document ledger, a redaction hard stop and output checks guard every nightly build, and the nightly publish swaps in under a minute while the last good copy keeps serving if a run fails.",
      "**Access is scoped to the person asking.** Staff reach the store from their existing AI seats through a controlled connection: twenty read-only tools behind a read-only database role, with four permission tiers so a person only retrieves what their role allows. Denials were checked live on production. The first seats made more than two hundred queries in their first weeks.",
      "**Reusable workflows turn context into work.** I then moved the team's existing AI workflows onto the shared context: profile preparation, several kinds of recurring paperwork, case summaries and a final evidence check, packaged as one versioned plugin so everyone runs the same version. Each workflow can also retrieve current documents through authorized source connections when the task needs them.",
      "For example, a preparation workflow gathers relevant information and drafts the working document. A review workflow checks the supporting material and returns a checklist with source references and unresolved questions. A person reviews the output and makes the decision.",
      "**Built and tested like production software.** The build carries more than 800 automated tests, an acceptance gate of 765 checks over a sample of real cases, a regression canary, and four deployed guides for staff and maintainers. I built it with AI coding agents under my direction and put releases through independent adversarial review. Several came back no-go and were fixed before they shipped.",
      "The first staff seats are live, with rollout to the rest of the team next. Time saved has not been measured yet. Everything lives in the client's own account, documented and transferable, with no consultant lock-in."
    ],
    "table": {
      "headers": [
        "Workflow",
        "What it does",
        "Manual work targeted"
      ],
      "rows": [
        [
          "Record lookup and profile preparation",
          "Retrieve related information and produce a structured summary",
          "Opening several tools and assembling the same context"
        ],
        [
          "Document preparation",
          "Gather required inputs and draft the appropriate paperwork",
          "Re-keying facts into recurring documents"
        ],
        [
          "Evidence review",
          "Check supporting documents and return a source-linked checklist",
          "Repeated document comparison before a human decision"
        ]
      ]
    }
  },
  {
    "slug": "psyche-digital",
    "client": "Psyche Digital",
    "title": "Taking AI further into client delivery.",
    "label": "Psyche Digital",
    "summary": "Psyche Digital already used AI for parts of its client work. After building and using a content system I designed for them, the team came back for a full review of how client delivery runs. I examined client success, onboarding and content production, traced ten real workflow instances, and delivered an operations assessment, an implementation guide and five starter skills, each with a pass/fail check.",
    "metaTitle": "Psyche Digital: AI in Client Delivery | Patrick McHeyser",
    "description": "A repeat engagement: an operations assessment, implementation guide and five starter AI skills for client delivery at Psyche Digital.",
    "paragraphs": [
      "Psyche Digital was already using AI to prepare recaps, kickoff briefs and report highlights. The team wanted to take on more client work without increasing the time founders spent coordinating delivery.",
      "In June I designed a content system for their own marketing, with written build instructions. They built it, used it, and came back in July to scope a broader review of their operations.",
      "I examined three recurring workflows: client success, onboarding and social-content production, tracing ten real instances end to end to see where the time went. The useful opportunities sat around the first draft: collecting updates before a meeting, carrying decisions into delivery tasks, preparing client-specific materials and moving approved content toward scheduling.",
      "For example, a meeting recap still leaves someone to find the relevant tasks, add the agreed instructions and make sure the right people have the context. I developed a workflow for that preparation and follow-through, using the team's existing documents and task system.",
      "The delivered package is an operations assessment, an implementation guide and five starter skills: client success, onboarding, content handoff, time reconciliation and a worked example for building the next one. Each skill comes with setup guidance, the source documents it needs and a pass/fail check, so the team can tell whether it is working before relying on it. People keep responsibility for client commitments, priorities and approval.",
      "The recommended starting point is one familiar client account and one cycle of meeting preparation and follow-through. Psyche has the materials to run that first trial, assess the output against work the team knows and decide what to expand next."
    ]
  }
] as const;
