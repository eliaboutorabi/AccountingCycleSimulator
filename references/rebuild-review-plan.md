# Accounting Cycle Simulator Rebuild Review

Prepared 2026-07-04.

## Verdict

The current application has improved visually, but it is still not a real accounting cycle simulator. It is a single large Svelte route with a nicer shell, a lot of seeded text, and several shallow demos. The missing piece is not another styling pass. The missing piece is a product grammar: a source-of-truth scenario, artifact-specific demos, traceable accounting objects, glossary/concept access, and a navigation model where every click has a clear job.

The reset should preserve the best idea from the reference file:

Business event -> source document -> accounting judgment -> subledger -> journal entry -> general ledger -> trial balance -> adjustments -> close -> statements -> disclosures -> controls/audit -> 10-Q/10-K filing.

Every material number should be traceable forward and backward through that chain.

## Current Shortcomings

### 1. The interaction model is misleading

- The current Watch/Do switch is in the left lesson pane (`src/routes/+page.svelte`, around the `mode-switch` and prompts). It does not make the demo on the right behave differently in a meaningful way.
- The "Play step" button uses one generic `playStage()` function. It mostly flips flags, changes selected indexes, or advances one piece of text. That does not resemble accountant work.
- Most demos have no local controller: no step list, no back button, no reset, no "show answer", no validation loop, and no learner action history.
- Some hover states imply clickability, but the click either does nothing, only selects cosmetic state, or changes unrelated text.

### 2. The shell is still fighting the content

- The header and footer are too tall and visually heavy for an educational workstation. Icons do not need big containers when they are just navigation or theme controls.
- Section titles are too large for app content. They wrap constantly and make the left pane feel like a newsletter instead of a lesson surface.
- Collapsing the sidebar changes the chrome but does not properly reallocate reading space. The lesson column remains too constrained while the demo dominates.
- Parent sidebar groups do not behave cleanly. A group should open and close from the main row, and each group should have an overview page before its children.
- Active indicators are too noisy. Color and type weight are enough; side bars and shadows add visual clutter.

### 3. The content is broad but shallow

- There is now a long stage list, but the actual lessons are terse and the demos do not yet carry the weight of those stages.
- There is no proper welcome/home section explaining the promise, the fictional company, the learner's role, the "follow one number" idea, or the watch/do interaction model.
- Major accounting work is under-modeled: close dependencies, reconciliations, adjusted trial balance review, statement mapping, disclosures, audit requests, controls, and filing production need more realistic artifacts.
- The statement views are still too toy-like. A real educational app needs comparative statements, note references, statement mapping, tie-outs, XBRL placeholders, and trace drawers.

### 4. The code architecture is too monolithic

- `src/routes/+page.svelte` currently owns stages, accounting data, UI state, demo rendering, demo mutations, navigation, and styling.
- Inline arrays make the app hard to reason about and hard to extend.
- There is no typed accounting domain model yet. We need `JournalEntry`, `JournalLine`, `SourceDocument`, `SubledgerRecord`, `TrialBalanceLine`, `StatementLine`, `DisclosureFact`, `TraceNode`, and related objects.
- There is no canonical scenario model. Numbers are displayed in many places rather than derived from one source of numeric truth.
- There is no component boundary for demo frames, trace drawers, glossary popovers, statement binders, or watch/do controllers.

## Product Grammar

The rebuild should use a small set of reusable concepts everywhere.

### Scenario objects

- `Scenario`: the company story, fiscal period, current close status, and all seeded accounting objects.
- `Company`: legal entities, fiscal calendar, currencies, products, departments, customers, vendors, bank accounts, and policies.
- `BusinessEvent`: what happened operationally, with dates, parties, amounts, source documents, accounting status, and treatment.
- `SourceDocument`: contract, invoice, receipt, PO, receiving report, bank line, payroll file, legal letter, or support memo.
- `AccountingPolicy`: the rule or judgment lens applied to the event.
- `Artifact`: a rendered thing the accountant actually uses: invoice, subledger, journal grid, ledger, reconciliation, trial balance, statement, footnote, filing page.

### Accounting objects

