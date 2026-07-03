<script lang="ts">
	import { resolve } from '$app/paths';
	import AlertTriangle from '@lucide/svelte/icons/alert-triangle';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Calculator from '@lucide/svelte/icons/calculator';
	import CheckCircle2 from '@lucide/svelte/icons/check-circle-2';
	import ClipboardCheck from '@lucide/svelte/icons/clipboard-check';
	import Database from '@lucide/svelte/icons/database';
	import Eye from '@lucide/svelte/icons/eye';
	import FileText from '@lucide/svelte/icons/file-text';
	import GitBranch from '@lucide/svelte/icons/git-branch';
	import Hand from '@lucide/svelte/icons/hand';
	import Landmark from '@lucide/svelte/icons/landmark';
	import Moon from '@lucide/svelte/icons/moon';
	import Play from '@lucide/svelte/icons/play';
	import ReceiptText from '@lucide/svelte/icons/receipt-text';
	import Sun from '@lucide/svelte/icons/sun';
	import Table2 from '@lucide/svelte/icons/table-2';

	type StageKind = 'invoice' | 'journal' | 'ledger' | 'trial' | 'statements' | 'filing';
	type Mode = 'watch' | 'do';
	type Theme = 'day' | 'night';
	type CreditChoice = 'Deferred Revenue' | 'Subscription Revenue' | 'Accounts Payable';
	type StatementView = 'balance' | 'income' | 'cash';
	type IconComponent = typeof ReceiptText;

	type Stage = {
		id: StageKind;
		number: string;
		label: string;
		icon: IconComponent;
		workspace: string;
		title: string;
		question: string;
		lesson: string;
		lessonPoints: string[];
		example: string;
		mistake: string;
		keyPoint: string;
		watchPrompt: string;
		doPrompt: string;
	};

	const stages: Stage[] = [
		{
			id: 'invoice',
			number: '01',
			label: 'Invoice',
			icon: ReceiptText,
			workspace: 'Invoice desk',
			title: 'Invoice intake',
			question: 'What exactly happened, and can we prove it?',
			lesson:
				'The cycle starts before accounting language appears. The first job is to turn messy business evidence into clean, reviewable fields: who bought, what was promised, when service begins, how long service lasts, and how much was billed.',
			lessonPoints: [
				'Confirm the invoice ties to a contract or purchase order.',
				'Separate the billing date from the service period.',
				'Capture the amount once, then let later workpapers reuse it.'
			],
			example:
				'Aster Labs is billed for a 12-month platform subscription. The invoice is real, but the revenue has not been earned on day one.',
			mistake:
				'Treating the invoice total as immediate revenue instead of evidence that starts the accounting trail.',
			keyPoint: 'Evidence first. Every later number should be traceable back to this packet.',
			watchPrompt:
				'Watch the document turn into clean fields: customer, amount, term, and service obligation.',
			doPrompt: 'Edit the amount or term, then capture the invoice packet for accounting.'
		},
		{
			id: 'journal',
			number: '02',
			label: 'Journal',
			icon: FileText,
			workspace: 'Journal entry grid',
			title: 'Journal entry',
			question: 'Why is billing different from earning?',
			lesson:
				'The journal translates the event into accounting language. Billing creates a receivable and a performance obligation. Cash collection clears the receivable. Revenue appears only as the service is delivered.',
			lessonPoints: [
				'Debit the thing the company receives or is owed.',
				'Credit the obligation or revenue account that explains why.',
				'Keep billing, collection, and revenue recognition as separate events.'
			],
			example:
				'The first entry records Accounts Receivable and Deferred Revenue. The monthly close releases one month from Deferred Revenue into Subscription Revenue.',
			mistake: 'A debit and credit can balance mathematically while still using the wrong account.',
			keyPoint:
				'A balanced journal can still be wrong if the account choice tells the wrong story.',
			watchPrompt:
				'Watch the same transaction split into billing, cash collection, and monthly revenue recognition.',
			doPrompt:
				'Choose the proper credit account for the billing entry, then approve the month-end release.'
		},
		{
			id: 'ledger',
			number: '03',
			label: 'Ledger',
			icon: Database,
			workspace: 'General ledger',
			title: 'General ledger',
			question: 'Where does the official record live?',
			lesson:
				'Posting moves approved journal lines into the general ledger. Instead of viewing one transaction at a time, the ledger shows each account history and its running balance.',
			lessonPoints: [
				'Cash shows the customer payment.',
				'Accounts Receivable returns to zero after collection.',
				'Deferred Revenue carries the unearned portion forward.'
			],
			example:
				'After posting, the same invoice is visible across Cash, Accounts Receivable, Deferred Revenue, and Subscription Revenue.',
			mistake:
				'Thinking the ledger is a separate calculation. It is the posted history created by journal entries.',
			keyPoint:
				'The ledger is not another summary. It is the account-by-account memory of the business.',
			watchPrompt: 'Watch AR clear, cash increase, deferred revenue decline, and revenue appear.',
			doPrompt: 'Post the approved batch and inspect the balance in each account.'
		},
		{
			id: 'trial',
			number: '04',
			label: 'Trial balance',
			icon: Table2,
			workspace: 'Close spreadsheet',
			title: 'Trial balance',
			question: 'Do the accounts balance before reporting?',
			lesson:
				'The trial balance gathers every account balance into one controlled close spreadsheet. It proves debits equal credits, then gives reviewers a place to inspect classification, cutoff, and support.',
			lessonPoints: [
				'Debits and credits must total to the same amount.',
				'Revenue should tie to the schedule, not just the invoice.',
				'Review notes explain why a balance is ready for reporting.'
			],
			example:
				'Cash is debited for the full collection. Deferred Revenue and Subscription Revenue split the credit side between unearned and earned amounts.',
			mistake:
				'Stopping at “balanced.” A balanced trial balance can still contain timing or classification errors.',
			keyPoint: 'Balanced does not mean perfect; it means ready for analytical review.',
			watchPrompt: 'Watch the balances roll forward and tie out to equal debits and credits.',
			doPrompt: 'Run the trial balance, then review the revenue schedule tie-out.'
		},
		{
			id: 'statements',
			number: '05',
			label: 'Statements',
			icon: Landmark,
			workspace: 'Statement builder',
			title: 'Statements',
			question: 'How does the ledger become communication?',
			lesson:
				'Financial statements are curated views of the ledger. The same customer transaction can be cash on the balance sheet, revenue on the income statement, and a customer receipt on the cash flow statement.',
			lessonPoints: [
				'Balance sheet: what remains as assets and obligations.',
				'Income statement: what was earned this period.',
				'Cash flow statement: what cash actually moved.'
			],
			example:
				'January shows one month of revenue, while the remaining eleven months stay in Deferred Revenue.',
			mistake: 'Expecting the same dollar amount to appear identically on every statement.',
			keyPoint: 'Statements are not separate math. They are curated views of the same ledger.',
			watchPrompt: 'Watch the transaction appear in each statement view.',
			doPrompt:
				'Switch statements and verify that cash, liability, and revenue land in the correct place.'
		},
		{
			id: 'filing',
			number: '06',
			label: 'Filing',
			icon: GitBranch,
			workspace: 'Audit trace',
			title: 'Filing trace',
			question: 'Can a reviewer walk from filing to source evidence?',
			lesson:
				'The final filing is credible only when each reported number has lineage. A reviewer should be able to move from the filed line item back through statements, mapping, ledger, journal, schedule, invoice, contract, and policy.',
			lessonPoints: [
				'Start from the reported number, not the source document.',
				'Trace through every transformation that changed the number.',
				'Keep policy evidence beside transaction evidence.'
			],
			example:
				'Filed subscription revenue traces back to account 4000, JE-1003, the revenue schedule, INV-1001, contract C-901, and the recognition policy.',
			mistake:
				'Showing a final report without a lineage path that explains exactly how the number was produced.',
			keyPoint: 'A filing is the last page of a trail, not the first page of a story.',
			watchPrompt: 'Watch the reported revenue number trace backward through the accounting cycle.',
			doPrompt: 'Click each node to inspect the proof behind the reported revenue number.'
		}
	];

	const creditChoices: CreditChoice[] = [
		'Deferred Revenue',
		'Subscription Revenue',
		'Accounts Payable'
	];
	const rowNumbers = Array.from({ length: 9 }, (_, index) => index + 1);

	let activeIndex = $state(0);
	let mode: Mode = $state('watch');
	let theme: Theme = $state('night');
	let invoiceAmount = $state(12000);
	let serviceMonths = $state(12);
	let invoiceCaptured = $state(false);
	let selectedCredit: CreditChoice = $state('Deferred Revenue');
	let recognitionApproved = $state(false);
	let ledgerPosted = $state(false);
	let trialRun = $state(false);
	let statementView: StatementView = $state('balance');
	let traceIndex = $state(0);

	const activeStage = $derived(stages[activeIndex]);
	const ActiveIcon = $derived(activeStage.icon);
	const amount = $derived(Math.max(0, Number(invoiceAmount) || 0));
	const months = $derived(Math.max(1, Number(serviceMonths) || 1));
	const monthlyRevenue = $derived(Math.round(amount / months));
	const remainingDeferred = $derived(Math.max(0, amount - monthlyRevenue));
	const journalCorrect = $derived(selectedCredit === 'Deferred Revenue');
	const cycleScore = $derived(
		Number(invoiceCaptured) +
			Number(journalCorrect) +
			Number(recognitionApproved) +
			Number(ledgerPosted) +
			Number(trialRun)
	);
	const traceNodes = $derived([
		{
			label: 'Filed revenue',
			value: money(monthlyRevenue),
			detail: 'Reported as subscription revenue for January.'
		},
		{
			label: 'Statement line',
			value: 'Income statement',
			detail: 'Mapped from account 4000: Subscription Revenue.'
		},
		{
			label: 'Trial balance',
			value: 'TB-2026-01',
			detail: 'Credit balance agrees to the close spreadsheet.'
		},
		{
			label: 'General ledger',
			value: 'GL account 4000',
			detail: 'Posted from JE-1003 during the January close.'
		},
		{
			label: 'Journal entry',
			value: 'JE-1003',
			detail: 'Debit deferred revenue, credit subscription revenue.'
		},
		{
			label: 'Revenue schedule',
			value: `1 of ${months} months`,
			detail: `${money(monthlyRevenue)} released; ${money(remainingDeferred)} remains deferred.`
		},
		{
			label: 'Invoice packet',
			value: 'INV-1001',
			detail: `${money(amount)} annual subscription for Aster Labs.`
		},
		{
			label: 'Contract and policy',
			value: 'C-901 / ASC 606',
			detail: 'Recognize subscription revenue ratably over the service period.'
		}
	]);

	function money(value: number) {
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		});
	}

	function chooseStage(index: number) {
		activeIndex = index;
		traceIndex = 0;
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

	function playStage() {
		if (activeStage.id === 'invoice') {
			invoiceCaptured = true;
		}

		if (activeStage.id === 'journal') {
			selectedCredit = 'Deferred Revenue';
			recognitionApproved = true;
		}

		if (activeStage.id === 'ledger') {
			ledgerPosted = true;
		}

		if (activeStage.id === 'trial') {
			trialRun = true;
		}

		if (activeStage.id === 'statements') {
			statementView =
				statementView === 'balance' ? 'income' : statementView === 'income' ? 'cash' : 'balance';
		}

		if (activeStage.id === 'filing') {
			traceIndex = traceIndex >= traceNodes.length - 1 ? 0 : traceIndex + 1;
		}
	}
</script>

<svelte:head>
	<meta name="theme-color" content={theme === 'day' ? '#f3efe4' : '#101213'} />
</svelte:head>

<main class="simulator" data-theme={theme}>
	<header class="masthead">
		<a class="brand" href={resolve('/')} aria-label="Accounting Cycle Simulator home">
			<span class="brand-mark"><Calculator size={19} strokeWidth={2.4} /></span>
			<span>
				<strong>Accounting Cycle Simulator</strong>
				<small>From source document to filing</small>
			</span>
		</a>

		<nav class="stage-strip" aria-label="Accounting cycle stages">
			{#each stages as stage, index (stage.id)}
				{@const StageIcon = stage.icon}
				<button
					type="button"
					class={activeIndex === index ? 'active' : ''}
					aria-current={activeIndex === index ? 'step' : undefined}
					onclick={() => chooseStage(index)}
				>
					<span>{stage.number}</span>
					<StageIcon size={15} strokeWidth={2.3} />
					{stage.label}
				</button>
			{/each}
		</nav>

		<button
			class="theme-toggle"
			type="button"
			onclick={() => (theme = theme === 'day' ? 'night' : 'day')}
		>
			{#if theme === 'day'}
				<Moon size={17} strokeWidth={2.4} />
			{:else}
				<Sun size={17} strokeWidth={2.4} />
			{/if}
			{theme === 'day' ? 'Night' : 'Day'}
		</button>
	</header>

	<section class="workspace-shell">
		<aside class="lesson-panel" aria-labelledby="lesson-title">
			<div class="lesson-kicker">
				<span><ActiveIcon size={16} strokeWidth={2.5} /> Stage {activeStage.number}</span>
				<div class="mode-switch" aria-label="Demo mode">
					<button
						type="button"
						class={mode === 'watch' ? 'active' : ''}
						aria-pressed={mode === 'watch'}
						onclick={() => (mode = 'watch')}
					>
						<Eye size={16} strokeWidth={2.4} />
						Watch
					</button>
					<button
						type="button"
						class={mode === 'do' ? 'active' : ''}
						aria-pressed={mode === 'do'}
						onclick={() => (mode = 'do')}
					>
						<Hand size={16} strokeWidth={2.4} />
						Do
					</button>
				</div>
			</div>

			<div class="lesson-heading">
				<h1 id="lesson-title">{activeStage.title}</h1>
				<p>{activeStage.question}</p>
			</div>

			<div class="lesson-stack">
				<section class="lesson-section">
					<h2><BookOpen size={17} strokeWidth={2.4} /> Lesson</h2>
					<p>{activeStage.lesson}</p>
				</section>

				<section class="lesson-section">
					<h2><ClipboardCheck size={17} strokeWidth={2.4} /> What to notice</h2>
					<ul>
						{#each activeStage.lessonPoints as point (point)}
							<li>{point}</li>
						{/each}
					</ul>
				</section>

				<section class="lesson-section compact">
					<h2><CheckCircle2 size={17} strokeWidth={2.4} /> Example</h2>
					<p>{activeStage.example}</p>
				</section>

				<section class="lesson-section compact">
					<h2><AlertTriangle size={17} strokeWidth={2.4} /> Common mistake</h2>
					<p>{activeStage.mistake}</p>
				</section>

				<section class="lesson-section action">
					<h2>
						{#if mode === 'watch'}
							<Eye size={17} strokeWidth={2.4} />
							Watch
						{:else}
							<Hand size={17} strokeWidth={2.4} />
							Your turn
						{/if}
					</h2>
					<p>{mode === 'watch' ? activeStage.watchPrompt : activeStage.doPrompt}</p>
				</section>

				<div class="concept-strip" aria-label="Current accounting idea">
					<span>Core idea</span>
					<p>{activeStage.keyPoint}</p>
				</div>

				<div class="progress-readout" aria-label="Cycle progress">
					<span>Cycle readiness</span>
					<strong>{cycleScore}/5 controls lit</strong>
					<div class="meter"><i style:width={`${(cycleScore / 5) * 100}%`}></i></div>
				</div>
			</div>
		</aside>

		<section class="process-panel" aria-label={`${activeStage.workspace} work area`}>
			<header class="process-header">
				<div class="process-title">
					<span class="artifact-icon"><ActiveIcon size={19} strokeWidth={2.4} /></span>
					<div>
						<span>{activeStage.workspace}</span>
						<h2>Nimbus Bikes - January close</h2>
					</div>
				</div>
				<button type="button" class="play-button" onclick={playStage}>
					<Play size={17} strokeWidth={2.6} />
					{mode === 'watch' ? 'Play step' : 'Apply'}
				</button>
			</header>

			<div class="artifact" data-artifact={activeStage.id}>
				{#if activeStage.id === 'invoice'}
					<section class="invoice-desk" aria-label="Invoice capture desk">
						<div class="document-preview">
							<div class="paper-header">
								<span><ReceiptText size={15} strokeWidth={2.4} /> Invoice</span>
								<strong>INV-1001</strong>
							</div>
							<div class="invoice-parties">
								<p>
									Bill to
									<strong>Aster Labs</strong>
								</p>
								<p>
									From
									<strong>Nimbus Bikes</strong>
								</p>
							</div>
							<table class="invoice-lines">
								<thead>
									<tr>
										<th>Description</th>
										<th>Term</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Fleet maintenance platform</td>
										<td>{months} months</td>
										<td>{money(amount)}</td>
									</tr>
								</tbody>
							</table>
							<div class="invoice-total">
								<span>Total due</span>
								<strong>{money(amount)}</strong>
							</div>
						</div>

						<form class="capture-grid" onsubmit={(event) => event.preventDefault()}>
							<label>
								Customer
								<input value="Aster Labs" readonly />
							</label>
							<label>
								Invoice date
								<input value="Jan 1, 2026" readonly />
							</label>
							<label>
								Service period
								<input value="Jan 1 - Dec 31, 2026" readonly />
							</label>
							<label>
								Service months
								<input
									type="number"
									min="1"
									max="36"
									bind:value={serviceMonths}
									disabled={mode === 'watch'}
								/>
							</label>
							<label class="wide">
								Invoice amount
								<input
									type="number"
									min="0"
									step="500"
									bind:value={invoiceAmount}
									disabled={mode === 'watch'}
								/>
							</label>
							<button type="button" class="primary-action" onclick={() => (invoiceCaptured = true)}>
								<CheckCircle2 size={17} strokeWidth={2.4} />
								Capture packet
							</button>
						</form>

						<div class="status-ribbon" data-ready={invoiceCaptured}>
							<span>
								{#if invoiceCaptured}
									<CheckCircle2 size={17} strokeWidth={2.4} />
								{:else}
									<AlertTriangle size={17} strokeWidth={2.4} />
								{/if}
								{invoiceCaptured ? 'Captured' : 'Draft'}
							</span>
							<p>
								{invoiceCaptured
									? 'The source evidence is clean enough to enter the accounting system.'
									: 'The accounting system is waiting for a complete evidence packet.'}
							</p>
						</div>
					</section>
				{:else if activeStage.id === 'journal'}
					<section class="journal-workbook" aria-label="Journal entry workbook">
						<div class="workbook-tabs">
							<span class="active">JE-1001 Billing</span>
							<span>JE-1002 Cash</span>
							<span>JE-1003 Revenue</span>
						</div>

						<table class="entry-grid">
							<thead>
								<tr>
									<th>Entry</th>
									<th>Account</th>
									<th>Debit</th>
									<th>Credit</th>
									<th>Explanation</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>JE-1001</td>
									<td>Accounts Receivable</td>
									<td>{money(amount)}</td>
									<td></td>
									<td>Customer has been billed.</td>
								</tr>
								<tr class={journalCorrect ? 'ok-row' : 'warn-row'}>
									<td>JE-1001</td>
									<td>
										<select bind:value={selectedCredit} disabled={mode === 'watch'}>
											{#each creditChoices as choice (choice)}
												<option value={choice}>{choice}</option>
											{/each}
										</select>
									</td>
									<td></td>
									<td>{money(amount)}</td>
									<td
										>{journalCorrect
											? 'Obligation remains.'
											: 'Wrong account for an unearned service.'}</td
									>
								</tr>
								<tr>
									<td>JE-1002</td>
									<td>Cash</td>
									<td>{money(amount)}</td>
									<td></td>
									<td>Payment arrives.</td>
								</tr>
								<tr>
									<td>JE-1002</td>
									<td>Accounts Receivable</td>
									<td></td>
									<td>{money(amount)}</td>
									<td>Receivable clears.</td>
								</tr>
								<tr class={recognitionApproved ? 'ok-row' : ''}>
									<td>JE-1003</td>
									<td>Deferred Revenue</td>
									<td>{money(monthlyRevenue)}</td>
									<td></td>
									<td>One month of obligation is satisfied.</td>
								</tr>
								<tr class={recognitionApproved ? 'ok-row' : ''}>
									<td>JE-1003</td>
									<td>Subscription Revenue</td>
									<td></td>
									<td>{money(monthlyRevenue)}</td>
									<td>January revenue is earned.</td>
								</tr>
							</tbody>
						</table>

						<div class="journal-footer">
							<p class={journalCorrect ? 'signal-good' : 'signal-warn'}>
								{journalCorrect
									? 'Billing entry is balanced and classified correctly.'
									: 'The entry balances, but it would overstate revenue.'}
							</p>
							<button
								type="button"
								class="primary-action"
								onclick={() => (recognitionApproved = true)}
							>
								<CheckCircle2 size={17} strokeWidth={2.4} />
								Approve revenue release
							</button>
						</div>
					</section>
				{:else if activeStage.id === 'ledger'}
					<section class="ledger-board" aria-label="General ledger board">
						<div class="ledger-toolbar">
							<div>
								<span>Posting batch</span>
								<strong>JE-1001 through JE-1003</strong>
							</div>
							<button type="button" class="primary-action" onclick={() => (ledgerPosted = true)}>
								<Database size={17} strokeWidth={2.4} />
								Post to GL
							</button>
						</div>

						<div class="ledger-grid">
							<article class="ledger-account">
								<h3>1000 Cash</h3>
								<div class="t-ledger">
									<strong>Debit</strong>
									<strong>Credit</strong>
									<span>{ledgerPosted ? money(amount) : 'Pending'}</span>
									<span></span>
								</div>
								<p>Balance: {ledgerPosted ? money(amount) : money(0)}</p>
							</article>
							<article class="ledger-account">
								<h3>1100 Accounts Receivable</h3>
								<div class="t-ledger">
									<strong>Debit</strong>
									<strong>Credit</strong>
									<span>{ledgerPosted ? money(amount) : 'Pending'}</span>
									<span>{ledgerPosted ? money(amount) : 'Pending'}</span>
								</div>
								<p>Balance: {ledgerPosted ? money(0) : 'Not posted'}</p>
							</article>
							<article class="ledger-account">
								<h3>2300 Deferred Revenue</h3>
								<div class="t-ledger">
									<strong>Debit</strong>
									<strong>Credit</strong>
									<span>{ledgerPosted ? money(monthlyRevenue) : 'Pending'}</span>
									<span>{ledgerPosted ? money(amount) : 'Pending'}</span>
								</div>
								<p>Balance: {ledgerPosted ? money(remainingDeferred) : 'Not posted'}</p>
							</article>
							<article class="ledger-account">
								<h3>4000 Subscription Revenue</h3>
								<div class="t-ledger">
									<strong>Debit</strong>
									<strong>Credit</strong>
									<span></span>
									<span>{ledgerPosted ? money(monthlyRevenue) : 'Pending'}</span>
								</div>
								<p>Balance: {ledgerPosted ? money(monthlyRevenue) : 'Not posted'}</p>
							</article>
						</div>
					</section>
				{:else if activeStage.id === 'trial'}
					<section class="trial-sheet" aria-label="Adjusted trial balance">
						<div class="sheet-titlebar">
							<div>
								<span>Adjusted trial balance</span>
								<strong>January 31, 2026</strong>
							</div>
							<button type="button" class="primary-action" onclick={() => (trialRun = true)}>
								<Table2 size={17} strokeWidth={2.4} />
								Run tie-out
							</button>
						</div>

						<table class="trial-grid">
							<thead>
								<tr>
									<th></th>
									<th>Account</th>
									<th>Debit</th>
									<th>Credit</th>
									<th>Review note</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1</td>
									<td>1000 Cash</td>
									<td>{money(amount)}</td>
									<td></td>
									<td>Agrees to bank receipt.</td>
								</tr>
								<tr>
									<td>2</td>
									<td>1100 Accounts Receivable</td>
									<td>{money(0)}</td>
									<td></td>
									<td>Cleared by payment.</td>
								</tr>
								<tr class={trialRun ? 'reviewed' : ''}>
									<td>3</td>
									<td>2300 Deferred Revenue</td>
									<td></td>
									<td>{money(remainingDeferred)}</td>
									<td>{trialRun ? 'Ties to revenue schedule.' : 'Needs schedule check.'}</td>
								</tr>
								<tr class={trialRun ? 'reviewed' : ''}>
									<td>4</td>
									<td>4000 Subscription Revenue</td>
									<td></td>
									<td>{money(monthlyRevenue)}</td>
									<td>{trialRun ? 'One month earned.' : 'Needs cutoff review.'}</td>
								</tr>
								{#each rowNumbers.slice(4) as row (row)}
									<tr class="empty-row">
										<td>{row}</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								{/each}
							</tbody>
							<tfoot>
								<tr>
									<td></td>
									<td>Total</td>
									<td>{money(amount)}</td>
									<td>{money(remainingDeferred + monthlyRevenue)}</td>
									<td
										>{amount === remainingDeferred + monthlyRevenue
											? 'Balanced'
											: 'Out of balance'}</td
									>
								</tr>
							</tfoot>
						</table>
					</section>
				{:else if activeStage.id === 'statements'}
					<section class="statement-builder" aria-label="Financial statement builder">
						<div class="statement-tabs" aria-label="Statement views">
							<button
								type="button"
								class={statementView === 'balance' ? 'active' : ''}
								onclick={() => (statementView = 'balance')}
							>
								Balance sheet
							</button>
							<button
								type="button"
								class={statementView === 'income' ? 'active' : ''}
								onclick={() => (statementView = 'income')}
							>
								Income
							</button>
							<button
								type="button"
								class={statementView === 'cash' ? 'active' : ''}
								onclick={() => (statementView = 'cash')}
							>
								Cash flow
							</button>
						</div>

						<div class="statement-paper">
							<header>
								<span>Nimbus Bikes</span>
								<h3>
									{statementView === 'balance'
										? 'Balance Sheet'
										: statementView === 'income'
											? 'Income Statement'
											: 'Statement of Cash Flows'}
								</h3>
								<p>For the month ended January 31, 2026</p>
							</header>

							{#if statementView === 'balance'}
								<div class="statement-section">
									<strong>Assets</strong>
									<p><span>Cash</span><b>{money(amount)}</b></p>
								</div>
								<div class="statement-section">
									<strong>Liabilities and equity</strong>
									<p><span>Deferred revenue</span><b>{money(remainingDeferred)}</b></p>
									<p><span>Retained earnings</span><b>{money(monthlyRevenue)}</b></p>
								</div>
							{:else if statementView === 'income'}
								<div class="statement-section">
									<strong>Revenue</strong>
									<p><span>Subscription revenue</span><b>{money(monthlyRevenue)}</b></p>
								</div>
								<div class="statement-section total-line">
									<p><span>Net income impact</span><b>{money(monthlyRevenue)}</b></p>
								</div>
							{:else}
								<div class="statement-section">
									<strong>Operating activities</strong>
									<p><span>Cash received from customer</span><b>{money(amount)}</b></p>
									<p><span>Increase in deferred revenue</span><b>{money(remainingDeferred)}</b></p>
								</div>
								<div class="statement-section note-line">
									<p><span>Revenue earned this month</span><b>Non-cash recognition</b></p>
								</div>
							{/if}
						</div>
					</section>
				{:else}
					<section class="filing-trace" aria-label="Filing trace map">
						<div class="reported-card">
							<span>Form 10-Q line support</span>
							<button type="button" onclick={() => (traceIndex = 0)}>
								Revenue {money(monthlyRevenue)}
							</button>
							<p>{traceNodes[traceIndex].detail}</p>
						</div>

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
					</section>
				{/if}
			</div>
		</section>
	</section>

	<footer class="sequence-bar" aria-label="Stage navigation">
		<button type="button" onclick={previousStage} disabled={activeIndex === 0}>
			<ArrowLeft size={17} strokeWidth={2.4} />
			Previous
		</button>
		<span>{activeStage.number} of {String(stages.length).padStart(2, '0')}</span>
		<button type="button" onclick={nextStage} disabled={activeIndex === stages.length - 1}>
			Next
			<ArrowRight size={17} strokeWidth={2.4} />
		</button>
	</footer>
</main>

<style>
	:global(body) {
		overflow: hidden;
		background: #101213;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.simulator {
		--bg: #f3efe4;
		--surface: #fbf7ed;
		--surface-strong: #fffdf7;
		--paper: #fffaf0;
		--ink: #171614;
		--muted: #6a6257;
		--soft: #e7dece;
		--grid: rgba(47, 43, 37, 0.14);
		--line: rgba(47, 43, 37, 0.2);
		--accent: #0e7771;
		--accent-2: #b14f3e;
		--gold: #cf931f;
		--green: #15735b;
		--red: #a73d35;
		display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
		height: 100vh;
		color: var(--ink);
		background:
			linear-gradient(
				90deg,
				color-mix(in srgb, var(--surface) 85%, transparent) 0 42%,
				transparent 42%
			),
			linear-gradient(var(--grid) 1px, transparent 1px),
			linear-gradient(90deg, var(--grid) 1px, transparent 1px), var(--bg);
		background-size:
			auto,
			32px 32px,
			32px 32px,
			auto;
	}

	.simulator[data-theme='night'] {
		--bg: #101213;
		--surface: #151819;
		--surface-strong: #1b2021;
		--paper: #211f1a;
		--ink: #f8efe1;
		--muted: #b7ad9d;
		--soft: #292d2d;
		--grid: rgba(255, 244, 224, 0.07);
		--line: rgba(255, 244, 224, 0.16);
		--accent: #61c7ba;
		--accent-2: #ed8a73;
		--gold: #e6ad42;
		--green: #77d5a2;
		--red: #ff9485;
	}

	button,
	input,
	select {
		color: inherit;
		font: inherit;
	}

	button {
		border: 0;
	}

	:global(svg) {
		flex: 0 0 auto;
	}

	input,
	select {
		width: 100%;
		min-width: 0;
		border: 1px solid var(--line);
		border-radius: 6px;
		padding: 10px 11px;
		background: color-mix(in srgb, var(--surface-strong) 92%, transparent);
	}

	input:disabled,
	select:disabled {
		opacity: 0.78;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th,
	td {
		border: 1px solid var(--grid);
		padding: 11px 12px;
		text-align: left;
		vertical-align: middle;
	}

	th {
		color: var(--muted);
		background: color-mix(in srgb, var(--soft) 78%, transparent);
		font-size: 0.72rem;
		font-weight: 850;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	td {
		background: color-mix(in srgb, var(--paper) 92%, transparent);
		font-variant-numeric: tabular-nums;
	}

	.masthead {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		gap: 18px;
		align-items: center;
		border-bottom: 1px solid var(--line);
		padding: 12px 18px;
		background: color-mix(in srgb, var(--surface) 94%, transparent);
	}

	.brand {
		display: inline-flex;
		gap: 10px;
		align-items: center;
		color: inherit;
		text-decoration: none;
	}

	.brand-mark {
		display: grid;
		place-items: center;
		width: 36px;
		height: 36px;
		border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
		border-radius: 9px;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 13%, transparent);
		font-weight: 950;
	}

	.brand strong,
	.brand small {
		display: block;
	}

	.brand strong {
		font-size: 0.98rem;
	}

	.brand small {
		margin-top: 1px;
		color: var(--muted);
		font-size: 0.72rem;
	}

	.stage-strip {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding-bottom: 2px;
	}

	.stage-strip button,
	.theme-toggle,
	.mode-switch button,
	.play-button,
	.sequence-bar button,
	.statement-tabs button {
		border: 1px solid var(--line);
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface-strong) 72%, transparent);
	}

	.stage-strip button {
		display: inline-flex;
		flex: 0 0 auto;
		gap: 8px;
		align-items: center;
		min-height: 36px;
		padding: 0 13px 0 7px;
		color: var(--muted);
		font-weight: 850;
	}

	.stage-strip button span {
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		border-radius: 999px;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 14%, transparent);
		font-size: 0.72rem;
	}

	.stage-strip button.active,
	.theme-toggle:hover,
	.mode-switch button.active,
	.statement-tabs button.active {
		color: var(--bg);
		background: var(--ink);
	}

	.stage-strip button.active span {
		color: var(--ink);
		background: var(--gold);
	}

	.theme-toggle,
	.sequence-bar button {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
		min-height: 38px;
		padding: 0 16px;
		font-weight: 850;
	}

	.workspace-shell {
		display: grid;
		grid-template-columns: clamp(360px, 31vw, 500px) minmax(0, 1fr);
		min-height: 0;
	}

	.lesson-panel,
	.process-panel {
		min-height: 0;
		overflow: auto;
	}

	.lesson-panel {
		border-right: 1px solid var(--line);
		padding: clamp(20px, 2.3vw, 34px);
		background: color-mix(in srgb, var(--surface) 88%, transparent);
	}

	.lesson-kicker {
		display: flex;
		gap: 16px;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 22px;
	}

	.lesson-kicker > span,
	.process-header span,
	.paper-header span,
	.sheet-titlebar span,
	.ledger-toolbar span,
	.reported-card span,
	.progress-readout span,
	.concept-strip span {
		color: var(--accent-2);
		font-size: 0.74rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.lesson-kicker > span,
	.paper-header span {
		display: inline-flex;
		gap: 7px;
		align-items: center;
	}

	.mode-switch {
		display: flex;
		gap: 7px;
	}

	.mode-switch button {
		display: inline-flex;
		gap: 7px;
		align-items: center;
		justify-content: center;
		min-height: 36px;
		padding: 0 14px;
		font-weight: 850;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 2.5vw, 3rem);
		font-weight: 900;
		line-height: 1.02;
		letter-spacing: 0;
	}

	.lesson-heading {
		border-bottom: 1px solid var(--line);
		padding-bottom: 18px;
	}

	.lesson-heading p {
		max-width: 26rem;
		margin: 10px 0 0;
		color: var(--accent);
		font-size: 1.05rem;
		font-weight: 850;
		line-height: 1.35;
	}

	.lesson-stack {
		display: grid;
		gap: 16px;
		padding-top: 18px;
	}

	.lesson-section {
		display: grid;
		gap: 9px;
	}

	.lesson-section h2 {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		margin: 0;
		color: var(--ink);
		font-size: 0.86rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.lesson-section p,
	.lesson-section li,
	.concept-strip p {
		color: var(--muted);
		font-size: 0.96rem;
		line-height: 1.55;
	}

	.lesson-section p {
		margin: 0;
	}

	.lesson-section ul {
		display: grid;
		gap: 7px;
		margin: 0;
		padding-left: 1.05rem;
	}

	.lesson-section.compact,
	.lesson-section.action,
	.concept-strip,
	.progress-readout {
		border-top: 1px solid var(--line);
		padding-top: 14px;
	}

	.lesson-section.action {
		border-color: color-mix(in srgb, var(--accent) 38%, var(--line));
	}

	.concept-strip p {
		margin: 6px 0 0;
	}

	.progress-readout strong {
		display: block;
		margin-top: 8px;
		font-size: 1.22rem;
	}

	.meter {
		overflow: hidden;
		height: 8px;
		margin-top: 12px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--soft) 88%, transparent);
	}

	.meter i {
		display: block;
		height: 100%;
		border-radius: inherit;
		background: linear-gradient(90deg, var(--accent), var(--gold));
	}

	.process-panel {
		padding: clamp(18px, 2.2vw, 30px);
	}

	.process-header {
		display: flex;
		gap: 18px;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
		padding: 0;
		background: transparent;
	}

	.process-title {
		display: inline-flex;
		gap: 11px;
		align-items: center;
	}

	.artifact-icon {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent);
		border-radius: 12px;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 12%, transparent);
	}

	.process-header h2 {
		margin: 3px 0 0;
		font-size: 1.02rem;
		line-height: 1.2;
	}

	.play-button,
	.primary-action {
		display: inline-flex;
		gap: 8px;
		align-items: center;
		justify-content: center;
		min-height: 38px;
		padding: 0 16px;
		font-weight: 900;
		white-space: nowrap;
	}

	.play-button,
	.primary-action {
		color: #14110b;
		background: var(--gold);
	}

	.artifact {
		min-height: 0;
		border: 0;
		border-radius: 0;
		padding: 0;
		background: transparent;
		box-shadow: none;
	}

	.invoice-desk {
		display: grid;
		grid-template-columns: minmax(280px, 0.92fr) minmax(260px, 1.08fr);
		gap: 24px;
		align-items: start;
		border: 1px solid var(--line);
		border-radius: 14px;
		padding: clamp(18px, 2vw, 28px);
		background: color-mix(in srgb, var(--surface-strong) 92%, transparent);
	}

	.statement-paper,
	.reported-card,
	.ledger-account {
		border: 1px solid var(--line);
		background: var(--paper);
	}

	.document-preview {
		border-right: 1px solid var(--line);
		padding: 4px 24px 4px 0;
		background: transparent;
		box-shadow: none;
	}

	.paper-header,
	.invoice-total,
	.journal-footer,
	.ledger-toolbar,
	.sheet-titlebar {
		display: flex;
		gap: 16px;
		align-items: center;
		justify-content: space-between;
	}

	.paper-header strong {
		font-family: Georgia, 'Times New Roman', serif;
		font-size: 2.1rem;
		line-height: 1;
	}

	.invoice-parties {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
		margin: 28px 0;
	}

	.invoice-parties p {
		margin: 0;
		color: var(--muted);
		font-size: 0.82rem;
	}

	.invoice-parties strong {
		display: block;
		margin-top: 5px;
		color: var(--ink);
		font-size: 1rem;
	}

	.invoice-lines td:last-child,
	.invoice-lines th:last-child,
	.entry-grid td:nth-child(3),
	.entry-grid td:nth-child(4),
	.trial-grid td:nth-child(3),
	.trial-grid td:nth-child(4),
	.trial-grid tfoot td {
		text-align: right;
	}

	.invoice-total {
		margin-top: 18px;
		border-top: 2px solid var(--ink);
		padding-top: 14px;
	}

	.invoice-total strong {
		font-size: 2rem;
	}

	.capture-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 14px;
		padding: 4px 0;
	}

	label {
		display: grid;
		gap: 7px;
		color: var(--muted);
		font-size: 0.75rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	label.wide,
	.capture-grid .primary-action {
		grid-column: 1 / -1;
	}

	.status-ribbon {
		grid-column: 1 / -1;
		display: flex;
		gap: 16px;
		align-items: center;
		border-top: 1px solid var(--line);
		padding: 14px 0 0;
		background: transparent;
	}

	.status-ribbon[data-ready='true'] {
		background: transparent;
	}

	.status-ribbon span {
		display: inline-flex;
		gap: 7px;
		align-items: center;
		color: var(--red);
		font-weight: 950;
	}

	.status-ribbon[data-ready='true'] span {
		color: var(--green);
	}

	.status-ribbon p {
		margin: 0;
		color: var(--muted);
	}

	.journal-workbook {
		overflow: hidden;
		border: 1px solid var(--line);
		background: var(--paper);
	}

	.workbook-tabs {
		display: flex;
		gap: 6px;
		border-bottom: 1px solid var(--line);
		padding: 10px 10px 0;
		background: color-mix(in srgb, var(--soft) 70%, transparent);
	}

	.workbook-tabs span {
		border: 1px solid var(--line);
		border-bottom: 0;
		border-radius: 8px 8px 0 0;
		padding: 9px 12px;
		color: var(--muted);
		font-size: 0.82rem;
		font-weight: 850;
		background: color-mix(in srgb, var(--surface) 84%, transparent);
	}

	.workbook-tabs .active {
		color: var(--ink);
		background: var(--paper);
	}

	.entry-grid {
		font-size: 0.93rem;
	}

	.entry-grid td:first-child,
	.trial-grid td:first-child {
		color: var(--muted);
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.82rem;
	}

	.ok-row td {
		background: color-mix(in srgb, var(--green) 8%, var(--paper));
	}

	.warn-row td {
		background: color-mix(in srgb, var(--red) 9%, var(--paper));
	}

	.journal-footer {
		border-top: 1px solid var(--line);
		padding: 14px;
	}

	.journal-footer p {
		margin: 0;
		font-weight: 850;
	}

	.signal-good {
		color: var(--green);
	}

	.signal-warn {
		color: var(--red);
	}

	.ledger-board,
	.trial-sheet,
	.statement-builder,
	.filing-trace {
		display: grid;
		gap: 18px;
	}

	.ledger-toolbar,
	.sheet-titlebar {
		border: 1px solid var(--line);
		padding: 14px;
		background: color-mix(in srgb, var(--paper) 85%, transparent);
	}

	.ledger-toolbar strong,
	.sheet-titlebar strong {
		display: block;
		margin-top: 4px;
		font-size: 1.1rem;
	}

	.ledger-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}

	.ledger-account {
		padding: 16px;
	}

	.ledger-account h3 {
		margin: 0 0 14px;
		font-size: 1rem;
	}

	.t-ledger {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		border: 1px solid var(--line);
	}

	.t-ledger > * {
		min-height: 42px;
		border: 1px solid var(--grid);
		padding: 10px;
	}

	.t-ledger strong {
		color: var(--muted);
		background: color-mix(in srgb, var(--soft) 72%, transparent);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.ledger-account p {
		margin: 14px 0 0;
		font-weight: 900;
	}

	.trial-sheet {
		overflow: auto;
	}

	.trial-grid {
		min-width: 760px;
	}

	.trial-grid tfoot td {
		border-top: 2px solid var(--ink);
		font-weight: 950;
	}

	.reviewed td {
		background: color-mix(in srgb, var(--green) 8%, var(--paper));
	}

	.empty-row td {
		height: 43px;
		color: transparent;
	}

	.statement-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.statement-tabs button {
		min-height: 38px;
		padding: 0 15px;
		font-weight: 850;
	}

	.statement-paper {
		max-width: 680px;
		min-height: 510px;
		margin-inline: auto;
		padding: clamp(24px, 4vw, 46px);
		box-shadow: 0 18px 0 color-mix(in srgb, var(--accent) 12%, transparent);
	}

	.statement-paper header {
		border-bottom: 2px solid var(--ink);
		padding-bottom: 18px;
		text-align: center;
	}

	.statement-paper header span {
		color: var(--accent-2);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.statement-paper h3 {
		margin: 8px 0 4px;
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(2.1rem, 4vw, 4rem);
		line-height: 1;
	}

	.statement-paper header p {
		margin: 0;
		color: var(--muted);
	}

	.statement-section {
		margin-top: 28px;
	}

	.statement-section strong {
		display: block;
		margin-bottom: 10px;
		color: var(--accent);
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.statement-section p {
		display: flex;
		gap: 18px;
		justify-content: space-between;
		margin: 0;
		border-bottom: 1px solid var(--grid);
		padding: 12px 0;
	}

	.total-line p {
		border-top: 2px solid var(--ink);
		font-weight: 950;
	}

	.note-line b {
		color: var(--muted);
		font-weight: 800;
	}

	.filing-trace {
		grid-template-columns: minmax(250px, 0.75fr) minmax(340px, 1.25fr);
		align-items: start;
	}

	.reported-card {
		padding: 22px;
	}

	.reported-card button {
		display: block;
		width: 100%;
		margin: 18px 0;
		border: 1px solid var(--line);
		padding: 22px;
		color: #14110b;
		background: var(--gold);
		font-family: Georgia, 'Times New Roman', serif;
		font-size: clamp(2rem, 4vw, 3.6rem);
		line-height: 1;
		text-align: left;
	}

	.reported-card p {
		margin: 0;
		color: var(--muted);
		line-height: 1.55;
	}

	.trace-ladder {
		display: grid;
		gap: 9px;
	}

	.trace-ladder button {
		display: grid;
		grid-template-columns: 44px 1fr auto;
		gap: 14px;
		align-items: center;
		border: 1px solid var(--line);
		padding: 13px 14px;
		background: color-mix(in srgb, var(--paper) 88%, transparent);
		text-align: left;
	}

	.trace-ladder button.active {
		border-color: color-mix(in srgb, var(--gold) 70%, var(--line));
		background: color-mix(in srgb, var(--gold) 14%, var(--paper));
	}

	.trace-ladder span {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 999px;
		color: var(--accent);
		background: color-mix(in srgb, var(--accent) 13%, transparent);
		font-size: 0.76rem;
		font-weight: 950;
	}

	.trace-ladder small {
		color: var(--muted);
		font-weight: 800;
	}

	.sequence-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid var(--line);
		padding: 10px 18px;
		background: color-mix(in srgb, var(--surface) 94%, transparent);
	}

	.sequence-bar span {
		color: var(--muted);
		font-size: 0.86rem;
		font-weight: 850;
	}

	.sequence-bar button:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}

	@media (max-width: 1080px) {
		.masthead {
			grid-template-columns: 1fr auto;
		}

		.stage-strip {
			grid-column: 1 / -1;
			order: 3;
		}

		.workspace-shell {
			grid-template-columns: 1fr;
			overflow: auto;
		}

		.lesson-panel,
		.process-panel {
			overflow: visible;
		}

		.lesson-panel {
			border-right: 0;
			border-bottom: 1px solid var(--line);
		}

		.process-panel {
			min-height: 720px;
		}

		h1 {
			max-width: 13ch;
			font-size: clamp(2.7rem, 10vw, 5rem);
		}
	}

	@media (max-width: 720px) {
		:global(body) {
			overflow: auto;
		}

		.simulator {
			height: auto;
			min-height: 100vh;
		}

		.masthead {
			padding: 10px;
		}

		.brand small {
			display: none;
		}

		.lesson-panel,
		.process-panel {
			padding: 16px;
		}

		.process-header,
		.ledger-toolbar,
		.sheet-titlebar,
		.journal-footer,
		.status-ribbon {
			align-items: stretch;
			flex-direction: column;
		}

		.invoice-desk,
		.capture-grid,
		.invoice-parties,
		.ledger-grid,
		.filing-trace {
			grid-template-columns: 1fr;
		}

		.entry-grid,
		.trial-grid {
			min-width: 720px;
		}

		.journal-workbook,
		.trial-sheet {
			overflow-x: auto;
		}

		.trace-ladder button {
			grid-template-columns: 40px 1fr;
		}

		.trace-ladder small {
			grid-column: 2;
		}
	}
</style>
