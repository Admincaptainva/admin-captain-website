export type CalculatorInput = {
  key: string;
  label: string;
  min: number;
  max: number;
  default: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  helper?: string;
};

export type CalculatorAssumption = {
  key: string;
  label: string;
  min: number;
  max: number;
  default: number;
  suffix?: string;
};

export type PlanConfig = {
  name: string;
  monthlyPrice: number | ((values: Record<string, number>) => number);
  priceSuffix?: (values: Record<string, number>) => string;
};

export type PlanResult = {
  name: string;
  monthlyPrice: number;
  priceSuffix?: string;
  breakEven: number;
};

export type CalcResults = {
  lostPerMonth: number;
  monthlyLoss: number;
  yearlyLoss: number;
  planBreakEven: PlanResult[];
};

export type CalculatorConfig = {
  industry: string;
  label: string;
  headline: string;
  subhead: string;
  nounPlural: string;
  lostLineNoun?: string;
  inputs: CalculatorInput[];
  assumptions: CalculatorAssumption[];
  plans: PlanConfig[];
  footnote?: string;
  secondaryCta?: { label: string };
  calculate: (values: Record<string, number>) => CalcResults;
  explainCalculation: (values: Record<string, number>, results: CalcResults) => string[];
};
