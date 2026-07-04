export type CycleArcId = 'foundation' | 'record' | 'close' | 'report' | 'assure';

export type LandingStat = {
	label: string;
	value: string;
	detail: string;
};

export type CycleArc = {
	id: CycleArcId;
	label: string;
	stage: number;
	stageId: string;
	detail: string;
};

export type TraceNode = {
	label: string;
	value: string;
	detail: string;
	artifact:
		| 'filing'
		| 'statement'
		| 'mapping'
		| 'trial-balance'
		| 'general-ledger'
		| 'journal-entry'
		| 'subledger'
		| 'source-evidence'
		| 'policy-control';
	sourceIds: string[];
};

export type ScenarioFact = {
	label: string;
	value: string;
};

export type AccountingScenario = {
	company: string;
	period: string;
	customer: string;
	invoiceId: string;
	contractId: string;
	primaryAmount: number;
	primaryAmountLabel: string;
	servicePeriod: string;
	filingForm: string;
	introduction: string;
	landingStats: LandingStat[];
	cycleArcs: CycleArc[];
	openingFacts: ScenarioFact[];
	traceNodes: TraceNode[];
};
