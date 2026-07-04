export type ConceptTerm = {
	slug: string;
	term: string;
	shortDefinition: string;
	plainMeaning: string;
	usedIn: string[];
};

export type EquationExample = {
	id: string;
	label: string;
	event: string;
	resources: string;
	claims: string;
	equation: string;
	beginnerMeaning: string;
	professionalTranslation: string;
};

export type AccountTypeCard = {
	id: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
	label: string;
	question: string;
	plainMeaning: string;
	normalBalance: 'Debit' | 'Credit';
	statementHome: string;
	nimbusExample: string;
	commonMixup: string;
};

export type BasisComparison = {
	id: string;
	event: string;
	cashView: string;
	accrualView: string;
	whyItMatters: string;
	journalHint: string;
};

export const primerTerms: ConceptTerm[] = [
	{
		slug: 'accounting-equation',
		term: 'Accounting equation',
		shortDefinition: 'Assets = Liabilities + Equity.',
		plainMeaning: 'What the company has must equal the claims against what the company has.',
		usedIn: ['setup', 'journal', 'trial', 'statements']
	},
	{
		slug: 'asset',
		term: 'Asset',
		shortDefinition: 'A resource the company controls and expects to benefit from.',
		plainMeaning: 'Something useful the company has or is owed.',
		usedIn: ['setup', 'subledger', 'ledger', 'statements']
	},
	{
		slug: 'liability',
		term: 'Liability',
		shortDefinition: 'An obligation the company must settle later.',
		plainMeaning: 'Something the company owes or still has to do.',
		usedIn: ['judgment', 'journal', 'reconciliations', 'statements']
	},
	{
		slug: 'revenue',
		term: 'Revenue',
		shortDefinition: 'Income earned by delivering goods or services to customers.',
		plainMeaning: 'Value earned from customers, not simply cash received.',
		usedIn: ['judgment', 'subledger', 'journal', 'statements']
	},
	{
		slug: 'deferred-revenue',
		term: 'Deferred revenue',
		shortDefinition: 'Cash or billing before the company has earned the revenue.',
		plainMeaning: 'A liability because the company still owes service.',
		usedIn: ['judgment', 'subledger', 'journal', 'disclosures']
	},
	{
		slug: 'subledger',
		term: 'Subledger',
		shortDefinition: 'Detailed records that support a general ledger control account.',
		plainMeaning:
			'The customer, vendor, contract, inventory, or asset detail behind a summary account.',
		usedIn: ['subledger', 'ledger', 'reconciliations']
	},
	{
		slug: 'trial-balance',
		term: 'Trial balance',
		shortDefinition: 'A list of debit and credit account balances at a point in time.',
		plainMeaning: 'The close spreadsheet that proves debits equal credits before reporting review.',
		usedIn: ['trial', 'mapping', 'statements']
	},
	{
		slug: 'cutoff',
		term: 'Cutoff',
		shortDefinition: 'The process of recording activity in the correct accounting period.',
		plainMeaning: 'Putting January activity in January and February activity in February.',
		usedIn: ['cutoff', 'adjustments', 'reconciliations']
	}
];

export const accountingEquationExamples: EquationExample[] = [
	{
		id: 'owner-capital',
		label: 'Owner funds the company',
		event: 'Nimbus receives $50,000 from its founder to open the business bank account.',
		resources: 'Cash increases by $50,000.',
		claims: 'Owner equity increases by $50,000.',
		equation: 'Assets +50,000 = Liabilities 0 + Equity +50,000',
		beginnerMeaning: 'Nimbus has more cash, and the founder has a claim on the business.',
		professionalTranslation: 'Debit Cash; credit Common Stock / APIC.'
	},
	{
		id: 'bank-loan',
		label: 'Company borrows money',
		event: 'Nimbus borrows $20,000 from the bank to buy equipment later.',
		resources: 'Cash increases by $20,000.',
		claims: 'A bank liability increases by $20,000.',
		equation: 'Assets +20,000 = Liabilities +20,000 + Equity 0',
		beginnerMeaning: 'Nimbus has more cash, but the source of that cash is a debt it must repay.',
		professionalTranslation: 'Debit Cash; credit Notes Payable.'
	},
	{
		id: 'subscription-billing',
		label: 'Customer is billed upfront',
		event: 'Aster Labs is billed $12,000 for twelve months of maintenance service.',
		resources: 'Accounts receivable increases by $12,000.',
		claims: 'Deferred revenue increases by $12,000 because service is still owed.',
		equation: 'Assets +12,000 = Liabilities +12,000 + Equity 0',
		beginnerMeaning: 'Nimbus is owed money, but it has not earned all the revenue yet.',
		professionalTranslation: 'Debit Accounts Receivable; credit Deferred Revenue.'
	},
	{
		id: 'monthly-revenue',
		label: 'One month is earned',
		event: 'Nimbus completes January service for Aster Labs.',
		resources: 'No new cash is needed for this recognition step.',
		claims: 'Deferred revenue falls and earned revenue increases equity through profit.',
		equation: 'Liabilities -1,000 + Equity +1,000; total claims stay connected',
		beginnerMeaning:
			'One month of the old promise has been fulfilled, so liability turns into earned revenue.',
		professionalTranslation: 'Debit Deferred Revenue; credit Service Revenue.'
	}
];