- `JournalEntry` and `JournalLine`
- `SubledgerRecord`
- `RevenueSchedule`
- `InventoryLayer`
- `FixedAsset`
- `LeaseSchedule`
- `DebtSchedule`
- `Reconciliation`
- `Adjustment`
- `TrialBalanceLine`
- `StatementMapping`
- `FinancialStatementLine`
- `DisclosureFact`
- `XbrlTag`
- `Control`
- `ReviewComment`
- `AuditRequest`
- `FilingPackage`

### Learning objects

- `StageGroup`: top-level sidebar group, such as Setup, Capture, Record, Close, Report, File.
- `Stage`: the actual lesson/demo page.
- `StageOverview`: a real landing page for every parent group.
- `LessonBlock`: explanation, what to notice, example, common mistake, accountant question, downstream impact.
- `ConceptTerm`: glossary entry linked to stages, artifacts, accounts, and statement lines.

### Trace objects

Every material number should have a lineage:

`FilingFact -> StatementLine -> StatementMapping -> TrialBalanceLine -> GLPosting -> JournalLine -> SubledgerRecord -> SourceDocument -> BusinessEvent -> Policy -> Control -> AuditEvidence`

Trace should work both ways:

- From a final statement line back to source evidence.
- From an invoice or bank line forward to GL, statements, disclosures, and filing facts.

## Demo Grammar

The right pane owns Watch/Do. The left pane teaches.

### Watch mode

Watch mode should be a controlled replay:

- Timeline steps with Back, Next, Reset, and Auto-play.
- Each step applies a visible state change to the artifact.
- Each step has a short accountant narration: "We record AR, not revenue, because service is owed over time."
- The learner can inspect trace links at every step.

### Do mode

Do mode should be an accounting task:

- Sort event cards.
- Build an evidence packet.
- Choose a recognition treatment.
- Enter journal lines.
- Match PO/receipt/invoice.
- Clear a reconciliation exception.
- Map accounts to statement lines.
- Fill a disclosure table.
- Respond to an audit request.
- Validate an XBRL tag.

Every Do task needs:

- Instructions inside the demo header.
- Editable controls that visibly change the artifact.
- Validation with a specific reason, not just "wrong".
- Reset and show-answer controls.
- Downstream effect preview.

### No dead controls

Every clickable UI element must do exactly one of these things:

- Navigate.
- Expand/collapse.
- Select an artifact or row.
- Edit state.
- Reveal a trace.
- Reveal a concept/glossary entry.
- Validate an answer.

If it does none of those, it should not look clickable.

## Section-by-Section Rebuild Plan

### 0. Welcome and Orientation

Purpose: introduce Nimbus Bikes, the learner's role, and the rule of the app: every number has a trail.

Demo: a compact journey map. Click `$12,000` and preview its path from contract to deferred revenue, monthly revenue, statement line, disclosure, and filing fact.

### 1. Company Setup

Purpose: teach that accounting starts with structure before entries exist.

Demo: system blueprint with entities, chart of accounts, dimensions, policies, subledgers, controls, and statement mappings. Do mode lets the learner inspect or choose where an account reports.

### 2. Business Event Triage

Purpose: separate operational events from accounting events.

Demo: event queue with lanes: record now, record later, monitor, disclose, ignore. Do mode validates each lane with accounting reasoning.

### 3. Source Evidence Capture

Purpose: show what proves the event.

Demo: evidence packet builder for contract, invoice, bank line, receipt, PO, receiving report, or policy memo. Missing evidence should follow the transaction downstream as a control warning.

### 4. Accounting Interpretation

Purpose: teach recognition, measurement, classification, timing, and judgment.

Demo: revenue recognition decision tree for an annual maintenance subscription. Use the five-step ASC 606 logic as the scaffold, but present it in plain accountant language.

### 5. Subledger and Operational Records

Purpose: show where detail lives before it rolls into the GL.

Demo: AR subledger, revenue schedule, inventory detail, AP detail, fixed asset register, and payroll register views. Do mode creates or reviews one record.

### 6. Journal Entry Creation

Purpose: translate events into double-entry.

Demo: accounting-system journal grid with account picker, debit/credit columns, source reference, period, entity, and approval state. Do mode validates balance, account choice, period, and support.

