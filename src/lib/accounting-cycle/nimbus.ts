import type { AccountingScenario } from './model';

export const nimbusScenario: AccountingScenario = {
	company: 'Nimbus Bikes',
	period: 'January 2026 close',
	customer: 'Aster Labs',
	invoiceId: 'INV-1001',
	contractId: 'C-1001',
	primaryAmount: 12000,
	primaryAmountLabel: '$12,000',
	servicePeriod: 'Jan 1 - Dec 31, 2026',
	filingForm: 'mock 10-Q-style filing',
	introduction:
		'Follow one Nimbus Bikes subscription from contract and invoice through revenue recognition, journals, ledgers, close workpapers, statements, disclosures, controls, audit evidence, and a mock 10-Q-style filing.',
	landingStats: [
		{ label: 'Company', value: 'Nimbus Bikes', detail: 'January 2026 close' },
		{ label: 'Primary trail', value: '$12,000', detail: 'Contract to filing fact' },
		{ label: 'Coverage', value: '28 screens', detail: 'Setup, records, close, report, audit' }
	],
	cycleArcs: [
		{
			id: 'foundation',
			label: 'Foundation',
			stage: 6,
			detail: 'Set up the company, triage events, collect evidence, and write the judgment.'
		},
		{
			id: 'record',
			label: 'Record',
			stage: 10,
			detail: 'Create subledgers, journal entries, cash matching, and GL postings.'
		},
		{
			id: 'close',
			label: 'Close',
			stage: 14,
			detail: 'Test cutoff, post adjustments, reconcile, and review the adjusted trial balance.'
		},
		{
			id: 'report',
			label: 'Report',
			stage: 19,
			detail: 'Map balances into statements, cash flow, disclosures, and tie-outs.'
		},
		{
			id: 'assure',
			label: 'Assure',
			stage: 23,
			detail: 'Run controls, answer audit requests, tag facts, and assemble the filing package.'
		}
	],
	openingFacts: [
		{ label: 'Customer', value: 'Aster Labs' },
		{ label: 'Invoice', value: 'INV-1001' },
		{ label: 'Contract', value: '12 months' },
		{ label: 'Initial entry', value: 'AR / Deferred revenue' }
	],
	traceNodes: [
		{
			label: 'Mock 10-Q fact',
			value: 'Service revenue $1.18m',
			detail: 'Tagged in the financial statement table.',
			artifact: 'filing',
			sourceIds: ['ixbrl:RevenueFromContractWithCustomerExcludingAssessedTax']
		},
		{
			label: 'Statement line',
			value: 'Service revenue',
			detail: 'Income statement line in the statement binder.',
			artifact: 'statement',
			sourceIds: ['IS-4100']
		},
		{
			label: 'Mapping',
			value: 'Account 4100',
			detail: 'Mapped from service revenue GL account.',
			artifact: 'mapping',
			sourceIds: ['MAP-4100']
		},
		{
			label: 'Trial balance',
			value: 'Adjusted TB',
			detail: 'Credit balance after January release entries.',
			artifact: 'trial-balance',
			sourceIds: ['ATB-2026-01']
		},
		{
			label: 'General ledger',
			value: 'GL 4100',
			detail: 'Posted from JE-1005 and other service releases.',
			artifact: 'general-ledger',
			sourceIds: ['GL-4100', 'JE-1005']
		},
		{
			label: 'Journal entry',
			value: 'JE-1005',
			detail: 'Debit deferred revenue, credit service revenue.',
			artifact: 'journal-entry',
			sourceIds: ['JE-1005']
		},
		{
			label: 'Revenue schedule',
			value: 'RS-C-1001',
			detail: 'One month released; eleven months remain deferred.',
			artifact: 'subledger',
			sourceIds: ['RS-C-1001', 'C-1001']
		},
		{
			label: 'Source evidence',
			value: 'C-1001 / INV-1001 / PMT-1001',
			detail: 'Contract, invoice, receipt, and bank line support the transaction.',
			artifact: 'source-evidence',
			sourceIds: ['C-1001', 'INV-1001', 'PMT-1001', 'BNK-8842']
		},
		{
			label: 'Policy and control',
			value: 'POL-REV / WP-REV',
			detail: 'Policy memo and reviewer signoff support the conclusion.',
			artifact: 'policy-control',
			sourceIds: ['POL-REV-606', 'WP-REV-2026-01']
		}
	]
};
