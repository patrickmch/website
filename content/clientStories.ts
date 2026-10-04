export const clientStories = [
  {
    "slug": "manufacturing-systems",
    "client": "Custom manufacturing",
    "title": "Custom quoting software. A repeatable way to build what comes next.",
    "label": "Custom manufacturing · Software development, reporting and technical leadership",
    "summary": "For a growing manufacturer, I moved from assessing the technical work to building a quoting application, making management reporting traceable to source and establishing an AI-assisted process for delivering software. Business rules and operator feedback guide the work from specification through testing and release review.",
    "metaTitle": "Manufacturing: Quoting and Software Delivery | Patrick McHeyser",
    "description": "Custom quoting software, source-traceable reporting and AI-assisted software delivery for a manufacturer.",
    "paragraphs": [
      "Quoting depended on complex spreadsheets and experienced people knowing how to use them. The reporting work focuses on tracing management figures back to source transactions and agreeing what each measure represents. The business needed someone who could work through both the operating details and the software behind them.",
      "I started by assessing the existing systems and technical work. The engagement grew into hands-on development and ongoing technical leadership, with three connected areas of work.",
      "**A custom quoting application.** I translated workbook behavior and operating guidance into explicit business rules, calculations and user workflows. The web application brings quote inputs, pricing calculations, saved versions and outputs into a shared workflow. Operator testing is shaping how those features work in practice.",
      "**Reporting that can be checked against its source.** I trace management figures back to transactions and work through the definitions behind the reports. That means agreeing on what an operational event means and how staff record it.",
      "**An AI-assisted software delivery system.** I built a process that turns a bounded business requirement into an implementation, then subjects it to separate tests, browser-based QA and review. Findings return to the build for correction. Changes move toward release with evidence of what was tested and what remains unresolved.",
      "People supply the business rules, resolve ambiguous decisions and judge whether the result works for the operation. AI handles substantial implementation and checking within that structure.",
      "The quoting application is in operator testing. Reporting improvements and integration work continue, with adoption and business impact still being assessed."
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
    "label": "Healthcare services · Data integration, custom software and AI workflows",
    "summary": "I built a shared context system that brings records from existing tools together and makes them available through an AI assistant. Reusable workflows use that context to assemble information, prepare documents and organize checks for human review. Rollout and impact assessment are ongoing.",
    "metaTitle": "Healthcare: Shared Context and AI Workflows | Patrick McHeyser",
    "description": "A shared context system connecting business information to AI workflows, with human review and ongoing rollout.",
    "paragraphs": [
      "Answering a routine operational question could mean checking a record in one tool, finding the supporting document in another and reconstructing what had happened. Preparing the next piece of work meant gathering much of that information again.",
      "I built a shared context system to connect that information to the team's AI workspace. Software collects records from existing tools, matches related information and prepares a structured view the assistant can query through a controlled connection.",
      "**The foundation makes the information usable.** The system preserves source references, distinguishes unresolved information from confirmed facts and limits what a person can retrieve. Connecting tools is only useful if the assistant can tell which record belongs to the case and where an answer came from.",
      "**Reusable workflows turn context into work.** I developed instructions for assembling a profile, preparing paperwork and reviewing whether the required supporting evidence is present. These workflows can use the shared context and retrieve current documents through authorized source connections when needed.",
      "For example, a preparation workflow gathers relevant information and drafts the working document. A review workflow checks the supporting material and returns a checklist with source references and unresolved questions. A person reviews the output and makes the decision.",
      "The work targets the repeated searching, copying and cross-checking around each case. Staff rollout and impact assessment are ongoing; time savings have not yet been measured."
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
    "title": "Taking AI further into client delivery",
    "label": "Psyche Digital · Operations assessment and implementation playbook",
    "summary": "Psyche Digital already used AI for parts of its client work. I examined the work around those tasks and delivered reusable workflows, starter skills and setup guidance for meeting follow-through, onboarding and content production.",
    "metaTitle": "Psyche Digital: AI in Client Delivery | Patrick McHeyser",
    "description": "An operations assessment, implementation guide and reusable AI skills for client delivery at Psyche Digital.",
    "paragraphs": [
      "Psyche Digital was already using AI to prepare recaps, kickoff briefs and report highlights. The team wanted to take on more client work without increasing the time founders spent coordinating delivery.",
      "An early content blueprint gave them a chance to try my approach. After using it, they came back for a broader review of their operations.",
      "I examined three recurring workflows: client success, onboarding and social-content production. The useful opportunities included work around the first draft: collecting updates before a meeting, carrying decisions into delivery tasks, preparing client-specific materials and moving approved content toward scheduling.",
      "For example, a meeting recap still leaves someone to find the relevant tasks, add the agreed instructions and make sure the right people have the context. I developed a workflow for that preparation and follow-through, using the team's existing documents and task system.",
      "The delivered package included an operations assessment, an implementation guide and reusable AI skills. The guide explains what information each workflow needs, how to set it up, what it should produce and how to check the result. People retain responsibility for client commitments, priorities and approval.",
      "The recommended starting point is one familiar client account and one cycle of meeting preparation and follow-through. Psyche has the materials to run that first trial, assess the output against work the team knows and decide what to expand next."
    ]
  }
] as const;
