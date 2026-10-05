export const clientStories = [
  {
    "slug": "manufacturing-systems",
    "client": "Custom manufacturing",
    "title": "Custom quoting software. A repeatable way to build what comes next.",
    "label": "Custom manufacturing",
    "summary": "I joined a growing manufacturer to assess its existing systems, then stayed on as fractional CTO to lead the improvements. The work connects a quoting application, clearer reporting and a team equipped to maintain both. A spreadsheet with almost 10,000 formulas provided the starting point for the new quoting software, now in operator testing.",
    "metaTitle": "Manufacturing: Quoting and Software Delivery | Patrick McHeyser",
    "description": "A manufacturing systems review grows into fractional CTO work, with quoting software, corrected reporting and a team that can maintain the systems.",
    "paragraphs": [
      "A growing manufacturer needed technical leadership to improve the systems its team used every day. I began by assessing the existing software and reporting, then stayed on as fractional CTO to lead the work. Quoting became a central project: how to carry the business's knowledge from a complex spreadsheet into software the team could keep improving.",
      "**The spreadsheet was the starting point.** With almost 10,000 formulas and 40 macros, the quoting workbook contained much of the detail that went into a price. Experienced staff knew how to use it. Building a replacement meant working through those calculations with the business and writing down the rules behind them.",
      "I used those rules to build a web application where staff can prepare a quote, compare quantities and return to earlier versions. Keeping each saved version intact means they can see how a quote was priced before making another change. Before operator testing, I checked the application against 99 archived quotes in a browser. It reproduced the spreadsheet's figures with no defects found, giving us a basis for testing it against the team's everyday work.",
      "**Making the reports easier to check and maintain.** I approached reporting by tracing management figures back to source transactions. The same comparison logic appeared throughout the reports, so correcting it meant updating nearly 30,000 formulas. I also rescheduled daily reports to follow their data updates, so the information was available when the reports were built.",
      "The numbers needed agreed meanings as well as corrected calculations. The owner and I worked through what on-time delivery should measure, giving the team definitions to use when interpreting the reports. An internal specialist took over with those definitions and corrected comparisons, giving the business someone responsible for maintaining the reports.",
      "**The team needed a way to keep improving the software.** Once operators began trying the quoting application, their feedback became the next source of changes. Two operators are testing it, and I released fixes from their first round of feedback within two days.",
      "To support that work, I set up an AI-assisted development process with separate testing and review. About 1,500 automated tests now check the application as it changes, alongside browser testing of the work staff need to complete. Those checks caught rounding and calculation errors, including a change that would have broken new quotes, before operators encountered them. Each release also has a live check and a way to restore the previous version.",
      "**Keeping the knowledge inside the business matters too.** As fractional CTO, I lead the automation team and hiring alongside the software work. I ran interviews and a paid trial project, managed a developer handover and brought undocumented automation code into company version control. These steps give the team access to the code and knowledge it needs to maintain what has been built.",
      "The engagement has grown from assessing the systems to building them and helping the business look after them. The quoting application remains in operator testing, and the documented rules still need business approval. The next stage is to work through that feedback and approval so the application can become part of everyday quoting."
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
