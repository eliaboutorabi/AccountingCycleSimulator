## The core idea: make every number traceable

The best educational tool would teach accounting as a **data transformation pipeline**:

**Business event → source document → accounting judgment → journal entry → subledger → general ledger → trial balance → adjustments → consolidation → financial statements → disclosures → 10-Q/10-K filing**

The magic educational principle should be:

> **Every number in the final financial statements should be clickable backward to the transactions, documents, judgments, controls, and accountant decisions that created it.**

So the learner should be able to click “Revenue: $1,240,000” in the income statement and travel backward through the mapped account balances, trial balance, general ledger postings, revenue subledger, contracts, invoices, shipping records, cash receipts, and the accounting policy that determined when revenue was recognized.

For a public U.S. company, the endpoint is not just “financial statements”; it is a full SEC reporting package. Domestic reporting companies file annual Form 10-K, quarterly Form 10-Q, and current Form 8-K for specified events; the 10-K provides a comprehensive business and financial overview and includes audited financial statements. ([Investor.gov][1]) Form 10-Q is used for the first three fiscal quarters, not the fourth quarter, and SEC instructions currently specify 40-day or 45-day filing deadlines depending on filer status. ([SEC][2]) Form 10-K deadlines are currently 60, 75, or 90 days after fiscal year-end depending on filer status. ([SEC][3]) Public-company filings also include structured tagging: the SEC describes Inline XBRL as a single human-readable and machine-readable document format, and domestic filers must file cover page and financial statement information, including footnotes and schedules, in Inline XBRL for Forms 10-Q and 10-K. ([SEC][4])

---

# 1. The timeline I would teach

I would not start with debits and credits. I would start with a **company story**.

For example: “You are the accounting team at a growing company called Nimbus Bikes. Nimbus sells bikes online, buys inventory from suppliers, pays employees, leases a warehouse, borrows money, grants stock options, has subsidiaries, and eventually files a 10-K.”

Then the learner sees how a normal business becomes accounting data.

