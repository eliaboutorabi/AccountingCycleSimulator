<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
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
			doPrompt: 'Choose a point in the cycle and inspect what evidence or accounting object supports it.'
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
			mistake: 'Thinking a balanced journal entry is enough when support, period, and account choice are wrong.',
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
			watchPrompt: 'Watch cutoff, adjustments, reconciliations, trial balance, and consolidation prepare reporting.',
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
			mistake: 'Preparing attractive statement tables that cannot be traced back to the ledger and notes.',
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
			mistake: 'Treating filing as a final export instead of the final page of a controlled reporting process.',
			keyPoint: 'Assurance is traceability tested from several angles.',
			watchPrompt: 'Watch tie-out, controls, audit requests, filing assembly, and debrief move toward readiness.',
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

	const tocSections: TocItem[] = [
		{
			id: 'home-node',
			label: 'Start here',
			icon: Workflow,
			stageIndex: 0
		},
		{
			id: 'foundation',
			label: 'Foundation',
			icon: Building2,
			stageIndex: 1,
			children: [
				{ id: 'setup-node', label: 'Company setup', icon: Building2, stageIndex: 6 },
				{ id: 'events-node', label: 'Event triage', icon: BriefcaseBusiness, stageIndex: 7 },
				{ id: 'evidence-node', label: 'Evidence packet', icon: ReceiptText, stageIndex: 8 },
				{ id: 'judgment-node', label: 'Accounting judgment', icon: Gavel, stageIndex: 9 }
			]
		},
		{
			id: 'record',
			label: 'Record',
			icon: FileText,
			stageIndex: 2,
			children: [
				{ id: 'subledger-node', label: 'Subledgers', icon: Layers3, stageIndex: 10 },
				{ id: 'journal-node', label: 'Journal entries', icon: FileText, stageIndex: 11 },
				{ id: 'matching-node', label: 'Match and settle', icon: PackageCheck, stageIndex: 12 },
				{ id: 'ledger-node', label: 'General ledger', icon: Database, stageIndex: 13 }
			]
		},
		{
			id: 'close',
			label: 'Close',
			icon: Table2,
			stageIndex: 3,
			children: [
				{ id: 'cutoff-node', label: 'Cutoff', icon: SearchCheck, stageIndex: 14 },
				{ id: 'adjustments-node', label: 'Adjustments', icon: Calculator, stageIndex: 15 },
				{
					id: 'reconciliations-node',
					label: 'Reconciliations',
					icon: ClipboardCheck,
					stageIndex: 16
				},
				{ id: 'trial-node', label: 'Trial balance', icon: Table2, stageIndex: 17 },
				{ id: 'consolidation-node', label: 'Consolidation', icon: Network, stageIndex: 18 }
			]
		},
		{
			id: 'report',
			label: 'Report',
			icon: Landmark,
			stageIndex: 4,
			children: [
				{ id: 'mapping-node', label: 'Statement mapping', icon: Workflow, stageIndex: 19 },
				{ id: 'statements-node', label: 'Statements', icon: Landmark, stageIndex: 20 },
				{ id: 'cash-flow-node', label: 'Cash flow', icon: Banknote, stageIndex: 21 },
				{ id: 'disclosures-node', label: 'Disclosures', icon: BookOpen, stageIndex: 22 }
			]
		},
		{
			id: 'assure',
			label: 'Assure and file',
			icon: ShieldCheck,
			stageIndex: 5,
			children: [
				{ id: 'tie-out-node', label: 'Stick and tie', icon: Tags, stageIndex: 23 },
				{ id: 'controls-node', label: 'Controls', icon: ShieldCheck, stageIndex: 24 },
				{ id: 'audit-node', label: 'Audit evidence', icon: FileCheck2, stageIndex: 25 },
				{ id: 'filing-node', label: 'Filing package', icon: ScrollText, stageIndex: 26 },
				{ id: 'debrief-node', label: 'Debrief', icon: ListChecks, stageIndex: 27 }
			]
		}
	];

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

	const eventQueue = [
		{
			id: 'subscription-contract',
			date: 'Jan 02',
			event: 'Aster Labs signs annual fleet maintenance contract',
			evidence: 'C-1001 / INV-1001',
			lane: 'Record later',
			answer: 'Track contract, bill AR, defer revenue, recognize monthly'
		},
		{
			id: 'product-shipment',
			date: 'Jan 06',
			event: 'Bikes ship to West Harbor Co. on credit',
			evidence: 'SO-143 / BOL-143 / INV-143',
			lane: 'Record now',
			answer: 'Record product revenue, AR, COGS, and inventory relief'
		},
		{
			id: 'vendor-po',
			date: 'Jan 12',
			event: 'Inventory purchase order issued',
			evidence: 'PO-2207',
			lane: 'Monitor',
			answer: 'No entry until goods are received or invoice creates obligation'
		},
		{
			id: 'legal-letter',
			date: 'Jan 24',
			event: 'Counsel sends early claim assessment',
			evidence: 'LEGAL-04',
			lane: 'Disclose / monitor',
			answer: 'Evaluate contingency and disclosure; no accrual yet in this scenario'
		}
	];

	const evidenceDocs = [
		{ id: 'C-1001', type: 'Contract', field: '12-month maintenance service', status: 'Signed' },
		{ id: 'INV-1001', type: 'Invoice', field: '$1.2m due on receipt', status: 'Captured' },
		{ id: 'PMT-1001', type: 'Receipt', field: 'Customer paid Jan 08', status: 'Matched' },
		{ id: 'BNK-018', type: 'Bank line', field: '$1.2m deposit cleared', status: 'Imported' },
		{
			id: 'POL-REV',
			type: 'Policy memo',
			field: 'Recognize ratably over service term',
			status: 'Approved'
		}
	];

	const judgmentSteps = [
		{ label: 'Contract exists', result: 'Approved parties, rights, and payment terms' },
		{ label: 'Obligation identified', result: 'One stand-ready maintenance service' },
		{ label: 'Price measured', result: '$1.2m fixed consideration' },
		{ label: 'Allocation complete', result: 'One obligation receives full price' },
		{ label: 'Recognition pattern', result: 'Over time, ratably across 12 months' }
	];

	const subledgerTabs = [
		{ id: 'ar', label: 'AR aging' },
		{ id: 'revenue', label: 'Revenue schedule' },
		{ id: 'inventory', label: 'Inventory layers' },
		{ id: 'ap', label: 'AP aging' }
	] satisfies { id: SubledgerTab; label: string }[];

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
		{ month: 'Jan', billings: 1200, revenue: 100, deferredEnding: 1100, status: 'Released' },
		{ month: 'Feb', billings: 0, revenue: 100, deferredEnding: 1000, status: 'Scheduled' },
		{ month: 'Mar', billings: 0, revenue: 100, deferredEnding: 900, status: 'Scheduled' },
		{ month: 'Apr-Dec', billings: 0, revenue: 900, deferredEnding: 0, status: 'Scheduled' }
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
			id: 'JE-1001',
			title: 'Product sale and COGS',
			lines: [
				{ account: 'Accounts receivable', debit: 1500, credit: 0, ref: 'INV-143' },
				{ account: 'Product revenue', debit: 0, credit: 1500, ref: 'INV-143' },
				{ account: 'Cost of product revenue', debit: 960, credit: 0, ref: 'BOL-143' },
				{ account: 'Inventory', debit: 0, credit: 960, ref: 'BOL-143' }
			]
		},
		{
			id: 'JE-1003',
			title: 'Subscription billing',
			lines: [
				{ account: 'Accounts receivable', debit: 1200, credit: 0, ref: 'INV-1001' },
				{ account: 'Deferred revenue', debit: 0, credit: 1200, ref: 'C-1001' }
			]
		},
		{
			id: 'JE-1005',
			title: 'January service release',
			lines: [
				{ account: 'Deferred revenue', debit: 100, credit: 0, ref: 'RS-C-1001' },
				{ account: 'Service revenue', debit: 0, credit: 100, ref: 'RS-C-1001' }
			]
		},
		{
			id: 'JE-1008',
			title: 'Received-not-invoiced accrual',
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
		{ doc: 'BNK-018', amount: 1200, quantity: 'Cash receipt', status: 'Applied to INV-1001' }
	];

	const ledgerAccounts = [
		{
			account: 'Cash',
			ending: 1820,
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
					debit: 1200,
					credit: 0,
					balance: 2858
				},
				{
					date: 'Jan 18',
					source: 'JE-1007',
					description: 'Vendor payment run',
					debit: 0,
					credit: 425,
					balance: 2433
				},
				{
					date: 'Jan 31',
					source: 'JE-1012',
					description: 'Payroll and operating cash',
					debit: 0,
					credit: 613,
					balance: 1820
				}
			]
		},
		{
			account: 'Accounts receivable',
			ending: 1005,
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
					debit: 1200,
					credit: 0,
					balance: 2070
				},
				{
					date: 'Jan 06',
					source: 'JE-1001',
					description: 'Product invoice',
					debit: 1500,
					credit: 0,
					balance: 3570
				},
				{
					date: 'Jan 08',
					source: 'JE-1004',
					description: 'Customer receipts',
					debit: 0,
					credit: 2485,
					balance: 1085
				},
				{
					date: 'Jan 22',
					source: 'JE-1002',
					description: 'Credit memo',
					debit: 0,
					credit: 80,
					balance: 1005
				}
			]
		},
		{
			account: 'Deferred revenue',
			ending: 1050,
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
					credit: 1200,
					balance: -2120
				},
				{
					date: 'Jan 31',
					source: 'JE-1005',
					description: 'January revenue release',
					debit: 1070,
					credit: 0,
					balance: -1050
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

	const traceNodes = [
		{
			label: 'Mock 10-Q fact',
			value: 'Service revenue $1.18m',
			detail: 'Tagged in the financial statement table.'
		},
		{
			label: 'Statement line',
			value: 'Service revenue',
			detail: 'Income statement line in the statement binder.'
		},
		{ label: 'Mapping', value: 'Account 4100', detail: 'Mapped from service revenue GL account.' },
		{
			label: 'Trial balance',
			value: 'Adjusted TB',
			detail: 'Credit balance after January release entries.'
		},
		{
			label: 'General ledger',
			value: 'GL 4100',
			detail: 'Posted from JE-1005 and other service releases.'
		},
		{
			label: 'Journal entry',
			value: 'JE-1005',
			detail: 'Debit deferred revenue, credit service revenue.'
		},
		{
			label: 'Revenue schedule',
			value: 'RS-C-1001',
			detail: 'One month released; eleven months remain deferred.'
		},
		{
			label: 'Source evidence',
			value: 'C-1001 / INV-1001 / PMT-1001',
			detail: 'Contract, invoice, receipt, and bank line support the transaction.'
		},
		{
			label: 'Policy and control',
			value: 'POL-REV / WP-REV',
			detail: 'Policy memo and reviewer signoff support the conclusion.'
		}
	];

	let activeIndex = $state(0);
	let activeTocId = $state('home-node');
	let mode: Mode = $state('watch');
	let demoStep = $state(0);
	let theme: Theme = $state('night');
	let sidebarOpen = $state(false);
	let expandedSections = $state<string[]>(['foundation']);
	let flyoutSection = $state<string | null>(null);
	let flyoutY = $state(0);
	let selectedEventId = $state('subscription-contract');
	let selectedTreatment = $state('over-time');
	let selectedSubledger: SubledgerTab = $state('revenue');
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
	const selectedEvent = $derived(
		eventQueue.find((event) => event.id === selectedEventId) ?? eventQueue[0]
	);
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
		if (expand) expandTocForItem(tocId);
		flyoutSection = null;
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

	function demoStepsFor(stage: Stage): DemoStep[] {
		if (stage.id === 'home') {
			return [
				{
					label: 'Start with evidence',
					detail: 'A $12,000 invoice is not a final reporting number yet. It begins as a supported business event.'
				},
				{
					label: 'Record the obligation',
					detail: 'The supported invoice creates AR and deferred revenue because Nimbus still owes future service.'
				},
				{
					label: 'Report and file',
					detail: 'One month becomes revenue, the remaining liability flows to statements, notes, tie-out, and filing facts.'
				}
			];
		}

		if (stage.id.endsWith('-overview')) {
			return [
				{ label: 'Orient', detail: stage.watchPrompt },
				{
					label: 'Inspect the artifacts',
					detail: 'The roadmap highlights the documents, records, controls, and reporting objects this section will use.'
				},
				{
					label: 'Follow the trace',
					detail: 'The same transaction remains connected to source evidence, accounting judgment, ledgers, reports, and review evidence.'
				}
			];
		}

		return [
			{ label: 'Open the artifact', detail: stage.watchPrompt },
			{
				label: 'Apply the accounting step',
				detail: 'The workbench updates the selected accounting artifact and exposes the downstream effect.'
			},
			{
				label: 'Check the trace',
				detail: 'The number, document, or decision is ready to be followed forward or backward in the cycle.'
			}
		];
	}

	function applyDemoState(stageId: StageId, step: number) {
		supportVisible = step > 1;
		issueResolved = false;
		traceIndex = Math.min(step, traceNodes.length - 1);

		if (stageId === 'events') {
			selectedEventId = eventQueue[Math.min(step, eventQueue.length - 1)]?.id ?? selectedEventId;
		}

		if (stageId === 'evidence' || stageId === 'trial' || stageId === 'mapping') {
			supportVisible = step > 0;
		}

		if (stageId === 'judgment' || stageId === 'journal') {
			selectedTreatment = step > 0 ? 'over-time' : 'immediate';
		}

		if (stageId === 'subledger') {
			selectedSubledger = subledgerTabs[Math.min(step, subledgerTabs.length - 1)]?.id ?? selectedSubledger;
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
			statementTab = ['balance', 'income', 'cash', 'equity'][
				Math.min(step, 3)
			] as StatementTab;
		}

		if (stageId === 'cash-flow') {
			cashFocus = Math.min(step, cashBridge.length - 1);
		}

		if (stageId === 'disclosures') {
			disclosureTab = disclosures[Math.min(step, disclosures.length - 1)]?.id ?? disclosureTab;
		}

		if (stageId === 'audit') {
			selectedAuditId = auditRequests[Math.min(step, auditRequests.length - 1)]?.id ?? selectedAuditId;
		}

		if (stageId === 'filing') {
			filingStep = Math.min(step, filingSections.length - 1);
		}
	}

	function setDemoMode(nextMode: Mode) {
		mode = nextMode;
		demoStep = 0;
		applyDemoState(activeStage.id, 0);
	}

	function setDemoStep(nextStep: number) {
		demoStep = Math.max(0, Math.min(nextStep, activeDemoSteps.length - 1));
		applyDemoState(activeStage.id, demoStep);
	}

	function resetDemo() {
		setDemoStep(0);
	}

	function checkPractice() {
		issueResolved = true;
		supportVisible = true;

		if (activeStage.id === 'judgment' || activeStage.id === 'journal') {
			selectedTreatment = 'over-time';
		}
	}

	function showPracticeAnswer() {
		setDemoStep(activeDemoSteps.length - 1);
		checkPractice();
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
	<header class="masthead">
		<a class="brand" href={resolve('/')} aria-label="Accounting Cycle Simulator home">
			<Calculator size={19} strokeWidth={2.4} />
			<strong>Accounting Cycle Simulator</strong>
		</a>

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
			<aside class="lesson-panel" aria-labelledby="lesson-title">
				<div class="lesson-kicker">
					<span><ActiveIcon size={15} strokeWidth={2.5} /> Step {String(activeIndex).padStart(2, '0')}</span>
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
			</aside>

			<section class="process-panel" aria-label={activeStage.workspace}>
				<div class="process-header">
					<div class="artifact-title">
						<span class="artifact-icon"><ActiveIcon size={20} strokeWidth={2.4} /></span>
						<span>
							<small>{activeStage.workspace}</small>
							<strong>Nimbus Bikes - January close</strong>
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
								<button type="button" onclick={() => setDemoStep(demoStep - 1)} disabled={demoStep === 0}>
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

				<div class={['demo-guidance', mode]}>
					<div>
						<small>{mode === 'watch' ? 'Watch step' : 'Do task'}</small>
						<strong>{mode === 'watch' ? activeDemoStep.label : 'Practice the accounting move'}</strong>
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

				<div class="artifact-body">
					{#if activeStage.id === 'home'}
						<section class="home-workspace">
							<div class="journey-number">
								<small>Follow the number</small>
								<strong>$12,000</strong>
								<span>Annual fleet maintenance invoice</span>
							</div>
							<div class="journey-map">
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
						<section class="system-map">
							<div class="node-grid">
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
										<tr><th>Account</th><th>Type</th><th>Statement mapping</th><th>Status</th></tr>
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
										onclick={() => (selectedEventId = event.id)}
									>
										<small>{event.date}</small>
										<strong>{event.event}</strong>
										<span>{event.evidence}</span>
									</button>
								{/each}
							</div>
							<div class="decision-panel">
								<small>Selected event</small>
								<h3>{selectedEvent.event}</h3>
								<div class="lane-grid">
									{#each ['Record now', 'Record later', 'Monitor', 'Disclose / monitor'] as lane (lane)}
										<button
											type="button"
											class={['lane', selectedEvent.lane === lane && 'active']}
											onclick={() => (issueResolved = selectedEvent.lane === lane)}
										>
											{lane}
										</button>
									{/each}
								</div>
								<p>{selectedEvent.answer}</p>
								{@render statusPill(issueResolved ? 'Learner matched' : selectedEvent.lane)}
							</div>
						</section>
					{:else if activeStage.id === 'evidence'}
						<section class="evidence-packet">
							<div class="document-stack">
								{#each evidenceDocs as doc (doc.id)}
									<div class="document-row">
										<span>{doc.id}</span>
										<strong>{doc.type}</strong>
										<p>{doc.field}</p>
										{@render statusPill(doc.status)}
									</div>
								{/each}
							</div>
							<div class="packet-summary">
								<h3>Evidence packet completeness</h3>
								<div class="checklist">
									<span><CheckCircle2 size={15} /> Customer and contract identified</span>
									<span><CheckCircle2 size={15} /> Billing amount and service period extracted</span
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
									<div class="judgment-step">
										<span>{String(index + 1).padStart(2, '0')}</span>
										<strong>{step.label}</strong>
										<p>{step.result}</p>
									</div>
								{/each}
							</div>
							<div class="decision-panel">
								<small>Accounting treatment</small>
								<h3>How should Nimbus recognize the $1.2m contract?</h3>
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
										? 'Correct. January recognizes one month of service revenue and leaves the rest as deferred revenue.'
										: 'This would overstate January revenue and understate the remaining performance obligation.'}
								</p>
							</div>
						</section>
					{:else if activeStage.id === 'subledger'}
						<section class="subledger-workspace">
							<div class="tabs">
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
							<div class="workpaper-table">
								<table>
									{#if selectedSubledger === 'ar'}
										<thead
											><tr
												><th>Customer</th><th>Invoice</th><th>Current</th><th>Past due</th><th
													>Status</th
												></tr
											></thead
										>
										<tbody>
											{#each arAging as row (row.invoice)}
												<tr
													><td>{row.customer}</td><td>{row.invoice}</td><td>{money(row.current)}</td
													><td>{money(row.pastDue)}</td><td>{@render statusPill(row.status)}</td
													></tr
												>
											{/each}
										</tbody>
									{:else if selectedSubledger === 'revenue'}
										<thead
											><tr
												><th>Month</th><th>Billings</th><th>Revenue</th><th>Deferred ending</th><th
													>Status</th
												></tr
											></thead
										>
										<tbody>
											{#each revenueSchedule as row (row.month)}
												<tr
													><td>{row.month}</td><td>{money(row.billings)}</td><td
														>{money(row.revenue)}</td
													><td>{money(row.deferredEnding)}</td><td
														>{@render statusPill(row.status)}</td
													></tr
												>
											{/each}
										</tbody>
									{:else if selectedSubledger === 'inventory'}
										<thead
											><tr
												><th>SKU</th><th>Receipt</th><th>Units</th><th>Unit cost</th><th>Total</th
												><th>Status</th></tr
											></thead
										>
										<tbody>
											{#each inventoryLayers as row (row.receipt)}
												<tr
													><td>{row.sku}</td><td>{row.receipt}</td><td>{row.units}</td><td
														>{money(row.unitCost)}</td
													><td>{money(row.total)}</td><td>{@render statusPill(row.status)}</td></tr
												>
											{/each}
										</tbody>
									{:else}
										<thead
											><tr
												><th>Vendor</th><th>Bill</th><th>Current</th><th>Past due</th><th>Status</th
												></tr
											></thead
										>
										<tbody>
											{#each apAging as row (row.bill)}
												<tr
													><td>{row.vendor}</td><td>{row.bill}</td><td>{money(row.current)}</td><td
														>{money(row.pastDue)}</td
													><td>{@render statusPill(row.status)}</td></tr
												>
											{/each}
										</tbody>
									{/if}
								</table>
							</div>
						</section>
					{:else if activeStage.id === 'journal'}
						<section class="journal-grid">
							{#each journalEntries as entry (entry.id)}
								<div class="journal-entry">
									<header>
										<strong>{entry.id}</strong>
										<span>{entry.title}</span>
									</header>
									<table>
										<thead
											><tr><th>Account</th><th>Debit</th><th>Credit</th><th>Source</th></tr></thead
										>
										<tbody>
											{#each entry.lines as line (`${entry.id}-${line.account}-${line.ref}`)}
												<tr>
													<td>{line.account}</td>
													<td>{line.debit ? money(line.debit) : ''}</td>
													<td>{line.credit ? money(line.credit) : ''}</td>
													<td>{line.ref}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/each}
						</section>
					{:else if activeStage.id === 'matching'}
						<section class="matching-board">
							<div class="workpaper-table">
								<table>
									<thead
										><tr
											><th>Document</th><th>Amount</th><th>Quantity / event</th><th>Status</th></tr
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
											><th>Date</th><th>Source</th><th>Description</th><th>Debit</th><th>Credit</th
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
										><th>Account</th><th>GL</th><th>Support</th><th>Difference</th><th>Owner</th><th
											>Status</th
										></tr
									></thead
								>
								<tbody>
									{#each reconciliationRows as row (row.account)}
										<tr>
											<td>{row.account}</td><td>{money(row.gl)}</td><td>{money(row.support)}</td><td
												>{money(issueResolved ? 0 : row.difference)}</td
											><td>{row.owner}</td><td
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
											><th>GL account</th><th>Statement</th><th>Line item</th><th>Support / note</th
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
						<section class="workpaper-table">
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
													issueResolved && row.status.includes('Broken') ? row.statement : row.note
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
								<small>Open audit follow-ups</small><strong>1</strong><span>Manual JE support</span>
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
			<button type="button" class="sequence-button" onclick={previousStage} disabled={activeIndex === 0}>
				<ArrowLeft size={17} strokeWidth={2.4} />
				<span>Previous</span>
			</button>
			<span>{String(activeIndex + 1).padStart(2, '0')} of {String(stages.length).padStart(2, '0')}</span>
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
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}

	:global(svg) {
		flex: 0 0 auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		border-bottom: 1px solid var(--line);
		padding: 10px 11px;
		text-align: left;
		vertical-align: top;
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

	.theme-toggle:hover {
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
		gap: 12px;
	}

	.artifact-icon {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
		border-radius: 10px;
		color: var(--accent-2);
		background: color-mix(in srgb, var(--accent) 10%, transparent);
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

	.system-map,
	.home-workspace,
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
	.journey-number,
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
	.journey-number strong,
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

	.journey-number strong {
		font-size: clamp(2.4rem, 6vw, 5rem);
		line-height: 0.95;
	}

	.system-node span,
	.journey-number span,
	.metric-card span,
	.entity-card span,
	.elimination-card span,
	.consolidated-card span,
	.filing-cover span,
	.document-row p {
		color: var(--muted);
	}

	.journey-map,
	.overview-steps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 10px;
	}

	.journey-map button,
	.overview-steps div {
		display: grid;
		gap: 5px;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 13px;
		background: color-mix(in srgb, var(--surface) 74%, transparent);
		text-align: left;
	}

	.journey-map button.active {
		border-color: color-mix(in srgb, var(--accent) 58%, transparent);
		background: color-mix(in srgb, var(--accent) 11%, transparent);
	}

	.journey-map span,
	.overview-steps span {
		color: var(--accent);
		font-size: 0.74rem;
		font-weight: 950;
	}

	.journey-map small,
	.overview-card p,
	.overview-steps p {
		margin: 0;
		color: var(--muted);
		line-height: 1.45;
	}

	.workpaper-table,
	.statement-binder,
	.journal-entry {
		overflow: hidden;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: color-mix(in srgb, var(--surface) 72%, transparent);
	}

	.workpaper-table.wide {
		overflow-x: auto;
	}

	.event-board {
		grid-template-columns: minmax(280px, 0.9fr) minmax(320px, 1.1fr);
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

	.document-row {
		display: grid;
		grid-template-columns: 90px 130px minmax(0, 1fr) auto;
		gap: 12px;
		align-items: center;
		border: 1px solid var(--line);
		border-radius: 8px;
		padding: 12px;
		background: color-mix(in srgb, var(--paper) 76%, transparent);
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
		gap: 8px;
		align-items: center;
	}

	.primary-action {
		min-height: 42px;
		padding: 0 16px;
		background: var(--gold);
		color: #14110a;
		font-weight: 900;
	}

	.success-note {
		color: var(--green);
		font-weight: 800;
	}

	.judgment-tree {
		grid-template-columns: minmax(280px, 1fr) minmax(320px, 0.9fr);
	}

	.judgment-step {
		display: grid;
		grid-template-columns: 34px 1fr;
		gap: 6px 12px;
		border-bottom: 1px solid var(--line);
		padding: 10px 0;
	}

	.judgment-step p {
		grid-column: 2;
		margin: 0;
		color: var(--muted);
	}

	.tabs {
		flex-wrap: wrap;
		margin-bottom: 14px;
	}

	.journal-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.journal-entry header {
		display: flex;
		gap: 10px;
		border-bottom: 1px solid var(--line);
		padding: 12px;
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
		padding: 18px;
		text-align: center;
	}

	.statement-title h3 {
		margin: 4px 0 0;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(1.6rem, 3vw, 2.8rem);
		line-height: 1;
	}

	.statement-table {
		padding: 8px 18px 18px;
	}

	.statement-head,
	.statement-row {
		display: grid;
		grid-template-columns: minmax(240px, 1.4fr) repeat(4, minmax(80px, 0.45fr));
		gap: 12px;
		align-items: center;
		width: 100%;
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
		width: max-content;
		min-height: 24px;
		border-radius: 999px;
		padding: 3px 9px;
		font-size: 0.72rem;
		font-weight: 900;
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

		.lesson-panel,
		.process-panel {
			padding: 18px 16px;
		}

		h1 {
			max-width: none;
			font-size: clamp(1.9rem, 9vw, 2.7rem);
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
		.journey-map,
		.overview-steps,
		.event-board,
		.judgment-tree,
		.journal-grid,
		.trial-summary,
		.consolidation-canvas,
		.debrief-board,
		.bridge-grid,
		.trace-ladder {
			grid-template-columns: 1fr;
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
