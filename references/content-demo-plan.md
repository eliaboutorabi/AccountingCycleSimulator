# Accounting Cycle Simulator - Content and Demo Plan

Researched on 2026-07-03.

## Purpose

The application should teach accounting as a transformation system:

Business reality -> evidence -> accounting judgment -> operational records -> journal entries -> subledgers -> general ledger -> close -> adjusted trial balance -> financial statements -> disclosures -> controls/audit evidence -> SEC-style filing package.

The learner should always understand three things:

1. What happened in the business.
2. What accounting representation is being created.
3. How the number can be traced forward to reporting and backward to source evidence.

The core promise is traceability. Any final statement or filing number should eventually be clickable back to the account mapping, trial balance, GL lines, journal entries, subledger records, contracts, invoices, cash receipts, schedules, policies, controls, and review evidence that created it.

## Research Baseline

Sources used for this plan:

- OpenStax, "Define and Describe the Initial Steps in the Accounting Cycle": identifies the canonical cycle from transaction analysis through journals, ledgers, trial balances, adjustments, financial statements, closing, and optional reversing entries.
  https://openstax.org/books/principles-financial-accounting/pages/3-3-define-and-describe-the-initial-steps-in-the-accounting-cycle
- FASB ASU 2014-09, Revenue from Contracts with Customers: the model for contract identification, performance obligations, transaction price, allocation, and recognition as obligations are satisfied.
  https://storage.fasb.org/ASU%202014-09_Section%20A.pdf
- FASB ASU 2016-18 / Topic 230, Statement of Cash Flows: cash flow statements explain changes in cash, cash equivalents, restricted cash, and restricted cash equivalents, classified through operating, investing, and financing activities.
  https://www.fasb.org/page/document?pdf=ASU+2016-18.pdf&title=UPDATE+2016-18%E2%80%94STATEMENT+OF+CASH+FLOWS+%28TOPIC+230%29%3A+RESTRICTED+CASH+%28A+CONSENSUS+OF+THE+FASB+EMERGING+ISSUES+TASK+FORCE%29
- SEC Form 10-K instructions: annual reporting package structure and timing framework.
  https://www.sec.gov/files/form10-k.pdf
- SEC Form 10-Q instructions: quarterly reporting package structure.
  https://www.sec.gov/files/form10-q.pdf
- SEC Inline XBRL guidance: domestic filers submit cover page and financial statement information, including footnotes and schedules, in Inline XBRL for Forms 10-Q and 10-K.
  https://www.sec.gov/data-research/structured-data/inline-xbrl
- eCFR Regulation S-X, 17 CFR Part 210: form and content rules for financial statements.
  https://www.ecfr.gov/current/title-17/chapter-II/part-210
- eCFR Regulation S-K Item 308, 17 CFR 229.308: management reporting on internal control over financial reporting.
  https://www.ecfr.gov/current/title-17/chapter-II/part-229/subpart-229.300/section-229.308
- PCAOB AS 1105, Audit Evidence: audit evidence includes supporting, corroborating, and contradictory evidence used by the auditor.
  https://pcaobus.org/oversight/standards/auditing-standards/details/AS1105
- PCAOB AS 2201, Audit of Internal Control Over Financial Reporting: integrated audit concepts and ICFR reliability objective.
  https://pcaobus.org/oversight/standards/auditing-standards/details/AS2201
- Apple 2024 Form 10-K, used only as a style reference for public-company statement density, product/service disaggregation, footnote style, and iXBRL document shape.
  https://www.sec.gov/Archives/edgar/data/320193/000032019324000123/aapl-20240928.htm

## Product Thesis

Do not make a textbook page. Make a calm, elegant accounting workstation.

Left side:

- Teaches the lesson.
- Explains the business situation.
- Shows the accounting question.
- Names the evidence, rule, representation, control, and downstream effect.
- Points out what can go wrong.

Right side:

