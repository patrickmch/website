export const clientStories = [
  {
    "slug": "manufacturing-systems",
    "client": "Custom manufacturing",
    "title": "From a 10,000-formula quoting workbook to company-owned software and fractional CTO leadership.",
    "label": "Custom manufacturing",
    "summary": "A systems assessment for a custom manufacturer grew into an ongoing fractional CTO role on the management team. I built a custom quoting and intake application across five operational queues, rebuilt management reporting on verified ERP transactions, and moved critical infrastructure into company custody.",
    "metaTitle": "Manufacturing: From Spreadsheet to Software the Company Owns | Patrick McHeyser",
    "description": "A systems assessment grows into fractional CTO leadership: custom quoting software across five queues, verified ERP reporting, and company-owned infrastructure.",
    "paragraphs": [
      "The owner of a growing custom manufacturer brought me in for a systems assessment when the business outgrew its spreadsheets and outside contractors. He needed a technical counterpart to evaluate engineering work, show where existing tools were holding growth back, and set a practical roadmap. That assessment grew into an ongoing fractional CTO role on the management team, leading custom software delivery, rebuilding management reporting, and bringing critical infrastructure under company ownership.",
      "**A custom quoting and intake application that replaces a 10,000-formula workbook.** Every customer quote previously ran through a spreadsheet with nearly 10,000 formulas where pricing logic, material costs, and quantity breaks were tangled together. Comparing quantities or revising a quote meant duplicating workbooks by hand, and the quoting and design director spent hours each day fixing broken formulas and reviewing routine quotes. I worked with the team to extract 111 pricing rules and 37 lookup tables and built a custom web application the company owns. Connected to customer and item records, the application routes work across five operational queues: sales requests, house accounts, engineering, drawings, and samples. A salesperson enters the product type, dimensions, materials, and target quantities (such as 250, 500, and 1,000 units). The application calculates materials, labor, outside components, and shipping across all three quantities at once, tracks quote revisions side by side, and generates a customer-ready PDF.",
      "**Management reporting rebuilt on verified ERP transactions and owned in-house.** The company's ERP lacked usable native management reporting, and the spreadsheets layered on top of it contained nearly 30,000 formulas that failed to reconcile whenever leadership questioned a number. Using monthly on-time delivery as the proving ground, I traced management figures back to raw ERP source transactions and uncovered four systemic errors: individual order lines were counted as full orders, a partial month was compared against a full month, capitalization differences split customer records, and an automated data feed had silently stalled. I worked with the owner to establish seven explicit business rules for on-time delivery, rebuilt the reporting pipeline in a cloud data warehouse, and restored the feed. I then trained an internal specialist to own reporting, equipping her with direct read access to the warehouse and a side-by-side verification process for retiring legacy reports.",
      "**Structured sales-to-engineering handoffs across five operational queues.** Quoting was only half of the intake bottleneck; incomplete job details routinely moved from sales into design and sample production, forcing engineering to chase missing specifications. I worked with leadership and department leads to redesign the sales-to-engineering handoff across the CRM and the new quoting application. Sales now captures complete job specifications up front before routing work into the sales requests, house accounts, engineering, drawings, or samples queues, with explicit ownership at every stage.",
      "**Fractional CTO leadership across infrastructure custody, hiring, and vendor decisions.** Joining the management team gave the owner a permanent technical counterpart across operations and engineering. I moved critical automations and cloud infrastructure off outside contractors' personal accounts into company custody and version control, established automated release checks so daily tools stay stable as features ship, led technical hiring evaluations and developer transitions, and sat alongside the owner to evaluate major software vendor proposals before the company committed capital.",
      "Selected details from the engagement:",
      "- Extracted **111 pricing rules** and **37 lookup tables** from a nearly **10,000-formula** workbook into a custom web application that prices three quantities at once and routes work across **five operational queues**.\n- Traced management metrics across nearly **30,000 spreadsheet formulas** back to raw ERP transactions, resolved **four systemic data errors**, codified **seven business rules** with the owner, and transitioned reporting ownership in-house.\n- Redesigned the **sales-to-engineering handoff** so complete job specifications are captured up front and routed cleanly across sales, design, drawings, and sample production.\n- Moved critical automations and cloud infrastructure off outside contractors' personal accounts into **company custody and version control**, led technical hiring evaluations, and reviewed major vendor proposals alongside the owner.",
      "**Technical leadership that builds company-owned assets.** Across quoting, ERP reporting, department handoffs, and vendor evaluation, the engagement replaced fragile spreadsheets and contractor dependencies with production systems the internal team owns and operates."
    ],
    "table": {
      "headers": [
        "Operational bottleneck",
        "What the system or engagement handles",
        "Ongoing human ownership"
      ],
      "rows": [
        [
          "Pricing multi-quantity quotes in a 10,000-formula spreadsheet",
          "Custom web app applying 111 pricing rules and 37 lookup tables across three quantities at once, with side-by-side revisions and PDF generation",
          "Sales enters specs and reviews the final quote; leadership approves rule changes and complex custom jobs"
        ],
        [
          "Incomplete job specs stalling between sales, design, and sample production",
          "Upfront specification capture in the CRM and structured routing across five operational queues (sales, house accounts, engineering, drawings, and samples)",
          "Department leads manage queue priorities, drawings, and engineering exceptions"
        ],
        [
          "Reconciling 30,000 spreadsheet formulas against raw ERP data when metrics look wrong",
          "Automated reporting pipeline in the cloud data warehouse built on verified ERP transactions and seven explicit on-time delivery rules",
          "Internal reporting specialist maintains reports in-house; owner sets business definitions"
        ],
        [
          "Automations on contractor accounts and unvetted software vendor proposals",
          "Infrastructure and code moved into company custody, structured developer transitions, and technical evaluation of major vendor proposals",
          "Owner and management team make capital and hiring decisions with clear technical evidence"
        ]
      ]
    },
    "featured": true
  },
  {
    "slug": "shared-context",
    "client": "Healthcare services",
    "title": "Architecting the cloud engine that powers a healthcare team's 28+ AI workflows and morning operations.",
    "label": "Healthcare services",
    "summary": "A healthcare services team had core software, documented SOPs, and operators building AI workflows, and needed an outside architect to connect their systems. I built a cloud data and orchestration engine that unifies four systems and thousands of PDFs nightly, powers 28+ operational workflows and scheduled morning case audits, and lets operations leaders publish new workflows themselves.",
    "metaTitle": "Healthcare: AI Systems Architecture Across Four Platforms | Patrick McHeyser",
    "description": "Unifying a CRM, six project boards, cloud document storage, and a live website into a cloud engine powering 28+ AI workflows and morning operations.",
    "quote": {
      "text": "We came to Patrick already with data, systems, and skills. He built the engine that put it all together in AWS. Many companies like my own will not have an internal AI architect on their team and will need to outsource.",
      "attribution": "CEO, healthcare services business"
    },
    "paragraphs": [
      "This healthcare services company already had core business software, documented SOPs, and capable operators building their own AI prompts and workflows. What they needed was an external AI architect to connect their systems, since every workflow still required staff to pull and cross-check records by hand across a CRM, six project boards, thousands of PDFs in cloud document storage, and a live website. I mapped every cross-department handoff, built a central data and orchestration engine in the company's cloud account, and connected their workflows to live operational data.",
      "**A unified cloud engine connecting four systems and thousands of documents.** I began by mapping every cross-department handoff through staff interviews, SOP reviews, and system logs to see where cases stalled between intake, coordination, and documentation. Using that map, I built a central data and orchestration engine inside the company's cloud account. Every night, the engine ingests records across the CRM, six project boards, thousands of PDFs in cloud document storage, and the live website, converting unstructured files into searchable text.",
      "Matching records across four tools required deterministic identity resolution because names, IDs, and case statuses frequently differed from one system to the next. The engine links related records across systems, attaches source citations to every field, and flags conflicting facts so staff see the exact discrepancy. Before each nightly update goes live, automated validation checks the build and keeps the prior verified snapshot active if an upstream feed fails. The engine exposes 34+ governed tools directly inside the team's AI assistants, enforcing role-based access on every query.",
      "**Over 28 AI workflows and scheduled morning operations that run before the workday starts.** Operators had already designed strong workflows for profile preparation, recurring paperwork, and evidence review. I connected 28+ of these operational skills to the cloud engine's 34+ governed tools so a single workflow gathers the complete case record, drafts the required paperwork, and returns a source-linked verification checklist. Beyond on-demand work inside the assistant, the engine runs scheduled morning workflows that audit active cases overnight, reconcile live website inventory against the six internal project boards, verify incoming-call follow-ups, and deliver each coordinator a daily action list in team chat or email.",
      "**Role-scoped answers with source citations that take leadership out of the lookup loop.** Previously, when the CRM, project boards, and document folders disagreed on a case detail, staff routed the question to the CEO or Operations Director to sort out which system was right. Now every answer inside the AI assistant carries the exact source record and date behind each fact, scoped to the requester's role. When two systems disagree, the assistant surfaces both records side by side so coordinators check the system first and resolve routine discrepancies directly.",
      "**Self-service workflow publishing and scheduling owned by the operations team.** To keep the platform evolving as processes change, I built a permission-scoped publishing and scheduling workflow alongside operator and technical reference guides. Authorized operations leaders can write a new skill, update business rules in an existing workflow, and schedule recurring morning runs from their own workspace. Version controls and role permissions ensure changes are verified before distribution to the wider team.",
      "**An AI-ready operation backed by production architecture.** Connecting the company's four core systems turned isolated prompts into a shared operational platform: coordinators begin the day with automated case audits, verify cross-system records in seconds, and publish new workflows on their own schedule."
    ],
    "table": {
      "headers": [
        "Workflow",
        "What the cloud engine and AI skills handle",
        "Manual work retired"
      ],
      "rows": [
        [
          "Cross-system case lookup and profile preparation",
          "Joins records across the CRM, six project boards, thousands of cloud PDFs, and the live website into a source-cited summary",
          "Opening four tools by hand to assemble and cross-check the same case history"
        ],
        [
          "Recurring paperwork and evidence verification",
          "Drafts case documents from unified records, checks supporting PDFs, and flags cross-system discrepancies with citations",
          "Re-keying facts into templates and escalating record conflicts to the CEO or Operations Director"
        ],
        [
          "Overnight case audits and morning action lists",
          "Audits active cases and incoming-call follow-ups overnight, then delivers each coordinator's daily action list in chat or email",
          "Starting the morning by combing through project boards and call logs to find stalled cases"
        ],
        [
          "Website inventory and project board reconciliation",
          "Compares live website listings against six internal project boards on a morning schedule and flags mismatches",
          "Line-by-line manual checks between public website pages and internal tracking boards"
        ],
        [
          "Self-service skill publishing and scheduling",
          "Lets authorized operations leaders write, update, and schedule recurring AI workflows with version and permission controls",
          "Waiting on an engineer to update workflow rules or configure a new scheduled run"
        ]
      ]
    },
    "featured": true
  },
  {
    "slug": "psyche-digital",
    "client": "Psyche Digital",
    "title": "Five AI workflows an agency team can run, test, and maintain in-house.",
    "label": "Psyche Digital",
    "summary": "After implementing a content system from my initial blueprint, Psyche Digital brought me back for an operations review across client delivery. I mapped their core bottlenecks and delivered an implementation guide, five production-ready AI skills, and a testing method so the team can maintain the workflows in-house.",
    "metaTitle": "Psyche Digital: Five AI Workflows a Team Can Run In-House | Patrick McHeyser",
    "description": "An implemented content blueprint leads to an operations review and practical architecture for running, testing, and maintaining AI workflows at Psyche Digital.",
    "paragraphs": [
      "Psyche Digital already used AI for meeting recaps, kickoff briefs, and report highlights. The founders wanted the capacity to take on more client accounts while reducing internal coordination time. Our engagement expanded from an internal marketing content system into a full review of how AI could carry client delivery work through to completion.",
      "**A content architecture built and operated by the internal team.** In our first engagement, I designed the agency's content system and wrote the step-by-step build specifications. The team stood the system up in their own environment, validated it in daily use, and returned to scope a broader operations review. That success established the delivery model for the next phase: clear architecture and build specifications that the team owns and operates directly.",
      "**Closing the gap between meeting notes and assigned client work.** I traced 10 recent examples of work across client success, onboarding, and social content production. Meeting recaps exposed the central bottleneck: recording a decision still left an account manager to locate the right task, write the execution brief, and assemble context for the assignee.",
      "**Five workflows with defined inputs, execution steps, and pass/fail checks.** The assessment established a rollout sequence tied to the agency's existing documents and task tracker. I delivered an implementation guide and five AI skills that pull the required source material, draft the follow-up work, and place the output directly where the team acts on it. We reviewed the architecture together and finalized the setup specifications for their environment.",
      "**A repeatable release process for internal workflow owners.** The guide equips the team with an engineering discipline for updating its own tools: make one scoped change at a time, test against a standard case and a known edge case, retain the prior working version, and verify distribution across the team. Each workflow has a designated owner who approves changes to its business rules.",
      "**Staged rollout starting with a single client account.** The delivery package is structured for a controlled rollout: the team starts with one established client account across a single cycle of meeting preparation and follow-through, validates the output against the pass/fail checks, and then expands the workflows across the client roster."
    ],
    "featured": false
  }
] as const;