| Stage                                         | Business question                                        | Data representation                                                                                                                         | Documents involved                                                                                           | Accountant’s job                                                                                                     | What the tool should show                                                                      |
| --------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **0. Company setup**                          | What kind of business is this?                           | Legal entities, chart of accounts, fiscal calendar, accounting policies, dimensions such as product, department, location, customer, vendor | Incorporation docs, accounting policy memos, tax registrations, bank setup, ERP configuration                | Design the accounting system: accounts, approval flows, controls, reporting dimensions                               | A map of the company: entities, departments, products, bank accounts, ledgers                  |
| **1. Business event happens**                 | Did something economically meaningful occur?             | Raw event: sale, purchase, shipment, receipt, payroll, loan, lease, equity issuance                                                         | Contract, PO, sales order, invoice, receipt, shipping doc, bank transaction, timecard                        | Decide whether the event creates an accounting record now or later                                                   | A “business event card” asking: record now, wait, disclose only, or ignore?                    |
| **2. Source document capture**                | What evidence proves the event?                          | Scanned document, email, PDF invoice, structured data from CRM/billing/procurement/payroll/bank feed                                        | Invoice, contract, receipt, bill of lading, purchase order, receiving report, bank statement                 | Verify completeness, accuracy, authorization, vendor/customer, dates, amounts                                        | Learner drags documents into an evidence packet                                                |
| **3. Accounting interpretation**              | What does this event mean under accounting rules?        | Accounting conclusion: recognition, measurement, classification, timing                                                                     | Policy memo, contract review, calculation schedule                                                           | Apply GAAP/IFRS policy, determine timing, estimate uncertain amounts, document judgment                              | A decision tree: asset or expense? revenue now or deferred? liability or commitment?           |
| **4. Journal entry creation**                 | What accounts change?                                    | Journal entry: date, debit lines, credit lines, entity, account, amount, currency, department, source reference                             | JE support, approval, system-generated posting, manual JE form                                               | Prepare or approve balanced debits and credits with support                                                          | Learner builds the JE; the accounting equation animates live                                   |
| **5. Subledger posting**                      | Where does detailed operational accounting live?         | AR subledger, AP subledger, inventory subledger, fixed asset register, payroll register, revenue schedule, lease schedule                   | Customer invoices, vendor bills, inventory receipts, asset invoices, employee payroll, contracts             | Maintain detailed records that support GL control accounts                                                           | A zoomable detail ledger: customer-by-customer, vendor-by-vendor, asset-by-asset               |
| **6. Matching and settlement**                | Has the thing been received, billed, paid, or collected? | Status changes: open, matched, approved, paid, collected, cleared                                                                           | PO, receiving report, vendor invoice, payment file, remittance, bank statement                               | Perform 2-way/3-way match, cash application, bank reconciliation, resolve exceptions                                 | A matching game: match PO + receipt + invoice; investigate mismatches                          |
| **7. General ledger posting**                 | What is the official accounting record?                  | GL transaction lines and account balances                                                                                                   | Posted journal entries from subledgers and manual JEs                                                        | Ensure postings are complete, accurate, approved, period-coded, and in the right accounts                            | The learner sees subledger detail roll up into GL accounts                                     |
| **8. Period cutoff**                          | Did we record things in the correct period?              | Cutoff schedules, unbilled revenue, goods received not invoiced, accrual lists                                                              | Shipping logs, receiving logs, invoices after period-end, bank activity after period-end                     | Catch missing liabilities, premature revenue, late invoices, wrong-period activity                                   | A “period-end detective” mode with documents dated around month-end                            |
| **9. Adjusting entries**                      | What estimates and timing adjustments are needed?        | Accruals, deferrals, depreciation, amortization, reserves, impairments, tax provisions                                                      | Workpapers, aging reports, fixed asset schedules, inventory counts, legal letters, tax schedules             | Estimate, calculate, document, review, and post adjusting entries                                                    | Learner sees before/after financial statement impact                                           |
| **10. Reconciliations**                       | Do balances agree to support?                            | Account reconciliations, rollforwards, aging reports, bank recs                                                                             | Bank statements, AR/AP aging, inventory count, debt statements, lease schedules                              | Prove each balance with independent support; investigate reconciling items                                           | A reconciliation workspace: GL balance vs support, with exceptions to clear                    |
| **11. Unadjusted and adjusted trial balance** | What are all account balances before reporting?          | Trial balance: account, debit balance, credit balance, adjusted balance                                                                     | GL balances, posted adjustments                                                                              | Review reasonableness, find unusual balances, compare to prior periods and budgets                                   | A trial balance that highlights anomalies: negative cash, debit AP, unusual margins            |
| **12. Close process**                         | Is the period ready to lock?                             | Close checklist, task owners, signoffs, review notes, control evidence                                                                      | Recs, JE approvals, variance analyses, subledger close reports                                               | Coordinate the calendar, close subledgers, review entries, lock periods                                              | A close calendar simulation with dependencies and bottlenecks                                  |
| **13. Consolidation**                         | What does the group look like as one company?            | Entity trial balances, ownership structure, intercompany eliminations, FX translation, consolidation entries                                | Subsidiary TBs, intercompany invoices, loan agreements, equity schedules, FX rates                           | Combine entities, eliminate intercompany activity, translate foreign subsidiaries, calculate noncontrolling interest | A parent/subsidiary map where balances flow upward and eliminations disappear in consolidation |
| **14. Financial statement mapping**           | How do account balances become statements?               | Mapping table from GL accounts to financial statement line items                                                                            | Chart of accounts, reporting taxonomy, statement templates                                                   | Classify balances into balance sheet, income statement, cash flow statement, equity statement                        | Learner maps accounts to statements and sees statements update                                 |
| **15. Cash flow statement**                   | What happened to cash?                                   | Direct or indirect cash flow model, working capital changes, noncash add-backs                                                              | Balance sheets, income statement, debt schedules, fixed asset rollforwards                                   | Reconcile net income to cash, classify operating/investing/financing activity                                        | A cash flow builder: “Why does profit not equal cash?”                                         |
| **16. Footnotes and disclosures**             | What details must explain the statements?                | Disclosure tables, narrative notes, accounting policies, commitments, contingencies                                                         | Debt agreements, lease schedules, revenue disaggregation, stock comp schedules, tax provision, legal letters | Prepare required disclosures and make them tie to the statements                                                     | Disclosure drafting with linked numbers and missing-disclosure warnings                        |
| **17. Stick and tie**                         | Does every number agree everywhere?                      | Tie-out binder, tick marks, cross-references, versioned support                                                                             | Financial statements, footnotes, MD&A tables, board deck, press release, XBRL tags                           | Cross-foot, tie totals, agree repeated numbers, check rounding, prove every number                                   | A “find the broken tie” game where one number disagrees across documents                       |
| **18. Management review and controls**        | Can management certify the results?                      | Review comments, certifications, control signoffs, disclosure committee minutes                                                             | SOX controls, review notes, CFO/CEO certifications, audit committee materials                                | Support management’s responsibility for the financial statements and disclosure controls                             | Review workflow with preparer/reviewer roles and evidence trails                               |
| **19. Audit or review**                       | Can outside auditors rely on the numbers?                | PBC list, audit evidence, samples, confirmations, proposed adjustments                                                                      | Audit requests, confirmations, invoices, contracts, reconciliations, memos                                   | Provide evidence, answer questions, evaluate proposed adjustments                                                    | Auditor mode: learner receives audit requests and must support balances                        |
| **20. 10-Q / 10-K production**                | How does accounting become a filing?                     | SEC report: HTML/iXBRL document, financial statements, notes, MD&A, risk factors, controls, exhibits, certifications                        | Financial statements, footnotes, legal disclosure, auditor report for 10-K, XBRL tags                        | Coordinate accounting, legal, FP&A, tax, treasury, investor relations, auditors, and executives                      | A filing-builder that assembles statements, notes, MD&A, certifications, and XBRL tags         |
| **21. Filing and post-mortem**                | What happens after filing?                               | Filed report, EDGAR acceptance, investor materials, close improvement list                                                                  | EDGAR submission, earnings release, board materials, analyst questions                                       | Archive support, answer questions, improve next close, carry forward templates                                       | A “post-filing debrief”: what broke, what was late, what to improve                            |