### 7. Matching and Settlement

Purpose: show collection, payment, cash application, and 3-way match.

Demo: PO + receiving report + vendor invoice match board, plus customer cash application. Do mode clears quantity/price/date exceptions.

### 8. General Ledger Posting

Purpose: show the official account history.

Demo: ledger account tabs with running balances and source links. Click a GL line backward to JE support and forward to trial balance.

### 9. Cutoff and Completeness

Purpose: teach period accuracy.

Demo: month-end detective board with documents dated around January 31. Do mode decides record, defer, accrue, or monitor.

### 10. Adjusting Entries

Purpose: teach estimates and timing adjustments.

Demo: workpaper drawer for accruals, deferrals, depreciation, allowance, leases, interest, and taxes. Do mode posts or rejects entries with statement impact.

### 11. Reconciliations

Purpose: prove GL balances against support.

Demo: reconciliation workspace with GL balance, support balance, reconciling items, preparer signoff, reviewer signoff, and aging/rollforward support.

### 12. Trial Balance and Close

Purpose: show the close as a controlled process, not just a list of balances.

Demo: spreadsheet-like trial balance with unadjusted amounts, adjustments, adjusted balances, prior-period variance, mapping, review notes, and anomalies.

### 13. Consolidation

Purpose: introduce group reporting after the core cycle is clear.

Demo: parent/subsidiary map with entity TBs, intercompany elimination, FX translation, and consolidated balances.

### 14. Statement Mapping

Purpose: teach that statements are mapped summaries of accounts.

Demo: mapping matrix from GL accounts to balance sheet, income statement, cash flow, equity statement, and footnotes.

### 15. Statement Binder

Purpose: replace toy statements with a real reporting artifact.

Demo: binder tabs for balance sheet, income statement, cash flows, stockholders' equity, and comprehensive income if needed. Each line has current period, comparison period, variance, source mapping, footnote reference, trace status, and XBRL placeholder.

### 16. Cash Flow Builder

Purpose: explain why profit is not cash.

Demo: indirect cash flow bridge from net income through noncash items, working capital, investing, financing, and ending cash tied to the balance sheet.

### 17. Disclosures and Footnotes

Purpose: show how statements become explainable and compliant.

Demo: disclosure binder with accounting policies, revenue disaggregation, deferred revenue rollforward, AR allowance, inventory, PP&E, leases, debt, stock comp, taxes, commitments, contingencies, and subsequent events.

### 18. Stick and Tie

Purpose: teach cross-footing, repeated-number agreement, rounding, and version control.

Demo: tie-out game where one number is wrong in the statement, footnote, MD&A table, or XBRL fact.

### 19. Controls and Management Review

Purpose: show how management can stand behind the report.

Demo: close checklist, preparer/reviewer signoffs, review comments, disclosure committee status, ICFR evidence, and certification readiness.

### 20. Audit / Review

Purpose: show how outside auditors request and evaluate evidence.

Demo: PBC request board. Learner supports a revenue sample, deferred revenue rollforward, bank reconciliation, manual JE approval, and inventory reserve.

### 21. Filing Package

Purpose: show accounting becoming a regulatory filing.

Demo: mock 10-Q/10-K builder with cover page, statements, notes, MD&A, controls, auditor report for annual, exhibits, certifications, and Inline XBRL validation.

### 22. Post-Filing Debrief

Purpose: make the close improve over time.

Demo: post-mortem board with late tasks, recurring exceptions, audit pain points, and next-period improvements.

## Statement Sophistication Target

The statement section should look closer to a public-company reporting binder than a classroom card.

### Balance sheet

Required lines: cash, AR net, inventory, prepaids, PP&E net, right-of-use assets, AP, accrued expenses, deferred revenue current/noncurrent, lease liabilities, debt, common stock/APIC, retained earnings, and AOCI if consolidation is active.

Required interactions: line trace, mapped accounts, TB support, reconciliation support, note references, and tie status.

### Income statement

Required lines: product revenue, subscription/service revenue, total net revenue, product cost of revenue, service cost of revenue, gross profit, R&D, sales and marketing, G&A, operating income, interest expense, income before taxes, income tax expense, net income, and optional EPS later.

