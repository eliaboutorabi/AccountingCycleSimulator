<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { asset } from '$app/paths';
	import {
		accountTypeCards,
		accountingEquationExamples,
		cashAccrualComparisons,
		primerTerms
	} from '$lib/accounting-cycle/concepts';
	import { nimbusScenario } from '$lib/accounting-cycle/nimbus';
	import type { CycleArcId } from '$lib/accounting-cycle/model';
	import AlertTriangle from '@lucide/svelte/icons/alert-triangle';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import Banknote from '@lucide/svelte/icons/banknote';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import BriefcaseBusiness from '@lucide/svelte/icons/briefcase-business';
	import Building2 from '@lucide/svelte/icons/building-2';
	import Calculator from '@lucide/svelte/icons/calculator';
	import CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
	import ChevronRight from '@lucide/svelte/icons/chevron-right';
	import ClipboardCheck from '@lucide/svelte/icons/clipboard-check';
	import Database from '@lucide/svelte/icons/database';
	import Eye from '@lucide/svelte/icons/eye';
	import FileCheck2 from '@lucide/svelte/icons/file-check-2';
	import FileText from '@lucide/svelte/icons/file-text';
	import Gavel from '@lucide/svelte/icons/gavel';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Globe from '@lucide/svelte/icons/globe';
	import Hand from '@lucide/svelte/icons/hand';
	import Landmark from '@lucide/svelte/icons/landmark';
	import Layers3 from '@lucide/svelte/icons/layers-3';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import Moon from '@lucide/svelte/icons/moon';
	import Network from '@lucide/svelte/icons/network';
	import PackageCheck from '@lucide/svelte/icons/package-check';
	import PanelLeft from '@lucide/svelte/icons/panel-left';
	import PanelLeftClose from '@lucide/svelte/icons/panel-left-close';
	import ReceiptText from '@lucide/svelte/icons/receipt-text';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import ScrollText from '@lucide/svelte/icons/scroll-text';
	import SearchCheck from '@lucide/svelte/icons/search-check';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Sun from '@lucide/svelte/icons/sun';
	import Table2 from '@lucide/svelte/icons/table-2';
	import Tags from '@lucide/svelte/icons/tags';
	import Workflow from '@lucide/svelte/icons/workflow';

	type Mode = 'watch' | 'do';
	type Theme = 'day' | 'night';
	type StageId =
		| 'home'
		| 'accounting-equation'
		| 'account-types'
		| 'cash-vs-accrual'
		| 'foundation-overview'
		| 'record-overview'
		| 'close-overview'
		| 'report-overview'
		| 'assure-overview'
		| 'setup'
		| 'events'
		| 'evidence'
		| 'judgment'
		| 'subledger'
		| 'journal'
		| 'matching'
		| 'ledger'
		| 'cutoff'
		| 'adjustments'
		| 'reconciliations'
		| 'trial'
		| 'consolidation'
		| 'mapping'
		| 'statements'
		| 'cash-flow'
		| 'disclosures'
		| 'tie-out'
		| 'controls'
		| 'audit'
		| 'filing'
		| 'debrief';
	type StatementTab = 'balance' | 'income' | 'cash' | 'equity';
	type SubledgerTab = 'ar' | 'revenue' | 'inventory' | 'ap';
	type DisclosureTab = 'revenue' | 'deferred' | 'ppe' | 'debt';
	type IconComponent = typeof ReceiptText;
	type EventLane = 'Record now' | 'Recognize over time' | 'Monitor' | 'Disclose / monitor';

	type Stage = {
		id: StageId;
		number: string;
		label: string;
		group: string;
		icon: IconComponent;
		workspace: string;
		title: string;
		question: string;
		lesson: string;
		notice: string[];
		example: string;
		mistake: string;
		keyPoint: string;
		watchPrompt: string;
		doPrompt: string;
	};

	type TocItem = {
		id: string;
		label: string;
		icon: IconComponent;
		stageIndex?: number;
		children?: TocItem[];
	};

	type DemoStep = {
		label: string;
		detail: string;
	};

	type StatementLine = {
		label: string;
		current: number;
		prior: number;
		note?: string;
		total?: boolean;
		trace?: string;
	};

	type StatementSection = {
		title: string;
		rows: StatementLine[];
	};

	const stages: Stage[] = [
		{
			id: 'home',
			number: '00',
			label: 'Start here',
			group: 'Orientation',
			icon: Workflow,
			workspace: 'Cycle map',
			title: 'Follow one number through the close',
			question: 'How does one business event become a reported, tied, and filed number?',
			lesson:
				'You are joining the accounting team at Nimbus Bikes for a January close. The simulator follows business evidence through judgment, records, ledgers, close workpapers, statements, disclosures, controls, audit requests, and a mock filing.',
			notice: [
				'The left pane teaches the accounting question and what can go wrong.',
				'The right pane shows or lets you perform the accounting work in the artifact that accountants actually use.',
				'The same number should remain traceable from source evidence to final reporting.'
			],
			example:
				'The annual maintenance invoice starts as a contract and invoice, becomes deferred revenue, releases one month to revenue, appears in statements and disclosures, then receives an Inline XBRL-style tag.',
			mistake:
				'Jumping straight to debits and credits without asking what happened, what proves it, and what policy governs it.',
			keyPoint: 'The promise of the app is traceability: every material number has a trail.',
			watchPrompt: 'Watch the $12,000 subscription move from source document to filing fact.',
			doPrompt:
				'Choose a point in the cycle and inspect what evidence or accounting object supports it.'
		},
		{
			id: 'accounting-equation',
			number: '01',
			label: 'Accounting equation',
			group: 'Basics',
			icon: Calculator,
			workspace: 'Resources and claims',
			title: 'Learn the rule underneath every record',
			question: 'What does Assets = Liabilities + Equity actually mean?',
			lesson:
				'The accounting equation is not a formula to memorize and then forget. It is the quiet rule that keeps the business story connected: everything Nimbus has must be funded by either outsiders or owners.',
			notice: [
				'Assets answer: what does the company have or control?',
				'Liabilities answer: what does the company owe or still need to perform?',
				'Equity answers: what claim belongs to owners after liabilities?'
			],
			example:
				'If Nimbus bills Aster Labs $12,000 before service is delivered, assets rise through accounts receivable and liabilities rise through deferred revenue. The company has a claim on the customer, but the customer still has a claim on future service.',
			mistake:
				'Treating the equation as proof that the accounting is correct. Balanced records can still use the wrong account, wrong date, or wrong policy.',
			keyPoint: 'Accounting starts by keeping resources and claims connected.',
			watchPrompt: 'Watch common Nimbus events change resources and claims.',
			doPrompt: 'Pick an event and explain which side of the equation changed.'
		},
		{
			id: 'account-types',
			number: '02',
			label: 'Five account types',
			group: 'Basics',
			icon: Table2,
			workspace: 'Account family map',
			title: 'Name the family before writing the entry',
			question: 'Is the account an asset, liability, equity, revenue, or expense?',
			lesson:
				'Debits and credits make much more sense once the learner knows what kind of account is being changed. Every account belongs to one of five families, and each family has a normal home in the statements.',
			notice: [
				'Assets, liabilities, and equity live on the balance sheet.',
				'Revenue and expenses live on the income statement during the period.',
				'Temporary accounts eventually close into retained earnings; balance sheet accounts carry forward.'
			],
			example:
				'Cash is an asset, deferred revenue is a liability, common stock is equity, service revenue is revenue, and depreciation is an expense.',
			mistake:
				'Assuming a word like cash, bill, sale, or payment tells you the account type automatically. The accounting meaning depends on what changed.',
			keyPoint: 'Account classification gives debits and credits their meaning.',
			watchPrompt: 'Watch Nimbus accounts sort into their five families.',
			doPrompt: 'Choose an account family and explain where it appears in the statements.'
		},
		{
			id: 'cash-vs-accrual',
			number: '03',
			label: 'Cash vs accrual',
			group: 'Basics',
			icon: Banknote,
			workspace: 'Timing lens',
			title: 'Separate cash movement from earning',
			question: 'Why does receiving cash not always mean revenue was earned?',
			lesson:
				'Cash accounting follows money. Accrual accounting follows economic activity: revenue when earned, expenses when incurred, assets while value remains, and liabilities while obligations remain.',
			notice: [
				'Cash can arrive before, during, or after revenue is earned.',
				'Expenses can be paid before, during, or after the benefit is used.',
				'The close exists because timing is rarely as neat as the bank statement.'
			],
			example:
				'Aster Labs pays $12,000 upfront, but Nimbus earns the service revenue month by month. January gets $1,000 of revenue; the remaining $11,000 stays deferred.',
			mistake:
				'Letting the bank feed decide the income statement. Cash is evidence, but it is not the whole accounting conclusion.',
			keyPoint: 'Accrual accounting tells the truth about timing.',
			watchPrompt: 'Watch the same events through cash-basis and accrual-basis lenses.',
			doPrompt: 'Choose whether the event is cash timing, accrual timing, or both.'
		},
		{
			id: 'foundation-overview',
			number: '01',
			label: 'Foundation overview',
			group: 'Foundation',
			icon: Building2,
			workspace: 'Foundation roadmap',
			title: 'Set up the accounting trail',
			question: 'What must be true before accounting can record anything responsibly?',
			lesson:
				'The foundation arc defines the company, decides whether business activity matters for accounting, captures source evidence, and documents the accounting judgment. It is the part of the cycle that prevents careless journal entries.',
			notice: [
				'Company structure determines what accounts, dimensions, policies, and approvals exist.',
				'Event triage decides whether accounting acts now, later, or only monitors.',
				'Evidence and judgment become the support reviewers and auditors will need later.'
			],
			example:
				'Nimbus cannot record the subscription cleanly until the contract, invoice, service period, cash receipt, and revenue policy are connected.',
			mistake:
				'Treating source documents as bookkeeping clutter instead of the evidence base for every downstream number.',
			keyPoint: 'Foundation work makes later accounting explainable.',
			watchPrompt: 'Watch setup, event triage, evidence, and judgment prepare one transaction.',
			doPrompt: 'Pick which foundational artifact is missing before the transaction can proceed.'
		},
		{
			id: 'record-overview',
			number: '02',
			label: 'Record overview',
			group: 'Record',
			icon: FileText,
			workspace: 'Recording roadmap',
			title: 'Turn evidence into books',
			question: 'How does supported business activity become accounting records?',
			lesson:
				'The record arc creates detailed subledger records, journal entries, matching evidence, cash application, and official general ledger postings. This is where business reality becomes the book of record.',
			notice: [
				'Subledgers preserve detail by customer, vendor, inventory item, asset, contract, and schedule.',
				'Journal entries translate facts into debits and credits, but support and classification still matter.',
				'Matching and settlement prove that recorded balances connect to operations and cash.'
			],
			example:
				'The same subscription creates AR, deferred revenue, a revenue schedule, cash application, and GL activity.',
			mistake:
				'Thinking a balanced journal entry is enough when support, period, and account choice are wrong.',
			keyPoint: 'Recording is a controlled translation, not a typing exercise.',
			watchPrompt: 'Watch the transaction move through subledger, journal, matching, and GL.',
			doPrompt: 'Choose the accounting record that should be created next.'
		},
		{
			id: 'close-overview',
			number: '03',
			label: 'Close overview',
			group: 'Close',
			icon: Table2,
			workspace: 'Close roadmap',
			title: 'Make the period ready to report',
			question: 'How does the accounting team prove January is complete, accurate, and reviewed?',
			lesson:
				'The close arc tests cutoff, posts supported adjustments, reconciles accounts, reviews the adjusted trial balance, and consolidates entities. It turns raw books into report-ready balances.',
			notice: [
				'Cutoff protects period boundaries.',
				'Adjustments capture estimates and timing that operational feeds do not finish alone.',
				'Reconciliations and trial balance review prove balances before reporting.'
			],
			example:
				'Nimbus accrues received-not-invoiced inventory, releases one month of revenue, posts depreciation, reconciles the subledgers, and reviews the adjusted TB.',
			mistake: 'Calling the close done because debits equal credits.',
			keyPoint: 'Close work proves the period, not just the math.',
			watchPrompt:
				'Watch cutoff, adjustments, reconciliations, trial balance, and consolidation prepare reporting.',
			doPrompt: 'Identify the open close blocker before statements can be prepared.'
		},
		{
			id: 'report-overview',
			number: '04',
			label: 'Report overview',
			group: 'Report',
			icon: Landmark,
			workspace: 'Reporting roadmap',
			title: 'Turn balances into communication',
			question: 'How do adjusted balances become statements, cash flow, and disclosures?',
			lesson:
				'The reporting arc maps accounts to statement lines, prepares comparative statements, explains cash movement, and drafts footnotes that tie back to support.',
			notice: [
				'Statement mapping is a control, not an afterthought.',
				'Financial statements need comparative columns, subtotals, note references, and traceability.',
				'Footnotes explain policies, rollforwards, concentrations, and details that statement lines summarize.'
			],
			example:
				'Deferred revenue appears as a liability on the balance sheet, a rollforward in the notes, and an explanation in the revenue policy disclosure.',
			mistake:
				'Preparing attractive statement tables that cannot be traced back to the ledger and notes.',
			keyPoint: 'Reporting is structured communication backed by accounting evidence.',
			watchPrompt: 'Watch statement mapping, the binder, cash flow, and disclosures tie together.',
			doPrompt: 'Select the reporting artifact that proves a statement line.'
		},
		{
			id: 'assure-overview',
			number: '05',
			label: 'Assure and file overview',
			group: 'Assure and file',
			icon: ShieldCheck,
			workspace: 'Assurance roadmap',
			title: 'Certify, audit, file, and improve',
			question: 'How does a reporting package become credible enough to file?',
			lesson:
				'The assurance arc ties repeated numbers, clears management review, answers audit requests, assembles the mock filing, and turns close pain points into next-period improvements.',
			notice: [
				'Repeated numbers must agree across statements, notes, MD&A tables, and structured data.',
				'Controls and review evidence support management certification.',
				'Audit requests test whether the accounting trail is persuasive under pressure.'
			],
			example:
				'Nimbus cannot mark the mock 10-Q ready while a revenue tie-out, manual journal approval, or XBRL tag review remains unresolved.',
			mistake:
				'Treating filing as a final export instead of the final page of a controlled reporting process.',
			keyPoint: 'Assurance is traceability tested from several angles.',
			watchPrompt:
				'Watch tie-out, controls, audit requests, filing assembly, and debrief move toward readiness.',
			doPrompt: 'Clear the blocker that keeps the filing package from being ready.'
		},
		{
			id: 'setup',
			number: '00',
			label: 'Company setup',
			group: 'Foundation',
			icon: Building2,
			workspace: 'System blueprint',
			title: 'Design the accounting system',
			question: 'What structure must exist before transactions can become reliable data?',
			lesson:
				'Accounting starts with architecture. Nimbus Bikes needs entities, a fiscal calendar, accounts, reporting dimensions, subledgers, policies, bank accounts, and approval controls before a single journal entry can be trusted.',
			notice: [
				'The chart of accounts is a data map, not just a list of labels.',
				'Departments, products, customers, and vendors become dimensions for analysis.',
				'Policies tell the system when an event becomes an accounting record.'
			],
			example:
				'Nimbus separates product revenue from subscription revenue, keeps inventory in a subledger, and maps each account to a statement line before January close begins.',
			mistake:
				'Starting with journal entries before defining the accounts, policies, dimensions, and approval rules that make those entries meaningful.',
			keyPoint: 'A clean close is designed before the first transaction arrives.',
			watchPrompt: 'Watch the system blueprint connect ledgers, subledgers, policies, and reports.',
			doPrompt: 'Inspect the chart of accounts and choose which accounts feed each statement line.'
		},
		{
			id: 'events',
			number: '01',
			label: 'Event triage',
			group: 'Foundation',
			icon: BriefcaseBusiness,
			workspace: 'Business event queue',
			title: 'Sort business events',
			question: 'Is this operational activity, an accounting event, or a disclosure matter?',
			lesson:
				'Not every business event creates a journal entry immediately. A quote is usually operational. A shipment, invoice, receipt, payroll run, or period-end estimate can create accounting consequences.',
			notice: [
				'Ask whether something economically meaningful happened.',
				'Separate record-now events from record-later commitments.',
				'Keep monitored and disclosure-only events visible for close review.'
			],
			example:
				'A signed annual service contract may not be revenue today, but it matters for evidence, billing, deferred revenue, and disclosure.',
			mistake:
				'Treating every operational document as a journal entry, or ignoring commitments that should be tracked for disclosure and cutoff.',
			keyPoint: 'The first judgment is whether accounting should act now, later, or only monitor.',
			watchPrompt:
				'Watch January activity land in record-now, record-later, monitor, and disclose lanes.',
			doPrompt: 'Choose the correct lane for the selected business event.'
		},
		{
			id: 'evidence',
			number: '02',
			label: 'Evidence packet',
			group: 'Foundation',
			icon: ReceiptText,
			workspace: 'Source document capture',
			title: 'Build the evidence packet',
			question: 'What proves the event, the date, the amount, and the accounting conclusion?',
			lesson:
				'Source documents are messy human evidence. The accountant turns contracts, invoices, receipts, bank lines, receiving reports, and policy memos into a packet that later reviewers can inspect.',
			notice: [
				'Completeness matters as much as accuracy.',
				'Billing date and service period often answer different questions.',
				'Every extracted field should retain a source reference.'
			],
			example:
				'Contract C-1001, invoice INV-1001, cash receipt PMT-1001, bank line BNK-018, and the revenue policy memo support the subscription transaction.',
			mistake:
				'Capturing an amount without preserving the contract, service period, and cash evidence.',
			keyPoint: 'Evidence is the trailhead for every reportable number.',
			watchPrompt: 'Watch the source documents become structured accounting fields.',
			doPrompt: 'Review the packet and mark whether it is complete enough to proceed.'
		},
		{
			id: 'judgment',
			number: '03',
			label: 'Judgment',
			group: 'Foundation',
			icon: Gavel,
			workspace: 'Policy decision tree',
			title: 'Apply accounting judgment',
			question: 'What does the event mean under the accounting policy?',
			lesson:
				'Accounting judgment converts evidence into recognition, measurement, classification, and timing. For revenue, Nimbus identifies the customer contract, performance obligations, transaction price, allocation, and recognition pattern.',
			notice: [
				'Point-in-time and over-time recognition create different statement patterns.',
				'Deferred revenue is a liability for service not yet delivered.',
				'Judgment must be documented, not hidden inside a journal entry.'
			],
			example:
				'The fleet maintenance service is delivered evenly across twelve months, so only one month of the annual contract becomes January revenue.',
			mistake: 'Calling the full invoice amount revenue just because the customer paid upfront.',
			keyPoint: 'The policy decision controls the downstream journal entries.',
			watchPrompt: 'Watch the ASC 606-style decision tree reach a deferred revenue conclusion.',
			doPrompt: 'Pick the treatment that best matches the subscription service obligation.'
		},
		{
			id: 'subledger',
			number: '04',
			label: 'Subledgers',
			group: 'Record',
			icon: Layers3,
			workspace: 'Operational accounting records',
			title: 'Create detailed records',
			question: 'Where does the transaction detail live before it rolls into the GL?',
			lesson:
				'Subledgers hold the detail that the general ledger summarizes: customer invoices, vendor bills, inventory layers, revenue schedules, fixed assets, payroll registers, leases, and debt schedules.',
			notice: [
				'AR and AP subledgers support GL control accounts.',
				'Revenue schedules explain the timing of earned and deferred revenue.',
				'Inventory layers preserve quantities and costs for COGS and reserves.'
			],
			example:
				'Invoice INV-1001 appears in AR, while contract C-1001 creates a revenue schedule with eleven months still deferred after January.',
			mistake: 'Trying to explain a GL balance without the subledger detail that created it.',
			keyPoint: 'The subledger is where accounting detail stays inspectable.',
			watchPrompt:
				'Watch AR, revenue schedule, inventory, and AP detail update from January events.',
			doPrompt: 'Switch subledgers and inspect the record that supports the GL control balance.'
		},
		{
			id: 'journal',
			number: '05',
			label: 'Journal entries',
			group: 'Record',
			icon: FileText,
			workspace: 'Journal entry grid',
			title: 'Translate events into debits and credits',
			question: 'What accounts change, in what period, and with what support?',
			lesson:
				'Journal entries are the translation layer. A balanced entry can still be wrong if it uses the wrong account, date, entity, period, or support reference.',
			notice: [
				'Each line needs an account, entity, amount, direction, and source reference.',
				'System-generated entries and manual close entries need different controls.',
				'The explanation should make the accounting story reviewable.'
			],
			example:
				'The subscription invoice debits AR and credits deferred revenue. The monthly release debits deferred revenue and credits subscription revenue.',
			mistake:
				'Crediting revenue immediately for the full annual invoice because the journal balances.',
			keyPoint: 'Debits and credits are syntax; account choice is meaning.',
			watchPrompt: 'Watch January events become supported journal entries.',
			doPrompt: 'Approve the revenue credit account and confirm the entry is classified correctly.'
		},
		{
			id: 'matching',
			number: '06',
			label: 'Match and settle',
			group: 'Record',
			icon: PackageCheck,
			workspace: '3-way match and cash application',
			title: 'Match documents and settle balances',
			question: 'Has the company received, billed, paid, or collected the right thing?',
			lesson:
				'Matching connects operational documents to accounting records. Purchases use PO, receiving report, and vendor invoice. Collections use invoice, remittance, bank line, and customer account.',
			notice: [
				'Price and quantity differences become exceptions, not silent adjustments.',
				'Cash application clears the correct customer invoice.',
				'Bank reconciliation proves book cash against independent bank activity.'
			],
			example:
				'PO-2207, RR-2207, and BILL-883 match within tolerance; customer payment PMT-1001 clears INV-1001.',
			mistake: 'Paying a vendor invoice before confirming the goods were received.',
			keyPoint: 'Settlement is where accounting meets cash and operations.',
			watchPrompt: 'Watch purchase and cash documents match into clean accounting status.',
			doPrompt: 'Resolve the vendor match exception and apply the customer cash receipt.'
		},
		{
			id: 'ledger',
			number: '07',
			label: 'General ledger',
			group: 'Record',
			icon: Database,
			workspace: 'General ledger',
			title: 'Post to the official record',
			question: 'What is the account-by-account memory of the company?',
			lesson:
				'Posting moves approved journal lines into the general ledger. The GL is not a separate calculation; it is the official history of posted activity by account.',
			notice: [
				'Every GL line should point back to a source journal entry.',
				'Running balances reveal how transactions accumulate.',
				'The trial balance is created from these account balances.'
			],
			example:
				'Cash, AR, inventory, deferred revenue, AP, and revenue each show the January activity that will roll into the adjusted trial balance.',
			mistake: 'Viewing the GL as a summary that can be edited without preserving posting detail.',
			keyPoint: 'The GL is where approved accounting becomes official.',
			watchPrompt: 'Watch posted entries build running balances by account.',
			doPrompt: 'Choose an account and trace one GL line back to its source JE.'
		},
		{
			id: 'cutoff',
			number: '08',
			label: 'Cutoff',
			group: 'Close',
			icon: SearchCheck,
			workspace: 'Period-end detective board',
			title: 'Test cutoff and completeness',
			question: 'Are events recorded in the correct period?',
			lesson:
				'Cutoff work catches transactions near period-end that belong in January but arrived late, or transactions recorded in January that belong later. It protects revenue, inventory, AP, accruals, and cash.',
			notice: [
				'Look at activity before and after period-end.',
				'Received-not-invoiced goods may create accruals.',
				'Late cash receipts can support AR collectability without changing January revenue.'
			],
			example:
				'Inventory arrived January 30 but the invoice arrived February 2, so Nimbus records a received-not-invoiced accrual.',
			mistake: 'Waiting for the vendor invoice and missing the January liability.',
			keyPoint: 'Cutoff makes the period boundary honest.',
			watchPrompt: 'Watch documents around January 31 become record, defer, or monitor decisions.',
			doPrompt: 'Decide whether the selected near-close document belongs in January.'
		},
		{
			id: 'adjustments',
			number: '09',
			label: 'Adjustments',
			group: 'Close',
			icon: Calculator,
			workspace: 'Close workpapers',
			title: 'Post adjusting entries',
			question: 'What estimates and timing entries are needed before statements?',
			lesson:
				'Adjusting entries capture accounting that operational feeds do not finish alone: accruals, deferrals, depreciation, allowances, tax, lease expense, and other estimates.',
			notice: [
				'Each adjustment needs a calculation and support.',
				'The before/after statement impact should be visible.',
				'Review notes explain assumptions and unusual movement.'
			],
			example:
				'Nimbus posts depreciation, prepaid amortization, RNI accrual, allowance adjustment, interest accrual, lease expense, and January revenue release.',
			mistake: 'Posting a round-number accrual with no support or reversal plan.',
			keyPoint: 'Adjustments turn operational records into accrual-basis reporting.',
			watchPrompt: 'Watch workpapers propose adjusting entries and statement impacts.',
			doPrompt: 'Approve the supported adjustments and flag the suspicious manual entry.'
		},
		{
			id: 'reconciliations',
			number: '10',
			label: 'Reconciliations',
			group: 'Close',
			icon: ClipboardCheck,
			workspace: 'Account reconciliation workspace',
			title: 'Prove balances to support',
			question: 'Do GL balances agree to independent or detailed support?',
			lesson:
				'Reconciliations prove that each balance is complete, accurate, and explainable. A GL number alone is not enough; it needs support, reconciling items, signoffs, and review.',
			notice: [
				'Bank rec ties cash to bank statement activity.',
				'AR/AP aging ties subledger detail to GL control accounts.',
				'Rollforwards explain inventory, fixed assets, deferred revenue, leases, and debt.'
			],
			example:
				'Deferred revenue ties to the revenue schedule rollforward, while AR ties to customer aging net of allowance.',
			mistake: 'Calling an account reconciled because the preparer recognized the number.',
			keyPoint: 'A reconciled account is proven, not merely familiar.',
			watchPrompt:
				'Watch GL balances tie to aging reports, schedules, statements, and rollforwards.',
			doPrompt: 'Clear the reconciling item or carry it forward with an explanation.'
		},
		{
			id: 'trial',
			number: '11',
			label: 'Trial balance',
			group: 'Close',
			icon: Table2,
			workspace: 'Adjusted trial balance',
			title: 'Review the close spreadsheet',
			question: 'Are the accounts balanced and ready for reporting?',
			lesson:
				'The trial balance proves debits equal credits, then becomes the review surface for classification, mapping, cutoff, support, unusual balances, and statement readiness.',
			notice: [
				'Balanced does not mean correct.',
				'Mapping status matters before statement generation.',
				'Variance analytics reveal unusual movements and stale estimates.'
			],
			example:
				'The January adjusted trial balance totals $10.645 million of debits and credits and maps every active account to a statement line.',
			mistake:
				'Stopping the close when debits equal credits even though balances are unmapped or unsupported.',
			keyPoint: 'The adjusted TB is the bridge from accounting records to reports.',
			watchPrompt: 'Watch unadjusted balances, adjustments, and mapped adjusted balances tie out.',
			doPrompt: 'Inspect highlighted accounts and confirm mapping before reporting.'
		},
		{
			id: 'consolidation',
			number: '12',
			label: 'Consolidation',
			group: 'Close',
			icon: Network,
			workspace: 'Group reporting canvas',
			title: 'Combine entities',
			question: 'What does the group look like as one reporting entity?',
			lesson:
				'Consolidation combines entity trial balances, eliminates intercompany activity, translates foreign subsidiaries, and prepares group-level reporting.',
			notice: [
				'Intercompany receivables and payables must eliminate.',
				'Foreign subsidiary results may create translation effects.',
				'The parent view should not report internal sales as external revenue.'
			],
			example:
				'Nimbus Canada sells service parts to the U.S. parent; the intercompany sale and payable eliminate in consolidation.',
			mistake: 'Adding entity trial balances together without eliminating internal activity.',
			keyPoint: 'Consolidation is a reporting lens, not just addition.',
			watchPrompt: 'Watch entity trial balances flow upward and intercompany balances disappear.',
			doPrompt: 'Review the elimination entry and confirm the consolidated balance remains tied.'
		},
		{
			id: 'mapping',
			number: '13',
			label: 'Statement mapping',
			group: 'Report',
			icon: Workflow,
			workspace: 'Reporting map',
			title: 'Map accounts to statements',
			question: 'How do GL accounts become statement lines?',
			lesson:
				'Financial statement lines are mapped summaries of accounts. Mapping errors create reporting errors even when the trial balance is perfectly balanced.',
			notice: [
				'Each active account needs a statement destination.',
				'Notes and cash flow classifications are also mappings.',
				'Mapping should be reviewed when new accounts are created.'
			],
			example:
				'Deferred revenue maps to current and noncurrent contract liability lines, while subscription revenue maps to service revenue and the revenue note.',
			mistake: 'Leaving a new close account unmapped and wondering why the statements do not tie.',
			keyPoint: 'Mapping is the reporting system translating ledger detail into communication.',
			watchPrompt: 'Watch accounts flow into statement, footnote, and cash flow destinations.',
			doPrompt: 'Inspect the mapping matrix and find the account that feeds each reported line.'
		},
		{
			id: 'statements',
			number: '14',
			label: 'Statements',
			group: 'Report',
			icon: Landmark,
			workspace: 'Financial statement binder',
			title: 'Prepare financial statements',
			question: 'How does the ledger become decision-useful communication?',
			lesson:
				'Financial statements are curated views of the ledger. A real reporting package needs comparative columns, subtotals, footnote references, traceability, and tie status across statements.',
			notice: [
				'The balance sheet must balance assets against liabilities and equity.',
				'The income statement explains performance and margin.',
				'The cash flow statement explains why profit and cash are different.'
			],
			example:
				'January service revenue, deferred revenue, AR, cash, inventory, AP, and PPE all appear differently across the statement binder.',
			mistake: 'Showing a one-line revenue summary and calling it financial reporting.',
			keyPoint: 'Statements are communication backed by ledger math and support.',
			watchPrompt:
				'Watch the statement binder switch between balance sheet, income, cash flow, and equity.',
			doPrompt: 'Click statement tabs and inspect how each number traces to support.'
		},
		{
			id: 'cash-flow',
			number: '15',
			label: 'Cash flow',
			group: 'Report',
			icon: Banknote,
			workspace: 'Cash flow bridge',
			title: 'Explain cash movement',
			question: 'Why does profit not equal cash?',
			lesson:
				'The cash flow statement reconciles net income to cash movement. Noncash charges, working capital, investing activity, and financing activity explain the change from beginning to ending cash.',
			notice: [
				'Indirect operating cash flow starts with net income.',
				'Working capital movements reverse accrual timing differences.',
				'Ending cash must tie back to the balance sheet.'
			],
			example:
				'January net income is positive, but inventory purchases and capex absorb cash while deferred revenue and AP provide operating cash support.',
			mistake: 'Assuming revenue growth means cash grew by the same amount.',
			keyPoint: 'Cash flow is the explanation of timing, not a duplicate income statement.',
			watchPrompt: 'Watch net income bridge through working capital, investing, and financing.',
			doPrompt: 'Select a bridge item and inspect the transaction movement behind it.'
		},
		{
			id: 'disclosures',
			number: '16',
			label: 'Disclosures',
			group: 'Report',
			icon: BookOpen,
			workspace: 'Footnote binder',
			title: 'Prepare disclosures',
			question: 'What details must explain the statements?',
			lesson:
				'Footnotes explain accounting policies, disaggregated revenue, deferred revenue, receivables, inventory, property and equipment, leases, debt, commitments, contingencies, and subsequent events.',
			notice: [
				'Disclosures must tie to statement lines and schedules.',
				'Tables need support just like statement amounts.',
				'Policies explain the judgment behind the numbers.'
			],
			example:
				'The revenue note disaggregates product and service revenue, while the deferred revenue rollforward ties to the balance sheet liability.',
			mistake: 'Writing narrative footnotes that do not tie to the statement numbers.',
			keyPoint: 'Disclosures are part of the accounting record, not decoration.',
			watchPrompt: 'Watch note tables tie to statement lines and supporting schedules.',
			doPrompt: 'Switch notes and verify whether the disclosure table ties.'
		},
		{
			id: 'tie-out',
			number: '17',
			label: 'Stick and tie',
			group: 'Assure',
			icon: Tags,
			workspace: 'Tie-out binder',
			title: 'Tie every repeated number',
			question: 'Does every number agree everywhere it appears?',
			lesson:
				'Stick-and-tie work checks cross-footing, repeated amounts, statement-to-note references, MD&A tables, rounding, and version control.',
			notice: [
				'Footnote totals should agree to statements.',
				'MD&A tables should agree to the financial statements or explain differences.',
				'Rounding can create real tie-out questions.'
			],
			example:
				'Service revenue appears in the income statement, revenue footnote, MD&A table, and XBRL fact list. All must agree.',
			mistake: 'Fixing a number in one table but not updating the note, tag, and MD&A copy.',
			keyPoint: 'A filing is only credible when the repeated numbers agree.',
			watchPrompt: 'Watch tie marks trace repeated values across the reporting package.',
			doPrompt: 'Find and clear the broken tie before filing readiness turns green.'
		},
		{
			id: 'controls',
			number: '18',
			label: 'Controls',
			group: 'Assure',
			icon: ShieldCheck,
			workspace: 'Management review',
			title: 'Support management review',
			question: 'Can management stand behind the report?',
			lesson:
				'Public-company reporting requires controls, review evidence, signoffs, disclosure procedures, and management responsibility for reliable external financial reporting.',
			notice: [
				'Close tasks need preparer and reviewer evidence.',
				'Disclosure controls cover more than the financial statement tables.',
				'Material weaknesses block an effective ICFR conclusion.'
			],
			example:
				'The CFO cannot certify the mock 10-Q until revenue, cash, deferred revenue, and manual journal controls are reviewed.',
			mistake:
				'Treating management review as a ceremonial final click instead of a control activity.',
			keyPoint: 'Controls make reporting reliable enough for certification.',
			watchPrompt: 'Watch review evidence move the filing package toward certification readiness.',
			doPrompt: 'Clear the open review comment and inspect the control evidence.'
		},
		{
			id: 'audit',
			number: '19',
			label: 'Audit evidence',
			group: 'Assure',
			icon: FileCheck2,
			workspace: 'Auditor request board',
			title: 'Respond to audit requests',
			question: 'Can an auditor obtain enough persuasive evidence?',
			lesson:
				'Audit evidence includes information that supports management assertions and information that contradicts them. Good accounting work keeps both source evidence and review evidence organized.',
			notice: [
				'Auditors sample transactions and inspect support.',
				'Reconciliations and schedules answer many PBC requests.',
				'Contradictory evidence must be resolved, not hidden.'
			],
			example:
				'The auditor requests revenue support for INV-1001, the deferred revenue rollforward, the bank rec, and approval for a manual close entry.',
			mistake:
				'Uploading the final statement line without the contracts, schedules, journals, and controls behind it.',
			keyPoint: 'Audit readiness is traceability under pressure.',
			watchPrompt:
				'Watch PBC requests connect to packets, schedules, reconciliations, and controls.',
			doPrompt: 'Open an audit request and choose the evidence that supports it.'
		},
		{
			id: 'filing',
			number: '20',
			label: 'Filing package',
			group: 'File',
			icon: ScrollText,
			workspace: 'Mock 10-Q builder',
			title: 'Assemble the filing',
			question: 'How does accounting become a regulatory report?',
			lesson:
				'The filing package is broader than statements: cover page, statements, notes, MD&A, controls, certifications, exhibits, review comments, and Inline XBRL facts all need to be ready.',
			notice: [
				'Structured tags attach meaning to financial statement facts.',
				'The filing package should block submission when ties or controls are open.',
				'Quarterly and annual packages have different audit/review and disclosure demands.'
			],
			example:
				'Nimbus assembles a mock Q1 10-Q with financial statements, notes, MD&A variance table, controls section, certification checklist, and XBRL tag review.',
			mistake: 'Thinking the filing is done when the statement tables look finished.',
			keyPoint: 'The filing is the last page of the accounting trail.',
			watchPrompt:
				'Watch the filing builder validate statements, notes, controls, comments, and tags.',
			doPrompt: 'Review the package checklist and clear the last blocker before ready-to-file.'
		},
		{
			id: 'debrief',
			number: '21',
			label: 'Debrief',
			group: 'File',
			icon: ListChecks,
			workspace: 'Close improvement board',
			title: 'Improve the next close',
			question: 'What should be fixed before the next period?',
			lesson:
				'After filing, the accounting team archives support, carries forward templates, updates policies, fixes controls, and improves the next close calendar.',
			notice: [
				'Recurring exceptions are process signals.',
				'Late support should become earlier close tasks.',
				'The best close process gets easier because the team learns.'
			],
			example:
				'Nimbus shortens next month by moving vendor cutoff review earlier, adding a revenue schedule tie-out owner, and automating the fixed asset rollforward.',
			mistake:
				'Filing successfully but losing the evidence and process lessons that made the filing possible.',
			keyPoint: 'The cycle ends by making the next cycle stronger.',
			watchPrompt: 'Watch late tasks and audit pain points become next-month improvements.',
			doPrompt: 'Choose which improvement should be prioritized for February close.'
		}
	];

	function stageIndexForId(id: StageId) {
		const index = stages.findIndex((stage) => stage.id === id);
		if (index < 0) {
			throw new Error(`Missing accounting cycle stage: ${id}`);
		}
		return index;
	}

	const tocSections: TocItem[] = [
		{
			id: 'home-node',
			label: 'Start here',
			icon: Workflow,
			stageIndex: stageIndexForId('home')
		},
		{
			id: 'basics',
			label: 'Basics',
			icon: Calculator,
			stageIndex: stageIndexForId('accounting-equation'),
			children: [
				{
					id: 'accounting-equation-node',
					label: 'Accounting equation',
					icon: Calculator,
					stageIndex: stageIndexForId('accounting-equation')
				},
				{
					id: 'account-types-node',
					label: 'Five account types',
					icon: Table2,
					stageIndex: stageIndexForId('account-types')
				},
				{
					id: 'cash-vs-accrual-node',
					label: 'Cash vs accrual',
					icon: Banknote,
					stageIndex: stageIndexForId('cash-vs-accrual')
				}
			]
		},
		{
			id: 'foundation',
			label: 'Foundation',
			icon: Building2,
			stageIndex: stageIndexForId('foundation-overview'),
			children: [
				{
					id: 'setup-node',
					label: 'Company setup',
					icon: Building2,
					stageIndex: stageIndexForId('setup')
				},
				{
					id: 'events-node',
					label: 'Event triage',
					icon: BriefcaseBusiness,
					stageIndex: stageIndexForId('events')
				},
				{
					id: 'evidence-node',
					label: 'Evidence packet',
					icon: ReceiptText,
					stageIndex: stageIndexForId('evidence')
				},
				{
					id: 'judgment-node',
					label: 'Accounting judgment',
					icon: Gavel,
					stageIndex: stageIndexForId('judgment')
				}
			]
		},
		{
			id: 'record',
			label: 'Record',
			icon: FileText,
			stageIndex: stageIndexForId('record-overview'),
			children: [
				{
					id: 'subledger-node',
					label: 'Subledgers',
					icon: Layers3,
					stageIndex: stageIndexForId('subledger')
				},
				{
					id: 'journal-node',
					label: 'Journal entries',
					icon: FileText,
					stageIndex: stageIndexForId('journal')
				},
				{
					id: 'matching-node',
					label: 'Match and settle',
					icon: PackageCheck,
					stageIndex: stageIndexForId('matching')
				},
				{
					id: 'ledger-node',
					label: 'General ledger',
					icon: Database,
					stageIndex: stageIndexForId('ledger')
				}
			]
		},
		{
			id: 'close',
			label: 'Close',
			icon: Table2,
			stageIndex: stageIndexForId('close-overview'),
			children: [
				{
					id: 'cutoff-node',
					label: 'Cutoff',
					icon: SearchCheck,
					stageIndex: stageIndexForId('cutoff')
				},
				{
					id: 'adjustments-node',
					label: 'Adjustments',
					icon: Calculator,
					stageIndex: stageIndexForId('adjustments')
				},
				{
					id: 'reconciliations-node',
					label: 'Reconciliations',
					icon: ClipboardCheck,
					stageIndex: stageIndexForId('reconciliations')
				},
				{
					id: 'trial-node',
					label: 'Trial balance',
					icon: Table2,
					stageIndex: stageIndexForId('trial')
				},
				{
					id: 'consolidation-node',
					label: 'Consolidation',
					icon: Network,
					stageIndex: stageIndexForId('consolidation')
				}
			]
		},
		{
			id: 'report',
			label: 'Report',
			icon: Landmark,
			stageIndex: stageIndexForId('report-overview'),
			children: [
				{
					id: 'mapping-node',
					label: 'Statement mapping',
					icon: Workflow,
					stageIndex: stageIndexForId('mapping')
				},
				{
					id: 'statements-node',
					label: 'Statements',
					icon: Landmark,
					stageIndex: stageIndexForId('statements')
				},
				{
					id: 'cash-flow-node',
					label: 'Cash flow',
					icon: Banknote,
					stageIndex: stageIndexForId('cash-flow')
				},
				{
					id: 'disclosures-node',
					label: 'Disclosures',
					icon: BookOpen,
					stageIndex: stageIndexForId('disclosures')
				}
			]
		},
		{
			id: 'assure',
			label: 'Assure and file',
			icon: ShieldCheck,
			stageIndex: stageIndexForId('assure-overview'),
			children: [
				{
					id: 'tie-out-node',
					label: 'Stick and tie',
					icon: Tags,
					stageIndex: stageIndexForId('tie-out')
				},
				{
					id: 'controls-node',
					label: 'Controls',
					icon: ShieldCheck,
					stageIndex: stageIndexForId('controls')
				},
				{
					id: 'audit-node',
					label: 'Audit evidence',
					icon: FileCheck2,
					stageIndex: stageIndexForId('audit')
				},
				{
					id: 'filing-node',
					label: 'Filing package',
					icon: ScrollText,
					stageIndex: stageIndexForId('filing')
				},
				{
					id: 'debrief-node',
					label: 'Debrief',
					icon: ListChecks,
					stageIndex: stageIndexForId('debrief')
				}
			]
		}
	];

	const cycleIconById = {
		foundation: Building2,
		record: FileText,
		close: Table2,
		report: Landmark,
		assure: ShieldCheck
	} satisfies Record<CycleArcId, IconComponent>;

	const landingStats = nimbusScenario.landingStats;
	const landingCycle = nimbusScenario.cycleArcs.map((arc) => ({
		...arc,
		stage: stageIndexForId(arc.stageId as StageId),
		icon: cycleIconById[arc.id]
	}));

	const systemNodes = [
		{ label: 'Legal entity', value: 'Nimbus Bikes, Inc.', detail: 'US parent, calendar year' },
		{
			label: 'Subledgers',
			value: 'AR / AP / Inventory / Revenue',
			detail: 'Control accounts tie to GL'
		},
		{
			label: 'Policies',
			value: 'Revenue, inventory, PPE, leases',
			detail: 'Drive recognition and measurement'
		},
		{ label: 'Reports', value: 'Statements / notes / mock 10-Q', detail: 'Mapped from adjusted TB' }
	];

	const setupAreas = [
		{
			id: 'entity',
			label: 'Entity and calendar',
			icon: Building2,
			status: 'Ready',
			owner: 'Controller',
			detail:
				'Define the legal entity, fiscal year, reporting currency, consolidation parent, and close calendar before transactions enter the books.',
			output: 'Nimbus Bikes, Inc. - USD - calendar year - January close opened',
			risk: 'If the calendar or entity is wrong, cutoff and reporting ownership fail downstream.'
		},
		{
			id: 'accounts',
			label: 'Chart of accounts',
			icon: Table2,
			status: 'Mapped',
			owner: 'Accounting systems',
			detail:
				'Create accounts with type, normal balance, statement mapping, subledger control flags, and reporting dimensions.',
			output: '1010 cash, 1200 AR, 2300 deferred revenue, 4100 service revenue',
			risk: 'A vague account structure makes later statement mapping and variance review unreliable.'
		},
		{
			id: 'policies',
			label: 'Policies and estimates',
			icon: Gavel,
			status: 'Approved',
			owner: 'Accounting policy',
			detail:
				'Attach revenue, inventory, fixed asset, lease, and accrual policies so preparers know what recognition rule applies.',
			output: 'ASC 606-style service policy: recognize ratably over the service period',
			risk: 'Without a policy, balanced entries can still be wrong.'
		},
		{
			id: 'subledgers',
			label: 'Subledgers',
			icon: Layers3,
			status: 'Tied',
			owner: 'Revenue operations',
			detail:
				'Connect AR, AP, inventory, revenue schedules, fixed assets, and cash feeds to the GL control accounts.',
			output: 'Revenue schedule RS-C-1001 rolls into account 2300 and 4100',
			risk: 'Subledger detail must reconcile to control accounts or the close cannot be reviewed.'
		},
		{
			id: 'controls',
			label: 'Approvals and controls',
			icon: ShieldCheck,
			status: 'Effective',
			owner: 'SOX / controls',
			detail:
				'Set who can create accounts, approve manual journal entries, change mappings, and certify close workpapers.',
			output: 'System owner, preparer, reviewer, and approver roles are separated',
			risk: 'A weak setup lets unsupported changes flow into statements without review.'
		},
		{
			id: 'dimensions',
			label: 'Reporting dimensions',
			icon: Tags,
			status: 'Ready',
			owner: 'FP&A',
			detail:
				'Define product, customer, region, department, and cost center dimensions before transactions are summarized.',
			output: 'Service revenue can be analyzed by customer cohort and business line',
			risk: 'Missing dimensions force manual spreadsheets during reporting and audit requests.'
		}
	] satisfies {
		id: string;
		label: string;
		icon: IconComponent;
		status: string;
		owner: string;
		detail: string;
		output: string;
		risk: string;
	}[];

	const chartAccounts = [
		{
			account: '1010 Cash and cash equivalents',
			type: 'Asset',
			mapping: 'Balance sheet - cash',
			status: 'Mapped'
		},
		{
			account: '1200 Accounts receivable',
			type: 'Asset',
			mapping: 'Balance sheet - AR, net',
			status: 'Mapped'
		},
		{
			account: '1400 Inventory',
			type: 'Asset',
			mapping: 'Balance sheet - inventory',
			status: 'Mapped'
		},
		{
			account: '2100 Accounts payable',
			type: 'Liability',
			mapping: 'Balance sheet - AP',
			status: 'Mapped'
		},
		{
			account: '2300 Deferred revenue',
			type: 'Liability',
			mapping: 'Contract liabilities',
			status: 'Mapped'
		},
		{
			account: '4000 Product revenue',
			type: 'Revenue',
			mapping: 'Income statement - product revenue',
			status: 'Mapped'
		},
		{
			account: '4100 Service revenue',
			type: 'Revenue',
			mapping: 'Income statement - service revenue',
			status: 'Mapped'
		}
	];

	const triageLanes = [
		{
			label: 'Record now',
			description:
				'Recognition criteria are met in this period and a supported entry is needed now.'
		},
		{
			label: 'Recognize over time',
			description:
				'The event creates accounting now, but revenue or expense recognition happens as performance or time passes.'
		},
		{
			label: 'Monitor',
			description:
				'The event is operationally relevant but does not yet create an accounting record.'
		},
		{
			label: 'Disclose / monitor',
			description:
				'The event may affect disclosure, risk, or estimates even when no entry is posted yet.'
		}
	] satisfies { label: EventLane; description: string }[];

	const eventQueue = [
		{
			id: 'subscription-contract',
			date: 'Jan 02',
			event: 'Aster Labs signs annual fleet maintenance contract',
			counterparty: 'Aster Labs',
			amount: '$12,000',
			evidence: 'C-1001 / INV-1001',
			lane: 'Recognize over time' as EventLane,
			trigger: 'Contract signed and invoice issued for a 12-month stand-ready maintenance service.',
			accountingQuestion:
				'Has Nimbus earned revenue on day one, or only created a receivable and contract liability?',
			entryImpact:
				'Debit accounts receivable and credit deferred revenue. Release revenue monthly as service is provided.',
			control: 'Revenue policy review and contract-to-invoice tie-out',
			answer: 'Track contract, bill AR, defer revenue, recognize monthly'
		},
		{
			id: 'product-shipment',
			date: 'Jan 06',
			event: 'Bikes ship to West Harbor Co. on credit',
			counterparty: 'West Harbor Co.',
			amount: '$4,200',
			evidence: 'SO-143 / BOL-143 / INV-143',
			lane: 'Record now' as EventLane,
			trigger: 'Goods shipped FOB shipping point and invoice issued before January close.',
			accountingQuestion: 'Did control transfer to the customer before period end?',
			entryImpact:
				'Record product revenue and AR. Record COGS and relieve inventory from the subledger.',
			control: 'Shipping document matched to invoice and sales order',
			answer: 'Record product revenue, AR, COGS, and inventory relief'
		},
		{
			id: 'vendor-po',
			date: 'Jan 12',
			event: 'Inventory purchase order issued',
			counterparty: 'Orbit Components',
			amount: '$1,550',
			evidence: 'PO-2207',
			lane: 'Monitor' as EventLane,
			trigger: 'Purchase order approved, but no goods received and no vendor invoice accepted.',
			accountingQuestion: 'Does a purchase order alone create a present obligation?',
			entryImpact:
				'No journal entry yet. Keep the PO open for receiving, accrual, and cutoff review.',
			control: 'Three-way match waits for receiving report or vendor bill',
			answer: 'No entry until goods are received or invoice creates obligation'
		},
		{
			id: 'legal-letter',
			date: 'Jan 24',
			event: 'Counsel sends early claim assessment',
			counterparty: 'Outside counsel',
			amount: 'Range not estimable',
			evidence: 'LEGAL-04',
			lane: 'Disclose / monitor' as EventLane,
			trigger:
				'Counsel says an early customer claim is possible, but loss is not probable or estimable.',
			accountingQuestion:
				'Is this a recognized loss contingency, a disclosure item, or only monitoring evidence?',
			entryImpact:
				'No accrual in this scenario. Add disclosure watch item and reassess before filing.',
			control: 'Legal letter review and contingency checklist',
			answer: 'Evaluate contingency and disclosure; no accrual yet in this scenario'
		}
	];

	const evidenceDocs = [
		{
			id: 'C-1001',
			type: 'Contract',
			field: '12-month maintenance service',
			status: 'Signed',
			source: 'Customer master and signed service agreement',
			extracted: [
				'Customer: Aster Labs',
				'Service period: Jan 1 - Dec 31, 2026',
				'Performance obligation: stand-ready maintenance'
			],
			auditUse: 'Proves rights, obligations, term, and customer approval.'
		},
		{
			id: 'INV-1001',
			type: 'Invoice',
			field: '$12,000 due on receipt',
			status: 'Captured',
			source: 'Billing system',
			extracted: ['Invoice date: Jan 2, 2026', 'Amount: $12,000', 'Payment terms: due on receipt'],
			auditUse: 'Proves billing amount, AR creation, and customer reference.'
		},
		{
			id: 'PMT-1001',
			type: 'Receipt',
			field: 'Customer paid Jan 08',
			status: 'Matched',
			source: 'Cash application file',
			extracted: [
				'Receipt date: Jan 8, 2026',
				'Applied to INV-1001',
				'No short pay or credit memo'
			],
			auditUse: 'Proves settlement of the receivable without proving revenue was earned.'
		},
		{
			id: 'BNK-018',
			type: 'Bank line',
			field: '$12,000 deposit cleared',
			status: 'Imported',
			source: 'Bank feed',
			extracted: ['Deposit cleared: Jan 8, 2026', 'Bank reference: BNK-018', 'Cash account: 1010'],
			auditUse: 'Proves cash existence and ties payment to the bank reconciliation.'
		},
		{
			id: 'POL-REV',
			type: 'Policy memo',
			field: 'Recognize ratably over service term',
			status: 'Approved',
			source: 'Accounting policy library',
			extracted: [
				'Recognition method: over time',
				'Release pattern: monthly straight-line',
				'Reviewer: controller'
			],
			auditUse: 'Proves why the invoice is deferred instead of recognized immediately.'
		}
	];

	const judgmentSteps = [
		{
			label: 'Contract exists',
			result: 'Approved parties, rights, and payment terms',
			question: 'Can accounting identify enforceable rights and collectability?',
			evidence: 'C-1001 and customer master',
			risk: 'Recording a transaction without enforceable customer approval.',
			memo: 'The signed agreement identifies Nimbus and Aster Labs, the services, payment terms, and contract period.'
		},
		{
			label: 'Obligation identified',
			result: 'One stand-ready maintenance service',
			question: 'What did Nimbus promise to transfer?',
			evidence: 'C-1001 service description',
			risk: 'Splitting or combining obligations incorrectly.',
			memo: 'The promise is a stand-ready maintenance service provided evenly across the contract term.'
		},
		{
			label: 'Price measured',
			result: '$12,000 fixed consideration',
			question: 'What transaction price should be allocated?',
			evidence: 'INV-1001 and contract pricing schedule',
			risk: 'Using cash receipt timing as the revenue recognition basis.',
			memo: 'The invoice and contract agree to fixed consideration of $12,000 with no variable consideration in scope.'
		},
		{
			label: 'Allocation complete',
			result: 'One obligation receives full price',
			question: 'Does the price need to be split across multiple obligations?',
			evidence: 'Policy memo and contract deliverables',
			risk: 'Allocating revenue to non-distinct setup or support activities.',
			memo: 'Because the contract has one distinct stand-ready service, the full price is assigned to that obligation.'
		},
		{
			label: 'Recognition pattern',
			result: 'Over time, ratably across 12 months',
			question: 'When is revenue earned?',
			evidence: 'POL-REV and service period',
			risk: 'Recognizing the full billing before service is delivered.',
			memo: 'January earns one month: $1,000 revenue and $11,000 remaining deferred revenue.'
		}
	];

	const subledgerTabs = [
		{
			id: 'revenue',
			label: 'Revenue schedule',
			source: 'C-1001 / INV-1001 / POL-REV-606',
			result: '$12,000 is billed once, $1,000 is earned in January, and $11,000 remains deferred.',
			control: 'Reviewer checks the schedule against contract dates and revenue policy.'
		},
		{
			id: 'ar',
			label: 'AR aging',
			source: 'Customer invoices and cash applications',
			result:
				'Open invoices are aged, reserved if needed, and reconciled to the AR control account.',
			control: 'Tie total AR aging to GL 1200 before statements are drafted.'
		},
		{
			id: 'inventory',
			label: 'Inventory layers',
			source: 'Receiving reports, shipment confirmations, and cycle counts',
			result: 'Inventory receipts and relief support COGS, cutoff, and reserve review.',
			control: 'Layer detail ties to the inventory GL and physical count evidence.'
		},
		{
			id: 'ap',
			label: 'AP aging',
			source: 'Vendor bills, receipts, approvals, and accruals',
			result: 'Approved and accrued obligations support AP and accrued expense balances.',
			control: 'Aging and unbilled receipts are reconciled to vendor statements and GL.'
		}
	] satisfies {
		id: SubledgerTab;
		label: string;
		source: string;
		result: string;
		control: string;
	}[];

	const arAging = [
		{ customer: 'Aster Labs', invoice: 'INV-1001', current: 0, pastDue: 0, status: 'Paid' },
		{ customer: 'West Harbor Co.', invoice: 'INV-143', current: 420, pastDue: 0, status: 'Open' },
		{
			customer: 'Cedar Clinic',
			invoice: 'INV-097',
			current: 0,
			pastDue: 110,
			status: 'Reserve review'
		},
		{ customer: 'Metro Transit', invoice: 'INV-121', current: 475, pastDue: 0, status: 'Open' }
	];

	const revenueSchedule = [
		{ month: 'Jan', billings: 12000, revenue: 1000, deferredEnding: 11000, status: 'Released' },
		{ month: 'Feb', billings: 0, revenue: 1000, deferredEnding: 10000, status: 'Scheduled' },
		{ month: 'Mar', billings: 0, revenue: 1000, deferredEnding: 9000, status: 'Scheduled' },
		{ month: 'Apr-Dec', billings: 0, revenue: 9000, deferredEnding: 0, status: 'Scheduled' }
	];

	const inventoryLayers = [
		{ sku: 'NB-200', receipt: 'RR-2207', units: 38, unitCost: 12, total: 456, status: 'Available' },
		{
			sku: 'KIT-44',
			receipt: 'RR-2211',
			units: 24,
			unitCost: 5,
			total: 120,
			status: 'RNI accrual'
		},
		{ sku: 'NB-100', receipt: 'Opening', units: 52, unitCost: 9, total: 468, status: 'Available' },
		{
			sku: 'SPARES',
			receipt: 'Cycle count',
			units: 1,
			unitCost: 281,
			total: 281,
			status: 'Reserve review'
		}
	];

	const apAging = [
		{ vendor: 'Orbit Components', bill: 'BILL-883', current: 155, pastDue: 0, status: 'Approved' },
		{ vendor: 'Trail Freight', bill: 'BILL-901', current: 88, pastDue: 0, status: 'Pay next run' },
		{
			vendor: 'Payroll tax authority',
			bill: 'ACCR-PAY',
			current: 85,
			pastDue: 0,
			status: 'Accrued'
		},
		{ vendor: 'Unbilled receipts', bill: 'RNI-013', current: 135, pastDue: 0, status: 'Accrued' }
	];

	const journalEntries = [
		{
			id: 'JE-1003',
			date: 'Jan 02',
			title: 'Record annual subscription invoice',
			source: 'C-1001 / INV-1001',
			purpose: 'Create the receivable and contract liability when the approved invoice is issued.',
			control: 'Prepared from contract terms; reviewed against revenue policy before posting.',
			lines: [
				{ account: 'Accounts receivable', debit: 12000, credit: 0, ref: 'INV-1001' },
				{ account: 'Deferred revenue', debit: 0, credit: 12000, ref: 'C-1001' }
			]
		},
		{
			id: 'JE-1004',
			date: 'Jan 08',
			title: 'Apply Aster cash receipt',
			source: 'PMT-1001 / BNK-8842',
			purpose: 'Clear the Aster receivable when the bank line is matched to the customer payment.',
			control: 'Cash application ties bank evidence to the invoice and customer account.',
			lines: [
				{ account: 'Cash', debit: 12000, credit: 0, ref: 'BNK-8842' },
				{ account: 'Accounts receivable', debit: 0, credit: 12000, ref: 'PMT-1001' }
			]
		},
		{
			id: 'JE-1005',
			date: 'Jan 31',
			title: 'Release January service revenue',
			source: 'RS-C-1001 / WP-REV',
			purpose: 'Move one earned month from deferred revenue to service revenue.',
			control: 'Revenue schedule recalculates the monthly release and ties to the policy memo.',
			lines: [
				{ account: 'Deferred revenue', debit: 1000, credit: 0, ref: 'RS-C-1001' },
				{ account: 'Service revenue', debit: 0, credit: 1000, ref: 'WP-REV' }
			]
		},
		{
			id: 'JE-1001',
			date: 'Jan 06',
			title: 'Record product sale and COGS',
			source: 'INV-143 / BOL-143',
			purpose: 'Record a separate product shipment that was delivered before period end.',
			control: 'Three-way evidence checks invoice, shipment, and inventory relief.',
			lines: [
				{ account: 'Accounts receivable', debit: 1500, credit: 0, ref: 'INV-143' },
				{ account: 'Product revenue', debit: 0, credit: 1500, ref: 'INV-143' },
				{ account: 'Cost of product revenue', debit: 960, credit: 0, ref: 'BOL-143' },
				{ account: 'Inventory', debit: 0, credit: 960, ref: 'BOL-143' }
			]
		},
		{
			id: 'JE-1008',
			date: 'Jan 30',
			title: 'Record received-not-invoiced accrual',
			source: 'RR-2211 / CUT-04',
			purpose: 'Accrue inventory received before the vendor bill arrives.',
			control: 'Close checklist compares receiving reports after the last AP invoice load.',
			lines: [
				{ account: 'Inventory', debit: 135, credit: 0, ref: 'RR-2211' },
				{ account: 'Accrued expenses', debit: 0, credit: 135, ref: 'CUT-04' }
			]
		}
	];

	const matchingRows = [
		{ doc: 'PO-2207', amount: 456, quantity: '38 units', status: 'Approved order' },
		{ doc: 'RR-2207', amount: 456, quantity: '38 units', status: 'Received' },
		{ doc: 'BILL-883', amount: 455, quantity: '38 units', status: 'Price variance $1' },
		{ doc: 'BNK-8842', amount: 12000, quantity: 'Cash receipt', status: 'Applied to INV-1001' }
	];

	const ledgerAccounts = [
		{
			account: 'Cash',
			ending: 12620,
			lines: [
				{
					date: 'Jan 01',
					source: 'Opening',
					description: 'Beginning balance',
					debit: 1658,
					credit: 0,
					balance: 1658
				},
				{
					date: 'Jan 08',
					source: 'JE-1004',
					description: 'Aster cash receipt',
					debit: 12000,
					credit: 0,
					balance: 13658
				},
				{
					date: 'Jan 18',
					source: 'JE-1007',
					description: 'Vendor payment run',
					debit: 0,
					credit: 425,
					balance: 13233
				},
				{
					date: 'Jan 31',
					source: 'JE-1012',
					description: 'Payroll and operating cash',
					debit: 0,
					credit: 613,
					balance: 12620
				}
			]
		},
		{
			account: 'Accounts receivable',
			ending: 1805,
			lines: [
				{
					date: 'Jan 01',
					source: 'Opening',
					description: 'Beginning AR',
					debit: 870,
					credit: 0,
					balance: 870
				},
				{
					date: 'Jan 02',
					source: 'JE-1003',
					description: 'Subscription billing',
					debit: 12000,
					credit: 0,
					balance: 12870
				},
				{
					date: 'Jan 06',
					source: 'JE-1001',
					description: 'Product invoice',
					debit: 1500,
					credit: 0,
					balance: 14370
				},
				{
					date: 'Jan 08',
					source: 'JE-1004',
					description: 'Aster payment and other receipts',
					debit: 0,
					credit: 12485,
					balance: 1885
				},
				{
					date: 'Jan 22',
					source: 'JE-1002',
					description: 'Credit memo',
					debit: 0,
					credit: 80,
					balance: 1805
				}
			]
		},
		{
			account: 'Deferred revenue',
			ending: 11920,
			lines: [
				{
					date: 'Jan 01',
					source: 'Opening',
					description: 'Beginning contract liability',
					debit: 0,
					credit: 920,
					balance: -920
				},
				{
					date: 'Jan 02',
					source: 'JE-1003',
					description: 'Annual subscription invoice',
					debit: 0,
					credit: 12000,
					balance: -12920
				},
				{
					date: 'Jan 31',
					source: 'JE-1005',
					description: 'January revenue release',
					debit: 1000,
					credit: 0,
					balance: -11920
				}
			]
		},
		{
			account: 'Service revenue',
			ending: 1180,
			lines: [
				{
					date: 'Jan 01',
					source: 'Opening',
					description: 'Beginning activity for January close',
					debit: 0,
					credit: 180,
					balance: -180
				},
				{
					date: 'Jan 31',
					source: 'JE-1005',
					description: 'Aster January service release',
					debit: 0,
					credit: 1000,
					balance: -1180
				}
			]
		},
		{
			account: 'Inventory',
			ending: 1325,
			lines: [
				{
					date: 'Jan 01',
					source: 'Opening',
					description: 'Beginning inventory',
					debit: 1325,
					credit: 0,
					balance: 1325
				},
				{
					date: 'Jan 06',
					source: 'JE-1001',
					description: 'COGS relief',
					debit: 0,
					credit: 960,
					balance: 365
				},
				{
					date: 'Jan 12',
					source: 'JE-1006',
					description: 'Vendor receipt',
					debit: 580,
					credit: 0,
					balance: 945
				},
				{
					date: 'Jan 30',
					source: 'JE-1008',
					description: 'RNI accrual',
					debit: 380,
					credit: 0,
					balance: 1325
				}
			]
		}
	];

	const cutoffRows = [
		{
			item: 'Shipment BOL-143',
			date: 'Jan 06',
			decision: 'Record January',
			impact: 'Revenue and COGS recognized'
		},
		{
			item: 'Receipt RR-2211',
			date: 'Jan 30',
			decision: 'Accrue January',
			impact: 'Inventory and accrued expense recorded'
		},
		{
			item: 'Vendor BILL-912',
			date: 'Feb 02',
			decision: 'Look back',
			impact: 'Supports January RNI accrual'
		},
		{
			item: 'Renewal quote Q-882',
			date: 'Jan 31',
			decision: 'Monitor',
			impact: 'No entry; not yet enforceable'
		}
	];

	const adjustmentRows = [
		{
			workpaper: 'WP-DEP',
			entry: 'Depreciation',
			amount: 72,
			support: 'Fixed asset register',
			status: 'Reviewed'
		},
		{
			workpaper: 'WP-REV',
			entry: 'Revenue release',
			amount: 100,
			support: 'Revenue schedule',
			status: 'Reviewed'
		},
		{
			workpaper: 'WP-RNI',
			entry: 'RNI accrual',
			amount: 135,
			support: 'Receiving report',
			status: 'Needs reviewer note'
		},
		{
			workpaper: 'WP-ACL',
			entry: 'Allowance adjustment',
			amount: 14,
			support: 'AR aging',
			status: 'Reviewed'
		},
		{
			workpaper: 'WP-MAN',
			entry: 'Manual reclass',
			amount: 50,
			support: 'Weak explanation',
			status: 'Flagged'
		}
	];

	const reconciliationRows = [
		{ account: 'Cash', gl: 1820, support: 1820, difference: 0, owner: 'Treasury', status: 'Tied' },
		{
			account: 'Accounts receivable, net',
			gl: 964,
			support: 964,
			difference: 0,
			owner: 'Revenue accounting',
			status: 'Tied'
		},
		{
			account: 'Inventory',
			gl: 1325,
			support: 1325,
			difference: 0,
			owner: 'Operations accounting',
			status: 'Tied'
		},
		{
			account: 'Deferred revenue',
			gl: 1050,
			support: 1050,
			difference: 0,
			owner: 'Revenue accounting',
			status: 'Tied'
		},
		{
			account: 'Accrued expenses',
			gl: 495,
			support: 485,
			difference: 10,
			owner: 'Close team',
			status: 'Open item'
		}
	];

	const trialBalanceRows = [
		{
			account: '1010 Cash and cash equivalents',
			debit: 1820,
			credit: 0,
			mapping: 'Cash',
			review: 'Tied'
		},
		{
			account: '1200 Accounts receivable',
			debit: 1005,
			credit: 0,
			mapping: 'AR, gross',
			review: 'Tied'
		},
		{
			account: '1210 Allowance for credit losses',
			debit: 0,
			credit: 41,
			mapping: 'AR allowance',
			review: 'Estimate reviewed'
		},
		{ account: '1400 Inventory', debit: 1325, credit: 0, mapping: 'Inventory', review: 'Tied' },
		{ account: '1500 Prepaids', debit: 186, credit: 0, mapping: 'Prepaids', review: 'Tied' },
		{
			account: '1600 Property and equipment, gross',
			debit: 3000,
			credit: 0,
			mapping: 'PPE',
			review: 'Rollforward'
		},
		{
			account: '1610 Accumulated depreciation',
			debit: 0,
			credit: 590,
			mapping: 'PPE contra',
			review: 'Rollforward'
		},
		{
			account: '1700 Operating lease ROU asset',
			debit: 1120,
			credit: 0,
			mapping: 'ROU asset',
			review: 'Schedule'
		},
		{
			account: '2100 Accounts payable',
			debit: 0,
			credit: 780,
			mapping: 'AP',
			review: 'Aging tied'
		},
		{
			account: '2200 Accrued expenses',
			debit: 0,
			credit: 495,
			mapping: 'Accrued expenses',
			review: 'Open item'
		},
		{
			account: '2300 Deferred revenue, current',
			debit: 0,
			credit: 690,
			mapping: 'Contract liabilities',
			review: 'Schedule tied'
		},
		{
			account: '2310 Deferred revenue, noncurrent',
			debit: 0,
			credit: 360,
			mapping: 'Contract liabilities',
			review: 'Schedule tied'
		},
		{
			account: '2400 Current lease liability',
			debit: 0,
			credit: 170,
			mapping: 'Lease liabilities',
			review: 'Schedule'
		},
		{
			account: '2500 Current debt',
			debit: 0,
			credit: 240,
			mapping: 'Debt',
			review: 'Debt schedule'
		},
		{
			account: '2600 Operating lease liability',
			debit: 0,
			credit: 950,
			mapping: 'Lease liabilities',
			review: 'Schedule'
		},
		{
			account: '2700 Long-term debt',
			debit: 0,
			credit: 1400,
			mapping: 'Debt',
			review: 'Debt schedule'
		},
		{
			account: '3100 Common stock and APIC',
			debit: 0,
			credit: 2100,
			mapping: 'Equity',
			review: 'Equity rollforward'
		},
		{
			account: '3200 Retained earnings, opening',
			debit: 0,
			credit: 229,
			mapping: 'Equity',
			review: 'Rollforward'
		},
		{
			account: '4000 Product revenue',
			debit: 0,
			credit: 1420,
			mapping: 'Product revenue',
			review: 'Analytical review'
		},
		{
			account: '4100 Service revenue',
			debit: 0,
			credit: 1180,
			mapping: 'Service revenue',
			review: 'Revenue schedule'
		},
		{
			account: '5000 Product cost of revenue',
			debit: 910,
			credit: 0,
			mapping: 'Product cost',
			review: 'Inventory rollforward'
		},
		{
			account: '5100 Service cost of revenue',
			debit: 318,
			credit: 0,
			mapping: 'Service cost',
			review: 'Payroll/AP support'
		},
		{
			account: '6100 Research and development',
			debit: 260,
			credit: 0,
			mapping: 'Operating expenses',
			review: 'Payroll support'
		},
		{
			account: '6200 Sales and marketing',
			debit: 310,
			credit: 0,
			mapping: 'Operating expenses',
			review: 'AP/payroll support'
		},
		{
			account: '6300 General and administrative',
			debit: 238,
			credit: 0,
			mapping: 'Operating expenses',
			review: 'AP/payroll support'
		},
		{
			account: '7100 Interest expense',
			debit: 28,
			credit: 0,
			mapping: 'Other expense',
			review: 'Debt schedule'
		},
		{
			account: '8100 Income tax expense',
			debit: 125,
			credit: 0,
			mapping: 'Tax expense',
			review: 'Tax provision'
		}
	];

	const mappingRows = [
		{
			account: '1010 Cash',
			statement: 'Balance sheet',
			line: 'Cash and cash equivalents',
			note: 'Cash flow ending cash'
		},
		{
			account: '1200 AR less 1210 ACL',
			statement: 'Balance sheet',
			line: 'Accounts receivable, net',
			note: 'AR aging'
		},
		{
			account: '2300 / 2310 Deferred revenue',
			statement: 'Balance sheet',
			line: 'Contract liabilities',
			note: 'Revenue note'
		},
		{
			account: '4000 Product revenue',
			statement: 'Income statement',
			line: 'Product revenue',
			note: 'Revenue disaggregation'
		},
		{
			account: '4100 Service revenue',
			statement: 'Income statement',
			line: 'Service revenue',
			note: 'Revenue disaggregation'
		},
		{
			account: '1600 / 1610 PPE',
			statement: 'Balance sheet',
			line: 'Property and equipment, net',
			note: 'PPE rollforward'
		},
		{
			account: '7100 Interest expense',
			statement: 'Income statement',
			line: 'Interest expense',
			note: 'Debt note'
		}
	];

	const balanceSections: StatementSection[] = [
		{
			title: 'Assets',
			rows: [
				{
					label: 'Cash and cash equivalents',
					current: 1820,
					prior: 1658,
					note: 'CF',
					trace: 'Cash ledger'
				},
				{
					label: 'Accounts receivable, net',
					current: 964,
					prior: 870,
					note: '3',
					trace: 'AR aging'
				},
				{
					label: 'Inventory',
					current: 1325,
					prior: 1325,
					note: '4',
					trace: 'Inventory rollforward'
				},
				{ label: 'Prepaid expenses and other current assets', current: 186, prior: 160, note: '5' },
				{ label: 'Total current assets', current: 4295, prior: 4013, total: true },
				{
					label: 'Property and equipment, net',
					current: 2410,
					prior: 2062,
					note: '6',
					trace: 'PPE rollforward'
				},
				{ label: 'Operating lease right-of-use assets', current: 1120, prior: 1188, note: '7' },
				{ label: 'Total assets', current: 7825, prior: 7263, total: true }
			]
		},
		{
			title: 'Liabilities and stockholders equity',
			rows: [
				{ label: 'Accounts payable', current: 780, prior: 625, note: '8', trace: 'AP aging' },
				{ label: 'Accrued expenses', current: 495, prior: 415, note: '8' },
				{
					label: 'Deferred revenue, current',
					current: 690,
					prior: 575,
					note: '2',
					trace: 'Revenue schedule'
				},
				{ label: 'Current lease liability', current: 170, prior: 165, note: '7' },
				{ label: 'Current debt', current: 240, prior: 240, note: '9' },
				{ label: 'Total current liabilities', current: 2375, prior: 2020, total: true },
				{ label: 'Deferred revenue, noncurrent', current: 360, prior: 345, note: '2' },
				{ label: 'Operating lease liability', current: 950, prior: 1023, note: '7' },
				{ label: 'Long-term debt', current: 1400, prior: 1460, note: '9' },
				{ label: 'Total liabilities', current: 5085, prior: 4848, total: true },
				{
					label: 'Common stock and additional paid-in capital',
					current: 2100,
					prior: 1976,
					note: '10'
				},
				{ label: 'Retained earnings', current: 640, prior: 439, note: '10' },
				{ label: 'Total stockholders equity', current: 2740, prior: 2415, total: true },
				{
					label: 'Total liabilities and stockholders equity',
					current: 7825,
					prior: 7263,
					total: true
				}
			]
		}
	];

	const incomeStatement: StatementSection[] = [
		{
			title: 'Operations',
			rows: [
				{
					label: 'Product revenue',
					current: 1420,
					prior: 1275,
					note: '2',
					trace: 'Product invoices'
				},
				{
					label: 'Service revenue',
					current: 1180,
					prior: 1010,
					note: '2',
					trace: 'Revenue schedules'
				},
				{ label: 'Net revenue', current: 2600, prior: 2285, total: true },
				{ label: 'Product cost of revenue', current: 910, prior: 820, note: '4' },
				{ label: 'Service cost of revenue', current: 318, prior: 304 },
				{ label: 'Gross profit', current: 1372, prior: 1161, total: true },
				{ label: 'Research and development', current: 260, prior: 220 },
				{ label: 'Sales and marketing', current: 310, prior: 298 },
				{ label: 'General and administrative', current: 238, prior: 210 },
				{ label: 'Operating income', current: 564, prior: 433, total: true },
				{ label: 'Interest expense', current: 28, prior: 31, note: '9' },
				{ label: 'Income before taxes', current: 536, prior: 402, total: true },
				{ label: 'Income tax expense', current: 125, prior: 94 },
				{ label: 'Net income', current: 411, prior: 308, total: true }
			]
		}
	];

	const cashFlowStatement: StatementSection[] = [
		{
			title: 'Operating activities',
			rows: [
				{ label: 'Net income', current: 411, prior: 308 },
				{ label: 'Depreciation and amortization', current: 72, prior: 66 },
				{ label: 'Stock-based compensation', current: 44, prior: 40 },
				{ label: 'Accounts receivable', current: -94, prior: -66 },
				{ label: 'Inventory', current: -210, prior: -84 },
				{ label: 'Prepaids and other assets', current: -26, prior: -18 },
				{ label: 'Accounts payable', current: 155, prior: 90 },
				{ label: 'Accrued expenses', current: 80, prior: 54 },
				{ label: 'Deferred revenue', current: 130, prior: 96 },
				{
					label: 'Net cash provided by operating activities',
					current: 562,
					prior: 486,
					total: true
				}
			]
		},
		{
			title: 'Investing and financing activities',
			rows: [
				{ label: 'Purchases of property and equipment', current: -420, prior: -245 },
				{ label: 'Net cash used in investing activities', current: -420, prior: -245, total: true },
				{ label: 'Repayment of debt', current: -60, prior: -60 },
				{ label: 'Proceeds from stock issuance', current: 80, prior: 0 },
				{
					label: 'Net cash provided by financing activities',
					current: 20,
					prior: -60,
					total: true
				},
				{ label: 'Net increase in cash', current: 162, prior: 181, total: true },
				{ label: 'Cash at beginning of period', current: 1658, prior: 1477 },
				{ label: 'Cash at end of period', current: 1820, prior: 1658, total: true }
			]
		}
	];

	const equityStatement: StatementSection[] = [
		{
			title: 'Stockholders equity',
			rows: [
				{ label: 'Common stock and APIC, beginning', current: 1976, prior: 1936 },
				{ label: 'Stock issuance', current: 80, prior: 0 },
				{ label: 'Stock-based compensation', current: 44, prior: 40 },
				{ label: 'Common stock and APIC, ending', current: 2100, prior: 1976, total: true },
				{ label: 'Retained earnings, beginning', current: 229, prior: 131 },
				{ label: 'Net income', current: 411, prior: 308 },
				{ label: 'Dividends', current: 0, prior: 0 },
				{ label: 'Retained earnings, ending', current: 640, prior: 439, total: true },
				{ label: 'Total stockholders equity', current: 2740, prior: 2415, total: true }
			]
		}
	];

	const cashBridge = [
		{
			label: 'Net income',
			amount: 411,
			type: 'Start',
			explanation: 'Accrual-basis profit for January.'
		},
		{
			label: 'Depreciation',
			amount: 72,
			type: 'Noncash',
			explanation: 'Expense reduced income but not cash.'
		},
		{
			label: 'AR increase',
			amount: -94,
			type: 'Working capital',
			explanation: 'Some revenue is still uncollected.'
		},
		{
			label: 'Inventory increase',
			amount: -210,
			type: 'Working capital',
			explanation: 'Cash is tied up in parts and bikes.'
		},
		{
			label: 'AP increase',
			amount: 155,
			type: 'Working capital',
			explanation: 'Supplier obligations preserved cash.'
		},
		{
			label: 'Deferred revenue increase',
			amount: 130,
			type: 'Working capital',
			explanation: 'Customers paid before all service was earned.'
		},
		{
			label: 'Capex',
			amount: -420,
			type: 'Investing',
			explanation: 'New equipment is an investing cash outflow.'
		},
		{
			label: 'Debt and equity',
			amount: 20,
			type: 'Financing',
			explanation: 'Debt repayment was offset by stock issuance.'
		}
	];

	const disclosures = [
		{
			id: 'revenue',
			label: 'Revenue disaggregation',
			rows: [
				{ label: 'Product revenue', amount: 1420, statement: 'Income statement', status: 'Tied' },
				{ label: 'Service revenue', amount: 1180, statement: 'Income statement', status: 'Tied' },
				{ label: 'Net revenue', amount: 2600, statement: 'Income statement', status: 'Tied' }
			]
		},
		{
			id: 'deferred',
			label: 'Deferred revenue rollforward',
			rows: [
				{
					label: 'Beginning contract liabilities',
					amount: 920,
					statement: 'Balance sheet prior',
					status: 'Tied'
				},
				{
					label: 'Billings and cash receipts',
					amount: 1230,
					statement: 'Revenue schedules',
					status: 'Tied'
				},
				{
					label: 'Revenue recognized',
					amount: -1100,
					statement: 'Income statement',
					status: 'Tied'
				},
				{
					label: 'Ending contract liabilities',
					amount: 1050,
					statement: 'Balance sheet',
					status: 'Tied'
				}
			]
		},
		{
			id: 'ppe',
			label: 'Property and equipment',
			rows: [
				{ label: 'Gross PPE', amount: 3000, statement: 'Balance sheet', status: 'Tied' },
				{
					label: 'Accumulated depreciation',
					amount: -590,
					statement: 'Balance sheet',
					status: 'Tied'
				},
				{
					label: 'Property and equipment, net',
					amount: 2410,
					statement: 'Balance sheet',
					status: 'Tied'
				}
			]
		},
		{
			id: 'debt',
			label: 'Debt and interest',
			rows: [
				{ label: 'Current debt', amount: 240, statement: 'Balance sheet', status: 'Tied' },
				{ label: 'Long-term debt', amount: 1400, statement: 'Balance sheet', status: 'Tied' },
				{ label: 'Interest expense', amount: 28, statement: 'Income statement', status: 'Tied' }
			]
		}
	] satisfies {
		id: DisclosureTab;
		label: string;
		rows: { label: string; amount: number; statement: string; status: string }[];
	}[];

	const tieOutRows = [
		{
			fact: 'Service revenue',
			statement: 1180,
			note: 1180,
			mda: 1180,
			tag: 'us-gaap:RevenueFromContractWithCustomerExcludingAssessedTax',
			status: 'Tied'
		},
		{
			fact: 'Deferred revenue',
			statement: 1050,
			note: 1050,
			mda: 1050,
			tag: 'us-gaap:ContractWithCustomerLiability',
			status: 'Tied'
		},
		{
			fact: 'PPE, net',
			statement: 2410,
			note: 2410,
			mda: 2410,
			tag: 'us-gaap:PropertyPlantAndEquipmentNet',
			status: 'Tied'
		},
		{
			fact: 'Accounts receivable, net',
			statement: 964,
			note: 954,
			mda: 964,
			tag: 'us-gaap:AccountsReceivableNetCurrent',
			status: 'Broken note tie'
		}
	];

	const controlRows = [
		{
			control: 'Revenue schedule review',
			owner: 'Controller',
			evidence: 'WP-REV signoff',
			status: 'Effective'
		},
		{
			control: 'Manual JE approval',
			owner: 'Assistant controller',
			evidence: 'JE approval log',
			status: 'Comment open'
		},
		{
			control: 'Bank reconciliation review',
			owner: 'Treasury',
			evidence: 'Bank rec signoff',
			status: 'Effective'
		},
		{
			control: 'Disclosure tie-out',
			owner: 'SEC reporting',
			evidence: 'Tie-out binder',
			status: 'In progress'
		}
	];

	const auditRequests = [
		{
			id: 'REV-01',
			request: 'Support service revenue sample INV-1001',
			evidence: 'Contract, invoice, cash receipt, revenue schedule',
			status: 'Ready'
		},
		{
			id: 'DEF-02',
			request: 'Tie deferred revenue rollforward to GL',
			evidence: 'Revenue schedule and TB mapping',
			status: 'Ready'
		},
		{
			id: 'CASH-03',
			request: 'Provide January bank reconciliation',
			evidence: 'Bank statement and recon workpaper',
			status: 'Ready'
		},
		{
			id: 'JE-04',
			request: 'Explain manual reclass JE-1014',
			evidence: 'Weak support; controller follow-up needed',
			status: 'Open'
		}
	];

	const filingSections = [
		{ section: 'Cover page', owner: 'Legal', status: 'Tagged' },
		{ section: 'Financial statements', owner: 'SEC reporting', status: 'Tied' },
		{ section: 'Footnotes', owner: 'Accounting policy', status: 'Tied' },
		{ section: 'MD&A variance tables', owner: 'FP&A', status: 'Reviewing' },
		{ section: 'Controls and procedures', owner: 'Controller', status: 'Comment open' },
		{ section: 'Inline XBRL facts', owner: 'SEC reporting', status: '2 warnings' },
		{ section: 'Certifications', owner: 'CEO / CFO', status: 'Waiting' }
	];

	const traceNodes = nimbusScenario.traceNodes;
	const landingHeroAlt =
		'Editorial accounting cycle workspace showing invoices, ledgers, statements, audit evidence, and filing';
	const entryPreviewItems = [
		{
			label: 'Learn',
			icon: BookOpen,
			detail: 'Short lessons explain the accounting question before the demo asks you to act.'
		},
		{
			label: 'Watch',
			icon: Eye,
			detail: 'Artifacts update step by step so the flow is visible before it becomes interactive.'
		},
		{
			label: 'Trace',
			icon: GitBranch,
			detail: 'Every important number points backward to evidence and forward to reporting.'
		}
	] satisfies { label: string; icon: IconComponent; detail: string }[];

	let landingVisible = $state(true);
	let activeIndex = $state(0);
	let activeTocId = $state('home-node');
	let mode: Mode = $state('watch');
	let demoStep = $state(0);
	let theme: Theme = $state('night');
	let sidebarOpen = $state(false);
	let expandedSections = $state<string[]>(['basics']);
	let flyoutSection = $state<string | null>(null);
	let flyoutY = $state(0);
	let selectedEquationExampleId = $state(accountingEquationExamples[0].id);
	let selectedAccountTypeId = $state(accountTypeCards[0].id);
	let selectedBasisExampleId = $state(cashAccrualComparisons[0].id);
	let selectedSetupAreaId = $state('accounts');
	let selectedEventId = $state('subscription-contract');
	let selectedLane: EventLane | null = $state(null);
	let selectedEvidenceDocId = $state('C-1001');
	let selectedJudgmentStepIndex = $state(0);
	let selectedTreatment = $state('over-time');
	let selectedSubledger: SubledgerTab = $state('revenue');
	let selectedJournalId = $state('JE-1003');
	let postedJournalIds = $state<string[]>([]);
	let selectedLedgerAccount = $state('Cash');
	let statementTab: StatementTab = $state('balance');
	let disclosureTab: DisclosureTab = $state('revenue');
	let traceIndex = $state(0);
	let cashFocus = $state(0);
	let selectedAuditId = $state('REV-01');
	let issueResolved = $state(false);
	let supportVisible = $state(false);
	let filingStep = $state(0);

	const activeStage = $derived(stages[activeIndex]);
	const ActiveIcon = $derived(activeStage.icon);
	const selectedEquationExample = $derived(
		accountingEquationExamples.find((example) => example.id === selectedEquationExampleId) ??
			accountingEquationExamples[0]
	);
	const selectedAccountType = $derived(
		accountTypeCards.find((card) => card.id === selectedAccountTypeId) ?? accountTypeCards[0]
	);
	const selectedBasisExample = $derived(
		cashAccrualComparisons.find((example) => example.id === selectedBasisExampleId) ??
			cashAccrualComparisons[0]
	);
	const landingHeroSrc = $derived.by(() =>
		asset(
			theme === ('day' as Theme)
				? '/images/accounting-cycle-hero-light.png'
				: '/images/accounting-cycle-hero-dark.png'
		)
	);
	const selectedSetupArea = $derived(
		setupAreas.find((area) => area.id === selectedSetupAreaId) ?? setupAreas[0]
	);
	const selectedEvent = $derived(
		eventQueue.find((event) => event.id === selectedEventId) ?? eventQueue[0]
	);
	const selectedEvidenceDoc = $derived(
		evidenceDocs.find((doc) => doc.id === selectedEvidenceDocId) ?? evidenceDocs[0]
	);
	const selectedJudgmentStep = $derived(
		judgmentSteps[selectedJudgmentStepIndex] ?? judgmentSteps[0]
	);
	const selectedLaneIsCorrect = $derived(selectedLane === selectedEvent.lane);
	const selectedSubledgerMeta = $derived(
		subledgerTabs.find((tab) => tab.id === selectedSubledger) ?? subledgerTabs[0]
	);
	const selectedJournalEntry = $derived(
		journalEntries.find((entry) => entry.id === selectedJournalId) ?? journalEntries[0]
	);
	const selectedJournalDebitTotal = $derived(
		selectedJournalEntry.lines.reduce((total, line) => total + line.debit, 0)
	);
	const selectedJournalCreditTotal = $derived(
		selectedJournalEntry.lines.reduce((total, line) => total + line.credit, 0)
	);
	const selectedJournalPosted = $derived(postedJournalIds.includes(selectedJournalEntry.id));
	const selectedLedger = $derived(
		ledgerAccounts.find((ledger) => ledger.account === selectedLedgerAccount) ?? ledgerAccounts[0]
	);
	const activeDisclosure = $derived(
		disclosures.find((disclosure) => disclosure.id === disclosureTab) ?? disclosures[0]
	);
	const selectedAudit = $derived(
		auditRequests.find((request) => request.id === selectedAuditId) ?? auditRequests[0]
	);
	const activeDemoSteps = $derived(demoStepsFor(activeStage));
	const activeDemoStep = $derived(activeDemoSteps[demoStep] ?? activeDemoSteps[0]);
	const statementSections = $derived.by(() => {
		if (statementTab === 'income') return incomeStatement;
		if (statementTab === 'cash') return cashFlowStatement;
		if (statementTab === 'equity') return equityStatement;
		return balanceSections;
	});
	const trialDebitTotal = $derived(trialBalanceRows.reduce((total, row) => total + row.debit, 0));
	const trialCreditTotal = $derived(trialBalanceRows.reduce((total, row) => total + row.credit, 0));

	function money(value: number) {
		const absolute = Math.abs(value).toLocaleString('en-US', {
			maximumFractionDigits: 0
		});
		return value < 0 ? `(${absolute})` : absolute;
	}

	function signedMoney(value: number) {
		if (value === 0) return '0';
		return value < 0 ? `(${money(value)})` : money(value);
	}

	function percent(current: number, prior: number) {
		if (prior === 0) return 'n/a';
		const change = ((current - prior) / Math.abs(prior)) * 100;
		return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
	}

	function firstTocIdForStage(index: number) {
		for (const section of tocSections) {
			if (section.stageIndex === index) return section.id;

			const child = section.children?.find((item) => item.stageIndex === index);

			if (child) return child.id;
		}

		return tocSections[0].id;
	}

	function sectionIdForTocId(tocId: string) {
		for (const section of tocSections) {
			if (section.id === tocId || section.children?.some((item) => item.id === tocId)) {
				return section.id;
			}
		}

		return undefined;
	}

	function expandTocForItem(tocId: string) {
		const sectionId = sectionIdForTocId(tocId);
		const section = tocSections.find((item) => item.id === sectionId);

		if (sectionId && section?.children && !expandedSections.includes(sectionId)) {
			expandedSections = [...expandedSections, sectionId];
		}
	}

	function chooseStage(index: number, tocId = firstTocIdForStage(index), expand = true) {
		activeIndex = index;
		activeTocId = tocId;
		demoStep = 0;
		traceIndex = 0;
		supportVisible = false;
		issueResolved = false;
		applyDemoState(stages[index].id, 0);
		if (mode === 'do') {
			resetPracticeState(stages[index].id);
		}
		if (expand) expandTocForItem(tocId);
		flyoutSection = null;
		void resetWorkspaceScroll();
	}

	async function resetWorkspaceScroll() {
		await tick();
		document.querySelector('.lesson-panel')?.scrollTo({ top: 0 });
		document.querySelector('.process-panel')?.scrollTo({ top: 0 });
	}

	function isTocActive(item: TocItem) {
		return (
			item.stageIndex === activeIndex ||
			(item.children?.some((child) => child.stageIndex === activeIndex) ?? false)
		);
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
		flyoutSection = null;
	}

	function navigateToc(item: TocItem) {
		if (item.children) {
			const wasExpanded = expandedSections.includes(item.id);

			if (item.stageIndex !== undefined) {
				chooseStage(item.stageIndex, item.id, false);
			}

			expandedSections = wasExpanded
				? expandedSections.filter((sectionId) => sectionId !== item.id)
				: [...expandedSections, item.id];
			return;
		}

		if (item.stageIndex !== undefined) {
			chooseStage(item.stageIndex, item.id);
			closeSidebarOnSmallScreen();
		}
	}

	function closeSidebarOnSmallScreen() {
		if (window.innerWidth < 1100) {
			sidebarOpen = false;
		}
	}

	function openFlyout(sectionId: string, event: MouseEvent) {
		const button = event.currentTarget as HTMLElement;
		flyoutY = button.getBoundingClientRect().top;
		flyoutSection = sectionId;
	}

	function closeFlyout() {
		flyoutSection = null;
	}

	function nextStage() {
		if (activeIndex < stages.length - 1) {
			chooseStage(activeIndex + 1);
		}
	}

	function previousStage() {
		if (activeIndex > 0) {
			chooseStage(activeIndex - 1);
		}
	}

	function startHere() {
		landingVisible = false;
		chooseStage(0, 'home-node');
	}

	function beginBasics() {
		chooseStage(stageIndexForId('accounting-equation'), 'accounting-equation-node');
	}

	function returnToLanding() {
		landingVisible = true;
		flyoutSection = null;
	}

	function demoStepsFor(stage: Stage): DemoStep[] {
		if (stage.id === 'home') {
			return [
				{
					label: 'Start with evidence',
					detail:
						'A $12,000 invoice is not a final reporting number yet. It begins as a supported business event.'
				},
				{
					label: 'Record the obligation',
					detail:
						'The supported invoice creates AR and deferred revenue because Nimbus still owes future service.'
				},
				{
					label: 'Report and file',
					detail:
						'One month becomes revenue, the remaining liability flows to statements, notes, tie-out, and filing facts.'
				}
			];
		}

		if (stage.id.endsWith('-overview')) {
			return [
				{ label: 'Orient', detail: stage.watchPrompt },
				{
					label: 'Inspect the artifacts',
					detail:
						'The roadmap highlights the documents, records, controls, and reporting objects this section will use.'
				},
				{
					label: 'Follow the trace',
					detail:
						'The same transaction remains connected to source evidence, accounting judgment, ledgers, reports, and review evidence.'
				}
			];
		}

		if (stage.id === 'accounting-equation') {
			return accountingEquationExamples.map((example) => ({
				label: example.label,
				detail: `${example.resources} ${example.claims}`
			}));
		}

		if (stage.id === 'account-types') {
			return accountTypeCards.map((card) => ({
				label: card.label,
				detail: `${card.question} Normal balance: ${card.normalBalance}.`
			}));
		}

		if (stage.id === 'cash-vs-accrual') {
			return cashAccrualComparisons.map((example) => ({
				label: example.event,
				detail: example.whyItMatters
			}));
		}

		if (stage.id === 'setup') {
			return setupAreas.map((area) => ({
				label: area.label,
				detail: area.detail
			}));
		}

		if (stage.id === 'events') {
			return eventQueue.map((event) => ({
				label: event.event,
				detail: `${event.accountingQuestion} Classification: ${event.lane}.`
			}));
		}

		if (stage.id === 'evidence') {
			return evidenceDocs.map((doc) => ({
				label: doc.type,
				detail: `${doc.id} captures ${doc.field.toLowerCase()} and supports the audit trail.`
			}));
		}

		if (stage.id === 'judgment') {
			return judgmentSteps.map((step) => ({
				label: step.label,
				detail: step.question
			}));
		}

		if (stage.id === 'subledger') {
			return subledgerTabs.map((tab) => ({
				label: tab.label,
				detail: tab.result
			}));
		}

		if (stage.id === 'journal') {
			return journalEntries.map((entry) => ({
				label: entry.id,
				detail: `${entry.title}: ${entry.purpose}`
			}));
		}

		if (stage.id === 'ledger') {
			return ledgerAccounts.map((ledger) => ({
				label: ledger.account,
				detail: `Inspect postings into ${ledger.account} and reconcile the ending balance.`
			}));
		}

		if (stage.id === 'trial') {
			return [
				{
					label: 'Import the adjusted ledger',
					detail:
						'Each account balance is pulled from the GL after subledger and close entries post.'
				},
				{
					label: 'Check equality',
					detail: 'Total debits must equal total credits before mapping to statements.'
				},
				{
					label: 'Resolve review flags',
					detail: 'Open items stay visible even when the trial balance mathematically balances.'
				}
			];
		}

		return [
			{ label: 'Open the artifact', detail: stage.watchPrompt },
			{
				label: 'Apply the accounting step',
				detail:
					'The workbench updates the selected accounting artifact and exposes the downstream effect.'
			},
			{
				label: 'Check the trace',
				detail:
					'The number, document, or decision is ready to be followed forward or backward in the cycle.'
			}
		];
	}

	function applyDemoState(stageId: StageId, step: number) {
		supportVisible = step > 1;
		issueResolved = false;
		traceIndex = Math.min(step, traceNodes.length - 1);

		if (stageId === 'setup') {
			selectedSetupAreaId =
				setupAreas[Math.min(step, setupAreas.length - 1)]?.id ?? selectedSetupAreaId;
			supportVisible = step > 1;
		}

		if (stageId === 'accounting-equation') {
			selectedEquationExampleId =
				accountingEquationExamples[Math.min(step, accountingEquationExamples.length - 1)]?.id ??
				selectedEquationExampleId;
			supportVisible = step > 1;
		}

		if (stageId === 'account-types') {
			selectedAccountTypeId =
				accountTypeCards[Math.min(step, accountTypeCards.length - 1)]?.id ?? selectedAccountTypeId;
			supportVisible = step > 1;
		}

		if (stageId === 'cash-vs-accrual') {
			selectedBasisExampleId =
				cashAccrualComparisons[Math.min(step, cashAccrualComparisons.length - 1)]?.id ??
				selectedBasisExampleId;
			supportVisible = step > 1;
		}

		if (stageId === 'events') {
			const event = eventQueue[Math.min(step, eventQueue.length - 1)] ?? eventQueue[0];
			selectedEventId = event.id;
			selectedLane = event.lane;
			issueResolved = true;
		}

		if (stageId === 'evidence') {
			selectedEvidenceDocId =
				evidenceDocs[Math.min(step, evidenceDocs.length - 1)]?.id ?? selectedEvidenceDocId;
			supportVisible = step > 1;
		}

		if (stageId === 'trial' || stageId === 'mapping') {
			supportVisible = step > 0;
		}

		if (stageId === 'judgment') {
			selectedJudgmentStepIndex = Math.min(step, judgmentSteps.length - 1);
			selectedTreatment = step > 3 ? 'over-time' : 'immediate';
		}

		if (stageId === 'journal') {
			const entry = journalEntries[Math.min(step, journalEntries.length - 1)] ?? journalEntries[0];
			selectedJournalId = entry.id;
			postedJournalIds = journalEntries.slice(0, step + 1).map((journalEntry) => journalEntry.id);
			issueResolved = postedJournalIds.includes('JE-1003') && postedJournalIds.includes('JE-1005');
		}

		if (stageId === 'subledger') {
			selectedSubledger =
				subledgerTabs[Math.min(step, subledgerTabs.length - 1)]?.id ?? selectedSubledger;
		}

		if (
			stageId === 'matching' ||
			stageId === 'cutoff' ||
			stageId === 'adjustments' ||
			stageId === 'reconciliations' ||
			stageId === 'tie-out' ||
			stageId === 'controls'
		) {
			issueResolved = step > 1;
		}

		if (stageId === 'ledger') {
			selectedLedgerAccount =
				ledgerAccounts[Math.min(step, ledgerAccounts.length - 1)]?.account ?? selectedLedgerAccount;
		}

		if (stageId === 'statements') {
			statementTab = ['balance', 'income', 'cash', 'equity'][Math.min(step, 3)] as StatementTab;
		}

		if (stageId === 'cash-flow') {
			cashFocus = Math.min(step, cashBridge.length - 1);
		}

		if (stageId === 'disclosures') {
			disclosureTab = disclosures[Math.min(step, disclosures.length - 1)]?.id ?? disclosureTab;
		}

		if (stageId === 'audit') {
			selectedAuditId =
				auditRequests[Math.min(step, auditRequests.length - 1)]?.id ?? selectedAuditId;
		}

		if (stageId === 'filing') {
			filingStep = Math.min(step, filingSections.length - 1);
		}
	}

	function setDemoMode(nextMode: Mode) {
		mode = nextMode;
		demoStep = 0;
		applyDemoState(activeStage.id, 0);
		if (nextMode === 'do') {
			resetPracticeState(activeStage.id);
		}
	}

	function resetPracticeState(stageId: StageId) {
		if (stageId === 'events') {
			selectedLane = null;
			issueResolved = false;
		}

		if (stageId === 'judgment') {
			selectedTreatment = 'immediate';
			issueResolved = false;
		}

		if (stageId === 'journal') {
			postedJournalIds = [];
			selectedJournalId = 'JE-1003';
			issueResolved = false;
		}
	}

	function setDemoStep(nextStep: number) {
		demoStep = Math.max(0, Math.min(nextStep, activeDemoSteps.length - 1));
		applyDemoState(activeStage.id, demoStep);
	}

	function resetDemo() {
		setDemoStep(0);
		if (mode === 'do') {
			resetPracticeState(activeStage.id);
		}
	}

	function checkPractice() {
		issueResolved =
			activeStage.id === 'events'
				? selectedLaneIsCorrect
				: activeStage.id === 'judgment'
					? selectedTreatment === 'over-time'
					: activeStage.id === 'journal'
						? postedJournalIds.includes('JE-1003') && postedJournalIds.includes('JE-1005')
						: true;
		supportVisible = true;

		if (activeStage.id === 'journal') {
			selectedLedgerAccount = 'Deferred revenue';
		}
	}

	function showPracticeAnswer() {
		if (activeStage.id === 'events') {
			selectedLane = selectedEvent.lane;
			issueResolved = true;
			supportVisible = true;
			return;
		}

		if (activeStage.id === 'judgment') {
			selectedTreatment = 'over-time';
			issueResolved = true;
			supportVisible = true;
			return;
		}

		if (activeStage.id === 'journal') {
			postedJournalIds = ['JE-1003', 'JE-1004', 'JE-1005'];
			selectedJournalId = 'JE-1005';
			issueResolved = true;
			supportVisible = true;
			return;
		}

		setDemoStep(activeDemoSteps.length - 1);
		checkPractice();
	}

	function toggleJournalPosting(entryId: string) {
		postedJournalIds = postedJournalIds.includes(entryId)
			? postedJournalIds.filter((postedId) => postedId !== entryId)
			: [...postedJournalIds, entryId];
		issueResolved = postedJournalIds.includes('JE-1003') && postedJournalIds.includes('JE-1005');
	}

	function openSelectedJournalLedger() {
		const lineWithLedger = selectedJournalEntry.lines.find((line) =>
			ledgerAccounts.some((ledger) => ledger.account === line.account)
		);
		const ledgerIndex = stages.findIndex((stage) => stage.id === 'ledger');

		if (lineWithLedger) {
			selectedLedgerAccount = lineWithLedger.account;
		}

		if (ledgerIndex >= 0) {
			chooseStage(ledgerIndex);
		}
	}

	onMount(() => {
		sidebarOpen = window.innerWidth >= 1100;
	});