---

# 2. The most important teaching distinction: business event vs. accounting event

This is where many learners get confused.

A **purchase order** is a business commitment, but often not yet an accounting entry.
A **sales order** may show customer intent, but it is usually not revenue yet.
A **shipment**, **service delivery**, **invoice**, or **cash receipt** may create accounting consequences depending on the facts.

So the tool should constantly ask:

> “Is this just an operational event, or is it an accounting event?”

Example:

| Event                     | Accounting result                                                       |
| ------------------------- | ----------------------------------------------------------------------- |
| Customer asks for a quote | Usually no journal entry                                                |
| Customer signs contract   | Maybe no entry yet, but creates disclosure/revenue-analysis relevance   |
| Company ships product     | Often revenue and cost of goods sold may be recognized                  |
| Company invoices customer | AR may be recorded; revenue may or may not already have been recognized |
| Customer pays             | Cash increases, AR decreases                                            |
| Vendor sends quote        | Usually no journal entry                                                |
| Company issues PO         | Usually no journal entry                                                |
| Goods are received        | Inventory or expense and liability may be recorded                      |
| Vendor invoice arrives    | AP is recorded or matched to prior receipt                              |
| Vendor is paid            | AP decreases, cash decreases                                            |

This should be one of the most fun parts of the tool: learners should sort events into **record now**, **record later**, **disclose**, **monitor**, or **ignore**.

---