Required interactions: margin analysis, revenue trace to contracts/schedules, expense trace to AP/payroll/assets/debt, and variance against prior period or budget.

### Statement of cash flows

Use indirect method first. Required lines: net income, depreciation/amortization, stock compensation later, deferred taxes later, AR, inventory, prepaids, AP, accrued expenses, deferred revenue, operating cash flow, capex, debt activity, equity activity, net change in cash, beginning cash, ending cash.

### Statement of stockholders' equity

Required lines: beginning balance, stock issuance, stock compensation later, net income, dividends/repurchases later, OCI later, ending balance tied to the balance sheet.

## Reuse From accrev

The explorer reviewed `/Users/elliy/repos/accrev`. Reuse architecture and interaction ideas, not the full story world unless we intentionally merge scenarios.

High-value files:

- `/Users/elliy/repos/accrev/story/NUMBERS.md`: model for one canonical numeric truth.
- `/Users/elliy/repos/accrev/story/02-COVERAGE-MAP.md`: model for coverage QA.
- `/Users/elliy/repos/accrev/src/lib/data/glossary.ts`: glossary corpus.
- `/Users/elliy/repos/accrev/src/lib/data/lookup.ts`: unified glossary/lexicon lookup, stoplist, lemmatization.
- `/Users/elliy/repos/accrev/src/lib/components/UnifiedSearch.svelte`: search across learning content and terms.
- `/Users/elliy/repos/accrev/src/lib/learn/wire-word-lookup.ts`: inline term popovers.
- `/Users/elliy/repos/accrev/src/lib/story/widgets.ts`: lazy widget registry.
- `/Users/elliy/repos/accrev/src/lib/story/components/widgets/JournalChecker.svelte`: adaptable journal entry validator.
- `/Users/elliy/repos/accrev/src/lib/story/components/widgets/ThreeWayMatch.svelte`: adaptable matching mechanic.
- `/Users/elliy/repos/accrev/src/lib/story/components/widgets/SspAllocator.svelte`: adaptable revenue allocation mechanic.
- `/Users/elliy/repos/accrev/src/lib/story/components/widgets/AdjustingMatrix.svelte`: adaptable adjustment mechanic.
- `/Users/elliy/repos/accrev/src/lib/story/components/widgets/CashflowBridge.svelte`: adaptable cash flow bridge.
- `/Users/elliy/repos/accrev/src/lib/story/components/widgets/ClosingFlow.svelte`: adaptable close process mechanic.

Adaptation rules:

- Parameterize widgets with Nimbus scenario data.
- Replace mobile study patterns with a denser desktop workstation.
- Keep the glossary/search/lookup ideas.
- Keep the widget registry idea for demo mounting.
- Avoid copying hardcoded Summit figures into Nimbus unless the scenario is intentionally changed.

## Implementation Sequence

### Phase 0: Stop the obvious UX bleeding

- Remove the left-pane Watch/Do switch.
- Remove or disable the global "Play step" behavior.
- Add right-pane demo mode controls where the demos actually live.
- Make headings smaller and more stable.
- Thin the header and footer.
- Remove icon containers that do not earn their space.
- Make parent sidebar rows open/close from the full row.
- Remove active side bars/shadows; use color/type treatment.
- Ensure collapsed sidebar reallocates usable layout width.
- Add real group overview pages.

### Phase 1: Extract the domain model

Create typed modules under `src/lib/accounting`:

- `types.ts`
- `scenario.ts`
- `stages.ts`
- `trace.ts`
- `calculations.ts`
- `format.ts`

Move seeded data out of `+page.svelte`. Keep `+page.svelte` as route composition only.

Svelte implementation notes:

- Use `$state` only for local mutable UI state and demo answers.
- Use `$derived` for selected stage, calculated totals, validation results, and statement views.
- Prefer typed props and keyed each blocks.
- Use component boundaries instead of a single giant conditional block.
- Avoid `$effect` for state synchronization; use event handlers or derived values.

### Phase 2: Build the app shell

