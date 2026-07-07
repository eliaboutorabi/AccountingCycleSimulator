<script lang="ts">
	import { asset } from '$app/paths';
	import {
		accountTypeCards,
		accountingEquationExamples,
		cashAccrualComparisons
	} from '$lib/accounting-cycle/concepts';
	import { nimbusScenario } from '$lib/accounting-cycle/nimbus';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import Banknote from '@lucide/svelte/icons/banknote';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import BriefcaseBusiness from '@lucide/svelte/icons/briefcase-business';
	import Building2 from '@lucide/svelte/icons/building-2';
	import Calculator from '@lucide/svelte/icons/calculator';
	import CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
	import ClipboardCheck from '@lucide/svelte/icons/clipboard-check';
	import Database from '@lucide/svelte/icons/database';
	import FileCheck2 from '@lucide/svelte/icons/file-check-2';
	import FileText from '@lucide/svelte/icons/file-text';
	import Gavel from '@lucide/svelte/icons/gavel';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Landmark from '@lucide/svelte/icons/landmark';
	import Layers3 from '@lucide/svelte/icons/layers-3';
	import ListChecks from '@lucide/svelte/icons/list-checks';
	import Network from '@lucide/svelte/icons/network';
	import PackageCheck from '@lucide/svelte/icons/package-check';
	import ReceiptText from '@lucide/svelte/icons/receipt-text';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import ScrollText from '@lucide/svelte/icons/scroll-text';
	import SearchCheck from '@lucide/svelte/icons/search-check';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import Table2 from '@lucide/svelte/icons/table-2';
	import Tags from '@lucide/svelte/icons/tags';
	import Workflow from '@lucide/svelte/icons/workflow';

	type IconComponent = typeof Calculator;

	type PracticeChoice = {
		id: string;
		label: string;
		detail: string;
	};

	type Stage = {
		id: string;
		label: string;
		group: string;
		icon: IconComponent;
		artifact: string;
		title: string;
		question: string;
		lesson: string;
		notice: string[];
		example: string;
		mistake: string;
		keyPoint: string;
		caseAction: string;
		evidence: string;
		result: string;
		choices: PracticeChoice[];
		correctChoice: string;
	};

	const caseFacts = [
		{ label: 'Company', value: nimbusScenario.company },
		{ label: 'Period', value: nimbusScenario.period },
		{ label: 'Customer', value: nimbusScenario.customer },
		{ label: 'Contract', value: nimbusScenario.contractId },
		{ label: 'Invoice', value: nimbusScenario.invoiceId },
		{ label: 'Amount', value: nimbusScenario.primaryAmountLabel }
	];

	const groupNav = [
		{ label: 'Start', firstStage: 'home' },
		{ label: 'Basics', firstStage: 'accounting-equation' },
		{ label: 'Foundation', firstStage: 'foundation-overview' },
		{ label: 'Record', firstStage: 'record-overview' },
		{ label: 'Close', firstStage: 'close-overview' },
		{ label: 'Report', firstStage: 'report-overview' },
		{ label: 'Assure', firstStage: 'assure-overview' }
	];

	const stages: Stage[] = [
		{
			id: 'home',
			label: 'Start here',
			group: 'Start',
			icon: Workflow,
			artifact: 'Case file',
			title: 'Follow one number through the close',
			question: 'How does one business event become a reported, tied, and filed number?',
			lesson:
				'You are joining the accounting team at Nimbus Bikes for a January close. The app follows one subscription through evidence, judgment, records, ledgers, workpapers, statements, controls, audit support, and a mock filing.',
			notice: [
				'Read the accounting idea on the left.',
				'Use the right panel as the practical case file for that idea.',
				'Advance in order so the same $12,000 remains traceable from source to report.'
			],
			example:
				'The Aster Labs invoice begins as a contract and invoice, becomes deferred revenue, releases one month to revenue, appears in statements and disclosures, then receives a filing tag.',
			mistake:
				'Jumping straight to debits and credits without asking what happened, what proves it, and what policy governs it.',
			keyPoint: 'Every material number should have a trail.',
			caseAction: 'Start with the Nimbus Bikes case file and then move one step at a time.',
			evidence: 'C-1001, INV-1001, PMT-1001, BNK-8842, POL-REV-606',
			result: '$12,000 stays connected from source evidence to reporting.',
			choices: [
				{
					id: 'start',
					label: 'Begin the sequence',
					detail: 'Move into the basic accounting rule before touching the case records.'
				},
				{
					id: 'skip',
					label: 'Skip to filing',
					detail: 'This is tempting, but it hides the trail that makes the filing credible.'
				}
			],
			correctChoice: 'start'
		},
		{
			id: 'accounting-equation',
			label: 'Accounting equation',
			group: 'Basics',
			icon: Calculator,
			artifact: 'Resources and claims',
			title: 'Learn the rule underneath every record',
			question: 'What does Assets = Liabilities + Equity actually mean?',
			lesson:
				'The accounting equation keeps the business story connected. Everything Nimbus has is funded by claims from outsiders or owners.',
			notice: [
				'Assets answer what the company has or controls.',
				'Liabilities answer what the company owes or still needs to perform.',
				'Equity is the owners claim after liabilities.'
			],
			example:
				'Billing Aster Labs $12,000 before service is delivered increases accounts receivable and deferred revenue.',
			mistake:
				'Treating a balanced equation as proof that the account, date, and policy are correct.',
			keyPoint: 'Accounting starts by keeping resources and claims connected.',
			caseAction: 'Classify what changes when Nimbus bills Aster Labs upfront.',
			evidence: 'Invoice INV-1001 and contract C-1001',
			result: 'Accounts receivable increases and deferred revenue increases.',
			choices: [
				{
					id: 'asset-liability',
					label: 'Asset and liability',
					detail: 'Nimbus is owed cash, but it still owes service.'
				},
				{
					id: 'asset-equity',
					label: 'Asset and equity',
					detail: 'This would imply the company already earned the full contract.'
				},
				{
					id: 'cash-revenue',
					label: 'Cash and revenue',
					detail: 'Cash collection and earning are separate questions.'
				}
			],
			correctChoice: 'asset-liability'
		},
		{
			id: 'account-types',
			label: 'Five account types',
			group: 'Basics',
			icon: Table2,
			artifact: 'Account family map',
			title: 'Name the family before writing the entry',
			question: 'Is the account an asset, liability, equity, revenue, or expense?',
			lesson:
				'Debits and credits make sense after the learner knows what kind of account is changing. Account families tell you where the effect lives in the statements.',
			notice: [
				'Assets, liabilities, and equity live on the balance sheet.',
				'Revenue and expenses live on the income statement during the period.',
				'Temporary accounts close into retained earnings.'
			],
			example: 'Cash is an asset, deferred revenue is a liability, and service revenue is revenue.',
			mistake:
				'Assuming a word like payment, bill, or sale automatically tells you the account type.',
			keyPoint: 'Classification gives debits and credits their meaning.',
			caseAction: 'Assign the Aster-related accounts to account families.',
			evidence: 'Chart of accounts and revenue policy',
			result: 'AR is an asset; deferred revenue is a liability; service revenue is revenue.',
			choices: [
				{
					id: 'deferred-liability',
					label: 'Deferred revenue is a liability',
					detail: 'The customer has a claim on future service.'
				},
				{
					id: 'deferred-revenue',
					label: 'Deferred revenue is revenue',
					detail: 'The name is misleading until the service is earned.'
				},
				{
					id: 'ar-expense',
					label: 'AR is an expense',
					detail: 'AR is a customer claim, not a cost used up.'
				}
			],
			correctChoice: 'deferred-liability'
		},
		{
			id: 'cash-vs-accrual',
			label: 'Cash vs accrual',
			group: 'Basics',
			icon: Banknote,
			artifact: 'Timing lens',
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
				'Aster Labs pays $12,000 upfront, but Nimbus earns $1,000 in January and keeps $11,000 deferred.',
			mistake: 'Letting the bank feed decide the income statement.',
			keyPoint: 'Accrual accounting tells the truth about timing.',
			caseAction: 'Decide what January earns from the annual service contract.',
			evidence: 'Service period Jan 1 - Dec 31, 2026',
			result: '$1,000 revenue is earned; $11,000 remains deferred.',
			choices: [
				{
					id: 'one-month',
					label: 'Recognize one month',
					detail: 'January receives one month of the twelve-month service.'
				},
				{
					id: 'full-contract',
					label: 'Recognize all $12,000',
					detail: 'That would overstate January revenue.'
				},
				{
					id: 'nothing',
					label: 'Recognize nothing',
					detail: 'Nimbus did provide January service.'
				}
			],
			correctChoice: 'one-month'
		},
		{
			id: 'foundation-overview',
			label: 'Foundation overview',
			group: 'Foundation',
			icon: Building2,
			artifact: 'Foundation roadmap',
			title: 'Set up the accounting trail',
			question: 'What must be true before accounting records anything responsibly?',
			lesson:
				'The foundation arc defines the company, triages events, captures evidence, and documents judgment. It prevents careless journal entries.',
			notice: [
				'Company structure determines accounts, dimensions, policies, and approvals.',
				'Event triage decides whether accounting acts now, later, or only monitors.',
				'Evidence and judgment become the support reviewers and auditors need later.'
			],
			example:
				'Nimbus cannot record the subscription cleanly until the contract, invoice, service period, cash receipt, and revenue policy are connected.',
			mistake: 'Treating source documents as bookkeeping clutter.',
			keyPoint: 'Foundation work makes later accounting explainable.',
			caseAction: 'Check whether the Aster transaction has a foundation packet.',
			evidence: 'Entity, chart of accounts, contract, invoice, receipt, policy memo',
			result: 'The transaction can move into recording once evidence and policy are linked.',
			choices: [
				{
					id: 'packet',
					label: 'Build the packet first',
					detail: 'A supported record begins with structure, source evidence, and judgment.'
				},
				{
					id: 'entry-now',
					label: 'Post immediately',
					detail: 'Posting before support makes later review fragile.'
				}
			],
			correctChoice: 'packet'
		},
		{
			id: 'setup',
			label: 'Company setup',
			group: 'Foundation',
			icon: Building2,
			artifact: 'System blueprint',
			title: 'Design the accounting system',
			question: 'What structure must exist before transactions become reliable data?',
			lesson:
				'Nimbus needs entities, a fiscal calendar, accounts, reporting dimensions, subledgers, policies, bank accounts, and approvals before the close can be trusted.',
			notice: [
				'The chart of accounts is a data map.',
				'Departments, products, customers, and vendors become dimensions.',
				'Policies tell the system when an event becomes accounting.'
			],
			example:
				'Nimbus separates product revenue from subscription revenue and maps each account to a statement line before January close begins.',
			mistake:
				'Starting with journal entries before defining accounts, policies, dimensions, and approvals.',
			keyPoint: 'A clean close is designed before the first transaction arrives.',
			caseAction: 'Choose the setup item Nimbus needs for the subscription trail.',
			evidence: 'Chart of accounts, customer master, revenue policy, approval matrix',
			result: 'The system knows where AR, deferred revenue, and service revenue belong.',
			choices: [
				{
					id: 'revenue-policy',
					label: 'Revenue policy and accounts',
					detail: 'These drive the timing and classification.'
				},
				{
					id: 'logo',
					label: 'New invoice logo',
					detail: 'Helpful branding, but not close-critical.'
				}
			],
			correctChoice: 'revenue-policy'
		},
		{
			id: 'events',
			label: 'Event triage',
			group: 'Foundation',
			icon: BriefcaseBusiness,
			artifact: 'Business event queue',
			title: 'Sort business events',
			question: 'Is this operational activity, an accounting event, or a disclosure matter?',
			lesson:
				'Not every business event creates a journal entry immediately. The first judgment is whether accounting should act now, later, or only monitor.',
			notice: [
				'Ask whether something economically meaningful happened.',
				'Separate record-now events from record-later commitments.',
				'Keep monitored and disclosure-only events visible for close review.'
			],
			example:
				'A signed annual service contract matters for evidence, billing, deferred revenue, and disclosure even before all revenue is earned.',
			mistake:
				'Treating every operational document as a journal entry or ignoring commitments that should be tracked.',
			keyPoint: 'Triage keeps the accounting team focused.',
			caseAction: 'Classify the approved annual invoice for Aster Labs.',
			evidence: 'Approved contract and invoice issued Jan 2',
			result: 'Record now: create AR and deferred revenue.',
			choices: [
				{
					id: 'record-now',
					label: 'Record now',
					detail: 'A billable claim and service obligation exist.'
				},
				{
					id: 'monitor-only',
					label: 'Monitor only',
					detail: 'Too passive once the invoice is issued.'
				},
				{
					id: 'ignore',
					label: 'No accounting effect',
					detail: 'The invoice creates accounting consequences.'
				}
			],
			correctChoice: 'record-now'
		},
		{
			id: 'evidence',
			label: 'Evidence packet',
			group: 'Foundation',
			icon: ReceiptText,
			artifact: 'Source document capture',
			title: 'Build the evidence packet',
			question: 'What proves the event, date, amount, and accounting conclusion?',
			lesson:
				'Source documents are messy human evidence. Accounting turns contracts, invoices, receipts, bank lines, and policy memos into a packet reviewers can inspect.',
			notice: [
				'Completeness matters as much as accuracy.',
				'Billing date and service period answer different questions.',
				'Every extracted field should retain a source reference.'
			],
			example:
				'Contract C-1001, invoice INV-1001, cash receipt PMT-1001, bank line BNK-8842, and the revenue policy support the subscription transaction.',
			mistake: 'Capturing an amount without preserving the service period and cash evidence.',
			keyPoint: 'Evidence is the trailhead for every reportable number.',
			caseAction: 'Check whether the packet is complete enough to proceed.',
			evidence: 'Contract, invoice, receipt, bank line, policy memo',
			result: 'The packet supports amount, timing, customer, and policy conclusion.',
			choices: [
				{
					id: 'complete',
					label: 'Complete enough',
					detail: 'The key fields and source documents are present.'
				},
				{
					id: 'missing-policy',
					label: 'Ignore policy memo',
					detail: 'Policy is needed to justify timing.'
				}
			],
			correctChoice: 'complete'
		},
		{
			id: 'judgment',
			label: 'Judgment',
			group: 'Foundation',
			icon: Gavel,
			artifact: 'Policy decision',
			title: 'Apply accounting judgment',
			question: 'What does the event mean under the accounting policy?',
			lesson:
				'Accounting judgment converts evidence into recognition, measurement, classification, and timing.',
			notice: [
				'Point-in-time and over-time recognition create different statement patterns.',
				'Deferred revenue is a liability for service not yet delivered.',
				'Judgment must be documented, not hidden inside a journal entry.'
			],
			example:
				'Fleet maintenance is delivered evenly across twelve months, so only one month becomes January revenue.',
			mistake: 'Calling the full invoice amount revenue just because the customer paid upfront.',
			keyPoint: 'The policy decision controls the downstream journal entries.',
			caseAction: 'Choose the revenue treatment for the Aster service obligation.',
			evidence: 'Twelve-month service period and revenue policy',
			result: 'Defer the annual amount and release it over the service term.',
			choices: [
				{
					id: 'over-time',
					label: 'Recognize over time',
					detail: 'Service is provided evenly across the contract term.'
				},
				{
					id: 'immediate',
					label: 'Recognize immediately',
					detail: 'This would ignore the remaining service obligation.'
				}
			],
			correctChoice: 'over-time'
		},
		{
			id: 'record-overview',
			label: 'Record overview',
			group: 'Record',
			icon: FileText,
			artifact: 'Recording roadmap',
			title: 'Turn evidence into books',
			question: 'How does supported activity become accounting records?',
			lesson:
				'The record arc creates subledger records, journal entries, matching evidence, cash application, and official GL postings.',
			notice: [
				'Subledgers preserve detail by customer, vendor, item, asset, contract, and schedule.',
				'Journal entries translate facts into debits and credits.',
				'Matching and settlement prove records connect to operations and cash.'
			],
			example:
				'The same subscription creates AR, deferred revenue, a revenue schedule, cash application, and GL activity.',
			mistake: 'Thinking a balanced journal entry is enough when support or timing is wrong.',
			keyPoint: 'Recording is controlled translation.',
			caseAction: 'Move the supported Aster transaction into the books.',
			evidence: 'Foundation packet marked ready',
			result: 'Subledger, journal, matching, and GL records now carry the same references.',
			choices: [
				{
					id: 'subledger-first',
					label: 'Create detail and journal',
					detail: 'Preserve support while translating the event.'
				},
				{
					id: 'summary-only',
					label: 'Post one summary number',
					detail: 'This loses the detail needed for review.'
				}
			],
			correctChoice: 'subledger-first'
		},
		{
			id: 'subledger',
			label: 'Subledgers',
			group: 'Record',
			icon: Layers3,
			artifact: 'Revenue schedule',
			title: 'Create detailed records',
			question: 'Where does transaction detail live before it rolls into the GL?',
			lesson:
				'Subledgers hold the detail the general ledger summarizes: customer invoices, vendor bills, inventory layers, revenue schedules, fixed assets, payroll, leases, and debt.',
			notice: [
				'AR and AP subledgers support GL control accounts.',
				'Revenue schedules explain earned and deferred revenue.',
				'Inventory layers preserve quantities and costs.'
			],
			example:
				'INV-1001 appears in AR while C-1001 creates a revenue schedule with eleven months still deferred after January.',
			mistake: 'Trying to explain a GL balance without the subledger detail that created it.',
			keyPoint: 'The subledger keeps accounting detail inspectable.',
			caseAction: 'Create the revenue schedule for C-1001.',
			evidence: 'Contract term and invoice amount',
			result: '$1,000 January revenue; $11,000 ending deferred revenue.',
			choices: [
				{
					id: 'schedule',
					label: 'Revenue schedule',
					detail: 'It supports the monthly release and deferred balance.'
				},
				{
					id: 'bank-rec',
					label: 'Bank reconciliation',
					detail: 'Useful for cash, not revenue timing.'
				}
			],
			correctChoice: 'schedule'
		},
		{
			id: 'journal',
			label: 'Journal entries',
			group: 'Record',
			icon: FileText,
			artifact: 'Journal entry',
			title: 'Translate events into debits and credits',
			question: 'What accounts change, in what period, and with what support?',
			lesson:
				'Journal entries are the translation layer. Balanced entries can still be wrong if they use the wrong account, date, entity, period, or support reference.',
			notice: [
				'Each line needs an account, entity, amount, direction, and source reference.',
				'System-generated entries and manual close entries need different controls.',
				'The explanation should make the accounting story reviewable.'
			],
			example:
				'The invoice debits AR and credits deferred revenue. The monthly release debits deferred revenue and credits service revenue.',
			mistake:
				'Crediting revenue immediately for the full annual invoice because the entry balances.',
			keyPoint: 'Debits and credits are syntax; account choice is meaning.',
			caseAction: 'Approve the January revenue release entry.',
			evidence: 'RS-C-1001 and WP-REV',
			result: 'Debit deferred revenue $1,000; credit service revenue $1,000.',
			choices: [
				{
					id: 'release-entry',
					label: 'Dr deferred revenue, Cr service revenue',
					detail: 'This moves one earned month out of the liability.'
				},
				{
					id: 'cash-entry',
					label: 'Dr cash, Cr service revenue',
					detail: 'Cash was already collected and does not decide earning.'
				}
			],
			correctChoice: 'release-entry'
		},
		{
			id: 'matching',
			label: 'Match and settle',
			group: 'Record',
			icon: PackageCheck,
			artifact: 'Cash application',
			title: 'Match documents and settle balances',
			question: 'Has the company received, billed, paid, or collected the right thing?',
			lesson:
				'Matching connects operational documents to accounting records. Collections use invoice, remittance, bank line, and customer account.',
			notice: [
				'Price and quantity differences become exceptions.',
				'Cash application clears the correct customer invoice.',
				'Bank reconciliation proves book cash against independent bank activity.'
			],
			example: 'Customer payment PMT-1001 clears INV-1001 after it matches bank line BNK-8842.',
			mistake: 'Applying cash to the wrong invoice because the amount looks familiar.',
			keyPoint: 'Settlement is where accounting meets cash and operations.',
			caseAction: 'Apply the Aster cash receipt to the right invoice.',
			evidence: 'PMT-1001, BNK-8842, INV-1001',
			result: 'Cash increases and Aster AR is cleared.',
			choices: [
				{
					id: 'apply-invoice',
					label: 'Apply to INV-1001',
					detail: 'The remittance, bank line, and invoice match.'
				},
				{
					id: 'unapplied',
					label: 'Leave unapplied',
					detail: 'That would keep AR open unnecessarily.'
				}
			],
			correctChoice: 'apply-invoice'
		},
		{
			id: 'ledger',
			label: 'General ledger',
			group: 'Record',
			icon: Database,
			artifact: 'General ledger',
			title: 'Post to the official record',
			question: 'What is the account-by-account memory of the company?',
			lesson:
				'Posting moves approved journal lines into the general ledger. The GL is the official history of posted activity by account.',
			notice: [
				'Every GL line should point back to a source journal entry.',
				'Running balances reveal how transactions accumulate.',
				'The trial balance is created from these account balances.'
			],
			example:
				'Deferred revenue shows the $12,000 credit from billing and the $1,000 debit from January release.',
			mistake: 'Editing GL summaries without preserving posting detail.',
			keyPoint: 'The GL is where approved accounting becomes official.',
			caseAction: 'Trace the service revenue GL line back to its source.',
			evidence: 'GL 4100 and JE-1005',
			result: 'The revenue line points back to the approved January release entry.',
			choices: [
				{
					id: 'je-source',
					label: 'JE-1005',
					detail: 'This is the source of the January service revenue line.'
				},
				{
					id: 'contract-only',
					label: 'Contract only',
					detail: 'The contract supports the policy, but the GL line posts from a JE.'
				}
			],
			correctChoice: 'je-source'
		},
		{
			id: 'close-overview',
			label: 'Close overview',
			group: 'Close',
			icon: Table2,
			artifact: 'Close roadmap',
			title: 'Make the period ready to report',
			question: 'How does the team prove January is complete, accurate, and reviewed?',
			lesson:
				'The close arc tests cutoff, posts supported adjustments, reconciles accounts, reviews the adjusted trial balance, and consolidates entities.',
			notice: [
				'Cutoff protects period boundaries.',
				'Adjustments capture estimates and timing.',
				'Reconciliations and trial balance review prove balances before reporting.'
			],
			example:
				'Nimbus accrues received-not-invoiced inventory, releases one month of revenue, reconciles schedules, and reviews the adjusted TB.',
			mistake: 'Calling the close done because debits equal credits.',
			keyPoint: 'Close work proves the period, not just the math.',
			caseAction: 'Identify what the close must prove before statements are prepared.',
			evidence: 'Cutoff review, adjustments, reconciliations, adjusted TB',
			result: 'The period becomes report-ready.',
			choices: [
				{
					id: 'prove-period',
					label: 'Prove the period',
					detail: 'Completeness, cutoff, support, and review all matter.'
				},
				{
					id: 'math-only',
					label: 'Check debits equal credits',
					detail: 'Necessary, but not enough.'
				}
			],
			correctChoice: 'prove-period'
		},
		{
			id: 'cutoff',
			label: 'Cutoff',
			group: 'Close',
			icon: SearchCheck,
			artifact: 'Period-end review',
			title: 'Test cutoff and completeness',
			question: 'Are events recorded in the correct period?',
			lesson:
				'Cutoff catches transactions near period-end that belong in January but arrived late, or transactions recorded in January that belong later.',
			notice: [
				'Look at activity before and after period-end.',
				'Received-not-invoiced goods may create accruals.',
				'Late cash receipts can support AR without changing January revenue.'
			],
			example:
				'Inventory arrived January 30 but the invoice arrived February 2, so Nimbus records an RNI accrual.',
			mistake: 'Waiting for the vendor invoice and missing the January liability.',
			keyPoint: 'Cutoff makes the period boundary honest.',
			caseAction: 'Decide whether inventory received Jan 30 belongs in January.',
			evidence: 'RR-2211 dated Jan 30; vendor bill dated Feb 2',
			result: 'Record a January received-not-invoiced accrual.',
			choices: [
				{
					id: 'record-rni',
					label: 'Record January accrual',
					detail: 'Nimbus received the goods before period end.'
				},
				{
					id: 'wait-bill',
					label: 'Wait for February bill',
					detail: 'This understates January liability and inventory.'
				}
			],
			correctChoice: 'record-rni'
		},
		{
			id: 'adjustments',
			label: 'Adjustments',
			group: 'Close',
			icon: Calculator,
			artifact: 'Close workpaper',
			title: 'Post adjusting entries',
			question: 'What estimates and timing entries are needed before statements?',
			lesson:
				'Adjusting entries capture accounting that operational feeds do not finish alone: accruals, deferrals, depreciation, allowances, tax, leases, and estimates.',
			notice: [
				'Each adjustment needs a calculation and support.',
				'The before/after statement impact should be visible.',
				'Review notes explain assumptions and unusual movement.'
			],
			example:
				'Nimbus posts depreciation, prepaid amortization, the RNI accrual, allowance adjustment, and January revenue release.',
			mistake: 'Posting a round-number accrual with no support or reversal plan.',
			keyPoint: 'Adjustments turn operational records into accrual-basis reporting.',
			caseAction: 'Approve the supported January revenue release adjustment.',
			evidence: 'Revenue schedule and review workpaper',
			result: 'Deferred revenue decreases and service revenue increases by $1,000.',
			choices: [
				{
					id: 'approve-supported',
					label: 'Approve supported entry',
					detail: 'The schedule explains the amount and timing.'
				},
				{
					id: 'round-number',
					label: 'Post estimate without support',
					detail: 'This creates audit and review risk.'
				}
			],
			correctChoice: 'approve-supported'
		},
		{
			id: 'reconciliations',
			label: 'Reconciliations',
			group: 'Close',
			icon: ClipboardCheck,
			artifact: 'Account reconciliation',
			title: 'Prove balances to support',
			question: 'Do GL balances agree to independent or detailed support?',
			lesson:
				'Reconciliations prove that each balance is complete, accurate, and explainable. A GL number alone is not enough.',
			notice: [
				'Bank rec ties cash to bank statement activity.',
				'AR/AP aging ties subledger detail to GL control accounts.',
				'Rollforwards explain inventory, fixed assets, deferred revenue, leases, and debt.'
			],
			example: 'Deferred revenue ties to the revenue schedule rollforward.',
			mistake: 'Calling an account reconciled because the preparer recognizes the number.',
			keyPoint: 'A reconciled account is proven, not merely familiar.',
			caseAction: 'Tie deferred revenue to the revenue schedule.',
			evidence: 'GL 2300/2310 and RS-C-1001',
			result: 'The GL liability agrees to the schedule after the January release.',
			choices: [
				{
					id: 'tie-schedule',
					label: 'Tie to revenue schedule',
					detail: 'The schedule is the detailed support for deferred revenue.'
				},
				{
					id: 'accept-gl',
					label: 'Accept GL total alone',
					detail: 'The GL needs independent or detailed support.'
				}
			],
			correctChoice: 'tie-schedule'
		},
		{
			id: 'trial',
			label: 'Trial balance',
			group: 'Close',
			icon: Table2,
			artifact: 'Adjusted trial balance',
			title: 'Review the close spreadsheet',
			question: 'Are the accounts balanced and ready for reporting?',
			lesson:
				'The trial balance proves debits equal credits, then becomes the review surface for mapping, support, unusual balances, and statement readiness.',
			notice: [
				'Balanced does not mean correct.',
				'Mapping status matters before statement generation.',
				'Variance analytics reveal unusual movements and stale estimates.'
			],
			example:
				'The January adjusted TB maps cash, AR, inventory, deferred revenue, revenue, expenses, liabilities, and equity to statement lines.',
			mistake: 'Stopping the close when debits equal credits even though balances are unsupported.',
			keyPoint: 'The adjusted TB bridges accounting records to reports.',
			caseAction: 'Confirm the service revenue account is mapped before reporting.',
			evidence: 'Adjusted TB and reporting map',
			result: 'Account 4100 maps to service revenue in the income statement and revenue note.',
			choices: [
				{
					id: 'mapped',
					label: 'Confirm mapping',
					detail: 'A balanced but unmapped account will not report correctly.'
				},
				{
					id: 'skip-map',
					label: 'Skip mapping review',
					detail: 'This can break the statement package.'
				}
			],
			correctChoice: 'mapped'
		},
		{
			id: 'consolidation',
			label: 'Consolidation',
			group: 'Close',
			icon: Network,
			artifact: 'Group reporting canvas',
			title: 'Combine entities',
			question: 'What does the group look like as one reporting entity?',
			lesson:
				'Consolidation combines entity trial balances, eliminates intercompany activity, translates foreign subsidiaries, and prepares group reporting.',
			notice: [
				'Intercompany receivables and payables must eliminate.',
				'Foreign subsidiary results may create translation effects.',
				'The parent view should not report internal sales as external revenue.'
			],
			example:
				'Nimbus Canada sells service parts to the U.S. parent; the internal sale and payable eliminate.',
			mistake: 'Adding entity trial balances without eliminating internal activity.',
			keyPoint: 'Consolidation is a reporting lens, not just addition.',
			caseAction: 'Review whether an internal sale should remain in group revenue.',
			evidence: 'Intercompany sale and payable schedule',
			result: 'The internal sale is eliminated from consolidated results.',
			choices: [
				{
					id: 'eliminate',
					label: 'Eliminate intercompany sale',
					detail: 'The group cannot sell to itself.'
				},
				{
					id: 'keep-sale',
					label: 'Keep as external revenue',
					detail: 'That overstates consolidated revenue.'
				}
			],
			correctChoice: 'eliminate'
		},
		{
			id: 'report-overview',
			label: 'Report overview',
			group: 'Report',
			icon: Landmark,
			artifact: 'Reporting roadmap',
			title: 'Turn balances into communication',
			question: 'How do adjusted balances become statements, cash flow, and disclosures?',
			lesson:
				'The reporting arc maps accounts to statement lines, prepares comparative statements, explains cash movement, and drafts footnotes that tie back to support.',
			notice: [
				'Statement mapping is a control.',
				'Financial statements need subtotals, note references, and traceability.',
				'Footnotes explain details that statement lines summarize.'
			],
			example:
				'Deferred revenue appears as a liability, a note rollforward, and a policy disclosure.',
			mistake: 'Preparing attractive statement tables that cannot be traced back to the ledger.',
			keyPoint: 'Reporting is structured communication backed by evidence.',
			caseAction: 'Move the closed balances into reporting artifacts.',
			evidence: 'Adjusted TB, mapping matrix, note schedules',
			result: 'The reporting package tells the same story as the ledger.',
			choices: [
				{
					id: 'map-first',
					label: 'Map and tie first',
					detail: 'Reporting begins with controlled translation.'
				},
				{
					id: 'design-first',
					label: 'Format tables first',
					detail: 'Visual polish cannot replace traceability.'
				}
			],
			correctChoice: 'map-first'
		},
		{
			id: 'mapping',
			label: 'Statement mapping',
			group: 'Report',
			icon: Workflow,
			artifact: 'Reporting map',
			title: 'Map accounts to statements',
			question: 'How do GL accounts become statement lines?',
			lesson:
				'Financial statement lines are mapped summaries of accounts. Mapping errors create reporting errors even when the trial balance balances.',
			notice: [
				'Each active account needs a statement destination.',
				'Notes and cash flow classifications are also mappings.',
				'Mapping should be reviewed when new accounts are created.'
			],
			example:
				'Deferred revenue maps to contract liabilities and the revenue note; service revenue maps to revenue.',
			mistake: 'Leaving a new close account unmapped and wondering why statements do not tie.',
			keyPoint: 'Mapping translates ledger detail into communication.',
			caseAction: 'Map account 4100 to the reporting package.',
			evidence: 'GL 4100 and mapping row MAP-4100',
			result: 'Service revenue feeds the income statement and revenue disclosure.',
			choices: [
				{
					id: 'service-revenue',
					label: 'Service revenue',
					detail: 'Correct destination for account 4100.'
				},
				{
					id: 'contract-liability',
					label: 'Contract liability',
					detail: 'That is the deferred revenue balance, not earned revenue.'
				}
			],
			correctChoice: 'service-revenue'
		},
		{
			id: 'statements',
			label: 'Statements',
			group: 'Report',
			icon: Landmark,
			artifact: 'Statement binder',
			title: 'Prepare financial statements',
			question: 'How does the ledger become decision-useful communication?',
			lesson:
				'Statements are curated views of the ledger. A real package needs comparative columns, subtotals, footnote references, traceability, and tie status.',
			notice: [
				'The balance sheet must balance assets against liabilities and equity.',
				'The income statement explains performance and margin.',
				'The cash flow statement explains why profit and cash differ.'
			],
			example:
				'January service revenue, deferred revenue, AR, cash, inventory, AP, and PPE all appear differently across the binder.',
			mistake: 'Showing a one-line revenue summary and calling it financial reporting.',
			keyPoint: 'Statements are communication backed by ledger math and support.',
			caseAction: 'Place the January release in the correct statement.',
			evidence: 'Mapped service revenue account',
			result: '$1,000 appears in service revenue on the income statement.',
			choices: [
				{
					id: 'income',
					label: 'Income statement',
					detail: 'Earned service revenue is period performance.'
				},
				{
					id: 'balance-only',
					label: 'Balance sheet only',
					detail: 'The remaining deferred amount is on the balance sheet.'
				}
			],
			correctChoice: 'income'
		},
		{
			id: 'cash-flow',
			label: 'Cash flow',
			group: 'Report',
			icon: Banknote,
			artifact: 'Cash flow bridge',
			title: 'Explain cash movement',
			question: 'Why does profit not equal cash?',
			lesson:
				'The cash flow statement reconciles net income to cash movement through noncash charges, working capital, investing, and financing.',
			notice: [
				'Indirect operating cash flow starts with net income.',
				'Working capital reverses accrual timing differences.',
				'Ending cash must tie back to the balance sheet.'
			],
			example:
				'Revenue can be earned while cash was collected earlier, and inventory purchases can use cash before expense appears.',
			mistake: 'Assuming revenue growth means cash grew by the same amount.',
			keyPoint: 'Cash flow explains timing.',
			caseAction: 'Explain why the Aster cash collection is not all January revenue.',
			evidence: 'Bank receipt and revenue schedule',
			result: 'Cash collection affects cash; revenue recognition follows service delivery.',
			choices: [
				{
					id: 'timing',
					label: 'Timing difference',
					detail: 'Cash arrived before most service was earned.'
				},
				{
					id: 'error',
					label: 'Accounting error',
					detail: 'Different timing does not automatically mean an error.'
				}
			],
			correctChoice: 'timing'
		},
		{
			id: 'disclosures',
			label: 'Disclosures',
			group: 'Report',
			icon: BookOpen,
			artifact: 'Footnote binder',
			title: 'Prepare disclosures',
			question: 'What details must explain the statements?',
			lesson:
				'Footnotes explain policies, disaggregated revenue, deferred revenue, receivables, inventory, PPE, leases, debt, commitments, contingencies, and subsequent events.',
			notice: [
				'Disclosures must tie to statement lines and schedules.',
				'Tables need support just like statement amounts.',
				'Policies explain the judgment behind the numbers.'
			],
			example:
				'The revenue note disaggregates revenue and the deferred revenue rollforward ties to the balance sheet liability.',
			mistake: 'Writing narrative footnotes that do not tie to statement numbers.',
			keyPoint: 'Disclosures are accounting records, not decoration.',
			caseAction: 'Tie the contract liability disclosure to the schedule.',
			evidence: 'Deferred revenue rollforward and balance sheet line',
			result: 'The note agrees to the liability reported in the statements.',
			choices: [
				{
					id: 'tie-note',
					label: 'Tie note to schedule',
					detail: 'Disclosure tables need the same support as statements.'
				},
				{
					id: 'narrative-only',
					label: 'Use narrative only',
					detail: 'The amounts still need to tie.'
				}
			],
			correctChoice: 'tie-note'
		},
		{
			id: 'assure-overview',
			label: 'Assure and file overview',
			group: 'Assure',
			icon: ShieldCheck,
			artifact: 'Assurance roadmap',
			title: 'Certify, audit, file, and improve',
			question: 'How does a reporting package become credible enough to file?',
			lesson:
				'The assurance arc ties repeated numbers, clears management review, answers audit requests, assembles the mock filing, and turns close pain points into improvements.',
			notice: [
				'Repeated numbers must agree across statements, notes, MD&A, and tags.',
				'Controls and review evidence support management certification.',
				'Audit requests test whether the trail is persuasive under pressure.'
			],
			example:
				'Nimbus cannot mark the mock 10-Q ready while a revenue tie-out, manual journal approval, or tag review remains unresolved.',
			mistake: 'Treating filing as a final export instead of a controlled reporting process.',
			keyPoint: 'Assurance is traceability tested from several angles.',
			caseAction: 'Check what still blocks filing readiness.',
			evidence: 'Tie-out binder, control signoffs, audit request board, filing checklist',
			result: 'The package becomes ready only when evidence, ties, controls, and tags agree.',
			choices: [
				{
					id: 'clear-blockers',
					label: 'Clear blockers',
					detail: 'Ready-to-file means more than tables rendered.'
				},
				{
					id: 'export-now',
					label: 'Export now',
					detail: 'Open ties and controls make the package unreliable.'
				}
			],
			correctChoice: 'clear-blockers'
		},
		{
			id: 'tie-out',
			label: 'Stick and tie',
			group: 'Assure',
			icon: Tags,
			artifact: 'Tie-out binder',
			title: 'Tie every repeated number',
			question: 'Does every number agree everywhere it appears?',
			lesson:
				'Stick-and-tie work checks cross-footing, repeated amounts, statement-to-note references, MD&A tables, rounding, and version control.',
			notice: [
				'Footnote totals should agree to statements.',
				'MD&A tables should agree or explain differences.',
				'Rounding can create real tie-out questions.'
			],
			example:
				'Service revenue appears in the income statement, revenue footnote, MD&A table, and XBRL fact list.',
			mistake: 'Fixing a number in one table but not updating the note, tag, and MD&A copy.',
			keyPoint: 'A filing is credible when repeated numbers agree.',
			caseAction: 'Clear the service revenue tie across the package.',
			evidence: 'Income statement, revenue note, MD&A, tag list',
			result: 'Service revenue agrees everywhere it appears.',
			choices: [
				{
					id: 'all-locations',
					label: 'Update every location',
					detail: 'Repeated values must stay synchronized.'
				},
				{
					id: 'one-table',
					label: 'Fix one table only',
					detail: 'That leaves a broken tie elsewhere.'
				}
			],
			correctChoice: 'all-locations'
		},
		{
			id: 'controls',
			label: 'Controls',
			group: 'Assure',
			icon: ShieldCheck,
			artifact: 'Management review',
			title: 'Support management review',
			question: 'Can management stand behind the report?',
			lesson:
				'Reliable reporting needs controls, review evidence, signoffs, disclosure procedures, and management responsibility.',
			notice: [
				'Close tasks need preparer and reviewer evidence.',
				'Disclosure controls cover more than the financial statement tables.',
				'Material weaknesses block an effective ICFR conclusion.'
			],
			example:
				'The CFO cannot certify the mock 10-Q until revenue, cash, deferred revenue, and manual journal controls are reviewed.',
			mistake: 'Treating management review as a ceremonial final click.',
			keyPoint: 'Controls make reporting reliable enough for certification.',
			caseAction: 'Resolve the revenue review comment.',
			evidence: 'Reviewer signoff on WP-REV-2026-01',
			result: 'The revenue control has evidence of review and approval.',
			choices: [
				{
					id: 'review-evidence',
					label: 'Attach review evidence',
					detail: 'Certification needs visible control support.'
				},
				{
					id: 'verbal-ok',
					label: 'Accept verbal approval',
					detail: 'That is not durable evidence.'
				}
			],
			correctChoice: 'review-evidence'
		},
		{
			id: 'audit',
			label: 'Audit evidence',
			group: 'Assure',
			icon: FileCheck2,
			artifact: 'Auditor request',
			title: 'Respond to audit requests',
			question: 'Can an auditor obtain enough persuasive evidence?',
			lesson:
				'Audit evidence supports management assertions and can also contradict them. Good accounting keeps source evidence and review evidence organized.',
			notice: [
				'Auditors sample transactions and inspect support.',
				'Reconciliations and schedules answer many PBC requests.',
				'Contradictory evidence must be resolved, not hidden.'
			],
			example:
				'The auditor requests revenue support for INV-1001, the deferred revenue rollforward, the bank rec, and approval for a manual close entry.',
			mistake:
				'Uploading the final statement line without the contracts, schedules, journals, and controls.',
			keyPoint: 'Audit readiness is traceability under pressure.',
			caseAction: 'Choose the best support for the Aster revenue sample.',
			evidence: 'Contract, invoice, revenue schedule, JE-1005, reviewer signoff',
			result: 'The auditor can trace assertion, amount, timing, posting, and review.',
			choices: [
				{
					id: 'full-package',
					label: 'Full support package',
					detail: 'The sample needs source, schedule, JE, and review support.'
				},
				{
					id: 'statement-line',
					label: 'Statement line only',
					detail: 'A final number is not enough audit evidence.'
				}
			],
			correctChoice: 'full-package'
		},
		{
			id: 'filing',
			label: 'Filing package',
			group: 'Assure',
			icon: ScrollText,
			artifact: 'Mock 10-Q builder',
			title: 'Assemble the filing',
			question: 'How does accounting become a regulatory report?',
			lesson:
				'The filing package includes cover page, statements, notes, MD&A, controls, certifications, exhibits, review comments, and Inline XBRL facts.',
			notice: [
				'Structured tags attach meaning to financial statement facts.',
				'The package should block submission when ties or controls are open.',
				'Quarterly and annual packages have different review demands.'
			],
			example:
				'Nimbus assembles a mock Q1 10-Q with statements, notes, MD&A, controls, certification checklist, and XBRL tag review.',
			mistake: 'Thinking the filing is done when statement tables look finished.',
			keyPoint: 'The filing is the last page of the accounting trail.',
			caseAction: 'Decide whether the package can be marked ready.',
			evidence: 'Statements, notes, controls, audit responses, tag review',
			result: 'Ready-to-file only after every blocker is cleared.',
			choices: [
				{
					id: 'ready-after-checks',
					label: 'Ready after checks pass',
					detail: 'Ties, controls, comments, and tags must be clean.'
				},
				{
					id: 'ready-after-pdf',
					label: 'Ready after PDF exists',
					detail: 'Exporting is not the same as filing readiness.'
				}
			],
			correctChoice: 'ready-after-checks'
		},
		{
			id: 'debrief',
			label: 'Debrief',
			group: 'Assure',
			icon: ListChecks,
			artifact: 'Improvement board',
			title: 'Improve the next close',
			question: 'What should be fixed before the next period?',
			lesson:
				'After filing, the team archives support, carries forward templates, updates policies, fixes controls, and improves the next close calendar.',
			notice: [
				'Recurring exceptions are process signals.',
				'Late support should become earlier close tasks.',
				'The best close process gets easier because the team learns.'
			],
			example:
				'Nimbus shortens next month by moving vendor cutoff review earlier, adding a revenue tie-out owner, and automating the fixed asset rollforward.',
			mistake: 'Filing successfully but losing the evidence and process lessons.',
			keyPoint: 'The cycle ends by making the next cycle stronger.',
			caseAction: 'Pick the February improvement with the highest close impact.',
			evidence: 'Late vendor cutoff review and recurring revenue tie-out delay',
			result: 'Move cutoff review earlier and assign a revenue tie-out owner.',
			choices: [
				{
					id: 'process-fix',
					label: 'Fix recurring close blockers',
					detail: 'Improve the calendar and ownership before next month.'
				},
				{
					id: 'archive-only',
					label: 'Archive only',
					detail: 'Archiving matters, but it does not improve the next close by itself.'
				}
			],
			correctChoice: 'process-fix'
		}
	];

	let activeIndex = $state(0);
	let selectedAnswer = $state<string | null>(null);
	let completedIds = $state<string[]>(['home']);
	let traceIndex = $state(7);

	const activeStage = $derived(stages[activeIndex]);
	const ActiveIcon = $derived(activeStage.icon);
	const progressPercent = $derived(((activeIndex + 1) / stages.length) * 100);
	const selectedIsCorrect = $derived(selectedAnswer === activeStage.correctChoice);

	const currentChoices = $derived.by(() => {
		if (activeStage.id === 'accounting-equation') {
			return accountingEquationExamples.slice(0, 3).map((example) => ({
				id: example.id === 'subscription-billing' ? 'asset-liability' : example.id,
				label: example.label,
				detail: example.beginnerMeaning
			}));
		}

		if (activeStage.id === 'account-types') {
			return accountTypeCards.slice(0, 4).map((card) => ({
				id: card.id === 'liability' ? 'deferred-liability' : card.id,
				label: card.label,
				detail: card.nimbusExample
			}));
		}

		if (activeStage.id === 'cash-vs-accrual') {
			return cashAccrualComparisons.map((comparison) => ({
				id: comparison.id === 'annual-service' ? 'one-month' : comparison.id,
				label: comparison.event,
				detail: comparison.journalHint
			}));
		}

		return activeStage.choices;
	});

	function chooseStage(index: number) {
		activeIndex = Math.max(0, Math.min(index, stages.length - 1));
		selectedAnswer = null;
	}

	function chooseGroup(stageId: string) {
		const index = stages.findIndex((stage) => stage.id === stageId);
		if (index >= 0) {
			chooseStage(index);
		}
	}

	function nextStage() {
		if (!completedIds.includes(activeStage.id)) {
			completedIds.push(activeStage.id);
		}

		chooseStage(activeIndex + 1);
	}

	function previousStage() {
		chooseStage(activeIndex - 1);
	}

	function selectAnswer(id: string) {
		selectedAnswer = id;
		if (id === activeStage.correctChoice && !completedIds.includes(activeStage.id)) {
			completedIds.push(activeStage.id);
		}
	}

	function resetCurrentAnswer() {
		selectedAnswer = null;
	}