- Shows the process in the visual language of the real artifact: invoice desk, journal grid, ledger, reconciliation workpaper, trial balance spreadsheet, close checklist, statement binder, disclosure table, XBRL tag review.
- In Watch mode, animates the transformation.
- In Do mode, asks the learner to make the accountant's decision.
- In later editable mode, lets user-entered facts propagate through the engine.

## Company Scenario

Use one fictional company deeply instead of many shallow examples.

Company: Nimbus Bikes, Inc.

Business:

- Sells physical bikes and parts to commercial customers.
- Sells annual fleet maintenance and analytics subscriptions.
- Buys inventory from vendors.
- Has employees, payroll, lease obligations, fixed assets, debt, and stock compensation.
- Has a small foreign subsidiary in the advanced consolidation section.
- Produces a mock Form 10-Q first, then a mock Form 10-K later.

Why this works:

- Product sales teach inventory, COGS, receivables, collections, returns, allowance, and gross margin.
- Subscription services teach contracts, performance obligations, deferred revenue, revenue schedules, and revenue disclosures.
- Vendors teach purchase orders, receiving, AP, 3-way match, payments, received-not-invoiced accruals, and prepaids.
- Month-end close teaches accruals, depreciation, reconciliations, trial balance review, statements, footnotes, controls, audit evidence, and filing.

## Full Scroll Structure

The page should eventually scroll through these sections. The sidebar can group them, but the right panel must change into the correct artifact for the current section.

### 0. Company Setup

Lesson question: What system are we building before any transaction happens?

Content:

- Legal entities, fiscal calendar, chart of accounts, departments, products, customers, vendors, bank accounts, accounting policies, approval workflows.
- Explain why an accounting system needs structure before journal entries exist.

Demo:

- Company map with entities, bank accounts, ledgers, subledgers, reporting dimensions, policies, and controls.
- Learner can inspect the chart of accounts and see each account mapped to a financial statement line.

### 1. Business Event Triage

Lesson question: Is this operational noise or an accounting event?

Content:

- Quote, purchase order, sales order, contract, shipment, service delivery, invoice, cash receipt, vendor bill, receiving report, payroll file, legal letter.
- Teach record now, record later, monitor, disclose, ignore.

Demo:

- Event queue with cards.
- Learner sorts events into accounting treatment lanes.
- Watch mode shows why each card lands where it does.

### 2. Source Evidence Capture

Lesson question: What proves the event?

Content:

- Source documents are messy human evidence: contracts, invoices, receipts, POs, receiving reports, bank feeds, emails, payroll files, shipping records.
- Accountant verifies completeness, authorization, dates, amounts, customer/vendor identity, and source reference.

Demo:

- Evidence packet builder.
- Learner drags a contract, invoice, cash receipt, bank line, and policy memo into a packet.
- Missing evidence creates a warning that follows the transaction downstream.

### 3. Accounting Interpretation

Lesson question: What does the event mean under accounting policy?

Content:

- Recognition, measurement, classification, timing, estimates, and disclosure.
- Revenue example follows ASC 606 logic: identify contract, obligations, transaction price, allocation, and recognition pattern.

Demo:

- Judgment tree.
- For a subscription contract, learner decides whether revenue is point-in-time or over-time.
- The right panel shows the effect of choosing immediate revenue versus deferred revenue.

### 4. Operational Record and Subledger Creation

Lesson question: Where does the detailed accounting live?

Content:

- AR subledger, AP subledger, inventory detail, fixed asset register, revenue schedule, payroll register, lease schedule.
- Subledgers preserve detail while the GL holds control totals.

Demo:

- Split workbench: document on the left, subledger record on the right.
- Customer invoice creates AR detail.
- Subscription contract creates a revenue schedule.
- Vendor receipt creates inventory/AP detail.

### 5. Journal Entry Creation

Lesson question: What accounts changed, and why?

Content:

- Journal entries are the translation layer into double-entry accounting.
- Balanced does not mean correct. Account choice, date, entity, period, source reference, and approval matter.

Demo:

- Journal grid that looks like an accounting system.
- Learner builds or reviews entries:
  - Dr Accounts Receivable / Cr Deferred Revenue
  - Dr Cash / Cr Accounts Receivable
  - Dr Deferred Revenue / Cr Subscription Revenue
  - Dr Inventory / Cr Accounts Payable
  - Dr COGS / Cr Inventory
- Live equation and statement-impact meter update as lines change.

### 6. Matching and Settlement

Lesson question: Has the thing been received, billed, paid, or collected?

Content:

- 3-way match: PO, receiving report, vendor invoice.
- Cash application: match customer payment to invoice.
- Bank reconciliation: bank activity versus book activity.

Demo:

- Matching table with document chips.
- Learner matches PO + receipt + invoice and resolves a price/quantity variance.
- Customer payment gets matched to AR invoice and clears aging.

### 7. General Ledger Posting

Lesson question: What is the official accounting record?

Content:

- Posting converts approved entries into GL account histories.
- GL is the official account-by-account memory of the company.

Demo:

- Ledger with account tabs and running balances.
- Learner clicks from a GL line back to JE support and forward to trial balance.

### 8. Cutoff and Completeness

Lesson question: Did we put transactions in the correct period?

Content:

- Late invoices, shipments near period-end, received-not-invoiced goods, unbilled revenue, cash after period-end.
- Cutoff is about period accuracy, not just existence.

Demo:

- Period-end detective board.
- Learner reviews documents dated around month-end and records or defers items.
- Incorrect cutoff visibly distorts January revenue, AP, inventory, or accrued expenses.

### 9. Adjusting Entries

Lesson question: What estimates and timing entries are needed before statements?

Content:

- Accruals, deferrals, depreciation, amortization, allowances, reserves, impairments, tax provision, lease expense.

Demo:

- Workpaper drawer.
- Each workpaper has support, calculation, proposed entry, reviewer note, and downstream effect.
- Learner can post or reject an adjustment.

### 10. Reconciliations

Lesson question: Does the GL agree to independent support?

Content:

- Bank reconciliation, AR aging tie-out, AP aging tie-out, inventory rollforward, fixed asset rollforward, debt statement tie-out, deferred revenue rollforward.

Demo:

- Reconciliation workspace.
- GL balance, support balance, reconciling items, preparer signoff, reviewer signoff.
- Exceptions must be cleared or carried forward with explanation.

### 11. Trial Balance and Close

Lesson question: Is the period ready to report?

Content:

- Unadjusted trial balance, adjusting entries, adjusted trial balance, close checklist, lock period, review analytics.
- Trial balance proves debit/credit equality but not accounting correctness.

Demo:

- Spreadsheet-like trial balance.
- Columns: account, prior month, unadjusted debit/credit, adjustments, adjusted balance, variance, mapping, review status.
- Highlights anomalies: negative cash, debit AP, revenue spike, stale accrual, unmapped account.

### 12. Consolidation

Lesson question: What does the group look like as one reporting entity?

Content:

- Entity trial balances, intercompany balances, eliminations, foreign currency translation, ownership, noncontrolling interest.
- This can be an advanced chapter after the core cycle.

Demo:

- Parent/subsidiary consolidation canvas.
- Entity TBs flow upward.
- Intercompany receivable/payable lines are matched and eliminated.
- FX translation creates CTA/AOCI impact.

### 13. Financial Statement Mapping

Lesson question: How do GL accounts become statement lines?

Content:

- Statement line items are mapped summaries of accounts, not new math.
- Mapping errors produce reporting errors even when the TB balances.

Demo:

- Mapping matrix.
- Left: GL accounts.
- Right: balance sheet, income statement, cash flow, equity statement, footnote tables.
- Learner maps accounts and watches statements update.

### 14. Financial Statements

Lesson question: How does the ledger become communication?

Content:

- The statements must feel like real public-company workpapers, not toy cards.
- Balance sheet, income statement, cash flow statement, and stockholders' equity statement all need comparative columns, subtotals, footnote references, and trace links.

Demo:

- Statement binder with tabs:
  - Balance sheet
  - Income statement
  - Statement of cash flows
  - Statement of stockholders' equity
  - Statement of comprehensive income, if relevant
- Each line has:
  - Current period
  - Prior period or budget
  - Variance
  - Source mapping
  - Footnote reference
  - Trace status
  - XBRL tag placeholder

### 15. Cash Flow Builder

Lesson question: Why does profit not equal cash?

Content:

- Indirect method: net income plus noncash items plus working capital changes, then investing and financing.
- Cash flow must reconcile beginning cash to ending cash.

Demo:

- Cash flow bridge from net income to operating cash flow.
- Working capital cards flip when AR, inventory, AP, deferred revenue, and accrued expenses change.
- Investing shows capex.
- Financing shows debt proceeds/payments and equity activity.
- Ending cash ties back to balance sheet cash.

### 16. Disclosures and Footnotes

Lesson question: What details must explain the statements?

Content:

- Accounting policies, revenue disaggregation, deferred revenue rollforward, AR allowance, inventory, PP&E, leases, debt, stock compensation, taxes, commitments, contingencies, subsequent events.
- Notes must tie to statements and often include tabular support.

Demo:

- Disclosure binder.
- Learner fills or reviews note tables.
- Tie-out badges show whether note totals match statement lines.

### 17. Stick and Tie

Lesson question: Does every repeated number agree everywhere?

Content:

- Cross-footing, rounding, tie-outs, version control, repeated number consistency, footnote agreement, MD&A agreement, statement-to-note references.

Demo:

- Tie-out game.
- One number is wrong in the footnote or MD&A table.
- Learner follows tick marks and fixes the broken tie.

### 18. Controls and Management Review

Lesson question: Can management stand behind the report?

Content:

- Close checklist, preparer/reviewer signoffs, approval workflow, disclosure controls, ICFR, management assessment, evidence retention.

Demo:

- Review workflow.
- Learner clears comments, signs off reconciliations, and sees unresolved control gaps block filing readiness.

### 19. Audit / Review

Lesson question: Can an auditor obtain enough evidence?

Content:

- Audit evidence includes supporting, corroborating, and contradictory evidence.
- Audit requests, samples, confirmations, reconciliations, memos, proposed adjustments, management representations.

Demo:

- Auditor request board.
- Learner receives PBC requests:
  - Support revenue sample.
  - Tie deferred revenue rollforward.
  - Explain inventory reserve.
  - Provide bank reconciliation.
  - Show approval for manual JE.
- Submitting weak support causes follow-up questions.

### 20. Filing Package

Lesson question: How does accounting become a regulatory filing?

Content:

- Mock 10-Q/10-K package: cover page, statements, notes, MD&A, controls, auditor report for annual, exhibits, certifications, Inline XBRL tags.
- SEC-style filing is a legal/reporting artifact, not just financial statements.

Demo:

- Filing builder.
- Learner assembles sections, reviews unresolved comments, validates XBRL tags, checks tie-outs, and gets a mock "ready to file" status.

### 21. Post-Filing Debrief

Lesson question: What improves the next close?

Content:

- Archive support, carry forward workpapers, update policies, improve controls, shorten close calendar, document lessons learned.

Demo:

- Close post-mortem board.
- Shows late tasks, recurring exceptions, audit pain points, and next-month improvements.

## First Deep Scenario: January Close

The first full implementation should use one coherent January close rather than unrelated demos.

Opening balance themes:

- Cash
- Accounts receivable, net of allowance
- Inventory
- Prepaid insurance
- Property and equipment, net
- Operating lease right-of-use asset
- Accounts payable
- Accrued expenses
- Deferred revenue
- Lease liabilities
- Term debt
- Common stock / APIC
- Retained earnings

January event queue:

1. Product sale on credit: bikes sold to Aster Labs, with COGS and inventory relief.
2. Annual fleet maintenance subscription: contract signed, invoice issued, cash collected, deferred revenue recorded, one month recognized.
3. Customer cash receipts: prior AR collected and applied.
4. Inventory procurement: PO, receiving report, vendor invoice, 3-way match, partial payment.
5. Received-not-invoiced inventory: accrual at cutoff.
6. Payroll: gross payroll, withholdings, employer taxes, department coding.
7. Prepaid insurance: annual invoice and one-month amortization.
8. Fixed asset purchase: capitalization, placed-in-service date, depreciation.
9. Operating lease: monthly lease expense and liability activity.
10. Debt: interest accrual and principal/current classification.
11. Allowance for credit losses: AR aging review and adjustment.
12. Sales return or credit memo: product revenue reversal and inventory/COGS impact.
13. Manual close entry: one intentionally suspicious entry for controller review.

This event set can produce nontrivial statements without becoming overwhelming.

## Required Statement Sophistication

The current one-line statement demos should be replaced by a statement binder.

### Balance Sheet

Should include:

- Comparative columns.
- Current assets:
  - Cash and cash equivalents
  - Accounts receivable, net
  - Inventory
  - Prepaid expenses and other current assets
- Noncurrent assets:
  - Property and equipment, net
  - Operating lease right-of-use assets
  - Deferred tax assets or other assets, if used
- Current liabilities:
  - Accounts payable
  - Accrued expenses
  - Deferred revenue, current
  - Current lease liability
  - Current debt
- Noncurrent liabilities:
  - Deferred revenue, noncurrent
  - Operating lease liability
  - Long-term debt
- Stockholders' equity:
  - Common stock / APIC
  - Retained earnings
  - Accumulated other comprehensive income, if consolidation/FX is active

Interactions:

- Click any line to see mapped accounts.
- Click any mapped account to see TB and GL.
- Toggle "show support" to reveal reconciliations.
- "Tie" status shows whether totals foot and cross-foot.

### Income Statement

Should include:

- Product revenue
- Service/subscription revenue
- Total net revenue
- Product cost of revenue
- Service cost of revenue
- Gross profit
- Operating expenses:
  - Research and development
  - Sales and marketing
  - General and administrative
- Operating income
- Interest expense
- Income before taxes
- Income tax expense
- Net income
- Optional EPS and shares, once equity is modeled.

Interactions:

- Gross margin chart by product/service.
- Revenue trace to contracts, invoices, and schedules.
- Expense trace to AP/payroll/fixed asset/debt subledgers.
- Variance analysis against prior month or budget.

### Statement of Cash Flows

Use indirect method for the main view.

Should include:

- Net income
- Noncash adjustments:
  - Depreciation and amortization
  - Stock-based compensation, later
  - Deferred taxes, later
- Working capital:
  - Accounts receivable
  - Inventory
  - Prepaids
  - Accounts payable
  - Accrued expenses
  - Deferred revenue
- Net cash from operating activities
- Investing:
  - Purchases of property and equipment
- Financing:
  - Debt proceeds/payments
  - Equity issuance or repurchases, later
- Net change in cash
- Beginning cash
- Ending cash, tied to balance sheet

Interactions:

- Cash bridge explaining each working-capital movement in plain language.
- Toggle from indirect to direct-style operational cash receipts/payments later.
- Click working-capital movements to see the balance sheet delta and related transactions.

### Statement of Stockholders' Equity

Should include:

- Beginning balance
- Stock issuance or option exercise, later
- Stock compensation, later
- Net income
- Dividends or repurchases, later
- Other comprehensive income, later
- Ending balance tied to balance sheet.

## Right-Side Demo Standards

Every demo should have:

- A specific artifact title, such as "AR Subledger", "Revenue Schedule", "Adjusted Trial Balance", "Disclosure Tie-Out".
- Watch and Do modes.
- A visible status: draft, prepared, reviewed, posted, reconciled, tied, ready.
- A trace affordance on material numbers.
- A realistic error state.
- A short explanation of downstream impact.
- A future editable data path, even if the first build uses seeded data.

Avoid:

- Generic cards that do not behave.
- One-line statements.
- Decorative visuals that do not teach.
- Buttons that do not change state.
- Demo panels that all look the same.

## Trace Model

Every material number should eventually have a lineage object.

Example:

Reported subscription revenue

- Filing fact: Revenue from contracts with customers
- Statement line: Service revenue
- Financial statement mapping: accounts 4100 and 4110
- Adjusted trial balance: January adjusted balance
- GL account: 4100 Subscription Revenue
- Journal entry: JE-REV-001
- Revenue schedule: RS-C-1001
- Contract: C-1001
- Invoice: INV-1001
- Cash receipt: PMT-1001
- Bank line: BNK-2026-01-08-04
- Policy: Revenue recognition memo
- Control: Revenue schedule review
- Disclosure: Deferred revenue rollforward and revenue policy note
- XBRL tag: future tag placeholder

Trace mode should support forward and backward movement.

## Future Editable Engine

The editable version should not hard-code statements. It should calculate them from state.

Minimum data objects:

- Company
- LegalEntity
- FiscalPeriod
- Account
- StatementMapping
- Customer
- Vendor
- Employee
- Product
- Contract
- PerformanceObligation
- SourceDocument
- BusinessEvent
- AccountingPolicy
- JournalEntry
- JournalLine
- SubledgerRecord
- RevenueSchedule
- InventoryLayer
- FixedAsset
- LeaseSchedule
- DebtSchedule
- Reconciliation
- Adjustment
- TrialBalanceLine
- FinancialStatementLine
- DisclosureFact
- XbrlTag
- Control
- ReviewComment
- AuditRequest
- FilingPackage

Rule:

User input creates or changes source objects. Journal entries, subledgers, trial balance, statements, disclosures, and filing facts are derived from those objects where possible.

## Implementation Phases

### Phase 1 - Content and Seeded Demos

- Replace six terse stages with the full section structure.
- Keep current split layout.
- Build the January close dataset as static structured state.
- Make every right-side demo real enough to change visibly in Watch/Do mode.
- Replace statement panels with the statement binder.

### Phase 2 - Trace Mode

- Add clickable trace links for statement lines.
- Build lineage drawers for revenue, deferred revenue, AR, inventory, cash, AP, payroll expense, depreciation, debt, and lease lines.
- Add disclosure tie-outs.

### Phase 3 - Editable Inputs

- Let learner edit invoice amount, contract term, sales mix, COGS, vendor invoice amount, payroll amount, or asset cost.
- Recalculate journals, schedules, TB, statements, and disclosures.
- Add validation and error ripple effects.

### Phase 4 - Controller and Audit Modes

- Add review comments, reconciliations, audit requests, and intentionally broken workpapers.
- Let learner clear exceptions and see filing readiness improve.

### Phase 5 - Public-Company Reporting

- Add mock 10-Q / 10-K package.
- Add MD&A mini tables.
- Add XBRL tag review with common tagging mistakes.
- Add ICFR/disclosure-control checklist and certification readiness.

## Immediate Build Target

Next implementation pass should focus on:

1. Expand the content model from 6 stages to the full accounting cycle groups.
2. Build a static January close dataset.
3. Replace the statement demo with a statement binder.
4. Replace generic right-side panels with artifact-specific demos:
   - Event queue
   - Evidence packet
   - Judgment tree
   - Journal grid
   - AR/AP/revenue/inventory subledger
   - 3-way match
   - GL
   - Reconciliation workspace
   - Adjusted trial balance
   - Statement binder
   - Disclosure binder
   - Filing builder
5. Keep the UI calmer than the prior iterations: fewer nested cards, clearer artifacts, and one strong action per demo.

## UI Backlog

The custom scrollbar issue is real but lower priority. Later polish:

- Use `scrollbar-width: thin` and themed `::-webkit-scrollbar` styling on lesson/process scroll containers.
- Avoid scrollbars appearing as high-contrast OS widgets over the editorial interface.
- Keep accessibility: visible scroll affordance is acceptable, but it should match the application theme.