# 3. The representations: what the data “looks like” at each layer

A powerful way to teach accounting is to show that each layer has a different shape.

## Layer 1: Real-world evidence

This is messy human material:

Contracts, invoices, purchase orders, emails, PDFs, receipts, bank statements, payroll files, shipping records, legal letters, board minutes.

The accountant’s job is to ask:

> “What happened, when did it happen, who approved it, what evidence supports it, and what is the economic substance?”

## Layer 2: Operational records

This is system data:

Sales orders, customer invoices, vendor bills, inventory receipts, payroll runs, fixed asset records, subscription schedules, lease schedules.

The accountant’s job is to make sure operational systems produce complete, accurate, period-correct accounting data.

## Layer 3: Accounting entries

This is double-entry bookkeeping:

```text
Dr Accounts Receivable       12,000
    Cr Deferred Revenue              12,000
```

or

```text
Dr Deferred Revenue           1,000
    Cr Revenue                        1,000
```

The accountant’s job is to translate business reality into balanced debits and credits.

## Layer 4: Subledgers

This is detailed accounting by object:

Customer A owes $12,000.
Invoice INV-1042 is open.
Asset FA-009 cost $50,000 and has accumulated depreciation of $8,333.
Contract C-201 has $9,000 of remaining deferred revenue.

The accountant’s job is to reconcile these detailed records to the GL.

## Layer 5: General ledger

This is the official record by account:

Cash
Accounts Receivable
Inventory
Prepaids
Fixed Assets
Accounts Payable
Accrued Expenses
Debt
Revenue
Cost of Goods Sold
Payroll Expense

The accountant’s job is to maintain clean account balances, approve postings, and investigate abnormalities.

## Layer 6: Trial balance

This is a compact list of account balances at a point in time:

```text
Account                  Debit        Credit
Cash                    80,000
Accounts Receivable     42,000
Inventory               90,000
Accounts Payable                     35,000
Deferred Revenue                     24,000
Revenue                             300,000
COGS                    120,000
Payroll Expense          75,000
```

The accountant’s job is to review, adjust, and prepare the TB for reporting.

## Layer 7: Financial statements

This is accounting turned into communication:

Balance sheet
Income statement
Statement of cash flows
Statement of stockholders’ equity
Notes to the financial statements

The accountant’s job becomes presentation, classification, disclosure, and explanation.

## Layer 8: 10-Q / 10-K filing

This is financial reporting plus legal disclosure plus structured data.

A 10-K or 10-Q is not just the statements. It includes the cover page, business and risk disclosures, MD&A, financial statements, notes, controls, legal proceedings, exhibits, certifications, and XBRL tagging. In an audit of public-company financial statements, PCAOB standards describe management as responsible for the financial statements, while the auditor’s responsibility is to express an opinion based on the audit; the auditor evaluates evidence, estimates, accounting principles, and overall presentation. ([Default][5])

---

# 4. A concrete example the tool should simulate

Use one transaction and let the learner watch it travel all the way through the system.

## Example: annual SaaS subscription paid upfront

Customer signs a 12-month software contract for **$12,000** and pays upfront.

### Business event

Customer signs contract and is invoiced.

Documents:

```text
Contract: 12 months, $12,000
Invoice: INV-1001, due immediately
Payment terms: due on receipt
Service period: Jan 1–Dec 31
```

Accounting question:

> Is the full $12,000 revenue today?

Probably not. Under the revenue recognition model, the company identifies the contract, performance obligations, transaction price, allocates price to obligations, and recognizes revenue when or as performance obligations are satisfied. ([FASB][6])

### Invoice entry

```text
Dr Accounts Receivable       12,000
    Cr Deferred Revenue              12,000
```

Representation:

AR subledger now shows Customer A owes $12,000.
Revenue subledger shows a contract liability of $12,000.

### Cash collection

```text
Dr Cash                      12,000
    Cr Accounts Receivable           12,000
```

Representation:

Bank balance increases.
Customer invoice status changes from open to paid.
AR aging no longer includes this invoice.

### Monthly revenue recognition

Each month:

```text
Dr Deferred Revenue           1,000
    Cr Subscription Revenue           1,000
```

Representation:

Revenue schedule decreases deferred revenue over time.
Income statement gets $1,000 of revenue each month.
Balance sheet deferred revenue decreases.

### Trial balance impact after one month

```text
Cash                         12,000 debit
Deferred Revenue             11,000 credit
Subscription Revenue          1,000 credit
```

### Financial statement impact

Balance sheet:

```text
Cash                         +12,000
Deferred Revenue             +11,000 liability
Retained Earnings             +1,000 through income
```

Income statement:

```text
Revenue                       +1,000
```

Cash flow statement:

```text
Cash received from customers  +12,000 operating cash flow
```

### 10-K / 10-Q impact

This one contract may affect:

Revenue
Deferred revenue
Cash from operations
Revenue recognition footnote
Remaining performance obligations disclosure, depending on materiality and reporting requirements
MD&A discussion if subscription revenue growth is important
XBRL tags for revenue, contract liabilities, and related disclosures

The learner should be able to click the final reported revenue number and trace it back to:

```text
10-K revenue line
→ financial statement line item
→ mapped GL accounts
→ trial balance
→ revenue GL account
→ monthly revenue journal entries
→ revenue schedule
→ contract
→ invoice
→ cash receipt
→ accounting policy
```

That traceability is the educational gold.

---

# 5. The accountant’s job changes across the cycle

A great tool should show that accounting is not one job. The accountant plays different roles at different stages.

| Role                          | Where it appears               | What the accountant does                                                 |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| **Interpreter**               | Before the journal entry       | Understands the business event and accounting rule                       |
| **Recorder**                  | Journal entry stage            | Converts the event into debits and credits                               |
| **Operator**                  | Subledgers and matching        | Runs AP, AR, payroll, inventory, billing, fixed assets                   |
| **Controller**                | Close and reconciliations      | Ensures completeness, accuracy, cutoff, authorization                    |
| **Investigator**              | Exceptions and reconciliations | Finds missing invoices, duplicate payments, unmatched cash, odd balances |
| **Estimator**                 | Adjustments                    | Calculates reserves, depreciation, accruals, impairments, tax provisions |
| **Consolidator**              | Group reporting                | Combines entities, eliminates intercompany balances, handles FX          |
| **Storyteller**               | Financial statements and MD&A  | Explains what happened in the business                                   |
| **Compliance owner**          | 10-Q / 10-K                    | Makes sure the report is complete, tied, controlled, signed, and filed   |
| **Audit partner to auditors** | Audit/review stage             | Provides evidence and supports management’s judgments                    |

This is important pedagogically because beginners often think accounting is “entering numbers.” Your tool should reveal that real accounting is **evidence + judgment + systems + controls + communication**.

---

# 6. How I would design the educational interface

Your left/right idea is excellent. I would make it a split-screen learning environment.

## Left side: teaching

The left panel should explain:

1. **What just happened in the business**
2. **Why it matters for accounting**
3. **What documents are relevant**
4. **What accounting rule or principle applies**
5. **What representation the data takes at this stage**
6. **What the accountant must decide**
7. **What could go wrong**
8. **How this affects the financial statements**

## Right side: doing

The right panel should let the learner:

Enter an invoice
Approve or reject a document
Perform a 3-way match
Choose the correct accounting treatment
Build the journal entry
Post to a subledger
Reconcile to the GL
Prepare an adjusting entry
Map accounts to financial statements
Tie out disclosures
Investigate audit requests
Generate a mini 10-Q or 10-K

The right side should not just be a form. It should feel like a living accounting system.

---

# 7. The tool should have “modes”

## Mode 1: Watch mode

The learner watches a transaction move through the system.

Best for beginners.

Example:

> “Watch what happens when Nimbus Bikes receives a vendor invoice.”

The system animates:

```text
Vendor invoice
→ AP subledger
→ journal entry
→ GL
→ trial balance
→ balance sheet liability
→ cash flow impact when paid
```

## Mode 2: Guided mode

The learner makes choices with hints.

Example:

> “The company received inventory before the vendor invoice arrived. What should be recorded at month-end?”

The learner chooses:

```text
A. No entry
B. Dr Inventory / Cr Accrued Liabilities
C. Dr Expense / Cr Cash
D. Dr AP / Cr Inventory
```

Then the tool explains the consequences.

## Mode 3: Simulation mode

The learner runs the close.

They receive a queue:

```text
12 vendor invoices
8 customer payments
3 unmatched bank transactions
1 payroll file
1 fixed asset purchase
1 lease contract
1 intercompany invoice
1 late legal letter
1 inventory count variance
```

They must close the month.

## Mode 4: Controller mode

The learner reviews someone else’s work.

They see errors:

Duplicate invoice
Revenue recognized too early
AP accrual missed
Cash receipt posted to wrong customer
Depreciation not run
Intercompany not eliminated
Balance sheet account not reconciled
Footnote amount not tied to the statement

This is where accounting becomes fun: it becomes a detective game.

## Mode 5: SEC reporting mode

The learner starts with a clean adjusted/consolidated trial balance and produces:

Financial statements
Footnotes
MD&A tables
Controls section
Certification checklist
Inline XBRL tag review
Mock 10-Q or 10-K filing package

---

# 8. The “fun” layer: make accounting physical and visual

Accounting becomes understandable when learners can see motion.

I would use visual metaphors:

## The accounting conveyor belt

A document enters on the left.
It becomes structured data.
It becomes a journal entry.
It flows into subledgers.
It rolls into the GL.
It aggregates into the trial balance.
It maps into statements.
It becomes a disclosure fact.
It is tagged in XBRL.
It appears in the filing.

## The financial statement impact meter

Every action should show:

```text
Assets:      +12,000
Liabilities: +11,000
Equity:       +1,000
Revenue:      +1,000
Cash:        +12,000
```

This makes debits and credits less abstract.

## The audit trail map

Every final number has a lineage graph:

```text
Reported revenue
→ Revenue account 4000
→ Journal entries JE-104, JE-105, JE-106
→ Revenue schedule RS-22
→ Contract C-901
→ Invoice INV-1001
→ Customer payment PMT-778
→ Bank statement line
```

## The error ripple effect

When a learner makes a mistake, the tool should show the downstream damage.

Example:

They expense a fixed asset instead of capitalizing it.

The tool shows:

```text
Current-year expense too high
Net income too low
Assets too low
Depreciation missing
Cash flow classification may be wrong
Fixed asset footnote wrong
EBITDA unaffected or affected depending on presentation
Tax differences may arise
```

This is how accounting becomes real.

---

# 9. Transaction families the tool must include

To be end-to-end, do not only teach simple invoices. You need transaction families.

## Revenue cycle

Quote
Contract
Sales order
Shipment or service delivery
Invoice
Cash receipt
Deferred revenue
Returns, credits, discounts
Bad debt allowance
Revenue recognition
Revenue disclosures

## Procure-to-pay cycle

Purchase requisition
Purchase order
Receiving report
Vendor invoice
3-way match
AP posting
Payment
Accrual for received-not-invoiced goods
Prepaids
Expense classification

## Inventory cycle

Purchase inventory
Receive inventory
Move inventory
Sell inventory
Record COGS
Inventory count
Shrinkage
Lower of cost or net realizable value adjustment
Inventory reserve

## Payroll cycle

Employee master data
Time entry
Gross pay
Taxes and withholdings
Benefits
Payroll accrual
Cash payment
Payroll expense by department

## Fixed assets

Asset purchase
Capitalization decision
Placed-in-service date
Depreciation
Disposal
Impairment
Fixed asset rollforward
Capex disclosure