- `AppShell.svelte`: header, sidebar, main layout, footer.
- `Sidebar.svelte`: collapsible grouped navigation with overview pages.
- `LessonPane.svelte`: compact educational content with glossary terms.
- `DemoPane.svelte`: artifact header, Watch/Do selector, status, trace action.
- `TraceDrawer.svelte`: lineage viewer.
- `GlossaryDrawer.svelte` or `ConceptPopover.svelte`: term definitions.
- `SearchCommand.svelte`: later command palette/search.

### Phase 3: Build the demo framework

- `DemoFrame.svelte`
- `WatchTimeline.svelte`
- `PracticeTask.svelte`
- `ValidationMessage.svelte`
- `ArtifactHeader.svelte`
- `TraceButton.svelte`

Each demo receives:

- `scenario`
- `stage`
- `mode`
- `watchSteps`
- `practiceTask`
- `traceNodes`
- `onAction`

### Phase 4: Rebuild the first arc to final quality

Do not build 22 shallow demos at once. Build the first arc deeply:

1. Welcome
2. Company Setup
3. Event Triage
4. Evidence Capture
5. Accounting Interpretation
6. Subledger
7. Journal Entry

The first arc should prove the whole architecture: one `$12,000` subscription should travel from contract to deferred revenue, revenue schedule, journal entry, GL, trial balance, statement line, disclosure, and filing placeholder.

### Phase 5: Build close and reporting

- Matching and settlement
- General ledger
- Cutoff
- Adjustments
- Reconciliations
- Trial balance and close
- Statement mapping
- Statement binder
- Cash flow builder
- Disclosure binder

### Phase 6: Build controls, audit, and filing

- Stick and tie
- Management review
- PBC/audit request board
- Mock 10-Q/10-K filing builder
- Inline XBRL tag validation
- Post-filing debrief

### Phase 7: Editable engine

Once seeded demos are coherent, allow the learner to change source facts:

- Contract amount
- Contract term
- Invoice date
- Payment date
- Product sale amount
- COGS/inventory cost
- Vendor invoice amount
- Payroll amount
- Asset cost

Derived data should recalculate journals, subledgers, TB, statements, disclosures, and filing facts where possible.

## Acceptance Criteria

- The app starts with a clear welcome/orientation section.
- Every parent sidebar group has a real overview page.
- Watch/Do controls live on the right-side demo and change the right-side behavior.
- Every demo has Back, Next, Reset in Watch mode.
- Every Do mode has editable input, validation, reset, and show-answer.
- No UI element looks clickable unless it performs a clear action.
- Sidebar collapse changes the actual workspace allocation.
- The left lesson pane has compact, readable type.
- The statement binder has comparative columns, subtotals, note references, trace links, and XBRL placeholders.
- At least one number is fully traceable from final filing fact back to source documents.
- Glossary/concept lookup exists for accounting terms.
- The route no longer contains all data, rendering, state mutation, and styling in one file.
- `npm run check` and `npm run build` pass after each implementation phase.

## Research Baseline

Use the existing `references/content-demo-plan.md` as the main content baseline. Current external anchors:

- OpenStax accounting cycle overview: https://openstax.org/books/principles-financial-accounting/pages/3-3-define-and-describe-the-initial-steps-in-the-accounting-cycle
- OpenStax closing entries: https://openstax.org/books/principles-financial-accounting/pages/5-1-describe-and-prepare-closing-entries-for-a-business
- OpenStax post-closing trial balance: https://openstax.org/books/principles-financial-accounting/pages/5-2-prepare-a-post-closing-trial-balance
- FASB ASU 2014-09, Revenue from Contracts with Customers: https://storage.fasb.org/ASU%202014-09_Section%20A.pdf
- FASB Concepts Statement No. 8 elements: https://fasb.org/Page/document?pdf=Concepts_Statement_8-Chapter_4-Elements.pdf
- SEC Form 10-K instructions: https://www.sec.gov/files/form10-k.pdf
- SEC Inline XBRL guidance: https://www.sec.gov/data-research/structured-data/inline-xbrl
- SEC EDGAR Filer Manual: https://www.sec.gov/submit-filings/edgar-filer-manual
- PCAOB AS 1105 Audit Evidence: https://pcaobus.org/oversight/standards/auditing-standards/details/AS1105