</script>

<svelte:head>
	<title>Accounting Cycle Simulator</title>
	<meta
		name="description"
		content="An interactive accounting cycle simulator that traces business events through close, statements, disclosures, controls, audit evidence, and a mock filing."
	/>
	<meta name="theme-color" content={theme === 'day' ? '#f3efe4' : '#101213'} />
</svelte:head>

{#snippet tocIcon(item: TocItem, active: boolean, size: number)}
	{@const Icon = item.icon}
	<Icon {size} strokeWidth={active ? 2.5 : 2} />
{/snippet}

{#snippet statusPill(status: string)}
	<span
		class={[
			'status-pill',
			status.includes('Open') ||
			status.includes('Broken') ||
			status.includes('Flagged') ||
			status.includes('warning')
				? 'warning'
				: status.includes('Tied') ||
					  status.includes('Ready') ||
					  status.includes('Effective') ||
					  status.includes('Reviewed')
					? 'good'
					: 'neutral'
		]}
	>
		{status}
	</span>
{/snippet}

{#snippet statementTable(sections: StatementSection[])}
	<div class="statement-table">
		<div class="statement-head">
			<span>($ in thousands)</span>
			<span>Jan 2026</span>
			<span>Dec 2025</span>
			<span>Variance</span>
			<span>Note</span>
		</div>

		{#each sections as section (section.title)}
			<div class="statement-section-title">{section.title}</div>
			{#each section.rows as row (row.label)}
				<button
					type="button"
					class={['statement-row', row.total && 'total-row']}
					onclick={() => (supportVisible = true)}
				>
					<span>{row.label}</span>
					<strong>{money(row.current)}</strong>
					<span>{money(row.prior)}</span>
					<span>{percent(row.current, row.prior)}</span>
					<span>{row.note ?? '--'}</span>
				</button>
			{/each}
		{/each}
	</div>
{/snippet}

<main class="simulator" data-theme={theme}>
	{#if !landingVisible}
		<header class="masthead">
			<button
				class="brand"
				type="button"
				aria-label="Return to landing page"
				onclick={returnToLanding}
			>
				<Calculator size={19} strokeWidth={2.4} />
				<strong>Accounting Cycle Simulator</strong>
			</button>

			<button
				class="theme-toggle"
				type="button"
				aria-label={theme === 'day' ? 'Switch to night theme' : 'Switch to day theme'}
				onclick={() => (theme = theme === 'day' ? 'night' : 'day')}
			>
				{#if theme === 'day'}
					<Moon size={17} strokeWidth={2.4} />
				{:else}
					<Sun size={17} strokeWidth={2.4} />
				{/if}
			</button>
		</header>
	{:else}
		<button
			class="theme-toggle theme-toggle-floating"
			type="button"
			aria-label={theme === 'day' ? 'Switch to night theme' : 'Switch to day theme'}
			onclick={() => (theme = theme === 'day' ? 'night' : 'day')}
		>
			{#if theme === 'day'}
				<Moon size={17} strokeWidth={2.4} />
			{:else}
				<Sun size={17} strokeWidth={2.4} />
			{/if}
		</button>
	{/if}

	{#if landingVisible}
		<section class="entry-page" aria-labelledby="entry-title">
			<section class="entry-hero">
				{#if landingHeroSrc}
					<img
						class="entry-hero-image"
						src={landingHeroSrc}
						alt={landingHeroAlt}
						fetchpriority="high"
					/>
				{:else}
					<div class="entry-hero-fallback" aria-hidden="true">
						<div class="entry-ledger-sheet">
							<span>INV-1001</span>
							<strong>{nimbusScenario.primaryAmountLabel}</strong>
							<div></div>
							<div></div>
							<div></div>
						</div>
						<div class="entry-close-board">
							<span>Adjusted TB</span>
							<strong>Balanced</strong>
							<div class="entry-mini-table">
								<i></i><i></i><i></i><i></i><i></i><i></i>
							</div>
						</div>
						<div class="entry-filing-card">
							<span>Mock 10-Q</span>
							<strong>Tagged</strong>
							<small>Service revenue</small>
						</div>
					</div>
				{/if}

				<div class="entry-hero-overlay"></div>
				<div class="entry-hero-content">
					<div class="entry-hero-brand">
						<h1 id="entry-title">Accounting Cycle Simulator</h1>
					</div>
					<p>
						Learn the full accounting cycle through one company close: source documents, judgment,
						journals, ledgers, reconciliations, statements, controls, audit evidence, and filing.
					</p>
					<button type="button" class="entry-cta" onclick={startHere}>
						<span>Start here</span>
						<ArrowRight size={18} strokeWidth={2.6} />
					</button>
				</div>
			</section>

			<section class="entry-preview" aria-label="What the simulator teaches">
				<div class="entry-preview-copy">
					<small>{nimbusScenario.company} - {nimbusScenario.period}</small>
					<strong>{nimbusScenario.primaryAmountLabel} from source evidence to filing fact</strong>
				</div>

				<div class="entry-preview-items">
					{#each entryPreviewItems as item (item.label)}
						{@const PreviewIcon = item.icon}
						<div>
							<PreviewIcon class="entry-preview-icon" size={18} strokeWidth={2.4} />
							<strong>{item.label}</strong>
							<span>{item.detail}</span>
						</div>
					{/each}
				</div>

				<div class="entry-author">
					<p>Created by <strong>Eli Aboutorabi</strong></p>
					<nav class="entry-author-links" aria-label="Author links">
						<a href="https://eliaboutorabi.github.io/" target="_blank" rel="noreferrer">
							<Globe size={16} strokeWidth={2.3} aria-hidden="true" />
							<span>Homepage</span>
						</a>
						<a href="https://github.com/eliaboutorabi" target="_blank" rel="noreferrer">
							<svg
								class="entry-author-brand-icon"
								viewBox="0 0 16 16"
								aria-hidden="true"
								focusable="false"
							>
								<path
									d="M8 0C3.58 0 0 3.66 0 8.18c0 3.62 2.29 6.69 5.47 7.77.4.08.55-.18.55-.39 0-.19-.01-.84-.01-1.51-2.01.38-2.53-.5-2.69-.96-.09-.24-.48-.96-.82-1.15-.28-.16-.68-.55-.01-.56.63-.01 1.08.59 1.23.84.72 1.24 1.87.89 2.33.68.07-.53.28-.89.51-1.09-1.78-.2-3.64-.9-3.64-4.02 0-.89.31-1.61.82-2.18-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.83A7.36 7.36 0 0 1 8 4.02c.68 0 1.36.09 2 .27 1.53-1.05 2.2-.83 2.2-.83.44 1.12.16 1.95.08 2.16.51.57.82 1.29.82 2.18 0 3.13-1.87 3.82-3.65 4.02.29.26.54.75.54 1.52 0 1.09-.01 1.97-.01 2.24 0 .21.15.47.55.39A8.05 8.05 0 0 0 16 8.18C16 3.66 12.42 0 8 0Z"
								/>
							</svg>
							<span>GitHub</span>
						</a>
						<a
							href="https://www.linkedin.com/in/elham-aboutorabi/"
							target="_blank"
							rel="noreferrer"
						>
							<svg
								class="entry-author-brand-icon"
								viewBox="0 0 16 16"
								aria-hidden="true"
								focusable="false"
							>
								<path
									d="M14.8 0H1.2C.54 0 0 .54 0 1.2v13.6c0 .66.54 1.2 1.2 1.2h13.6c.66 0 1.2-.54 1.2-1.2V1.2c0-.66-.54-1.2-1.2-1.2ZM4.75 13.6H2.37V6h2.38v7.6ZM3.56 4.96a1.38 1.38 0 1 1 0-2.76 1.38 1.38 0 0 1 0 2.76ZM13.63 13.6h-2.37V9.9c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.95v3.77H6.24V6h2.28v1.04h.03c.32-.6 1.09-1.23 2.24-1.23 2.4 0 2.84 1.58 2.84 3.63v4.16Z"
								/>
							</svg>
							<span>LinkedIn</span>
						</a>
					</nav>
				</div>
			</section>
		</section>
	{:else}
		{#if sidebarOpen}
			<button
				class="sidebar-backdrop"
				type="button"
				aria-label="Close contents"
				onclick={toggleSidebar}
			></button>
		{/if}

		{#if flyoutSection && !sidebarOpen}
			<button
				class="flyout-backdrop"
				type="button"
				aria-label="Close contents flyout"
				onclick={closeFlyout}
			></button>
		{/if}

		<aside class="toc-drawer" class:open={sidebarOpen} aria-label="Accounting cycle contents">
			<div class="toc-header">
				<span>Contents</span>
				<button type="button" aria-label="Collapse contents" onclick={toggleSidebar}>
					<PanelLeftClose size={16} strokeWidth={2.2} />
				</button>
			</div>

			<nav class="toc-list">
				{#each tocSections as section (section.id)}
					{@const active = isTocActive(section)}
					<div class="toc-group">
						<div class={['toc-item', active && 'active']}>
							<button type="button" class="toc-main" onclick={() => navigateToc(section)}>
								{@render tocIcon(section, active, 16)}
								<span>{section.label}</span>
								{#if section.children}
									<ChevronRight
										size={13}
										strokeWidth={2.2}
										style={`transform: ${expandedSections.includes(section.id) ? 'rotate(90deg)' : 'rotate(0deg)'}`}
									/>
								{/if}
							</button>
						</div>

						{#if section.children && expandedSections.includes(section.id)}
							<div class="toc-children">
								{#each section.children as child (child.id)}
									{@const childActive = activeTocId === child.id}
									<button
										type="button"
										class={['toc-child', childActive && 'active']}
										onclick={() => navigateToc(child)}
									>
										{@render tocIcon(child, childActive, 13)}
										<span>{child.label}</span>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</nav>
		</aside>

		{#if !sidebarOpen}
			<aside class="toc-rail" aria-label="Collapsed accounting cycle contents">
				<button
					type="button"
					class="rail-toggle"
					aria-label="Expand contents"
					onclick={toggleSidebar}
				>
					<PanelLeft size={17} strokeWidth={2.2} />
				</button>

				{#each tocSections as section (section.id)}
					{@const active = isTocActive(section)}
					<button
						type="button"
						class={['rail-item', active && 'active']}
						aria-label={section.label}
						onclick={(event) => openFlyout(section.id, event)}
						onmouseenter={(event) => openFlyout(section.id, event)}
					>
						{@render tocIcon(section, active, 17)}
					</button>
				{/each}
			</aside>

			{#if flyoutSection}
				{@const section = tocSections.find((item) => item.id === flyoutSection)}
				{#if section}
					<div
						class="toc-flyout"
						role="menu"
						tabindex="-1"
						style:top={`${flyoutY}px`}
						onmouseleave={closeFlyout}
					>
						<button type="button" class="flyout-title" onclick={() => navigateToc(section)}>
							{@render tocIcon(section, isTocActive(section), 15)}
							<span>{section.label}</span>
						</button>

						{#if section.children}
							<div class="flyout-children">
								{#each section.children as child (child.id)}
									{@const childActive = activeTocId === child.id}
									<button
										type="button"
										class={['flyout-child', childActive && 'active']}
										onclick={() => navigateToc(child)}
									>
										{@render tocIcon(child, childActive, 12)}
										<span>{child.label}</span>
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			{/if}
		{/if}

		<div
			class={['content-shell', !sidebarOpen && 'sidebar-compact']}
			style:margin-left={sidebarOpen ? 'var(--sidebar-width)' : 'var(--sidebar-collapsed-width)'}
		>
			<section class="workspace-shell">
				<aside
					class={['lesson-panel', activeStage.id === 'home' && 'landing-panel']}
					aria-labelledby="lesson-title"
				>
					{#if activeStage.id === 'home'}
						<section class="landing-copy">
							<div class="lesson-kicker">
								<span><Workflow size={15} strokeWidth={2.5} /> Accounting cycle simulator</span>
							</div>

							<h1 id="lesson-title">Close the books without losing the trail.</h1>
							<p class="landing-lede">{nimbusScenario.introduction}</p>

							<div class="landing-actions">
								<button type="button" class="landing-primary" onclick={beginBasics}>
									<span>Begin with basics</span>
									<ArrowRight size={17} strokeWidth={2.5} />
								</button>
								<button type="button" class="landing-secondary" onclick={() => (traceIndex = 7)}>
									<GitBranch size={16} strokeWidth={2.4} />
									<span>Preview trace</span>
								</button>
							</div>

							<div class="landing-stats" aria-label="Simulator scenario">
								{#each landingStats as stat (stat.label)}
									<div>
										<small>{stat.label}</small>
										<strong>{stat.value}</strong>
										<span>{stat.detail}</span>
									</div>
								{/each}
							</div>

							<div class="landing-route">
								<div>
									<Eye size={17} strokeWidth={2.4} />
									<span
										>Watch each artifact update in sequence before you try the accounting move.</span
									>
								</div>
								<div>
									<Hand size={17} strokeWidth={2.4} />
									<span>Switch demos into practice mode as the simulator becomes editable.</span>
								</div>
								<div>
									<SearchCheck size={17} strokeWidth={2.4} />
									<span>Trace any reported number backward to the support that justifies it.</span>
								</div>
							</div>
						</section>
					{:else}
						<div class="lesson-kicker">
							<span
								><ActiveIcon size={15} strokeWidth={2.5} /> Step {String(activeIndex).padStart(
									2,
									'0'
								)}</span
							>
						</div>

						<h1 id="lesson-title">{activeStage.title}</h1>
						<p class="question">{activeStage.question}</p>

						<div class="lesson-block">
							<h2><BookOpen size={16} strokeWidth={2.3} /> Lesson</h2>
							<p>{activeStage.lesson}</p>
						</div>

						<div class="lesson-block">
							<h2><ClipboardCheck size={16} strokeWidth={2.3} /> What to notice</h2>
							<ul>
								{#each activeStage.notice as point (point)}
									<li>{point}</li>
								{/each}
							</ul>
						</div>

						<div class="lesson-block">
							<h2><BadgeCheck size={16} strokeWidth={2.3} /> Example</h2>
							<p>{activeStage.example}</p>
						</div>

						<div class="lesson-block">
							<h2><AlertTriangle size={16} strokeWidth={2.3} /> Common mistake</h2>
							<p>{activeStage.mistake}</p>
						</div>

						<div class="key-point">
							<strong>Key point</strong>
							<span>{activeStage.keyPoint}</span>
						</div>
					{/if}
				</aside>

				<section class="process-panel" aria-label={activeStage.workspace}>
					{#if activeStage.id !== 'home'}
						<div class="process-header">
							<div class="artifact-title">
								<span class="artifact-icon"><ActiveIcon size={20} strokeWidth={2.4} /></span>
								<span>
									<small>{activeStage.workspace}</small>
									<strong>{nimbusScenario.company} - {nimbusScenario.period}</strong>
								</span>
							</div>

							<div class="demo-toolbar">
								<div class="mode-switch" aria-label="Demo mode">
									<button
										type="button"
										class={mode === 'watch' ? 'active' : ''}
										aria-pressed={mode === 'watch'}
										onclick={() => setDemoMode('watch')}
									>
										<Eye size={15} strokeWidth={2.4} />
										Watch
									</button>
									<button
										type="button"
										class={mode === 'do' ? 'active' : ''}
										aria-pressed={mode === 'do'}
										onclick={() => setDemoMode('do')}
									>
										<Hand size={15} strokeWidth={2.4} />
										Do
									</button>
								</div>

								{#if mode === 'watch'}
									<div class="step-controls" aria-label="Watch controls">
										<button
											type="button"
											onclick={() => setDemoStep(demoStep - 1)}
											disabled={demoStep === 0}
										>
											<ArrowLeft size={14} strokeWidth={2.4} />
										</button>
										<span>{demoStep + 1} / {activeDemoSteps.length}</span>
										<button
											type="button"
											onclick={() => setDemoStep(demoStep + 1)}
											disabled={demoStep === activeDemoSteps.length - 1}
										>
											<ArrowRight size={14} strokeWidth={2.4} />
										</button>
										<button type="button" onclick={resetDemo} aria-label="Reset watch demo">
											<RotateCcw size={14} strokeWidth={2.4} />
										</button>
									</div>
								{/if}
							</div>
						</div>
					{/if}

					{#if activeStage.id !== 'home'}
						<div class={['demo-guidance', mode]}>
							<div>
								<small>{mode === 'watch' ? 'Watch step' : 'Do task'}</small>
								<strong
									>{mode === 'watch'
										? activeDemoStep.label
										: 'Practice the accounting move'}</strong
								>
								<p>{mode === 'watch' ? activeDemoStep.detail : activeStage.doPrompt}</p>
							</div>

							{#if mode === 'do'}
								<div class="practice-actions">
									<button type="button" onclick={checkPractice}>
										<CheckCircle2 size={15} strokeWidth={2.4} />
										Check
									</button>
									<button type="button" onclick={showPracticeAnswer}>Show answer</button>
									<button type="button" onclick={resetDemo} aria-label="Reset practice">
										<RotateCcw size={14} strokeWidth={2.4} />
									</button>
								</div>
							{/if}
						</div>
					{/if}

					<div class="artifact-body">
						{#if activeStage.id === 'home'}
							<section class="landing-workbench">
								<div class="landing-dossier">
									<div>
										<small>Scenario dossier</small>
										<h2>{nimbusScenario.company} - {nimbusScenario.period}</h2>
										<p>
											You are building the close file for a growing bike fleet company. The work
											starts with business evidence and ends with reportable, reviewable facts.
										</p>
									</div>
									<div class="landing-ledger-mini" aria-label="Opening accounting facts">
										{#each nimbusScenario.openingFacts as fact (fact.label)}
											<div><span>{fact.label}</span><strong>{fact.value}</strong></div>
										{/each}
									</div>
								</div>

								<div class="cycle-strip" aria-label="Accounting cycle sections">
									{#each landingCycle as step, index (step.label)}
										{@const StepIcon = step.icon}
										<button type="button" onclick={() => chooseStage(step.stage)}>
											<span>{String(index + 1).padStart(2, '0')}</span>
											<StepIcon size={19} strokeWidth={2.4} />
											<strong>{step.label}</strong>
											<small>{step.detail}</small>
										</button>
									{/each}
								</div>

								<div class="landing-trace">
									<div class="trace-preview-header">
										<div>
											<small>Trace preview</small>
											<strong>Pick any point in the chain</strong>
										</div>
										<span>{traceNodes[traceIndex].value}</span>
									</div>

									<div class="trace-preview-track">
										{#each traceNodes as node, index (node.label)}
											<button
												type="button"
												class={traceIndex === index ? 'active' : ''}
												aria-label={`Trace ${node.label}`}
												onclick={() => (traceIndex = index)}
											>
												<span>{String(index + 1).padStart(2, '0')}</span>
												<strong>{node.label}</strong>
											</button>
										{/each}
									</div>

									<div class="trace-detail-card">
										<GitBranch size={18} strokeWidth={2.4} />
										<div>
											<small>{traceNodes[traceIndex].value}</small>
											<strong>{traceNodes[traceIndex].label}</strong>
											<p>{traceNodes[traceIndex].detail}</p>
										</div>
									</div>
								</div>
							</section>
						{:else if activeStage.id === 'accounting-equation'}
							<section class="primer-workbench">
								<div class="primer-selector" aria-label="Accounting equation examples">
									{#each accountingEquationExamples as example (example.id)}
										<button
											type="button"
											class={selectedEquationExampleId === example.id ? 'active' : ''}
											onclick={() => (selectedEquationExampleId = example.id)}
										>
											<strong>{example.label}</strong>
											<span>{example.event}</span>
										</button>
									{/each}
								</div>

								<div class="primer-main-card">
									<small>Assets = liabilities + equity</small>
									<h3>{selectedEquationExample.label}</h3>
									<p>{selectedEquationExample.event}</p>
									<div class="equation-balance">
										<div>
											<span>Resources</span>
											<strong>{selectedEquationExample.resources}</strong>
										</div>
										<div class="equation-equals">=</div>
										<div>
											<span>Claims</span>
											<strong>{selectedEquationExample.claims}</strong>
										</div>
									</div>
									<div class="equation-line">{selectedEquationExample.equation}</div>
								</div>

								<aside class="primer-side-card">
									<small>Plain English first</small>
									<h3>What this means</h3>
									<p>{selectedEquationExample.beginnerMeaning}</p>
									<div class="setup-output">
										<span>Professional translation</span>
										<strong>{selectedEquationExample.professionalTranslation}</strong>
									</div>
									<div class="setup-risk">
										<AlertTriangle class="setup-risk-icon" size={16} strokeWidth={2.3} />
										<span
											>Balanced means connected. It does not prove the account, date, or policy is
											correct.</span
										>
									</div>
								</aside>

								<div class="concept-strip" aria-label="Beginner concept definitions">
									{#each primerTerms.slice(0, 4) as term (term.slug)}
										<div>
											<small>{term.shortDefinition}</small>
											<strong>{term.term}</strong>
											<span>{term.plainMeaning}</span>
										</div>
									{/each}
								</div>
							</section>
						{:else if activeStage.id === 'account-types'}
							<section class="primer-workbench">
								<div class="account-family-grid" aria-label="Account type cards">
									{#each accountTypeCards as card (card.id)}
										<button
											type="button"
											class={selectedAccountTypeId === card.id ? 'active' : ''}
											onclick={() => (selectedAccountTypeId = card.id)}
										>
											<strong>{card.label}</strong>
											<span>{card.question}</span>
											<em>{card.normalBalance} normal balance</em>
										</button>
									{/each}
								</div>

								<div class="primer-main-card">
									<small>{selectedAccountType.statementHome}</small>
									<h3>{selectedAccountType.label}</h3>
									<p>{selectedAccountType.plainMeaning}</p>
									<div class="account-type-facts">
										<div>
											<span>Normal balance</span><strong>{selectedAccountType.normalBalance}</strong
											>
										</div>
										<div>
											<span>Statement home</span><strong>{selectedAccountType.statementHome}</strong
											>
										</div>
									</div>
									<div class="setup-output">
										<span>Nimbus examples</span>
										<strong>{selectedAccountType.nimbusExample}</strong>
									</div>
								</div>

								<aside class="primer-side-card">
									<small>Common beginner trap</small>
									<h3>Do not memorize words alone</h3>
									<p>{selectedAccountType.commonMixup}</p>
									<div class="setup-risk">
										<AlertTriangle class="setup-risk-icon" size={16} strokeWidth={2.3} />
										<span>Always ask what changed before choosing an account family.</span>
									</div>
								</aside>

								<div class="concept-strip" aria-label="Account type concept definitions">
									{#each primerTerms.slice(1, 5) as term (term.slug)}
										<div>
											<small>{term.shortDefinition}</small>
											<strong>{term.term}</strong>
											<span>{term.plainMeaning}</span>
										</div>
									{/each}
								</div>
							</section>
						{:else if activeStage.id === 'cash-vs-accrual'}
							<section class="primer-workbench">
								<div class="primer-selector" aria-label="Cash and accrual timing examples">
									{#each cashAccrualComparisons as example (example.id)}
										<button
											type="button"
											class={selectedBasisExampleId === example.id ? 'active' : ''}
											onclick={() => (selectedBasisExampleId = example.id)}
										>
											<strong>{example.event}</strong>
											<span>{example.journalHint}</span>
										</button>
									{/each}
								</div>

								<div class="timing-lens-grid">
									<div class="primer-main-card">
										<small>Cash lens</small>
										<h3>Follow the money</h3>
										<p>{selectedBasisExample.cashView}</p>
									</div>
									<div class="primer-main-card">
										<small>Accrual lens</small>
										<h3>Follow the economic activity</h3>
										<p>{selectedBasisExample.accrualView}</p>
									</div>
								</div>

								<aside class="primer-side-card">
									<small>Why accountants care</small>
									<h3>{selectedBasisExample.event}</h3>
									<p>{selectedBasisExample.whyItMatters}</p>
									<div class="setup-output">
										<span>Journal instinct</span>
										<strong>{selectedBasisExample.journalHint}</strong>
									</div>
								</aside>

								<div class="concept-strip" aria-label="Timing concept definitions">
									{#each primerTerms.filter( (term) => ['revenue', 'deferred-revenue', 'cutoff'].includes(term.slug) ) as term (term.slug)}
										<div>
											<small>{term.shortDefinition}</small>
											<strong>{term.term}</strong>
											<span>{term.plainMeaning}</span>
										</div>
									{/each}
								</div>
							</section>
						{:else if activeStage.id.endsWith('-overview')}
							<section class="overview-workspace">
								<div class="overview-card">
									<small>{activeStage.group}</small>
									<strong>{activeStage.workspace}</strong>
									<p>{activeStage.lesson}</p>
								</div>
								<div class="overview-steps">
									{#each activeStage.notice as point, index (point)}
										<div>
											<span>{String(index + 1).padStart(2, '0')}</span>
											<p>{point}</p>
										</div>
									{/each}
								</div>
								<div class="trace-panel">
									<strong>What this section produces</strong>
									<p>{activeStage.keyPoint}</p>
								</div>
							</section>
						{:else if activeStage.id === 'setup'}
							<section class="setup-workbench">
								<div class="setup-control-plane">
									<div class="setup-area-list" aria-label="Company setup areas">
										{#each setupAreas as area (area.id)}
											{@const SetupIcon = area.icon}
											<button
												type="button"
												class={selectedSetupAreaId === area.id ? 'active' : ''}
												onclick={() => (selectedSetupAreaId = area.id)}
											>
												<SetupIcon class="setup-area-icon" size={17} strokeWidth={2.4} />
												<span>
													<strong>{area.label}</strong>
													<small>{area.status}</small>
												</span>
											</button>
										{/each}
									</div>

									<div class="setup-area-detail">
										<small>{selectedSetupArea.owner}</small>
										<h3>{selectedSetupArea.label}</h3>
										<p>{selectedSetupArea.detail}</p>
										<div class="setup-output">
											<span>Setup output</span>
											<strong>{selectedSetupArea.output}</strong>
										</div>
										<div class="setup-risk">
											<AlertTriangle class="setup-risk-icon" size={16} strokeWidth={2.3} />
											<span>{selectedSetupArea.risk}</span>
										</div>
									</div>
								</div>

								<div class="setup-readiness">
									{#each systemNodes as node (node.label)}
										<div class="system-node">
											<small>{node.label}</small>
											<strong>{node.value}</strong>
											<span>{node.detail}</span>
										</div>
									{/each}
								</div>

								<div class="workpaper-table compact">
									<table>
										<thead>
											<tr><th>Account</th><th>Type</th><th>Statement mapping</th><th>Status</th></tr
											>
										</thead>
										<tbody>
											{#each chartAccounts as row (row.account)}
												<tr>
													<td>{row.account}</td>
													<td>{row.type}</td>
													<td>{row.mapping}</td>
													<td>{@render statusPill(row.status)}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</section>
						{:else if activeStage.id === 'events'}
							<section class="event-board">
								<div class="event-list">
									{#each eventQueue as event (event.id)}
										<button
											type="button"
											class={['event-card', selectedEventId === event.id && 'active']}
											onclick={() => {
												selectedEventId = event.id;
												selectedLane = mode === 'watch' ? event.lane : null;
												issueResolved = mode === 'watch';
											}}
										>
											<small>{event.date}</small>
											<strong>{event.event}</strong>
											<span>{event.evidence}</span>
										</button>
									{/each}
								</div>
								<div class="event-docket">
									<small>{selectedEvent.date} - {selectedEvent.counterparty}</small>
									<h3>{selectedEvent.event}</h3>
									<div class="event-facts">
										<div><span>Amount</span><strong>{selectedEvent.amount}</strong></div>
										<div><span>Evidence</span><strong>{selectedEvent.evidence}</strong></div>
										<div><span>Control</span><strong>{selectedEvent.control}</strong></div>
									</div>
									<p>{selectedEvent.trigger}</p>
									<div class="event-question">
										<ClipboardCheck size={17} strokeWidth={2.4} />
										<span>{selectedEvent.accountingQuestion}</span>
									</div>
								</div>
								<div class="decision-panel">
									<small>Selected event</small>
									<h3>Classify the accounting response</h3>
									<div class="lane-grid">
										{#each triageLanes as lane (lane.label)}
											<button
												type="button"
												class={['lane', selectedLane === lane.label && 'active']}
												onclick={() => {
													selectedLane = lane.label;
													issueResolved = lane.label === selectedEvent.lane;
												}}
											>
												<strong>{lane.label}</strong>
												<span>{lane.description}</span>
											</button>
										{/each}
									</div>
									<div class="decision-outcome">
										<strong>
											{selectedLane
												? selectedLaneIsCorrect
													? 'Correct classification'
													: 'Needs review'
												: 'Choose a lane'}
										</strong>
										<p>
											{selectedLane
												? selectedLaneIsCorrect
													? selectedEvent.entryImpact
													: selectedEvent.answer
												: selectedEvent.accountingQuestion}
										</p>
										{@render statusPill(
											selectedLane
												? selectedLaneIsCorrect
													? 'Learner matched'
													: `Correct lane: ${selectedEvent.lane}`
												: 'Awaiting classification'
										)}
									</div>
								</div>
							</section>
						{:else if activeStage.id === 'evidence'}
							<section class="evidence-packet">
								<div class="document-stack">
									{#each evidenceDocs as doc (doc.id)}
										<button
											type="button"
											class={['document-row', selectedEvidenceDocId === doc.id && 'active']}
											onclick={() => (selectedEvidenceDocId = doc.id)}
										>
											<span>{doc.id}</span>
											<strong>{doc.type}</strong>
											<p>{doc.field}</p>
											{@render statusPill(doc.status)}
										</button>
									{/each}
								</div>
								<div class="evidence-review">
									<small>{selectedEvidenceDoc.source}</small>
									<h3>{selectedEvidenceDoc.type}</h3>
									<p>{selectedEvidenceDoc.auditUse}</p>
									<div class="extracted-fields">
										{#each selectedEvidenceDoc.extracted as field (field)}
											<span>{field}</span>
										{/each}
									</div>
								</div>
								<div class="packet-summary">
									<h3>Evidence packet completeness</h3>
									<div class="checklist">
										<span><CheckCircle2 size={15} /> Customer and contract identified</span>
										<span
											><CheckCircle2 size={15} /> Billing amount and service period extracted</span
										>
										<span><CheckCircle2 size={15} /> Cash receipt matched to bank line</span>
										<span><CheckCircle2 size={15} /> Revenue policy linked</span>
									</div>
									<button
										type="button"
										class="primary-action"
										onclick={() => (supportVisible = true)}
									>
										Mark packet ready
									</button>
									{#if supportVisible}
										<p class="success-note">
											Packet is ready for accounting interpretation and later audit trace.
										</p>
									{/if}
								</div>
							</section>
						{:else if activeStage.id === 'judgment'}
							<section class="judgment-tree">
								<div class="judgment-steps">
									{#each judgmentSteps as step, index (step.label)}
										<button
											type="button"
											class={['judgment-step', selectedJudgmentStepIndex === index && 'active']}
											onclick={() => (selectedJudgmentStepIndex = index)}
										>
											<span>{String(index + 1).padStart(2, '0')}</span>
											<strong>{step.label}</strong>
											<p>{step.result}</p>
										</button>
									{/each}
								</div>
								<div class="judgment-memo">
									<small>{selectedJudgmentStep.evidence}</small>
									<h3>{selectedJudgmentStep.question}</h3>
									<p>{selectedJudgmentStep.memo}</p>
									<div>
										<AlertTriangle size={16} strokeWidth={2.3} />
										<span>{selectedJudgmentStep.risk}</span>
									</div>
								</div>
								<div class="decision-panel">
									<small>Accounting treatment</small>
									<h3>How should Nimbus recognize the $12,000 contract?</h3>
									<div class="choice-stack">
										<button
											type="button"
											class={selectedTreatment === 'immediate' ? 'active' : ''}
											onclick={() => (selectedTreatment = 'immediate')}
										>
											Recognize all revenue immediately
										</button>
										<button
											type="button"
											class={selectedTreatment === 'over-time' ? 'active' : ''}
											onclick={() => (selectedTreatment = 'over-time')}
										>
											Defer and recognize over the service term
										</button>
									</div>
									<p>
										{selectedTreatment === 'over-time'
											? 'Correct. January recognizes $1,000 of service revenue and leaves $11,000 as deferred revenue.'
											: 'This would overstate January revenue and understate the remaining performance obligation.'}
									</p>
									<div class="mini-entry">
										<div><span>Debit</span><strong>Deferred revenue</strong><em>$1,000</em></div>
										<div><span>Credit</span><strong>Service revenue</strong><em>$1,000</em></div>
									</div>
								</div>
							</section>
						{:else if activeStage.id === 'subledger'}
							<section class="subledger-workspace">
								<div class="record-toolbar">
									<div>
										<small>Subledger source</small>
										<strong>{selectedSubledgerMeta.source}</strong>
									</div>
									<span>{selectedSubledgerMeta.label}</span>
								</div>
								<div class="tabs subledger-tabs">
									{#each subledgerTabs as tab (tab.id)}
										<button
											type="button"
											class={selectedSubledger === tab.id ? 'active' : ''}
											onclick={() => (selectedSubledger = tab.id)}
										>
											{tab.label}
										</button>
									{/each}
								</div>
								<div class="record-split">
									<div class="workpaper-table subledger-table">
										<table>
											{#if selectedSubledger === 'ar'}
												<thead>
													<tr>
														<th>Customer</th>
														<th>Invoice</th>
														<th>Current</th>
														<th>Past due</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													{#each arAging as row (row.invoice)}
														<tr>
															<td>{row.customer}</td>
															<td>{row.invoice}</td>
															<td>{money(row.current)}</td>
															<td>{money(row.pastDue)}</td>
															<td>{@render statusPill(row.status)}</td>
														</tr>
													{/each}
												</tbody>
											{:else if selectedSubledger === 'revenue'}
												<thead>
													<tr>
														<th>Month</th>
														<th>Billings</th>
														<th>Revenue</th>
														<th>Deferred ending</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													{#each revenueSchedule as row (row.month)}
														<tr>
															<td>{row.month}</td>
															<td>{money(row.billings)}</td>
															<td>{money(row.revenue)}</td>
															<td>{money(row.deferredEnding)}</td>
															<td>{@render statusPill(row.status)}</td>
														</tr>
													{/each}
												</tbody>
											{:else if selectedSubledger === 'inventory'}
												<thead>
													<tr>
														<th>SKU</th>
														<th>Receipt</th>
														<th>Units</th>
														<th>Unit cost</th>
														<th>Total</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													{#each inventoryLayers as row (row.receipt)}
														<tr>
															<td>{row.sku}</td>
															<td>{row.receipt}</td>
															<td>{row.units}</td>
															<td>{money(row.unitCost)}</td>
															<td>{money(row.total)}</td>
															<td>{@render statusPill(row.status)}</td>
														</tr>
													{/each}
												</tbody>
											{:else}
												<thead>
													<tr>
														<th>Vendor</th>
														<th>Bill</th>
														<th>Current</th>
														<th>Past due</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													{#each apAging as row (row.bill)}
														<tr>
															<td>{row.vendor}</td>
															<td>{row.bill}</td>
															<td>{money(row.current)}</td>
															<td>{money(row.pastDue)}</td>
															<td>{@render statusPill(row.status)}</td>
														</tr>
													{/each}
												</tbody>
											{/if}
										</table>
									</div>
									<aside class="record-note">
										<small>Subledger role</small>
										<h3>{selectedSubledgerMeta.label}</h3>
										<p>{selectedSubledgerMeta.result}</p>
										<div>
											<CheckCircle2 size={16} strokeWidth={2.4} />
											<span>{selectedSubledgerMeta.control}</span>
										</div>
									</aside>
								</div>
							</section>
						{:else if activeStage.id === 'journal'}
							<section class="journal-workbench">
								<div class="journal-list">
									{#each journalEntries as entry (entry.id)}
										<button
											type="button"
											class={['journal-card', selectedJournalId === entry.id && 'active']}
											onclick={() => (selectedJournalId = entry.id)}
										>
											<span>{entry.date}</span>
											<strong>{entry.id}</strong>
											<small>{entry.title}</small>
											{@render statusPill(postedJournalIds.includes(entry.id) ? 'Posted' : 'Draft')}
										</button>
									{/each}
								</div>

								<div class="journal-entry-detail">
									<header class="journal-detail-header">
										<div>
											<small>{selectedJournalEntry.source}</small>
											<h3>{selectedJournalEntry.id}: {selectedJournalEntry.title}</h3>
										</div>
										{@render statusPill(selectedJournalPosted ? 'Posted' : 'Ready')}
									</header>
									<p>{selectedJournalEntry.purpose}</p>
									<div class="journal-meta">
										<div><span>Date</span><strong>{selectedJournalEntry.date}</strong></div>
										<div><span>Control</span><strong>{selectedJournalEntry.control}</strong></div>
									</div>
									<div class="workpaper-table journal-sheet">
										<table>
											<thead>
												<tr><th>Account</th><th>Debit</th><th>Credit</th><th>Source</th></tr>
											</thead>
											<tbody>
												{#each selectedJournalEntry.lines as line (`${selectedJournalEntry.id}-${line.account}-${line.ref}`)}
													<tr>
														<td>{line.account}</td>
														<td>{line.debit ? money(line.debit) : ''}</td>
														<td>{line.credit ? money(line.credit) : ''}</td>
														<td>{line.ref}</td>
													</tr>
												{/each}
											</tbody>
											<tfoot>
												<tr>
													<td>Entry total</td>
													<td>{money(selectedJournalDebitTotal)}</td>
													<td>{money(selectedJournalCreditTotal)}</td>
													<td>
														{selectedJournalDebitTotal === selectedJournalCreditTotal
															? 'Balanced'
															: 'Out of balance'}
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
									<div class="journal-actions">
										<button
											type="button"
											class="primary-action"
											onclick={() => toggleJournalPosting(selectedJournalEntry.id)}
										>
											{selectedJournalPosted ? 'Unpost entry' : 'Post entry'}
										</button>
										<button type="button" onclick={openSelectedJournalLedger}>
											<GitBranch size={15} strokeWidth={2.4} />
											Open related ledger
										</button>
									</div>
								</div>

								<div class="posting-map">
									<small>Posting impact</small>
									{#each selectedJournalEntry.lines as line (`impact-${selectedJournalEntry.id}-${line.account}-${line.ref}`)}
										<div>
											<span>{line.debit ? 'Debit' : 'Credit'}</span>
											<strong>{line.account}</strong>
											<em>{money(line.debit || line.credit)}</em>
										</div>
									{/each}
								</div>
							</section>
						{:else if activeStage.id === 'matching'}
							<section class="matching-board">
								<div class="workpaper-table">
									<table>
										<thead
											><tr
												><th>Document</th><th>Amount</th><th>Quantity / event</th><th>Status</th
												></tr
											></thead
										>
										<tbody>
											{#each matchingRows as row (row.doc)}
												<tr
													><td>{row.doc}</td><td>{money(row.amount)}</td><td>{row.quantity}</td><td
														>{@render statusPill(issueResolved ? 'Resolved' : row.status)}</td
													></tr
												>
											{/each}
										</tbody>
									</table>
								</div>
								<button type="button" class="primary-action" onclick={() => (issueResolved = true)}>
									Resolve variance and apply cash
								</button>
							</section>
						{:else if activeStage.id === 'ledger'}
							<section class="ledger-workspace">
								<div class="tabs">
									{#each ledgerAccounts as ledger (ledger.account)}
										<button
											type="button"
											class={selectedLedgerAccount === ledger.account ? 'active' : ''}
											onclick={() => (selectedLedgerAccount = ledger.account)}
										>
											{ledger.account}
										</button>
									{/each}
								</div>
								<div class="ledger-balance">
									<span>Ending balance</span>
									<strong>{money(selectedLedger.ending)}</strong>
								</div>
								<div class="workpaper-table">
									<table>
										<thead
											><tr
												><th>Date</th><th>Source</th><th>Description</th><th>Debit</th><th
													>Credit</th
												><th>Balance</th></tr
											></thead
										>
										<tbody>
											{#each selectedLedger.lines as line (`${selectedLedger.account}-${line.source}-${line.description}`)}
												<tr>
													<td>{line.date}</td><td>{line.source}</td><td>{line.description}</td>
													<td>{line.debit ? money(line.debit) : ''}</td><td
														>{line.credit ? money(line.credit) : ''}</td
													><td>{money(line.balance)}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</section>
						{:else if activeStage.id === 'cutoff'}
							<section class="workpaper-table">
								<table>
									<thead><tr><th>Item</th><th>Date</th><th>Decision</th><th>Impact</th></tr></thead>
									<tbody>
										{#each cutoffRows as row (row.item)}
											<tr
												><td>{row.item}</td><td>{row.date}</td><td
													>{@render statusPill(issueResolved ? row.decision : 'Review')}</td
												><td>{row.impact}</td></tr
											>
										{/each}
									</tbody>
								</table>
							</section>
						{:else if activeStage.id === 'adjustments'}
							<section class="workpaper-table">
								<table>
									<thead
										><tr
											><th>Workpaper</th><th>Entry</th><th>Amount</th><th>Support</th><th>Status</th
											></tr
										></thead
									>
									<tbody>
										{#each adjustmentRows as row (row.workpaper)}
											<tr
												><td>{row.workpaper}</td><td>{row.entry}</td><td>{money(row.amount)}</td><td
													>{row.support}</td
												><td
													>{@render statusPill(
														issueResolved && row.status === 'Flagged' ? 'Escalated' : row.status
													)}</td
												></tr
											>
										{/each}
									</tbody>
								</table>
							</section>
						{:else if activeStage.id === 'reconciliations'}
							<section class="workpaper-table">
								<table>
									<thead
										><tr
											><th>Account</th><th>GL</th><th>Support</th><th>Difference</th><th>Owner</th
											><th>Status</th></tr
										></thead
									>
									<tbody>
										{#each reconciliationRows as row (row.account)}
											<tr>
												<td>{row.account}</td><td>{money(row.gl)}</td><td>{money(row.support)}</td
												><td>{money(issueResolved ? 0 : row.difference)}</td><td>{row.owner}</td><td
													>{@render statusPill(issueResolved ? 'Tied' : row.status)}</td
												>
											</tr>
										{/each}
									</tbody>
								</table>
							</section>
						{:else if activeStage.id === 'trial'}
							<section class="trial-workspace">
								<div class="trial-summary">
									<div><small>Total debits</small><strong>{money(trialDebitTotal)}</strong></div>
									<div><small>Total credits</small><strong>{money(trialCreditTotal)}</strong></div>
									<div>
										<small>Difference</small><strong
											>{money(trialDebitTotal - trialCreditTotal)}</strong
										>
									</div>
								</div>
								<div class="workpaper-table wide">
									<table>
										<thead
											><tr
												><th>Account</th><th>Debit</th><th>Credit</th><th>Mapping</th><th>Review</th
												></tr
											></thead
										>
										<tbody>
											{#each trialBalanceRows as row (row.account)}
												<tr>
													<td>{row.account}</td><td>{row.debit ? money(row.debit) : ''}</td><td
														>{row.credit ? money(row.credit) : ''}</td
													><td>{row.mapping}</td><td>{@render statusPill(row.review)}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</section>
						{:else if activeStage.id === 'consolidation'}
							<section class="consolidation-canvas">
								<div class="entity-card">
									<small>Parent</small><strong>Nimbus Bikes US</strong><span
										>TB imports $7.4m assets</span
									>
								</div>
								<div class="elimination-card">
									<GitBranch size={22} /><strong>Eliminate IC sale</strong><span
										>Dr revenue 85 / Cr COGS 85</span
									>
								</div>
								<div class="entity-card">
									<small>Subsidiary</small><strong>Nimbus Canada</strong><span
										>Translated at Jan close rates</span
									>
								</div>
								<div class="consolidated-card">
									<small>Group</small><strong>Consolidated Nimbus Bikes</strong><span
										>Intercompany balances removed; CTA tracked in equity</span
									>
								</div>
							</section>
						{:else if activeStage.id === 'mapping'}
							<section class="mapping-matrix">
								<div class="workpaper-table">
									<table>
										<thead
											><tr
												><th>GL account</th><th>Statement</th><th>Line item</th><th
													>Support / note</th
												></tr
											></thead
										>
										<tbody>
											{#each mappingRows as row (row.account)}
												<tr
													><td>{row.account}</td><td>{row.statement}</td><td>{row.line}</td><td
														>{row.note}</td
													></tr
												>
											{/each}
										</tbody>
									</table>
								</div>
								{#if supportVisible}
									<div class="trace-panel">
										<strong>Mapping check</strong>
										<p>
											Every active trial balance account has a statement destination and support
											reference.
										</p>
									</div>
								{/if}
							</section>
						{:else if activeStage.id === 'statements'}
							<section class="statement-binder">
								<div class="tabs">
									<button
										type="button"
										class={statementTab === 'balance' ? 'active' : ''}
										onclick={() => (statementTab = 'balance')}>Balance sheet</button
									>
									<button
										type="button"
										class={statementTab === 'income' ? 'active' : ''}
										onclick={() => (statementTab = 'income')}>Income statement</button
									>
									<button
										type="button"
										class={statementTab === 'cash' ? 'active' : ''}
										onclick={() => (statementTab = 'cash')}>Cash flows</button
									>
									<button
										type="button"
										class={statementTab === 'equity' ? 'active' : ''}
										onclick={() => (statementTab = 'equity')}>Equity</button
									>
								</div>
								<header class="statement-title">
									<small>Nimbus Bikes, Inc.</small>
									<h3>
										{statementTab === 'balance'
											? 'Condensed Balance Sheets'
											: statementTab === 'income'
												? 'Condensed Statements of Operations'
												: statementTab === 'cash'
													? 'Condensed Statements of Cash Flows'
													: 'Condensed Statements of Stockholders Equity'}
									</h3>
								</header>
								{@render statementTable(statementSections)}
							</section>
						{:else if activeStage.id === 'cash-flow'}
							<section class="cash-bridge">
								<div class="bridge-total">
									<small>Ending cash ties to balance sheet</small>
									<strong>{money(1820)}</strong>
								</div>
								<div class="bridge-grid">
									{#each cashBridge as item, index (item.label)}
										<button
											type="button"
											class={['bridge-item', cashFocus === index && 'active']}
											onclick={() => (cashFocus = index)}
										>
											<small>{item.type}</small>
											<strong>{signedMoney(item.amount)}</strong>
											<span>{item.label}</span>
										</button>
									{/each}
								</div>
								<p class="trace-panel">{cashBridge[cashFocus].explanation}</p>
							</section>
						{:else if activeStage.id === 'disclosures'}
							<section class="disclosure-binder">
								<div class="tabs">
									{#each disclosures as disclosure (disclosure.id)}
										<button
											type="button"
											class={disclosureTab === disclosure.id ? 'active' : ''}
											onclick={() => (disclosureTab = disclosure.id)}
										>
											{disclosure.label}
										</button>
									{/each}
								</div>
								<div class="workpaper-table">
									<table>
										<thead
											><tr
												><th>Disclosure fact</th><th>Amount</th><th>Statement source</th><th
													>Status</th
												></tr
											></thead
										>
										<tbody>
											{#each activeDisclosure.rows as row (row.label)}
												<tr
													><td>{row.label}</td><td>{signedMoney(row.amount)}</td><td
														>{row.statement}</td
													><td>{@render statusPill(row.status)}</td></tr
												>
											{/each}
										</tbody>
									</table>
								</div>
							</section>
						{:else if activeStage.id === 'tie-out'}
							<section class="workpaper-table wide tie-out-table">
								<table>
									<thead
										><tr
											><th>Fact</th><th>Statement</th><th>Note</th><th>MD&A</th><th>XBRL tag</th><th
												>Status</th
											></tr
										></thead
									>
									<tbody>
										{#each tieOutRows as row (row.fact)}
											<tr>
												<td>{row.fact}</td><td>{money(row.statement)}</td><td
													>{money(
														issueResolved && row.status.includes('Broken')
															? row.statement
															: row.note
													)}</td
												><td>{money(row.mda)}</td><td>{row.tag}</td><td
													>{@render statusPill(issueResolved ? 'Tied' : row.status)}</td
												>
											</tr>
										{/each}
									</tbody>
								</table>
							</section>
						{:else if activeStage.id === 'controls'}
							<section class="workpaper-table">
								<table>
									<thead
										><tr><th>Control</th><th>Owner</th><th>Evidence</th><th>Status</th></tr></thead
									>
									<tbody>
										{#each controlRows as row (row.control)}
											<tr
												><td>{row.control}</td><td>{row.owner}</td><td>{row.evidence}</td><td
													>{@render statusPill(issueResolved ? 'Effective' : row.status)}</td
												></tr
											>
										{/each}
									</tbody>
								</table>
							</section>
						{:else if activeStage.id === 'audit'}
							<section class="audit-board">
								<div class="request-list">
									{#each auditRequests as request (request.id)}
										<button
											type="button"
											class={selectedAuditId === request.id ? 'active' : ''}
											onclick={() => (selectedAuditId = request.id)}
										>
											<span>{request.id}</span>
											<strong>{request.request}</strong>
											{@render statusPill(request.status)}
										</button>
									{/each}
								</div>
								<div class="trace-panel">
									<strong>Evidence package</strong>
									<p>{selectedAudit.evidence}</p>
								</div>
							</section>
						{:else if activeStage.id === 'filing'}
							<section class="filing-builder">
								<div class="filing-cover">
									<small>Mock Form 10-Q</small>
									<strong>Nimbus Bikes, Inc.</strong>
									<span>Quarter ended March 31, 2026</span>
								</div>
								<div class="workpaper-table">
									<table>
										<thead><tr><th>Section</th><th>Owner</th><th>Status</th></tr></thead>
										<tbody>
											{#each filingSections as section, index (section.section)}
												<tr class={filingStep === index ? 'selected-row' : ''}>
													<td>{section.section}</td><td>{section.owner}</td><td
														>{@render statusPill(
															index <= filingStep ? section.status : 'Waiting'
														)}</td
													>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</section>
						{:else}
							<section class="debrief-board">
								<div class="metric-card">
									<small>Close duration</small><strong>6.5 days</strong><span
										>Target next month: 5.5</span
									>
								</div>
								<div class="metric-card">
									<small>Open audit follow-ups</small><strong>1</strong><span
										>Manual JE support</span
									>
								</div>
								<div class="metric-card">
									<small>Recurring exception</small><strong>RNI cutoff</strong><span
										>Move review two days earlier</span
									>
								</div>
								<div class="metric-card">
									<small>Automation candidate</small><strong>PPE rollforward</strong><span
										>Template and data feed ready</span
									>
								</div>
							</section>
						{/if}

						{#if activeStage.id === 'filing' || activeStage.id === 'debrief'}
							<div class="trace-ladder">
								{#each traceNodes as node, index (node.label)}
									<button
										type="button"
										class={traceIndex === index ? 'active' : ''}
										onclick={() => (traceIndex = index)}
									>
										<span>{String(index + 1).padStart(2, '0')}</span>
										<strong>{node.label}</strong>
										<small>{node.value}</small>
									</button>
								{/each}
							</div>
							<p class="trace-panel">{traceNodes[traceIndex].detail}</p>
						{/if}
					</div>
				</section>
			</section>

			<footer class="sequence-bar" aria-label="Stage navigation">
				<button
					type="button"
					class="sequence-button"
					onclick={previousStage}
					disabled={activeIndex === 0}
				>
					<ArrowLeft size={17} strokeWidth={2.4} />
					<span>Previous</span>
				</button>
				<span
					>{String(activeIndex + 1).padStart(2, '0')} of {String(stages.length).padStart(
						2,
						'0'
					)}</span
				>
				<button
					type="button"
					class="sequence-button next"
					onclick={nextStage}
					disabled={activeIndex === stages.length - 1}
				>
					<span>Next</span>
					<ArrowRight size={17} strokeWidth={2.4} />
				</button>
			</footer>
		</div>
	{/if}
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		overflow: hidden;
		background: #101213;
	}

	.simulator {
		--bg: #f3efe4;
		--surface: #fbf7ed;
		--surface-strong: #fffdf7;
		--paper: #fffaf0;
		--ink: #171614;
		--muted: #6a6257;
		--line: rgba(47, 43, 37, 0.18);
		--soft: #e7dece;
		--accent: #0e7771;
		--accent-2: #b14f3e;
		--gold: #cf931f;
		--green: #15735b;
		--red: #a73d35;
		--sidebar-width: 280px;
		--sidebar-collapsed-width: 52px;
		--header-height: 44px;
		position: relative;
		height: 100vh;
		overflow: hidden;
		color: var(--ink);
		background: var(--bg);
	}

	.simulator[data-theme='night'] {
		--bg: #101213;
		--surface: #151819;
		--surface-strong: #1b2021;
		--paper: #211f1a;
		--ink: #f8efe1;
		--muted: #b7ad9d;
		--line: rgba(255, 244, 224, 0.15);
		--soft: #292d2d;
		--accent: #61c7ba;
		--accent-2: #ed8a73;
		--gold: #e6ad42;
		--green: #77d5a2;
		--red: #ff9485;
	}

	button {
		color: inherit;
		font: inherit;
	}

	button {
		border: 0;
		cursor: pointer;
		transition:
			border-color 140ms ease,
			background-color 140ms ease,
			color 140ms ease,
			opacity 140ms ease;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}

	button:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--accent) 72%, transparent);
		outline-offset: 3px;
	}

	:global(svg) {
		flex: 0 0 auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	.workpaper-table table {
		min-width: 720px;
	}

	th,
	td {
		border-bottom: 1px solid var(--line);
		padding: 10px 11px;
		text-align: left;
		vertical-align: top;
		overflow-wrap: anywhere;
	}

	th {
		color: var(--muted);
		font-size: 0.72rem;
		font-weight: 850;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	td {
		font-size: 0.9rem;
	}

	.masthead {
		position: fixed;
		z-index: 60;
		top: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--header-height);
		border-bottom: 1px solid var(--line);
		padding: 6px 14px;
		background: color-mix(in srgb, var(--surface) 72%, transparent);
		backdrop-filter: blur(24px) saturate(1.35);
		-webkit-backdrop-filter: blur(24px) saturate(1.35);
	}

	.brand,
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		color: inherit;
		text-decoration: none;
	}

	.brand {
		gap: 8px;
		color: var(--ink);
		background: transparent;
	}

	.brand :global(svg) {
		color: var(--accent);
	}

	.brand strong {
		font-size: 0.9rem;
	}

	.theme-toggle {
		justify-content: center;
		width: 28px;
		min-height: 28px;
		color: var(--muted);
		background: transparent;
	}

	.theme-toggle-floating {
		position: fixed;
		z-index: 70;
		top: 18px;
		right: 20px;
		width: 34px;
		min-height: 34px;
		color: color-mix(in srgb, var(--ink) 82%, transparent);
		text-shadow: 0 1px 14px color-mix(in srgb, var(--bg) 82%, transparent);
	}

	.theme-toggle:hover {
		color: var(--accent);
	}

	.entry-page {
		display: grid;
		grid-template-rows: minmax(0, 1fr) auto;
		height: 100vh;
		overflow-y: auto;
		padding-top: 0;
		background: var(--bg);
	}

	.entry-hero {
		position: relative;
		display: flex;
		align-items: center;
		min-height: clamp(520px, 72svh, 700px);
		overflow: hidden;
		border-bottom: 1px solid var(--line);
		padding: clamp(34px, 6vw, 86px);
	}

	.entry-hero-image,
	.entry-hero-fallback,
	.entry-hero-overlay {
		position: absolute;
		inset: 0;
	}

	.entry-hero-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.entry-hero-fallback {
		background:
			linear-gradient(90deg, color-mix(in srgb, var(--bg) 88%, transparent), transparent 62%),
			linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, transparent), transparent 45%),
			color-mix(in srgb, var(--surface) 42%, var(--bg));
	}

	.entry-hero-overlay {
		background:
			linear-gradient(90deg, color-mix(in srgb, var(--bg) 88%, transparent) 0 34%, transparent 74%),
			linear-gradient(0deg, color-mix(in srgb, var(--bg) 72%, transparent), transparent 44%);
	}

	.entry-hero-content {
		position: relative;
		z-index: 2;
		display: grid;
		gap: 22px;
		max-width: min(760px, 64vw);
	}

	.entry-preview-copy small {
		color: var(--accent-2);
		font-size: 0.74rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.16em;
	}

	.entry-hero-brand {
		max-width: min(790px, 66vw);
	}

	.entry-hero-brand h1 {
		max-width: 11ch;
		margin: 0;
		font-size: clamp(4.1rem, 7.6vw, 7.9rem);
		line-height: 0.88;
		letter-spacing: 0;
	}

	.entry-hero-content p {
		max-width: 58ch;
		margin: 0;
		color: var(--muted);
		font-size: clamp(1rem, 1.25vw, 1.14rem);
		line-height: 1.52;
	}

	.entry-cta {
		display: inline-flex;
		gap: 10px;
		align-items: center;
		justify-content: center;
		width: max-content;
		min-height: 42px;
		border-radius: 999px;
		padding: 0 17px;
		background: var(--gold);
		color: #17130a;
		font-weight: 950;
	}

	.entry-ledger-sheet,
	.entry-close-board,
	.entry-filing-card {
		position: absolute;
		right: clamp(28px, 7vw, 120px);
		width: min(360px, 28vw);
		border: 1px solid color-mix(in srgb, var(--line) 82%, transparent);
		border-radius: 8px;
		background: color-mix(in srgb, var(--surface) 72%, transparent);
		box-shadow: 0 26px 70px rgba(0, 0, 0, 0.24);
		backdrop-filter: blur(20px) saturate(1.3);
		-webkit-backdrop-filter: blur(20px) saturate(1.3);
	}

	.entry-ledger-sheet {
		top: 18%;
		display: grid;
		gap: 10px;
		padding: 22px;
	}

	.entry-ledger-sheet span,
	.entry-close-board span,
	.entry-filing-card span {
		color: var(--accent-2);
		font-size: 0.7rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.14em;
	}

	.entry-ledger-sheet strong {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(2rem, 4vw, 3.4rem);
		line-height: 1;
	}

	.entry-ledger-sheet div {
		height: 11px;
		border-radius: 2px;
		background: color-mix(in srgb, var(--muted) 20%, transparent);
	}

	.entry-ledger-sheet div:nth-child(4) {
		width: 72%;
	}

	.entry-ledger-sheet div:nth-child(5) {
		width: 54%;
	}

	.entry-close-board {
		top: 44%;
		right: clamp(140px, 18vw, 300px);
		display: grid;
		gap: 12px;
		padding: 18px;
	}

	.entry-close-board strong,
	.entry-filing-card strong {
		font-size: 1.22rem;
	}

	.entry-mini-table {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 6px;
	}

	.entry-mini-table i {
		height: 24px;
		border: 1px solid var(--line);
		border-radius: 3px;
		background: color-mix(in srgb, var(--paper) 46%, transparent);
	}

	.entry-filing-card {
		right: clamp(40px, 9vw, 160px);
		bottom: 12%;
		display: grid;
		gap: 6px;
		width: min(260px, 22vw);
		padding: 18px;
	}

	.entry-filing-card small {
		color: var(--muted);
		font-size: 0.86rem;
	}

	.entry-preview {
		display: grid;
		grid-template-columns: minmax(260px, 0.72fr) minmax(520px, 1.28fr);
		gap: 20px 28px;
		align-items: start;
		border-bottom: 1px solid var(--line);
		padding: 24px clamp(24px, 5vw, 74px) 22px;
		background: color-mix(in srgb, var(--surface) 72%, var(--bg));
	}

	.entry-preview-copy {
		display: grid;
		gap: 6px;
	}

	.entry-preview-copy strong {
		max-width: 34ch;
		font-size: 1.15rem;
		line-height: 1.25;
	}

	.entry-preview-items {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 10px;
	}

	.entry-preview-items div {
		display: grid;
		grid-template-areas:
			'icon label'
			'icon detail';
		grid-template-columns: 22px minmax(0, 1fr);
		gap: 4px 10px;
		align-items: start;
		border-left: 1px solid var(--line);
		padding-left: 14px;
	}

	.entry-preview-icon {
		grid-area: icon;
		color: var(--accent);
		margin-top: 2px;
	}

	.entry-preview-items strong {
		grid-area: label;
		font-size: 0.92rem;
	}

	.entry-preview-items span {
		grid-area: detail;
		color: var(--muted);
		font-size: 0.88rem;
		line-height: 1.4;
	}

	.entry-author {
		grid-column: 1 / -1;
		display: flex;
		gap: 18px;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid var(--line);
		padding-top: 16px;
	}

	.entry-author p {
		margin: 0;
		color: var(--muted);
		font-size: 0.92rem;
	}

	.entry-author strong {
		color: var(--ink);
	}

	.entry-author-links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: flex-end;
	}

	.entry-author-links a {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		min-height: 32px;
		border: 1px solid color-mix(in srgb, var(--line) 86%, transparent);
		border-radius: 999px;
		padding: 0 12px;
		color: var(--muted);
		font-size: 0.9rem;
		font-weight: 850;
		text-decoration: none;
		background: color-mix(in srgb, var(--paper) 34%, transparent);
	}

	.entry-author-brand-icon {
		width: 16px;
		height: 16px;
		fill: currentColor;
	}

	.entry-author-links a:hover {
		border-color: color-mix(in srgb, var(--accent) 52%, var(--line));
		color: var(--accent);
	}

	.sidebar-backdrop,
	.flyout-backdrop {
		position: fixed;
		inset: 0;
		z-index: 35;
		background: rgba(0, 0, 0, 0.28);
	}

	.flyout-backdrop {
		background: transparent;
	}

	.toc-drawer {
		position: fixed;
		z-index: 45;
		top: 0;
		bottom: 0;
		left: 0;
		display: flex;
		width: var(--sidebar-width);
		transform: translateX(-100%);
		flex-direction: column;
		border-right: 1px solid var(--line);
		padding-top: var(--header-height);
		background: color-mix(in srgb, var(--bg) 58%, transparent);
		backdrop-filter: blur(28px) saturate(1.45);
		-webkit-backdrop-filter: blur(28px) saturate(1.45);
		transition: transform 180ms ease;
	}

	.toc-drawer.open {
		transform: translateX(0);
	}

	.toc-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
	}

	.toc-header span {
		color: var(--muted);
		font-size: 0.72rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.14em;
	}

	.toc-header button,
	.rail-toggle {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 8px;
		color: var(--muted);
		background: transparent;
	}

	.toc-list {
		flex: 1;
		overflow-y: auto;
		padding: 8px 12px 18px;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--accent) 48%, transparent) transparent;
	}

	.toc-group {
		margin-bottom: 2px;
	}

	.toc-item {
		display: flex;
		align-items: center;
		gap: 8px;
		border-radius: 8px;
		color: var(--ink);
	}

	.toc-item:hover,
	.toc-child:hover,
	.flyout-title:hover,
	.flyout-child:hover,
	.toc-header button:hover,
	.rail-toggle:hover,
	.rail-item:hover {
		background: color-mix(in srgb, var(--ink) 5%, transparent);
	}

	.toc-item.active,
	.toc-child.active,
	.flyout-child.active,
	.rail-item.active {
		color: var(--accent);
	}

	.toc-main,
	.toc-child,
	.flyout-title,
	.flyout-child {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		background: transparent;
		text-align: left;
	}

	.toc-main {
		flex: 1;
		justify-content: flex-start;
		padding: 10px 8px 10px 12px;
		font-weight: 800;
	}

	.toc-main > span {
		flex: 1;
	}

	.toc-children {
		display: grid;
		gap: 1px;
		margin: 2px 0 8px 30px;
	}

	.toc-child {
		border-radius: 7px;
		padding: 7px 8px;
		color: var(--muted);
		font-size: 0.82rem;
	}

	.toc-rail {
		position: fixed;
		z-index: 45;
		top: 0;
		bottom: 0;
		left: 0;
		display: flex;
		width: var(--sidebar-collapsed-width);
		flex-direction: column;
		align-items: center;
		border-right: 1px solid var(--line);
		padding-top: calc(var(--header-height) + 8px);
		background: color-mix(in srgb, var(--bg) 48%, transparent);
		backdrop-filter: blur(24px) saturate(1.35);
		-webkit-backdrop-filter: blur(24px) saturate(1.35);
	}

	.rail-toggle {
		margin-bottom: 8px;
	}

	.rail-item {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		color: var(--muted);
		background: transparent;
	}

	.toc-flyout {
		position: fixed;
		z-index: 55;
		left: calc(var(--sidebar-collapsed-width) + 6px);
		width: 230px;
		overflow: hidden;
		border: 1px solid var(--line);
		border-radius: 12px;
		background: var(--surface);
		box-shadow: 0 18px 48px rgba(0, 0, 0, 0.22);
	}

	.flyout-title {
		border-bottom: 1px solid var(--line);
		padding: 11px 12px;
		color: var(--ink);
		font-size: 0.86rem;
		font-weight: 800;
	}

	.flyout-children {
		display: grid;
		gap: 1px;
		padding: 6px;
	}

	.flyout-child {
		border-radius: 7px;
		padding: 7px 8px;
		color: var(--muted);
		font-size: 0.8rem;
	}

	.content-shell {
		--lesson-column: clamp(360px, 31vw, 500px);
		display: grid;
		grid-template-rows: minmax(0, 1fr) auto;
		height: 100vh;
		padding-top: var(--header-height);
		transition: margin-left 180ms ease;
	}

	.content-shell.sidebar-compact {
		--lesson-column: clamp(480px, 38vw, 660px);
	}

	.workspace-shell {
		display: grid;
		grid-template-columns: var(--lesson-column) minmax(0, 1fr);
		min-height: 0;
	}

	.lesson-panel,
	.process-panel {
		min-width: 0;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: color-mix(in srgb, var(--accent) 42%, transparent) transparent;
	}

	.lesson-panel::-webkit-scrollbar,
	.process-panel::-webkit-scrollbar,
	.toc-list::-webkit-scrollbar {
		width: 8px;
	}

	.lesson-panel::-webkit-scrollbar-thumb,
	.process-panel::-webkit-scrollbar-thumb,
	.toc-list::-webkit-scrollbar-thumb {
		border-radius: 999px;
		background: color-mix(in srgb, var(--accent) 38%, transparent);
	}

	.lesson-panel {
		border-right: 1px solid var(--line);
		padding: clamp(22px, 3vw, 36px);
		background: color-mix(in srgb, var(--surface) 46%, transparent);
	}

	.process-panel {
		padding: clamp(20px, 2.6vw, 34px);
		background: color-mix(in srgb, var(--bg) 94%, var(--surface) 6%);
	}

	.lesson-kicker,
	.process-header,
	.artifact-title,
	.demo-toolbar,
	.mode-switch,
	.step-controls,
	.practice-actions,
	.sequence-bar,
	.status-pill,
	.tabs,
	.trial-summary,
	.ledger-balance {
		display: flex;
		align-items: center;
	}

	.lesson-kicker,
	.process-header {
		justify-content: space-between;
		gap: 18px;
	}

	.lesson-kicker span,
	.artifact-title small,
	.statement-title small,
	.system-node small,
	.metric-card small,
	.bridge-total small,
	.filing-cover small {
		color: var(--accent-2);
		font-size: 0.72rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.lesson-kicker > span {
		display: inline-flex;
		gap: 8px;
		align-items: center;
	}

	.mode-switch,
	.tabs {
		gap: 6px;
	}

	.mode-switch button,
	.step-controls button,
	.practice-actions button,
	.tabs button,
	.primary-action,
	.choice-stack button,
	.lane {
		border: 1px solid var(--line);
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface-strong) 70%, transparent);
	}

	.tabs button {
		min-height: 34px;
		padding: 0 12px;
		font-size: 0.9rem;
		font-weight: 900;
	}

	.mode-switch button {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
		min-height: 32px;
		padding: 0 12px;
		font-weight: 850;
	}

	.demo-toolbar {
		justify-content: flex-end;
		flex-wrap: wrap;
		gap: 10px;
	}

	.step-controls,
	.practice-actions {
		gap: 6px;
	}

	.step-controls button,
	.practice-actions button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 32px;
		padding: 0 10px;
		font-size: 0.82rem;
		font-weight: 850;
	}

	.step-controls span {
		color: var(--muted);
		font-size: 0.78rem;
		font-weight: 900;
		font-variant-numeric: tabular-nums;
	}

	.mode-switch button.active,
	.tabs button.active,
	.choice-stack button.active,
	.lane.active {
		color: var(--bg);
		background: var(--ink);
	}

	h1 {
		max-width: 20ch;
		margin: clamp(18px, 3vw, 30px) 0 8px;
		font-size: clamp(1.9rem, 2.9vw, 2.8rem);
		line-height: 1.04;
		letter-spacing: 0;
	}

	.question {
		margin: 0 0 22px;
		color: var(--accent);
		font-size: clamp(1rem, 1.45vw, 1.18rem);
		font-weight: 850;
		line-height: 1.25;
	}

	.lesson-block {
		border-top: 1px solid var(--line);
		padding: 20px 0;
	}

	.lesson-block h2 {
		display: flex;
		gap: 8px;
		align-items: center;
		margin: 0 0 12px;
		font-size: 0.9rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.lesson-block p,
	.lesson-block li,
	.key-point span,
	.trace-panel {
		color: var(--muted);
		font-size: 1rem;
		line-height: 1.55;
	}

	.lesson-block ul {
		display: grid;
		gap: 10px;
		margin: 0;
		padding: 0 0 0 20px;
	}

	.key-point {
		border-top: 2px solid color-mix(in srgb, var(--accent) 62%, transparent);
		padding-top: 18px;
	}

	.key-point strong {
		display: block;
		margin-bottom: 6px;
		color: var(--accent);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.artifact-title {
		gap: 10px;
	}

	.artifact-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		min-width: 22px;
		height: 22px;
		color: var(--accent-2);
	}

	.artifact-title strong {
		display: block;
		margin-top: 3px;
		font-size: 1rem;
	}

	.demo-guidance {
		display: flex;
		justify-content: space-between;
		gap: 18px;
		border: 1px solid var(--line);
		border-radius: 8px;
		margin-top: 18px;
		padding: 14px 16px;
		background: color-mix(in srgb, var(--surface) 70%, transparent);
	}

	.demo-guidance small {
		color: var(--accent-2);
		font-size: 0.68rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.demo-guidance strong {
		display: block;
		margin: 3px 0;
		font-size: 0.98rem;
	}

	.demo-guidance p {
		max-width: 76ch;
		margin: 0;
		color: var(--muted);
		line-height: 1.45;
	}

	.demo-guidance.do {
		border-color: color-mix(in srgb, var(--gold) 46%, var(--line));
		background: color-mix(in srgb, var(--gold) 8%, var(--surface));
	}

	.artifact-body {
		margin-top: 20px;
	}

	.landing-panel {
		display: grid;
		align-items: center;
		padding: clamp(28px, 4vw, 54px);
		background: color-mix(in srgb, var(--surface) 62%, var(--bg) 38%);
	}

	.landing-copy {
		display: grid;
		gap: 18px;
		max-width: 720px;
	}

	.landing-copy h1 {
		max-width: 16ch;
		margin: 0;
		font-size: clamp(2.05rem, 3.6vw, 3.35rem);
		line-height: 1.03;
	}

	.landing-lede {
		max-width: 58ch;
		margin: 0;
		color: var(--muted);
		font-size: clamp(1rem, 1.25vw, 1.12rem);
		line-height: 1.55;
	}

	.landing-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
	}

	.landing-primary,
	.landing-secondary {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
		min-height: 36px;
		border-radius: 999px;
		padding: 0 13px;
		font-size: 0.9rem;
		font-weight: 900;
	}

	.landing-primary {
		background: var(--gold);
		color: #17130a;
	}

	.landing-secondary {
		border: 1px solid var(--line);
		color: var(--ink);
		background: color-mix(in srgb, var(--surface-strong) 62%, transparent);
	}

	.landing-stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		padding: 16px 0;
	}

	.landing-stats div {
		display: grid;
		gap: 3px;
	}

	.landing-stats small,
	.landing-dossier small,
	.trace-preview-header small,
	.trace-detail-card small {
		color: var(--accent-2);
		font-size: 0.68rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.landing-stats strong {
		font-size: 1rem;
	}

	.landing-stats span,
	.landing-route span {
		color: var(--muted);
		font-size: 0.88rem;
		line-height: 1.4;
	}

	.landing-route {
		display: grid;
		gap: 12px;
	}

	.landing-route div {
		display: grid;
		grid-template-columns: 24px minmax(0, 1fr);
		gap: 10px;
		align-items: start;
	}

	.landing-workbench {
		display: grid;
		gap: 16px;
		max-width: 1180px;
	}

	.landing-dossier,
	.landing-trace {
		border: 1px solid var(--line);
		border-radius: 8px;
		background: color-mix(in srgb, var(--surface) 76%, transparent);
	}

	.landing-dossier {
		display: grid;
		grid-template-columns: minmax(280px, 1.05fr) minmax(300px, 0.95fr);
		gap: 22px;
		align-items: start;
		padding: clamp(18px, 2.2vw, 28px);
	}

	.landing-dossier h2 {
		margin: 6px 0 10px;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.65rem, 2.8vw, 2.8rem);
		line-height: 1;
		letter-spacing: 0;
	}

	.landing-dossier p {
		max-width: 56ch;
		margin: 0;
		color: var(--muted);
		font-size: 1rem;
		line-height: 1.5;
	}

	.landing-ledger-mini {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border: 1px solid var(--line);
		border-radius: 8px;
		overflow: hidden;
		background: color-mix(in srgb, var(--paper) 48%, transparent);
	}

	.landing-ledger-mini div {
		display: grid;
		gap: 5px;
		min-height: 72px;
		border-right: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		padding: 13px;
	}

	.landing-ledger-mini div:nth-child(2n) {
		border-right: 0;
	}

	.landing-ledger-mini div:nth-last-child(-n + 2) {
		border-bottom: 0;
	}

	.landing-ledger-mini span {
		color: var(--muted);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.landing-ledger-mini strong {
		font-size: 0.98rem;
	}

	.cycle-strip {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 8px;
	}

	.cycle-strip button {
		display: grid;
		grid-template-rows: auto auto auto 1fr;
		gap: 7px;
		min-height: 146px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 14px;
		background: color-mix(in srgb, var(--surface) 66%, transparent);
		text-align: left;
	}

	.cycle-strip button:hover {
		border-color: color-mix(in srgb, var(--accent) 52%, transparent);
		background: color-mix(in srgb, var(--accent) 8%, var(--surface));
	}

	.cycle-strip span {
		color: var(--accent);
		font-size: 0.7rem;
		font-weight: 950;
	}

	.cycle-strip strong {
		font-size: 1rem;
	}

	.cycle-strip small {
		color: var(--muted);
		font-size: 0.78rem;
		line-height: 1.35;
	}

	.landing-trace {
		display: grid;
		gap: 14px;
		padding: 16px;
	}

	.trace-preview-header {
		display: flex;
		gap: 14px;
		align-items: start;
		justify-content: space-between;
	}

	.trace-preview-header strong {
		display: block;
		margin-top: 4px;
		font-size: 1.05rem;
	}

	.trace-preview-header > span {
		max-width: 260px;
		color: var(--muted);
		font-size: 0.88rem;
		font-weight: 800;
		text-align: right;
	}

	.trace-preview-track {
		display: grid;
		grid-template-columns: repeat(9, minmax(74px, 1fr));
		gap: 6px;
		overflow-x: auto;
		padding-bottom: 3px;
	}

	.trace-preview-track button {
		display: grid;
		gap: 5px;
		min-height: 74px;
		border: 1px solid var(--line);
		border-radius: 7px;
		padding: 9px;
		background: color-mix(in srgb, var(--surface-strong) 48%, transparent);
		text-align: left;
	}

	.trace-preview-track button.active {
		border-color: color-mix(in srgb, var(--accent) 58%, transparent);
		background: color-mix(in srgb, var(--accent) 12%, var(--surface));
	}

	.trace-preview-track span {
		color: var(--accent);
		font-size: 0.68rem;
		font-weight: 950;
	}

	.trace-preview-track strong {
		font-size: 0.72rem;
		line-height: 1.25;
	}

	.trace-detail-card {
		display: grid;
		grid-template-columns: 26px minmax(0, 1fr);
		gap: 10px;
		align-items: start;
		border-top: 1px solid var(--line);
		padding-top: 14px;
	}

	.trace-detail-card strong {
		display: block;
		margin: 3px 0;
	}

	.trace-detail-card p {
		margin: 0;
		color: var(--muted);
		line-height: 1.45;
	}

	.primer-workbench {
		display: grid;
		grid-template-columns: minmax(240px, 0.72fr) minmax(360px, 1fr);
		gap: 16px;
		align-items: start;
	}

	.primer-selector,
	.account-family-grid {
		display: grid;
		gap: 9px;
	}

	.account-family-grid {
		grid-template-columns: repeat(5, minmax(120px, 1fr));
		grid-column: 1 / -1;
	}

	.primer-selector button,
	.account-family-grid button {
		display: grid;
		gap: 6px;
		min-height: 98px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 13px;
		background: color-mix(in srgb, var(--surface) 70%, transparent);
		text-align: left;
	}

	.primer-selector button:hover,
	.account-family-grid button:hover {
		border-color: color-mix(in srgb, var(--accent) 46%, var(--line));
		background: color-mix(in srgb, var(--accent) 7%, var(--surface));
	}

	.primer-selector button.active,
	.account-family-grid button.active {
		border-color: color-mix(in srgb, var(--accent) 58%, transparent);
		background: color-mix(in srgb, var(--accent) 12%, var(--surface));
	}

	.primer-selector strong,
	.account-family-grid strong {
		font-size: 0.9rem;
		line-height: 1.25;
	}

	.primer-selector span,
	.account-family-grid span,
	.account-family-grid em {
		color: var(--muted);
		font-size: 0.78rem;
		line-height: 1.35;
	}

	.account-family-grid em {
		color: var(--accent-2);
		font-style: normal;
		font-weight: 850;
	}

	.primer-main-card,
	.primer-side-card {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: clamp(18px, 2vw, 24px);
		background: color-mix(in srgb, var(--surface) 78%, transparent);
	}

	.primer-side-card {
		align-self: stretch;
	}

	.primer-main-card small,
	.primer-side-card small,
	.concept-strip small,
	.equation-balance span,
	.account-type-facts span {
		color: var(--accent-2);
		font-size: 0.68rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.primer-main-card h3,
	.primer-side-card h3 {
		margin: 6px 0 10px;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.35rem, 2.1vw, 2.1rem);
		line-height: 1.08;
	}

	.primer-main-card p,
	.primer-side-card p {
		margin: 0;
		color: var(--muted);
		line-height: 1.55;
	}

	.equation-balance,
	.account-type-facts,
	.timing-lens-grid {
		display: grid;
		gap: 10px;
		margin-top: 18px;
	}

	.equation-balance {
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: stretch;
	}

	.equation-balance > div:not(.equation-equals),
	.account-type-facts > div {
		display: grid;
		gap: 6px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 14px;
		background: color-mix(in srgb, var(--surface-strong) 44%, transparent);
	}

	.equation-balance strong,
	.account-type-facts strong {
		line-height: 1.35;
	}

	.equation-equals {
		display: grid;
		place-items: center;
		color: var(--accent);
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 1.8rem;
		font-weight: 900;
	}

	.equation-line {
		margin-top: 12px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 12px;
		background: color-mix(in srgb, var(--accent) 9%, transparent);
		font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
		font-size: 0.86rem;
		font-weight: 800;
		line-height: 1.45;
	}

	.account-type-facts,
	.timing-lens-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.timing-lens-grid {
		grid-column: span 1;
	}

	.concept-strip {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-column: 1 / -1;
		gap: 10px;
	}

	.concept-strip div {
		display: grid;
		gap: 5px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 13px;
		background: color-mix(in srgb, var(--surface-strong) 42%, transparent);
	}

	.concept-strip strong {
		font-size: 0.92rem;
		line-height: 1.25;
	}

	.concept-strip span {
		color: var(--muted);
		font-size: 0.82rem;
		line-height: 1.4;
	}

	.setup-workbench {
		display: grid;
		gap: 16px;
	}

	.setup-control-plane {
		display: grid;
		grid-template-columns: minmax(260px, 0.78fr) minmax(360px, 1.22fr);
		gap: 14px;
	}

	.setup-area-list {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;
	}

	.setup-area-list button {
		display: grid;
		grid-template-columns: 22px minmax(0, 1fr);
		gap: 10px;
		align-items: start;
		height: 92px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 12px;
		background: color-mix(in srgb, var(--surface) 68%, transparent);
		text-align: left;
		overflow: hidden;
	}

	.setup-area-list button:hover,
	.event-card:hover,
	.document-row:hover,
	.judgment-step:hover,
	.journal-card:hover,
	.bridge-item:hover,
	.request-list button:hover {
		border-color: color-mix(in srgb, var(--accent) 46%, var(--line));
		background: color-mix(in srgb, var(--accent) 7%, var(--surface));
	}

	.setup-area-list button.active {
		border-color: color-mix(in srgb, var(--accent) 58%, transparent);
		background: color-mix(in srgb, var(--accent) 11%, var(--surface));
	}

	.setup-area-icon {
		color: var(--accent);
		margin-top: 2px;
	}

	.setup-area-list strong {
		display: block;
		margin-bottom: 4px;
		font-size: 0.9rem;
		line-height: 1.25;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.setup-area-list small {
		display: -webkit-box;
		overflow: hidden;
		color: var(--muted);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		line-height: 1.25;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}

	.setup-area-detail {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: clamp(18px, 2vw, 24px);
		background: color-mix(in srgb, var(--surface) 76%, transparent);
	}

	.setup-area-detail small,
	.setup-output span {
		color: var(--accent-2);
		font-size: 0.68rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.setup-area-detail h3 {
		margin: 6px 0 10px;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.45rem, 2.4vw, 2.35rem);
		line-height: 1.06;
	}

	.setup-area-detail p {
		max-width: 70ch;
		margin: 0;
		color: var(--muted);
		line-height: 1.5;
	}

	.setup-output {
		display: grid;
		gap: 5px;
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
		margin: 18px 0;
		padding: 14px 0;
	}

	.setup-output strong {
		font-size: 1rem;
		line-height: 1.35;
	}

	.setup-risk {
		display: grid;
		grid-template-columns: 22px minmax(0, 1fr);
		gap: 8px;
		align-items: start;
		color: var(--muted);
		line-height: 1.45;
	}

	.setup-risk-icon {
		color: var(--accent-2);
		margin-top: 2px;
	}

	.setup-readiness {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 10px;
	}

	.system-map,
	.overview-workspace,
	.evidence-packet,
	.judgment-tree,
	.event-board,
	.matching-board,
	.consolidation-canvas,
	.audit-board,
	.filing-builder,
	.debrief-board {
		display: grid;
		gap: 18px;
	}

	.node-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 10px;
	}

	.system-node,
	.overview-card,
	.metric-card,
	.entity-card,
	.elimination-card,
	.consolidated-card,
	.decision-panel,
	.packet-summary,
	.trace-panel,
	.bridge-total,
	.filing-cover {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 16px;
		background: color-mix(in srgb, var(--surface) 78%, transparent);
	}

	.system-node strong,
	.overview-card strong,
	.metric-card strong,
	.entity-card strong,
	.elimination-card strong,
	.consolidated-card strong,
	.bridge-total strong,
	.filing-cover strong {
		display: block;
		margin: 5px 0;
		font-size: 1.1rem;
	}

	.system-node span,
	.metric-card span,
	.entity-card span,
	.elimination-card span,
	.consolidated-card span,
	.filing-cover span,
	.document-row p {
		color: var(--muted);
	}

	.overview-steps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 10px;
	}

	.overview-steps div {
		display: grid;
		gap: 5px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 13px;
		background: color-mix(in srgb, var(--surface) 74%, transparent);
		text-align: left;
	}

	.overview-steps span {
		color: var(--accent);
		font-size: 0.74rem;
		font-weight: 950;
	}

	.overview-card p,
	.overview-steps p {
		margin: 0;
		color: var(--muted);
		line-height: 1.45;
	}

	.workpaper-table,
	.statement-binder,
	.journal-entry {
		overflow-x: auto;
		overflow-y: hidden;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: color-mix(in srgb, var(--surface) 72%, transparent);
	}

	.workpaper-table.wide {
		overflow-x: auto;
	}

	.event-board {
		grid-template-columns: minmax(240px, 0.72fr) minmax(420px, 1.28fr);
	}

	.event-board .event-list {
		grid-row: span 2;
	}

	.event-list,
	.request-list,
	.choice-stack,
	.document-stack,
	.checklist,
	.judgment-steps,
	.journal-grid,
	.trace-ladder {
		display: grid;
		gap: 10px;
	}

	.event-card,
	.request-list button {
		display: grid;
		gap: 6px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 13px;
		background: color-mix(in srgb, var(--surface) 74%, transparent);
		text-align: left;
	}

	.event-card.active,
	.document-row.active,
	.judgment-step.active,
	.request-list button.active,
	.bridge-item.active {
		border-color: color-mix(in srgb, var(--accent) 58%, transparent);
		background: color-mix(in srgb, var(--accent) 11%, transparent);
	}

	.event-card small {
		color: var(--accent-2);
		font-weight: 900;
	}

	.event-card span {
		color: var(--muted);
	}

	.event-docket,
	.evidence-review,
	.judgment-memo {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 16px;
		background: color-mix(in srgb, var(--surface) 76%, transparent);
	}

	.event-docket small,
	.evidence-review small,
	.judgment-memo small {
		color: var(--accent-2);
		font-size: 0.68rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.event-docket h3,
	.evidence-review h3,
	.judgment-memo h3,
	.decision-panel h3 {
		margin: 6px 0 12px;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.25rem, 1.75vw, 1.85rem);
		line-height: 1.08;
	}

	.event-docket p,
	.evidence-review p,
	.judgment-memo p,
	.decision-outcome p {
		margin: 0;
		color: var(--muted);
		line-height: 1.48;
	}

	.event-facts {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 8px;
		margin: 14px 0;
	}

	.event-facts div {
		display: grid;
		gap: 4px;
		border: 1px solid var(--line);
		border-radius: 7px;
		padding: 10px;
		background: color-mix(in srgb, var(--paper) 36%, transparent);
	}

	.event-facts span {
		color: var(--muted);
		font-size: 0.68rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.event-facts strong {
		font-size: 0.88rem;
		line-height: 1.25;
	}

	.event-question,
	.judgment-memo div {
		display: grid;
		grid-template-columns: 24px minmax(0, 1fr);
		gap: 8px;
		align-items: start;
		border-top: 1px solid var(--line);
		margin-top: 16px;
		padding-top: 14px;
		color: var(--muted);
		line-height: 1.45;
	}

	.event-question :global(svg),
	.judgment-memo :global(svg) {
		color: var(--accent-2);
		margin-top: 2px;
	}

	.lane-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;
		margin: 14px 0;
	}

	.lane,
	.choice-stack button,
	.tabs button {
		min-height: 34px;
		padding: 0 12px;
		font-weight: 800;
	}

	.lane {
		display: grid;
		gap: 5px;
		align-content: start;
		min-height: 106px;
		border-radius: 8px;
		padding: 12px;
		text-align: left;
	}

	.lane span {
		color: var(--muted);
		font-size: 0.78rem;
		font-weight: 500;
		line-height: 1.35;
	}

	.lane.active span {
		color: color-mix(in srgb, var(--bg) 72%, transparent);
	}

	.choice-stack button {
		border-radius: 8px;
		padding: 12px 14px;
		text-align: left;
	}

	.choice-stack + p,
	.decision-panel > p {
		margin-top: 12px;
		line-height: 1.45;
	}

	.decision-outcome {
		border-top: 1px solid var(--line);
		padding-top: 14px;
	}

	.decision-outcome strong {
		display: block;
		margin-bottom: 5px;
	}

	.document-row {
		display: grid;
		grid-template-columns: 90px 130px minmax(0, 1fr) auto;
		gap: 12px;
		align-items: center;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 12px;
		background: color-mix(in srgb, var(--paper) 76%, transparent);
		text-align: left;
	}

	.document-row span,
	.judgment-step span,
	.trace-ladder span {
		color: var(--accent);
		font-size: 0.76rem;
		font-weight: 950;
	}

	.checklist span {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		font-size: 0.95rem;
		line-height: 1.35;
	}

	.packet-summary h3 {
		margin: 0 0 12px;
		font-family: inherit;
		font-size: 1.05rem;
		line-height: 1.2;
	}

	.evidence-packet {
		grid-template-columns: minmax(360px, 1.08fr) minmax(300px, 0.92fr);
	}

	.evidence-review {
		display: grid;
		align-content: start;
	}

	.extracted-fields {
		display: grid;
		gap: 8px;
		border-top: 1px solid var(--line);
		margin-top: 16px;
		padding-top: 14px;
	}

	.extracted-fields span {
		border: 1px solid var(--line);
		border-radius: 7px;
		padding: 9px 10px;
		color: var(--ink);
		background: color-mix(in srgb, var(--paper) 42%, transparent);
		font-size: 0.9rem;
	}

	.primary-action {
		width: fit-content;
		min-height: 38px;
		padding: 0 14px;
		background: var(--gold);
		color: #14110a;
		font-weight: 900;
	}

	.success-note {
		color: var(--green);
		font-weight: 800;
	}

	.judgment-tree {
		grid-template-columns: minmax(270px, 0.72fr) minmax(430px, 1.28fr);
	}

	.judgment-tree .judgment-steps {
		grid-row: span 2;
	}

	.judgment-tree .decision-panel,
	.judgment-memo {
		grid-column: 2;
	}

	.judgment-step {
		display: grid;
		grid-template-columns: 34px 1fr;
		gap: 6px 12px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 11px;
		background: color-mix(in srgb, var(--surface) 72%, transparent);
		text-align: left;
	}

	.judgment-step p {
		grid-column: 2;
		margin: 0;
		color: var(--muted);
	}

	.mini-entry {
		display: grid;
		gap: 7px;
		border-top: 1px solid var(--line);
		margin-top: 14px;
		padding-top: 14px;
	}

	.mini-entry div {
		display: grid;
		grid-template-columns: 68px minmax(0, 1fr) auto;
		gap: 10px;
		align-items: center;
		border: 1px solid var(--line);
		border-radius: 7px;
		padding: 9px 10px;
		background: color-mix(in srgb, var(--paper) 40%, transparent);
	}

	.mini-entry span {
		color: var(--accent-2);
		font-size: 0.68rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.mini-entry em {
		color: var(--accent);
		font-style: normal;
		font-weight: 900;
	}

	.tabs {
		flex-wrap: wrap;
		margin-bottom: 14px;
	}

	.record-toolbar {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		align-items: end;
		border-bottom: 1px solid var(--line);
		margin-bottom: 14px;
		padding-bottom: 12px;
	}

	.record-toolbar small,
	.journal-detail-header small,
	.posting-map small,
	.record-note small {
		color: var(--accent-2);
		font-size: 0.68rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.record-toolbar strong {
		display: block;
		margin-top: 4px;
		font-size: 1rem;
	}

	.record-toolbar span {
		color: var(--accent);
		font-weight: 900;
	}

	.record-split {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(260px, 0.34fr);
		gap: 16px;
		align-items: start;
	}

	.record-note,
	.journal-entry-detail,
	.posting-map {
		border: 1px solid var(--line);
		border-radius: 8px;
		background: color-mix(in srgb, var(--surface) 74%, transparent);
	}

	.record-note {
		display: grid;
		gap: 12px;
		padding: 16px;
	}

	.record-note h3 {
		margin: 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.35rem, 2vw, 2rem);
		line-height: 1.05;
	}

	.record-note p {
		margin: 0;
		color: var(--muted);
		line-height: 1.45;
	}

	.record-note div {
		display: grid;
		grid-template-columns: 22px minmax(0, 1fr);
		gap: 8px;
		border-top: 1px solid var(--line);
		padding-top: 12px;
		color: var(--muted);
		line-height: 1.4;
	}

	.record-note :global(svg) {
		color: var(--accent);
		margin-top: 2px;
	}

	.journal-workbench {
		display: grid;
		grid-template-columns: minmax(220px, 0.4fr) minmax(0, 1fr);
		gap: 16px;
		align-items: start;
	}

	.journal-list {
		display: grid;
		gap: 9px;
		grid-row: span 2;
	}

	.journal-card {
		display: grid;
		grid-template-columns: 54px minmax(0, 1fr);
		gap: 4px 10px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 11px;
		background: color-mix(in srgb, var(--surface) 72%, transparent);
		text-align: left;
	}

	.journal-card.active {
		border-color: color-mix(in srgb, var(--accent) 58%, transparent);
		background: color-mix(in srgb, var(--accent) 11%, transparent);
	}

	.journal-card span {
		color: var(--accent-2);
		font-size: 0.72rem;
		font-weight: 950;
	}

	.journal-card small {
		grid-column: 2;
		color: var(--muted);
		line-height: 1.25;
	}

	.journal-card .status-pill {
		grid-column: 2;
		width: fit-content;
	}

	.journal-entry-detail {
		display: grid;
		gap: 14px;
		padding: 16px;
	}

	.journal-detail-header {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		align-items: start;
	}

	.journal-detail-header h3 {
		margin: 5px 0 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.45rem, 2.1vw, 2.35rem);
		line-height: 1.04;
	}

	.journal-entry-detail p {
		margin: 0;
		color: var(--muted);
		line-height: 1.45;
	}

	.journal-meta {
		display: grid;
		grid-template-columns: minmax(120px, 0.35fr) minmax(0, 1fr);
		gap: 8px;
	}

	.journal-meta div {
		border: 1px solid var(--line);
		border-radius: 7px;
		padding: 9px 10px;
		background: color-mix(in srgb, var(--paper) 38%, transparent);
	}

	.journal-meta span {
		display: block;
		color: var(--muted);
		font-size: 0.68rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.journal-meta strong {
		display: block;
		margin-top: 4px;
		font-size: 0.9rem;
		line-height: 1.3;
	}

	.journal-sheet tfoot td {
		border-top: 1px solid var(--line);
		color: var(--ink);
		font-weight: 900;
	}

	.journal-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
	}

	.journal-actions button {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
		min-height: 38px;
		padding: 0 14px;
		font-weight: 900;
	}

	.posting-map {
		display: grid;
		grid-column: 2;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 9px;
		padding: 14px;
	}

	.posting-map small {
		grid-column: 1 / -1;
	}

	.posting-map div {
		display: grid;
		grid-template-columns: 52px minmax(0, 1fr);
		gap: 2px 8px;
		border: 1px solid var(--line);
		border-radius: 7px;
		padding: 9px;
		background: color-mix(in srgb, var(--paper) 38%, transparent);
	}

	.posting-map span {
		color: var(--accent-2);
		font-size: 0.68rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.posting-map em {
		grid-column: 2;
		color: var(--accent);
		font-style: normal;
		font-weight: 900;
	}

	.journal-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.ledger-balance,
	.trial-summary {
		gap: 10px;
		margin-bottom: 14px;
	}

	.ledger-balance {
		justify-content: space-between;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 12px 14px;
		background: color-mix(in srgb, var(--surface) 74%, transparent);
	}

	.trial-summary {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.trial-summary div,
	.bridge-item {
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 14px;
		background: color-mix(in srgb, var(--surface) 74%, transparent);
	}

	.trial-summary small,
	.bridge-item small {
		display: block;
		color: var(--muted);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.trial-summary strong,
	.bridge-item strong {
		display: block;
		margin-top: 4px;
		font-size: 1.25rem;
	}

	.consolidation-canvas,
	.debrief-board,
	.bridge-grid {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}

	.elimination-card {
		color: var(--accent-2);
	}

	.consolidated-card {
		border-color: color-mix(in srgb, var(--accent) 46%, transparent);
	}

	.statement-title {
		border-bottom: 1px solid var(--line);
		padding: 22px 18px 18px;
		text-align: center;
	}

	.statement-title h3 {
		margin: 4px 0 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.55rem, 2.65vw, 2.45rem);
		line-height: 1.04;
	}

	.statement-table {
		padding: 8px 18px 18px;
	}

	.statement-binder > .tabs {
		margin-bottom: 0;
		padding: 12px 14px 0;
	}

	.statement-head,
	.statement-row {
		display: grid;
		grid-template-columns: minmax(240px, 1.4fr) repeat(4, minmax(80px, 0.45fr));
		gap: 12px;
		align-items: center;
		width: 100%;
	}

	.tie-out-table table {
		min-width: 0;
		table-layout: fixed;
	}

	.tie-out-table th:nth-child(1),
	.tie-out-table td:nth-child(1) {
		width: 19%;
	}

	.tie-out-table th:nth-child(2),
	.tie-out-table td:nth-child(2),
	.tie-out-table th:nth-child(3),
	.tie-out-table td:nth-child(3),
	.tie-out-table th:nth-child(4),
	.tie-out-table td:nth-child(4) {
		width: 11%;
	}

	.tie-out-table th:nth-child(5),
	.tie-out-table td:nth-child(5) {
		width: 36%;
		font-size: 0.76rem;
		line-height: 1.32;
		word-break: break-word;
	}

	.tie-out-table th:nth-child(6),
	.tie-out-table td:nth-child(6) {
		width: 12%;
	}

	.statement-head {
		padding: 10px 0;
		color: var(--muted);
		font-size: 0.72rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.statement-section-title {
		margin-top: 12px;
		color: var(--accent-2);
		font-size: 0.78rem;
		font-weight: 950;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.statement-row {
		border-bottom: 1px solid var(--line);
		padding: 9px 0;
		background: transparent;
		text-align: left;
	}

	.statement-row:hover {
		color: var(--accent);
	}

	.total-row {
		font-weight: 950;
	}

	.cash-bridge {
		display: grid;
		gap: 14px;
	}

	.bridge-grid {
		display: grid;
		gap: 10px;
	}

	.bridge-item {
		text-align: left;
	}

	.bridge-item span {
		color: var(--muted);
	}

	.status-pill {
		display: inline-flex;
		width: fit-content;
		max-width: 100%;
		min-height: 24px;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		padding: 3px 9px;
		font-size: 0.72rem;
		font-weight: 900;
		line-height: 1.15;
		text-align: center;
		white-space: normal;
	}

	.status-pill.good {
		color: var(--green);
		background: color-mix(in srgb, var(--green) 14%, transparent);
	}

	.status-pill.warning {
		color: var(--red);
		background: color-mix(in srgb, var(--red) 14%, transparent);
	}

	.status-pill.neutral {
		color: var(--muted);
		background: color-mix(in srgb, var(--muted) 12%, transparent);
	}

	.selected-row {
		background: color-mix(in srgb, var(--accent) 10%, transparent);
	}

	.filing-builder {
		grid-template-columns: minmax(240px, 0.5fr) minmax(360px, 1fr);
	}

	.trace-ladder {
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-top: 18px;
	}

	.trace-ladder button {
		display: grid;
		grid-template-columns: 32px 1fr;
		gap: 2px 10px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 10px;
		background: color-mix(in srgb, var(--surface) 72%, transparent);
		text-align: left;
	}

	.trace-ladder button.active {
		border-color: color-mix(in srgb, var(--accent) 50%, transparent);
		background: color-mix(in srgb, var(--accent) 12%, transparent);
	}

	.trace-ladder small {
		grid-column: 2;
		color: var(--muted);
	}

	.sequence-bar {
		justify-content: space-between;
		border-top: 1px solid var(--line);
		min-height: 36px;
		padding: 3px 14px;
		background: color-mix(in srgb, var(--surface) 88%, transparent);
		backdrop-filter: blur(20px) saturate(1.25);
		-webkit-backdrop-filter: blur(20px) saturate(1.25);
	}

	.sequence-bar span {
		color: var(--muted);
		font-size: 0.78rem;
		font-weight: 850;
	}

	.sequence-button {
		display: inline-flex;
		gap: 7px;
		align-items: center;
		min-height: 28px;
		background: transparent;
		color: var(--muted);
		font-weight: 850;
	}

	.sequence-button:not(:disabled):hover {
		color: var(--accent);
	}

	@media (max-width: 1180px) {
		:global(body) {
			overflow: auto;
		}

		.simulator {
			height: auto;
			min-height: 100vh;
			overflow: visible;
		}

		.content-shell {
			display: block;
			height: auto;
			margin-left: var(--sidebar-collapsed-width) !important;
			padding-bottom: 54px;
		}

		.workspace-shell {
			display: block;
		}

		.lesson-panel,
		.process-panel {
			overflow: visible;
		}

		.lesson-panel {
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.entry-page {
			height: auto;
			min-height: 100vh;
		}

		.entry-hero-content {
			max-width: min(620px, 74vw);
		}

		.entry-hero-brand {
			max-width: min(650px, 76vw);
		}

		.entry-hero-brand h1 {
			max-width: 10.5ch;
			font-size: clamp(3.5rem, 8.5vw, 6rem);
		}

		.entry-ledger-sheet,
		.entry-close-board,
		.entry-filing-card {
			width: min(330px, 34vw);
		}

		.entry-close-board {
			right: clamp(84px, 14vw, 170px);
		}

		.entry-preview {
			grid-template-columns: 1fr;
		}

		.entry-author {
			align-items: flex-start;
			flex-direction: column;
		}

		.entry-author-links {
			justify-content: flex-start;
		}

		.landing-dossier {
			grid-template-columns: 1fr;
		}

		.cycle-strip {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.trace-preview-track {
			grid-template-columns: repeat(9, minmax(132px, 1fr));
		}

		.setup-control-plane {
			grid-template-columns: 1fr;
		}

		.setup-readiness {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 760px) {
		.simulator {
			--header-height: 44px;
		}

		.masthead {
			padding: 8px 10px;
		}

		.brand strong {
			font-size: 0.88rem;
		}

		.entry-hero {
			align-items: end;
			min-height: clamp(540px, 74svh, 640px);
			padding: 26px 22px 34px;
		}

		.entry-hero-content {
			gap: 15px;
			max-width: none;
		}

		.entry-hero-brand {
			max-width: 100%;
		}

		.entry-hero-brand h1 {
			max-width: 9.8ch;
			font-size: clamp(2.85rem, 12.6vw, 3.4rem);
			line-height: 0.9;
		}

		.entry-hero-content p {
			font-size: 0.98rem;
		}

		.entry-cta {
			min-height: 40px;
			padding: 0 15px;
		}

		.entry-hero-overlay {
			background:
				linear-gradient(
					0deg,
					color-mix(in srgb, var(--bg) 92%, transparent) 0 46%,
					transparent 100%
				),
				linear-gradient(90deg, color-mix(in srgb, var(--bg) 74%, transparent), transparent 84%);
		}

		.entry-ledger-sheet {
			top: 76px;
			right: -18px;
			width: min(270px, 72vw);
			opacity: 0.68;
		}

		.entry-close-board,
		.entry-filing-card {
			display: none;
		}

		.entry-preview {
			padding: 18px 22px 72px;
		}

		.entry-preview-items {
			grid-template-columns: 1fr;
		}

		.entry-preview-items div {
			border-left: 0;
			border-top: 1px solid var(--line);
			padding: 12px 0 0;
		}

		.entry-author-links {
			gap: 8px;
		}

		.entry-author-links a {
			min-height: 30px;
			padding: 0 10px;
			font-size: 0.84rem;
		}

		.lesson-panel,
		.process-panel {
			padding: 18px 16px;
		}

		.landing-panel {
			align-items: start;
		}

		.landing-copy {
			gap: 16px;
		}

		h1 {
			max-width: none;
			font-size: clamp(1.9rem, 9vw, 2.7rem);
		}

		.landing-copy h1 {
			max-width: none;
			font-size: clamp(2rem, 9vw, 2.55rem);
		}

		.landing-lede {
			font-size: 0.98rem;
			line-height: 1.48;
		}

		.landing-primary,
		.landing-secondary {
			min-height: 36px;
			font-size: 0.9rem;
		}

		.lesson-kicker,
		.process-header,
		.demo-guidance,
		.document-row,
		.filing-builder {
			align-items: stretch;
			grid-template-columns: 1fr;
		}

		.lesson-kicker,
		.process-header {
			flex-direction: column;
		}

		.node-grid,
		.landing-stats,
		.landing-ledger-mini,
		.primer-workbench,
		.account-family-grid,
		.equation-balance,
		.account-type-facts,
		.timing-lens-grid,
		.concept-strip,
		.setup-area-list,
		.setup-readiness,
		.overview-steps,
		.event-board,
		.evidence-packet,
		.judgment-tree,
		.record-split,
		.journal-workbench,
		.journal-meta,
		.journal-grid,
		.trial-summary,
		.consolidation-canvas,
		.debrief-board,
		.bridge-grid,
		.trace-ladder {
			grid-template-columns: 1fr;
		}

		.event-board .event-list,
		.judgment-tree .judgment-steps,
		.judgment-tree .decision-panel,
		.judgment-memo,
		.journal-list,
		.posting-map {
			grid-row: auto;
			grid-column: auto;
		}

		.record-toolbar,
		.journal-detail-header {
			align-items: stretch;
			flex-direction: column;
		}

		.landing-ledger-mini div,
		.landing-ledger-mini div:nth-child(2n),
		.landing-ledger-mini div:nth-last-child(-n + 2) {
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.landing-ledger-mini div:last-child {
			border-bottom: 0;
		}

		.cycle-strip {
			grid-template-columns: 1fr;
		}

		.cycle-strip button {
			min-height: 128px;
		}

		.trace-preview-header {
			flex-direction: column;
		}

		.trace-preview-header > span {
			max-width: none;
			text-align: left;
		}

		.workpaper-table,
		.statement-binder {
			overflow-x: auto;
		}

		.statement-head,
		.statement-row {
			min-width: 720px;
		}
	}

	@media (min-width: 1181px) {
		.sidebar-backdrop {
			display: none;
		}
	}
</style>