export const accountTypeCards: AccountTypeCard[] = [
	{
		id: 'asset',
		label: 'Asset',
		question: 'What does Nimbus have or control?',
		plainMeaning: 'Cash, inventory, equipment, and amounts customers owe Nimbus.',
		normalBalance: 'Debit',
		statementHome: 'Balance sheet',
		nimbusExample: 'Cash, accounts receivable, inventory, property and equipment.',
		commonMixup:
			'Cash received is an asset, but receiving cash does not always mean revenue was earned.'
	},
	{
		id: 'liability',
		label: 'Liability',
		question: 'What does Nimbus owe or still need to perform?',
		plainMeaning: 'Supplier bills, loans, accrued costs, and service promised to customers.',
		normalBalance: 'Credit',
		statementHome: 'Balance sheet',
		nimbusExample: 'Accounts payable, accrued expenses, deferred revenue, debt.',
		commonMixup: 'Deferred revenue is not bad revenue; it is a promise Nimbus still owes.'
	},
	{
		id: 'equity',
		label: 'Equity',
		question: 'What is left for owners after liabilities?',
		plainMeaning: 'Owner investment plus profits kept in the business.',
		normalBalance: 'Credit',
		statementHome: 'Balance sheet and equity statement',
		nimbusExample: 'Common stock, additional paid-in capital, retained earnings.',
		commonMixup:
			'Retained earnings is not a cash account; it is cumulative profit kept in the company.'
	},
	{
		id: 'revenue',
		label: 'Revenue',
		question: 'What did Nimbus earn from customers?',
		plainMeaning: 'Value earned by selling bikes, parts, or service.',
		normalBalance: 'Credit',
		statementHome: 'Income statement',
		nimbusExample: 'Product revenue and service revenue.',
		commonMixup:
			'Revenue is earned by performance, not automatically by billing or collecting cash.'
	},
	{
		id: 'expense',
		label: 'Expense',
		question: 'What value did Nimbus use up to earn revenue or operate?',
		plainMeaning: 'Costs consumed during the period.',
		normalBalance: 'Debit',
		statementHome: 'Income statement',
		nimbusExample: 'Cost of goods sold, payroll, depreciation, interest, tax expense.',
		commonMixup:
			'Buying equipment is usually an asset first; it becomes expense gradually through depreciation.'
	}
];

export const cashAccrualComparisons: BasisComparison[] = [
	{
		id: 'annual-service',
		event: 'Aster Labs pays $12,000 upfront for a year of maintenance.',
		cashView: 'Cash basis would be tempted to call the whole $12,000 income when cash arrives.',
		accrualView:
			'Accrual accounting records cash, but earns only $1,000 of revenue each month as service is provided.',
		whyItMatters: 'The balance sheet must show the remaining service promise as deferred revenue.',
		journalHint: 'Collect cash now; recognize revenue over time.'
	},
	{
		id: 'vendor-bill-late',
		event: 'Inventory arrives on January 30, but the vendor bill arrives February 2.',
		cashView: 'Cash basis may wait until payment or bill processing catches up.',
		accrualView:
			'Accrual accounting records the January inventory and liability because Nimbus received value in January.',
		whyItMatters: 'Waiting for the bill would understate January liabilities and inventory.',
		journalHint: 'Record the receipt or accrual in the period the goods arrived.'
	},
	{
		id: 'depreciation',
		event: 'Nimbus buys equipment that will help the business for several years.',
		cashView: 'Cash basis notices cash leaving when the equipment is purchased.',
		accrualView:
			'Accrual accounting treats the equipment as an asset first, then recognizes expense over its useful life.',
		whyItMatters:
			'The income statement should not absorb the whole cost before the asset is used up.',
		journalHint: 'Capitalize first; depreciate over time.'
	}
];
