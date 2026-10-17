export const clientStories = [
  {
    "slug": "manufacturing-systems",
    "client": "Custom manufacturing",
    "title": "From a 10,000-formula spreadsheet to software the company owns.",
    "label": "Custom manufacturing",
    "summary": "An assessment of a manufacturer's systems grew into an ongoing fractional CTO role. I lead technical delivery, work with the internal team and help the owner make software decisions. The work includes a quoting application, corrected management reporting and a development process for the changes that follow.",
    "metaTitle": "Manufacturing: From Spreadsheet to Software the Company Owns | Patrick McHeyser",
    "description": "A systems assessment grows into fractional CTO work: leading delivery, developing internal ownership, building quoting software and improving reporting.",
    "paragraphs": [
      "The owner of a growing custom manufacturer brought me in to evaluate the company's systems and decide where to invest next. What began as an initial assessment grew into an ongoing fractional CTO engagement, leading technical delivery, working alongside the internal team, and joining the management team.",
      "**Custom quoting software, built to retire the spreadsheets and raise productivity.** Preparing a customer quote meant working through a spreadsheet with nearly 10,000 formulas where pricing rules, material tables, and quantity breaks were tangled together. Comparing three quantities or revisiting an earlier quote meant copying workbooks by hand, and only a few people trusted themselves to change a rule. I worked with the business to extract 111 pricing rules and 37 lookup tables from the workbook and built a web application the company owns. Now a salesperson enters the product type, dimensions, material, and target quantities (such as 250, 500, or 1,000 units). The application calculates materials, labor, outside components, and shipping across all three quantities at once, saves version 3 alongside version 2, and generates the customer PDF for a person to review before sending. Before operator testing began, we checked the application against 99 archived quotes and matched the workbook's figures every time.",
      "**Metrics the team can trust and act on, maintained in-house.** Management reporting had grown hard to reconcile when numbers looked off. Taking monthly on-time delivery as a test case, I traced management figures back to source transactions and found four separate problems across nearly 30,000 formulas: order lines were being counted as full orders, a partial month was compared against a full month, capitalization differences split customer records, and an automated data feed had quietly stopped. I worked with the owner to write down seven explicit rules for what counts as on-time, corrected the calculations, and restored the feed. I then helped an internal specialist take ownership of the reporting, with read access to the source data and a process for checking replacement reports alongside the existing ones before switching over.",
      "**Software that keeps improving, with automated checks before anything goes live.** Because operators rely on these tools for daily quoting and reporting, I established a development process built around the actual tasks staff need to complete. Each change runs in an isolated copy against roughly 1,500 automated checks and a browser test that clicks through the screens like a user and records screenshots. A person reviews the evidence and approves the release, with a live check afterward and a way to restore the previous version if needed.",
      "**Sales and design handoffs, hiring, and software decisions made with the owner.** Beyond the software builds, I worked alongside the owner and staff on operational changes that crossed departments. Redesigning the sales-to-design handoff, for example, meant defining what job details had to be captured in the CRM before work moved downstream, clarifying who owned each step, and adjusting staffing around the process. The owner gained a technical counterpart who could evaluate major vendor proposals, manage developer handovers, and carry operating decisions through to working systems.",
      "Selected details from the engagement:",
      "- The quoting workbook contained almost **10,000 formulas**. The application reproduced its figures across **99 archived quotes** before operator testing.\n- Reporting corrections covered comparison logic repeated across nearly **30,000 formulas**.\n- I supported technical hiring and developer handovers, including capturing undocumented automation code in company version control.\n- I reviewed a major software proposal with the owner, accounting for migration, integrations and the effort required from the internal team.",
      "**Technical decisions made with the owner, then built.** Across the engagement, the aim was more consistent quoting, dependable management information and clearer handoffs, with the team better equipped to maintain and improve its own systems."
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
    "title": "Four systems answering as one, inside the team's AI assistants.",
    "label": "Healthcare services",
    "summary": "An operations review led to a shared information source for a healthcare team's AI workflows. I worked with staff to understand the handoffs, connected four business systems and integrated the workflows they had already developed. The engagement now includes rollout, account administration and guidance for maintaining the system.",
    "metaTitle": "Healthcare: Four Systems Answering as One | Patrick McHeyser",
    "description": "From an operations review to shared information, integrated AI workflows and a staff handoff for a healthcare services team.",
    "paragraphs": [
      "This healthcare services team already had business software, documented processes and people building useful AI workflows. Preparing a profile or recurring paperwork still meant gathering related information from several places. I began by looking at how the work moved between people and systems, then built a shared information source those workflows could use.",
      "**Every handoff mapped from interviews, documents and system activity.** Staff interviews, process documents and system activity showed where information passed cleanly and where someone had to collect it by hand. That gave the build a practical starting point: make the supporting information available within the work staff were already doing.",
      "I connected four business systems in the client's own cloud account and converted thousands of PDFs into searchable text. Matching the records required checks for duplicates and conflicting identities. Related information now sits alongside its source references, with unresolved facts left visible for a person to review.",
      "**The team's workflows answer from one source.** Staff had already worked out how they wanted to prepare profiles, produce paperwork and check supporting evidence. I integrated those instructions with the shared source, preserved working versions and used staff feedback to correct the parts that interrupted their work. A preparation workflow can gather the information and draft a document; a review workflow can return the supporting records and open questions alongside it.",
      "**Current information for the whole team, scoped to each person's role.** The shared source limits access by role and refreshes nightly. Each update is checked before publication, so a failed refresh leaves the last good version available. Staff can inspect the records behind an answer before relying on it.",
      "**The team equipped to run and maintain the system.** The engagement also includes account administration and guides for setup, everyday use and technical maintenance. I documented how to update and distribute the workflows so the team has a process for keeping them current, with the infrastructure in the client's own account.",
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
    "title": "Five AI workflows a small agency can run and improve without a developer.",
    "label": "Psyche Digital",
    "summary": "Psyche Digital followed my instructions to build a content system, then returned for a broader operations review. I helped the team choose where to go next and supplied workflows, setup guidance and a method for testing and maintaining their own AI tools.",
    "metaTitle": "Psyche Digital: Five AI Workflows a Team Can Run Itself | Patrick McHeyser",
    "description": "An implemented content blueprint leads to an operations review and practical guidance for building, testing and maintaining AI workflows at Psyche Digital.",
    "paragraphs": [
      "Psyche Digital already used AI for recaps, kickoff briefs and report highlights. The founders wanted to take on more client work while spending less time coordinating it. Our engagement grew from a content system for their own marketing into a review of how AI could carry more of the work through to completion.",
      "**A content system the team built themselves from my instructions.** I designed the first content system and wrote the build instructions. The team followed them, got it set up and tested it, then returned to discuss a broader engagement. That experience set the standard for the next deliverable: instructions they could use to build and improve the tools themselves.",
      "**The real bottleneck: what a recap still leaves someone to do.** I followed 10 examples of actual work across client success, onboarding and social-content production. A meeting recap showed the opportunity clearly. Recording a decision was only the start; someone still had to find the relevant task, add instructions and give the right person enough context to act.",
      "**Five starter skills, each with the sources, steps and a pass or fail check.** The assessment set out a sequence for tackling that work using the team's existing documents and task system. An implementation guide and five starter AI skills explain how to gather the sources, prepare the work and save the result where the team needs it. We refined the setup instructions after reviewing the recommendations together.",
      "**A way to improve each workflow without breaking it.** The guide also gives the team a method for maintaining what it builds: make a small change, test a familiar case and an exception, keep the last working version, then check that colleagues receive the update. The person responsible for the workflow reviews changes to its business rules.",
      "**First trial on one client account, then wider use.** Psyche has the materials to begin with one familiar client account and one cycle of meeting preparation and follow-through. That first trial will show what needs correcting before wider use. The new workflows have not yet been installed in the team's accounts."
    ],
    "featured": false
  }
] as const;
