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
    "summary": "Preparing profiles and paperwork meant gathering related records from several tools each time. I brought information from four business systems together so the team's AI assistant could use it in the workflows they already knew. The system keeps source references and unresolved questions available for review, with staff rollout now underway.",
    "metaTitle": "Healthcare: Shared Context and AI Workflows | Patrick McHeyser",
    "description": "Connecting scattered healthcare business records to an AI assistant, so staff can prepare documents and check the information behind them.",
    "paragraphs": [
      "For this healthcare services team, preparing a profile or a piece of paperwork began with finding the information to put in it. Records lived in one tool, supporting documents in another, and someone had to work out how they fitted together. I built a shared information source that those workflows could use to prepare documents and show staff the supporting records.",
      "**The information had to fit together.** I connected four business systems, including work-management boards, the CRM and document storage, in the client's own cloud account. The initial collection held millions of rows and tens of thousands of documents. Converting thousands of PDFs to searchable text made their contents available alongside the structured records.",
      "At that scale, matching records matters as much as collecting them. The same ID in two systems does not necessarily identify the same record. I built checks that merge known duplicates after review and hold conflicting identities for a person to resolve. Source references stay with the information, and unresolved facts remain visible. That gives the assistant a way to assemble related material while showing where questions remain.",
      "**Staff need to be able to check an answer.** A summary is useful when the person reading it can find the records behind it. The system keeps those references available as staff use the assistant, so they can review the supporting information before making a decision. Access follows each person's role. I tested four permission levels in production, and the connection can read information but cannot change the source records.",
      "The information refreshes nightly. Each update goes through checks before publication, and a failed run leaves the last good version available. Staff can keep using the system while an update is repaired.",
      "**The existing workflows now share that preparation.** I moved the team's workflows for profile preparation, recurring paperwork, case summaries and evidence checks onto the shared source. They are installed together so everyone uses the same version. When a task needs a current source document, the workflow can retrieve it through an authorized connection.",
      "A preparation workflow, for example, gathers the relevant information and drafts a working document. A review workflow then checks the supporting material and returns a checklist with source references and open questions. The person reviewing it has the draft and the information needed to check it together, before deciding what to do next.",
      "I used AI coding agents to help build the system, with separate review of releases and checks against real cases. More than 800 automated tests support continued development. Four guides cover everyday use and maintenance, and the client owns the cloud account, so the system can be handed to another maintainer.",
      "The result is a shared source that the team's existing AI workflows can use for both preparation and review. The first staff accounts are live, with rollout to the rest of the team next. Time saved has not been measured yet."
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
    "summary": "Psyche Digital built and used a content system I designed, then returned to explore how AI could help with more of its client work. I followed the work from meeting preparation through follow-up and handed over a plan and starter workflows the team could test on a familiar account.",
    "metaTitle": "Psyche Digital: AI in Client Delivery | Patrick McHeyser",
    "description": "From a content system Psyche Digital built and used to an operations review and starter AI workflows for the coordination around client work.",
    "paragraphs": [
      "Psyche Digital already used AI for recaps, kickoff briefs and report highlights. The team wanted to take on more client work, and the founders were looking for ways to spend less time coordinating it. Our work grew from a content system for their own marketing into a review of how client work moved through the business.",
      "In June I designed that first content system and wrote the build instructions. The team built it, used it and returned in July to scope a broader review. That gave us an existing project to build on as we looked beyond content creation.",
      "I followed 10 examples of actual work across client success, onboarding and social-content production. Looking from start to finish made the work between the documents visible: collecting updates, carrying meeting decisions into tasks and getting approved content ready to schedule.",
      "A meeting recap illustrates the gap. It can capture a decision accurately, but someone still has to find the relevant tasks, add instructions and give the right people the context. I designed a workflow for that follow-through using the team's existing documents and task system. It gives the team a way to prepare the next actions for review alongside the recap.",
      "The assessment turned those observations into an implementation guide and five starter AI skills. These cover client success, onboarding, content handoff and time reconciliation, plus a worked example for building the next skill. Each explains what information it needs, how to set it up and how to check its output. That gives the team a way to judge a result before relying on it for client work.",
      "I recommended beginning with one familiar client account and one round of meeting preparation and follow-through. Because the team knows that work, it can compare the output with what it would normally prepare and spot what needs changing. Psyche has the materials to run that first trial and decide what to expand next. Client commitments, priorities and approval stay with the team."
    ]
  }
] as const;
