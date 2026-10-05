export const clientStories = [
  {
    "slug": "manufacturing-systems",
    "client": "Custom manufacturing",
    "title": "Custom quoting software. A repeatable way to build what comes next.",
    "label": "Custom manufacturing",
    "summary": "I serve as fractional CTO for a growing manufacturer, leading technical work, the automation team and hiring. I've built a quoting application, corrected reporting calculations and set up an AI-assisted process for building and testing software. The quoting application matched the spreadsheet's results across 99 archived quotes and is now in operator testing.",
    "metaTitle": "Manufacturing: Quoting and Software Delivery | Patrick McHeyser",
    "description": "Fractional CTO work for a manufacturer: a quoting application checked against 99 archived quotes, reporting corrections and an AI-assisted software development process.",
    "paragraphs": [
      "Quoting depended on a spreadsheet with almost 10,000 formulas and 40 macros, and on the experienced people who knew how to use it. Management reports also needed attention. I worked through the calculations behind both and began building software the team could maintain.",
      "I started by assessing the existing systems and technical work. The engagement grew into a fractional CTO role. I lead technical direction, manage the automation team, run hiring and sit on the management team.",
      "**A quoting application built from the existing rules.** I documented the spreadsheet's calculations and business rules, then built a web application around them. Staff can compare quantities and quote versions, include vendor and freight costs, and produce a PDF for the customer. Saved versions preserve the quote as it was priced. In browser testing, the application reproduced 99 archived quotes against the spreadsheet's figures with no defects found. Two operators are now testing it. I released fixes from their first round of feedback within two days.",
      "**Reporting figures traced back to transactions.** I began by tracing management figures back to source transactions and corrected nearly 30,000 comparison formulas. Some errors came from date cutoffs, incomplete periods or duplicate customer records. One metric counted order lines instead of orders. I also rescheduled daily reports to run after their source data arrived. The owner and I agreed on how to define on-time delivery, and an internal specialist took over reporting with read-only access.",
      "**A repeatable way to build and test software.** I set up a process that starts with a written requirement and uses AI to help build the change. Separate testing and review check the result, including in a browser. Each release includes a live check and a way to restore the previous version. Checks caught a one-cent rounding error, an incorrect width formula and a change that would have broken new quotes before operators encountered them. The application now has about 1,500 automated tests.",
      "The team supplies the business rules and decides whether the software works for the operation. AI helps with implementation and testing.",
      "**Technical leadership beyond the application.** I ran hiring through interviews and a paid trial project. I also managed a developer handover and brought undocumented automation code into company version control. The work included evaluating estimating and design software against agreed criteria, and checking and updating more than 600 ERP records.",
      "The quoting application remains in operator testing. The business still needs to approve the documented rules, and development continues."
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
    "summary": "I connected records from four business systems so a healthcare team's AI assistant can use them together. The information refreshes nightly, and each person can access only what their role allows. The team's existing workflows now use it to prepare profiles, draft paperwork and check supporting documents. Staff rollout is underway.",
    "metaTitle": "Healthcare: Shared Context and AI Workflows | Patrick McHeyser",
    "description": "An AI assistant connected to records from four business systems, with access controls and workflows for profile preparation, paperwork and document checks.",
    "paragraphs": [
      "Answering a routine question meant checking records in one tool, finding documents in another and piecing together what had happened. The next task often meant gathering the same information again.",
      "I brought records from four business systems into a shared store in the client's own cloud account. It connects information from work-management boards, the CRM and document storage. The initial collection covered millions of rows and tens of thousands of documents, including thousands of PDFs converted to searchable text.",
      "**Related records need to match.** I built checks to distinguish records that belong together from those that only share an ID. Known duplicates are merged after review. Conflicting identities wait for a person to resolve them. The system keeps source references and separates confirmed facts from unresolved information. Every nightly update checks fields, source conflicts, documents and redactions before publication. If a run fails, the last good version stays available.",
      "**Each person has access appropriate to their role.** Staff use the assistant through their existing AI accounts. The connection can read information but cannot change the source records. Four permission levels control what each person can retrieve. I tested the restrictions in production.",
      "**Existing workflows use the shared information.** I moved the team's AI workflows onto this system for profile preparation, recurring paperwork, case summaries and evidence checks. They are installed together so everyone uses the same version. When a task needs a current source document, the workflow can retrieve it through an authorized connection.",
      "For example, one workflow gathers information and drafts a working document. Another checks the supporting material and returns a checklist with source references and open questions. A person reviews the output and makes the decision.",
      "**Testing and handover are part of the build.** I used AI coding agents to help build the system, then put releases through separate review. Issues found in review were fixed before release. The system has more than 800 automated tests. I also checked it against a sample of real cases. Four guides explain how staff use the system and how maintainers look after it.",
      "The first staff accounts are live, with rollout to the rest of the team next. Time saved has not been measured yet. The client owns the cloud account and has the documentation to hand maintenance to someone else."
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
    "summary": "Psyche Digital built and used a content system I designed, then asked me to review more of its client work. I examined client success, onboarding and content production. The team received an operations assessment, a practical implementation guide and five starter AI workflows, with instructions for testing each one.",
    "metaTitle": "Psyche Digital: AI in Client Delivery | Patrick McHeyser",
    "description": "An operations assessment, implementation guide and five starter AI workflows for Psyche Digital, following an earlier content-system project.",
    "paragraphs": [
      "Psyche Digital already used AI for recaps, kickoff briefs and report highlights. The team wanted to take on more client work and reduce the time founders spent coordinating it.",
      "In June I designed a content system for their own marketing and wrote the build instructions. They built it, used it and returned in July to scope a broader review of their operations.",
      "I reviewed client success, onboarding and social-content production, following 10 examples of actual work from start to finish. Much of the work surrounded the writing itself: collecting updates, turning meeting decisions into tasks and getting approved content ready to schedule.",
      "A meeting recap, for example, still leaves someone to find the relevant tasks, add instructions and give the right people the context. I developed a workflow for that follow-through using the team's existing documents and task system.",
      "I provided an operations assessment, an implementation guide and five starter AI skills. These cover client success, onboarding, content handoff and time reconciliation, plus an example for building another skill. Each includes setup instructions, the source documents it needs and a check the team can run before relying on it. The team still decides priorities, makes client commitments and approves the work.",
      "I recommended starting with one familiar client account and one round of meeting preparation and follow-through. Psyche has the materials to run that first trial, compare the output with work the team knows and decide what to expand next."
    ]
  }
] as const;