</script>

<svelte:head>
	<title>Accounting Cycle Simulator</title>
	<meta
		name="description"
		content="A guided accounting-cycle simulator where each lesson pairs with one practical Nimbus Bikes case artifact."
	/>
	<meta name="theme-color" content="#f6f7f9" />
</svelte:head>

<main class="learning-shell" style:--progress={`${progressPercent}%`}>
	<header class="topbar">
		<div class="brand">
			<Calculator size={20} strokeWidth={2.4} />
			<span>Accounting Cycle Simulator</span>
		</div>

		<nav class="chapter-nav" aria-label="Chapters">
			{#each groupNav as group (group.label)}
				<button
					type="button"
					class={{
						active: activeStage.group === group.label || activeStage.id === group.firstStage
					}}
					aria-current={activeStage.group === group.label ? 'step' : undefined}
					onclick={() => chooseGroup(group.firstStage)}
				>
					{group.label}
				</button>
			{/each}
		</nav>
	</header>

	<section class="progress-strip" aria-label="Accounting cycle progress">
		<div class="progress-summary">
			<span>Step {activeIndex + 1} of {stages.length}</span>
			<strong>{activeStage.label}</strong>
		</div>
		<div class="progress-line" aria-hidden="true"></div>
	</section>

	<section class="workspace" aria-labelledby="lesson-title">
		<article class="lesson-pane">
			<div class="stage-meta">
				<span><ActiveIcon size={16} strokeWidth={2.4} /> {activeStage.group}</span>
				<span>{activeIndex + 1} of {stages.length}</span>
			</div>

			<h1 id="lesson-title">{activeStage.title}</h1>
			<p class="question">{activeStage.question}</p>
			<p class="lesson-copy">{activeStage.lesson}</p>

			<section class="reading-block" aria-labelledby="notice-title">
				<h2 id="notice-title"><BookOpen size={17} strokeWidth={2.4} /> What to notice</h2>
				<ul>
					{#each activeStage.notice as point (point)}
						<li>{point}</li>
					{/each}
				</ul>
			</section>

			<section class="two-notes" aria-label="Example and common mistake">
				<div>
					<h2><BadgeCheck size={17} strokeWidth={2.4} /> Example</h2>
					<p>{activeStage.example}</p>
				</div>
				<div>
					<h2><SearchCheck size={17} strokeWidth={2.4} /> Watch for</h2>
					<p>{activeStage.mistake}</p>
				</div>
			</section>

			<div class="key-point">
				<strong>Key point</strong>
				<span>{activeStage.keyPoint}</span>
			</div>
		</article>

		<aside class="practice-pane" aria-label={`${activeStage.label} practical case`}>
			<header class="case-header">
				<div>
					<span class="eyebrow">{activeStage.artifact}</span>
					<h2>{nimbusScenario.company}</h2>
					<p>{nimbusScenario.period}</p>
				</div>
				<span class="artifact-icon"><ActiveIcon size={22} strokeWidth={2.4} /></span>
			</header>

			{#if activeStage.id === 'home'}
				<img
					class="case-image"
					src={asset('/images/accounting-cycle-hero-light.png')}
					alt="Accounting source documents, journal entries, statements, and filing materials connected in one trail"
				/>
			{/if}

			<div class="case-facts" aria-label="Nimbus case facts">
				{#each caseFacts as fact (fact.label)}
					<div>
						<span>{fact.label}</span>
						<strong>{fact.value}</strong>
					</div>
				{/each}
			</div>

			<section class="artifact-work">
				<div class="artifact-row">
					<span>Do this</span>
					<strong>{activeStage.caseAction}</strong>
				</div>
				<div class="artifact-row">
					<span>Evidence</span>
					<strong>{activeStage.evidence}</strong>
				</div>
				<div class="artifact-row">
					<span>Result</span>
					<strong>{activeStage.result}</strong>
				</div>
			</section>

			<section class="choice-panel" aria-labelledby="choice-title">
				<div class="choice-header">
					<h3 id="choice-title">Your move</h3>
					<button type="button" aria-label="Reset answer" onclick={resetCurrentAnswer}>
						<RotateCcw size={15} strokeWidth={2.4} />
					</button>
				</div>

				<div class="choices">
					{#each currentChoices as choice (choice.id)}
						<button
							type="button"
							class={{
								selected: selectedAnswer === choice.id,
								correct: selectedAnswer === choice.id && selectedIsCorrect,
								missed: selectedAnswer === choice.id && selectedAnswer !== activeStage.correctChoice
							}}
							onclick={() => selectAnswer(choice.id)}
						>
							<strong>{choice.label}</strong>
							<span>{choice.detail}</span>
						</button>
					{/each}
				</div>

				{#if selectedAnswer}
					<div class={['feedback', selectedIsCorrect ? 'good' : 'needs-work']} role="status">
						{#if selectedIsCorrect}
							<CheckCircle2 size={18} strokeWidth={2.4} />
							<p>Good. {activeStage.result}</p>
						{:else}
							<SearchCheck size={18} strokeWidth={2.4} />
							<p>
								Not quite. Use the evidence line, then choose the option that protects the trail.
							</p>
						{/if}
					</div>
				{/if}
			</section>

			<section class="trace-card" aria-labelledby="trace-title">
				<div class="trace-heading">
					<h3 id="trace-title"><GitBranch size={16} strokeWidth={2.4} /> Trace the same number</h3>
					<span>{traceIndex + 1} / {nimbusScenario.traceNodes.length}</span>
				</div>

				<div class="trace-controls">
					<button
						type="button"
						aria-label="Previous trace point"
						disabled={traceIndex === 0}
						onclick={() => (traceIndex -= 1)}
					>
						<ArrowLeft size={15} strokeWidth={2.4} />
					</button>
					<button
						type="button"
						aria-label="Next trace point"
						disabled={traceIndex === nimbusScenario.traceNodes.length - 1}
						onclick={() => (traceIndex += 1)}
					>
						<ArrowRight size={15} strokeWidth={2.4} />
					</button>
				</div>

				<div class="trace-detail">
					<strong>{nimbusScenario.traceNodes[traceIndex].label}</strong>
					<span>{nimbusScenario.traceNodes[traceIndex].value}</span>
					<p>{nimbusScenario.traceNodes[traceIndex].detail}</p>
				</div>
			</section>
		</aside>
	</section>

	<footer class="sequence-bar" aria-label="Stage navigation">
		<button type="button" onclick={previousStage} disabled={activeIndex === 0}>
			<ArrowLeft size={17} strokeWidth={2.4} />
			Previous
		</button>
		<div>
			<strong>{activeStage.label}</strong>
			<span>{completedIds.length} completed</span>
		</div>
		<button
			type="button"
			class="next"
			onclick={nextStage}
			disabled={activeIndex === stages.length - 1}
		>
			Next
			<ArrowRight size={17} strokeWidth={2.4} />
		</button>
	</footer>
</main>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		background: #f6f7f9;
		color: #17191c;
		overflow: auto;
	}

	:global(button) {
		font: inherit;
	}

	.learning-shell {
		--ink: #17191c;
		--muted: #5d6470;
		--soft: #eef1f5;
		--line: #d9dee6;
		--panel: #ffffff;
		--panel-strong: #f9fafb;
		--teal: #0f766e;
		--rust: #b84a3a;
		--gold: #b7791f;
		--green: #15803d;
		min-height: 100vh;
		padding: 18px;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(246, 247, 249, 0.96)),
			linear-gradient(135deg, rgba(15, 118, 110, 0.12), rgba(184, 74, 58, 0.08));
	}

	button {
		border: 0;
		color: inherit;
		cursor: pointer;
	}

	button:focus-visible {
		outline: 3px solid rgba(15, 118, 110, 0.28);
		outline-offset: 3px;
	}

	button:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}

	.topbar,
	.progress-strip,
	.workspace,
	.sequence-bar {
		width: min(1480px, 100%);
		margin: 0 auto;
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 12px 0 14px;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-weight: 850;
		letter-spacing: 0;
	}

	.chapter-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		justify-content: flex-end;
	}

	.chapter-nav button,
	.sequence-bar button,
	.choice-header button,
	.trace-controls button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		min-height: 38px;
		border-radius: 8px;
		background: #ffffff;
		border: 1px solid var(--line);
		color: var(--muted);
		font-weight: 750;
	}

	.chapter-nav button {
		padding: 0 12px;
	}

	.chapter-nav button.active {
		background: #123d3a;
		border-color: #123d3a;
		color: #ffffff;
	}

	.progress-strip {
		display: grid;
		gap: 8px;
		padding: 8px 0 18px;
	}

	.progress-summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		color: var(--muted);
		font-size: 0.92rem;
		font-weight: 760;
	}

	.progress-summary strong {
		color: var(--ink);
	}

	.progress-line {
		height: 8px;
		overflow: hidden;
		border-radius: 999px;
		background: linear-gradient(90deg, var(--teal) var(--progress), transparent 0), var(--line);
	}

	.workspace {
		display: grid;
		grid-template-columns: minmax(0, 0.95fr) minmax(420px, 0.75fr);
		gap: 18px;
		align-items: start;
	}

	.lesson-pane,
	.practice-pane {
		border: 1px solid var(--line);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 24px 70px rgba(20, 27, 35, 0.08);
	}

	.lesson-pane {
		padding: clamp(24px, 4vw, 54px);
		min-height: 690px;
	}

	.stage-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 34px;
		color: var(--muted);
		font-size: 0.92rem;
		font-weight: 760;
		letter-spacing: 0;
	}

	.stage-meta span {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	h1,
	h2,
	h3,
	p {
		margin: 0;
	}

	h1 {
		max-width: 850px;
		font-size: clamp(2.5rem, 5.4vw, 5.8rem);
		line-height: 0.96;
		letter-spacing: 0;
	}

	.question {
		max-width: 760px;
		margin-top: 22px;
		color: #21302f;
		font-size: clamp(1.2rem, 2vw, 1.7rem);
		line-height: 1.35;
		font-weight: 720;
	}

	.lesson-copy {
		max-width: 820px;
		margin-top: 22px;
		color: var(--muted);
		font-size: 1.1rem;
		line-height: 1.75;
	}

	.reading-block,
	.two-notes,
	.key-point {
		margin-top: 28px;
	}

	.reading-block h2,
	.two-notes h2,
	.choice-panel h3,
	.trace-card h3 {
		display: flex;
		align-items: center;
		gap: 8px;
		color: #26302f;
		font-size: 0.95rem;
		font-weight: 850;
		letter-spacing: 0;
	}

	.reading-block ul {
		display: grid;
		gap: 10px;
		margin: 14px 0 0;
		padding: 0;
		list-style: none;
	}

	.reading-block li {
		position: relative;
		padding-left: 24px;
		color: #374151;
		line-height: 1.55;
	}

	.reading-block li::before {
		position: absolute;
		top: 0.68em;
		left: 4px;
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--teal);
		content: '';
	}

	.two-notes {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 12px;
	}

	.two-notes div,
	.key-point,
	.artifact-work,
	.choice-panel,
	.trace-card {
		border: 1px solid var(--line);
		border-radius: 8px;
		background: var(--panel-strong);
	}

	.two-notes div {
		padding: 18px;
	}

	.two-notes p {
		margin-top: 10px;
		color: var(--muted);
		line-height: 1.55;
	}

	.key-point {
		display: grid;
		gap: 8px;
		padding: 18px;
		border-color: rgba(15, 118, 110, 0.35);
		background: rgba(15, 118, 110, 0.07);
	}

	.key-point strong {
		color: var(--teal);
		font-size: 0.88rem;
	}

	.key-point span {
		font-size: 1.1rem;
		font-weight: 780;
		line-height: 1.42;
	}

	.practice-pane {
		position: sticky;
		top: 18px;
		display: grid;
		gap: 14px;
		padding: 18px;
	}

	.case-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 18px;
		padding: 16px;
		border-radius: 8px;
		background: #172321;
		color: #ffffff;
	}

	.eyebrow {
		display: block;
		margin-bottom: 8px;
		color: #a9ded7;
		font-size: 0.8rem;
		font-weight: 830;
		letter-spacing: 0;
	}

	.case-header h2 {
		font-size: 1.35rem;
		letter-spacing: 0;
	}

	.case-header p {
		margin-top: 4px;
		color: #d7e3e1;
	}

	.artifact-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.12);
	}

	.case-image {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 8;
		object-fit: cover;
		border: 1px solid var(--line);
		border-radius: 8px;
	}

	.case-facts {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 8px;
	}

	.case-facts div {
		min-height: 78px;
		padding: 12px;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: #ffffff;
	}

	.case-facts span,
	.artifact-row span {
		display: block;
		color: var(--muted);
		font-size: 0.78rem;
		font-weight: 760;
		letter-spacing: 0;
	}

	.case-facts strong {
		display: block;
		margin-top: 7px;
		color: var(--ink);
		font-size: 1rem;
		line-height: 1.25;
	}

	.artifact-work {
		display: grid;
		gap: 1px;
		padding: 0;
		overflow: hidden;
	}

	.artifact-row {
		display: grid;
		gap: 7px;
		padding: 14px;
		background: #ffffff;
	}

	.artifact-row strong {
		line-height: 1.42;
	}

	.choice-panel,
	.trace-card {
		padding: 14px;
	}

	.choice-header,
	.trace-heading {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.choice-header button,
	.trace-controls button {
		width: 36px;
		min-height: 34px;
		padding: 0;
	}

	.choices {
		display: grid;
		gap: 8px;
		margin-top: 12px;
	}

	.choices button {
		display: grid;
		gap: 5px;
		width: 100%;
		padding: 13px;
		border: 1px solid var(--line);
		border-radius: 8px;
		background: #ffffff;
		text-align: left;
	}

	.choices button:hover {
		border-color: rgba(15, 118, 110, 0.55);
	}

	.choices button strong {
		font-size: 0.98rem;
		line-height: 1.32;
	}

	.choices button span {
		color: var(--muted);
		font-size: 0.9rem;
		line-height: 1.38;
	}

	.choices button.selected {
		border-color: var(--gold);
		background: rgba(183, 121, 31, 0.08);
	}

	.choices button.correct {
		border-color: var(--green);
		background: rgba(21, 128, 61, 0.08);
	}

	.choices button.missed {
		border-color: var(--rust);
		background: rgba(184, 74, 58, 0.08);
	}

	.feedback {
		display: flex;
		gap: 10px;
		margin-top: 12px;
		padding: 12px;
		border-radius: 8px;
		line-height: 1.45;
	}

	.feedback.good {
		background: rgba(21, 128, 61, 0.1);
		color: #14532d;
	}

	.feedback.needs-work {
		background: rgba(184, 74, 58, 0.1);
		color: #7f1d1d;
	}

	.trace-heading span {
		color: var(--muted);
		font-size: 0.86rem;
		font-weight: 750;
	}

	.trace-controls {
		display: flex;
		gap: 8px;
		margin-top: 12px;
	}

	.trace-detail {
		display: grid;
		gap: 6px;
		margin-top: 12px;
		padding: 12px;
		border-radius: 8px;
		background: #ffffff;
	}

	.trace-detail span {
		color: var(--teal);
		font-weight: 780;
	}

	.trace-detail p {
		color: var(--muted);
		line-height: 1.45;
	}

	.sequence-bar {
		display: grid;
		grid-template-columns: 150px 1fr 150px;
		align-items: center;
		gap: 12px;
		padding: 16px 0 0;
	}

	.sequence-bar button {
		padding: 0 14px;
	}

	.sequence-bar button.next {
		background: var(--rust);
		border-color: var(--rust);
		color: #ffffff;
	}

	.sequence-bar div {
		display: grid;
		gap: 2px;
		justify-items: center;
		color: var(--muted);
	}

	.sequence-bar div strong {
		color: var(--ink);
	}

	@media (max-width: 1040px) {
		.topbar {
			align-items: flex-start;
			flex-direction: column;
		}

		.chapter-nav {
			justify-content: flex-start;
		}

		.workspace {
			grid-template-columns: 1fr;
		}

		.practice-pane {
			position: static;
		}
	}

	@media (max-width: 720px) {
		.learning-shell {
			padding: 12px;
		}

		.chapter-nav {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.workspace {
			gap: 12px;
		}

		.lesson-pane,
		.practice-pane {
			padding: 16px;
		}

		.lesson-pane {
			min-height: auto;
		}

		.stage-meta,
		.two-notes,
		.case-facts,
		.sequence-bar {
			grid-template-columns: 1fr;
		}

		.stage-meta {
			display: grid;
		}

		h1 {
			font-size: clamp(2.25rem, 14vw, 3.8rem);
		}

		.sequence-bar {
			padding-bottom: 10px;
		}

		.sequence-bar div {
			order: -1;
		}
	}
</style>