## Debt and interest

Loan agreement
Debt proceeds
Interest accrual
Principal repayment
Covenants
Debt issuance costs
Current/noncurrent classification
Debt footnote

## Leases

Lease contract
Lease classification
Right-of-use asset
Lease liability
Monthly lease expense
Remeasurement
Lease disclosure

## Equity and stock compensation

Stock issuance
Option grant
Vesting
Stock compensation expense
Exercise
Tax effects
EPS impact
Equity statement

## Taxes

Book income
Permanent differences
Temporary differences
Current tax payable
Deferred tax assets/liabilities
Valuation allowance
Tax footnote

## Intercompany and consolidation

Intercompany sale
Intercompany loan
Intercompany profit in inventory
Eliminations
Foreign currency translation
Noncontrolling interest
Consolidated statements

## Reporting and disclosure

Financial statement mapping
Footnotes
MD&A
Risk factors
Controls
Subsequent events
Audit report
XBRL tagging
Filing

---

# 10. The minimum data model behind the tool

To make this work, the tool needs a coherent accounting engine underneath. At minimum, each object should know where it came from and where it goes.

Core objects:

```text
Company
LegalEntity
FiscalPeriod
ChartOfAccounts
Account
Dimension
Customer
Vendor
Employee
Contract
SourceDocument
BusinessEvent
AccountingPolicy
JournalEntry
JournalLine
SubledgerRecord
GeneralLedgerPosting
TrialBalance
Adjustment
Reconciliation
Workpaper
ConsolidationEntry
FinancialStatementLine
DisclosureFact
XBRLTag
Control
ReviewComment
AuditRequest
FilingPackage
```

The most important design principle:

> A `DisclosureFact` in the 10-K should be traceable to financial statement lines, which are traceable to trial balance accounts, which are traceable to journal entries, which are traceable to source documents.

That is what makes the system educational instead of merely instructional.

---

# 11. A suggested learning progression

## Level 1: The accounting equation

Assets = Liabilities + Equity
What changes when cash is received?
What changes when debt is borrowed?
What changes when inventory is sold?

## Level 2: Simple journal entries

Cash sale
Credit sale
Vendor bill
Bill payment
Payroll
Loan
Asset purchase

## Level 3: Subledgers

AR aging
AP aging
Inventory detail
Fixed asset register
Revenue schedule

## Level 4: Month-end close

Accruals
Deferrals
Depreciation
Bank rec
Account recs
Trial balance
Adjusted trial balance

## Level 5: Financial statements

Balance sheet
Income statement
Cash flow statement
Equity statement
Basic footnotes

## Level 6: Judgment

Revenue recognition
Capitalization vs expense
Allowance for doubtful accounts
Inventory reserve
Impairment
Lease accounting
Tax estimates

## Level 7: Consolidation

Multiple entities
Intercompany
FX
Eliminations
Noncontrolling interest

## Level 8: Public-company reporting

10-Q
10-K
MD&A
Footnotes
Controls
Audit/review
XBRL
Filing deadlines
Disclosure committee

---

# 12. What would make it “super educational”

The tool should not merely say “debit this, credit that.” It should teach five kinds of understanding.

## 1. Economic understanding

What actually happened in the business?

## 2. Accounting understanding

When and how should it be recognized?

## 3. Systems understanding

Where does the data live?

## 4. Control understanding

How do we know it is complete and accurate?

## 5. Reporting understanding

How does this become something investors, lenders, managers, and regulators read?

That fifth layer is what most accounting education misses. Students learn journal entries but do not see how the journal entry becomes a filing.

---

# 13. What would make it fun

I would build it like a game with missions.

Example missions:

**Mission 1: Close the Coffee Shop**
Record daily sales, vendor bills, payroll, bank rec, depreciation.

**Mission 2: Save the Month-End Close**
Find why the trial balance looks wrong.

