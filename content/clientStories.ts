export const clientStories = [
  {
    "slug": "manufacturing-systems",
    "client": "Custom manufacturing",
    "title": "Technical leadership for a growing manufacturer.",
    "label": "Custom manufacturing",
    "summary": "An assessment of a manufacturer's systems grew into an ongoing fractional CTO role. I lead technical delivery, work with the internal team and help the owner make software decisions. The work includes a quoting application, corrected management reporting and a development process for the changes that follow.",
    "metaTitle": "Manufacturing: Technical Leadership and Delivery | Patrick McHeyser",
    "description": "A systems assessment grows into fractional CTO work: leading delivery, developing internal ownership, building quoting software and improving reporting.",
    "paragraphs": [
      "The owner of a growing manufacturer wanted a clearer view of the technical work: what needed attention, what the existing team could take on and where to invest next. I began with a systems assessment, then stayed on as fractional CTO to lead the improvements with the team.",
      "**Taking responsibility for the work.** My role grew to include setting technical priorities, reviewing delivery and helping the owner evaluate software investments. For a major software proposal, I worked through the integrations, migration and internal effort the purchase would require, so the decision could account for the work beyond the license.",
      "I also ran technical interviews and a paid trial, and managed a developer handover. Capturing undocumented automation code in company version control gave the business a record it could maintain as people changed roles.",
      "**Turning business knowledge into working software.** Quoting became a central project. A workbook with almost 10,000 formulas held much of the knowledge behind a price. I worked through its calculations and operating rules with the business, then built a web application where staff can prepare quotes, compare quantities and revisit saved versions. Testing it against 99 archived quotes reproduced the workbook's figures before operators began trying it.",
      "Reporting needed the same attention to what the numbers meant. I traced management figures back to source transactions and corrected comparison logic repeated across nearly 30,000 formulas. The owner and I worked through metric definitions, while an internal specialist took responsibility for the reporting. I arranged read access and a way to check replacement reports alongside the existing ones before switching over.",
      "**Giving the team a way to keep improving it.** I established a development process that connects each change to a defined need, with separate implementation, testing and review. AI assists the build, while browser checks follow the work an operator needs to complete. Releases include a live check and a way to restore the previous version.",
      "Those checks and operator feedback now guide changes to the quoting application. Two operators are testing it, and I released fixes from their first round of feedback within two days. The application remains in operator testing, with business approval of the documented rules still ahead."
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
    },
    "featured": true
  },
  {
    "slug": "shared-context",
    "client": "Healthcare services",
    "title": "An AI assistant connected to the information the business runs on.",
    "label": "Healthcare services",
    "summary": "An operations review led to a shared information source for a healthcare team's AI workflows. I worked with staff to understand the handoffs, connected four business systems and integrated the workflows they had already developed. The engagement now includes rollout, account administration and guidance for maintaining the system.",
    "metaTitle": "Healthcare: Shared Context and AI Workflows | Patrick McHeyser",
    "description": "From an operations review to shared information, integrated AI workflows and a staff handoff for a healthcare services team.",
    "paragraphs": [
      "This healthcare services team already had business software, documented processes and people building useful AI workflows. Preparing a profile or recurring paperwork still meant gathering related information from several places. I began by looking at how the work moved between people and systems, then built a shared information source those workflows could use.",
      "**Starting with the people doing the work.** Staff interviews, process documents and system activity showed where information passed cleanly and where someone had to collect it by hand. That gave the build a practical starting point: make the supporting information available within the work staff were already doing.",
      "I connected four business systems in the client's own cloud account and converted thousands of PDFs into searchable text. Matching the records required checks for duplicates and conflicting identities. Related information now sits alongside its source references, with unresolved facts left visible for a person to review.",
      "**Building on the team's existing workflows.** Staff had already worked out how they wanted to prepare profiles, produce paperwork and check supporting evidence. I integrated those instructions with the shared source, preserved working versions and used staff feedback to correct the parts that interrupted their work. A preparation workflow can gather the information and draft a document; a review workflow can return the supporting records and open questions alongside it.",
      "The shared source limits access by role and refreshes nightly. Each update is checked before publication, so a failed refresh leaves the last good version available. Staff can inspect the records behind an answer before relying on it.",
      "**Preparing the system for the people who will run it.** The engagement also includes account administration and guides for setup, everyday use and technical maintenance. I documented how to update and distribute the workflows so the team has a process for keeping them current, with the infrastructure in the client's own account.",
      "Staff have reported successful use of several workflows as rollout continues. The next step is to work through the remaining feedback and handoff with the team. Time saved has not been measured yet."
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
    },
    "featured": true
  },
  {
    "slug": "psyche-digital",
    "client": "Psyche Digital",
    "title": "Taking AI further into client delivery.",
    "label": "Psyche Digital",
    "summary": "Psyche Digital followed my instructions to build a content system, then returned for a broader operations review. I helped the team choose where to go next and supplied workflows, setup guidance and a method for testing and maintaining their own AI tools.",
    "metaTitle": "Psyche Digital: AI in Client Delivery | Patrick McHeyser",
    "description": "An implemented content blueprint leads to an operations review and practical guidance for building, testing and maintaining AI workflows at Psyche Digital.",
    "paragraphs": [
      "Psyche Digital already used AI for recaps, kickoff briefs and report highlights. The founders wanted to take on more client work while spending less time coordinating it. Our engagement grew from a content system for their own marketing into a review of how AI could carry more of the work through to completion.",
      "I designed the first content system and wrote the build instructions. The team followed them, got it set up and tested it, then returned to discuss a broader engagement. That experience set the standard for the next deliverable: instructions they could use to build and improve the tools themselves.",
      "I followed 10 examples of actual work across client success, onboarding and social-content production. A meeting recap showed the opportunity clearly. Recording a decision was only the start; someone still had to find the relevant task, add instructions and give the right person enough context to act.",
      "The assessment set out a sequence for tackling that work using the team's existing documents and task system. An implementation guide and five starter AI skills explain how to gather the sources, prepare the work and save the result where the team needs it. We refined the setup instructions after reviewing the recommendations together.",
      "The guide also gives the team a method for maintaining what it builds: make a small change, test a familiar case and an exception, keep the last working version, then check that colleagues receive the update. The person responsible for the workflow reviews changes to its business rules.",
      "Psyche has the materials to begin with one familiar client account and one cycle of meeting preparation and follow-through. That first trial will show what needs correcting before wider use. The new workflows have not yet been installed in the team's accounts."
    ],
    "featured": false
  }
] as const;