**Mission 3: The Missing Liability**
A shipment arrived before month-end, but the invoice came later. Catch the accrual.

**Mission 4: Revenue Detective**
A sales manager wants to book a big deal early. Decide what can be recognized.

**Mission 5: Intercompany Chaos**
Parent and subsidiary recorded different amounts. Reconcile and eliminate.

**Mission 6: Build the 10-Q**
Take an adjusted trial balance and produce statements, footnotes, MD&A tables, and tie-outs.

**Mission 7: Audit Week**
Auditors request evidence. Provide samples, reconciliations, contracts, and explanations.

**Mission 8: Final Filing**
Fix broken ties, review XBRL tags, clear comments, and file the mock 10-K.

The learner should earn badges like:

Accrual Master
Bank Rec Detective
Revenue Recognition Specialist
Consolidation Controller
Tie-Out Champion
SEC Reporting Lead

---

# 14. The single best feature: “trace mode”

The killer feature should be **trace mode**.

In trace mode, the learner clicks any final number:

```text
Accounts receivable: $420,000
```

Then the tool opens the lineage:

```text
Balance sheet line
→ financial statement mapping
→ trial balance account 1200
→ AR control account in GL
→ AR subledger aging
→ customer invoices
→ sales orders
→ contracts
→ shipping records
→ cash receipts after period-end
→ allowance calculation
→ disclosure table
```

Then the tool asks:

> “Which of these invoices might be uncollectible?”
> “Which should be reserved?”
> “Which cash receipts after year-end support collectability?”
> “Does the AR footnote tie to the balance sheet?”

This is how accounting becomes palpable.

---

# 15. My recommended MVP

Do not start with every accounting topic. Start with one beautiful, complete end-to-end company.

## MVP company

A simple product-and-subscription business:

It sells physical products and annual service plans.

That lets you teach:

Revenue
Deferred revenue
Inventory
COGS
AR
AP
Cash
Payroll
Fixed assets
Accruals
Prepaids
Depreciation
Trial balance
Financial statements
Basic footnotes
Mock 10-Q

## MVP modules

1. Create company and chart of accounts
2. Enter customer contract and invoice
3. Enter vendor invoice and perform 3-way match
4. Receive cash and pay vendor
5. Post journal entries
6. View subledgers and GL
7. Close month with adjustments
8. Reconcile accounts
9. Produce adjusted trial balance
10. Generate financial statements
11. Prepare footnotes
12. Stick and tie
13. Generate mock 10-Q

Once that works, add consolidation, audit, XBRL, and full 10-K.

---

# 16. The philosophical design principle

Accounting should be taught as:

> **A system for turning messy business reality into reliable, explainable, auditable, decision-useful information.**

Your tool should let the learner feel that transformation.

Not just:

```text
Debit AR
Credit Revenue
```

But:

```text
A customer signed a contract.
We evaluated the promise.
We billed the customer.
We collected cash.
We recognized revenue over time.
We reconciled the subledger.
We closed the period.
We mapped the account.
We disclosed the policy.
We tied the footnote.
We tagged the filing.
We gave investors a reliable number.
```

That end-to-end perspective is exactly what would make the tool special.

[1]: https://www.investor.gov/introduction-investing/investing-basics/glossary/form-10-k "Form 10-K | Investor.gov"
[2]: https://www.sec.gov/files/form10-q.pdf "Form 10-Q"
[3]: https://www.sec.gov/files/form10-k.pdf "Form 10-K"
[4]: https://www.sec.gov/data-research/structured-data/inline-xbrl "SEC.gov | Inline XBRL"
[5]: https://pcaobus.org/oversight/standards/auditing-standards/details/AS3101 "
	AS 3101: The Auditor's Report on an Audit of Financial Statements When the Auditor Expresses an Unqualified Opinion | PCAOB
"
[6]: https://storage.fasb.org/ASU%202014-09_Section%20A.pdf "ASU 6x9 Final Template"
