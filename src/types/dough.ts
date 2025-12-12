export type DoughType = 'bread' | 'pizza' | 'baguette' | 'bagel' | 'focaccia' | 'ciabatta';

export type PrefermentType = 'none' | 'poolish' | 'biga' | 'sourdough';

export interface YieldCalculation {
  gramsPerPiece: number; // grams of flour per piece
  unitName: string; // e.g., "loaf", "pizza", "baguette", "bagel"
  unitNamePlural: string; // e.g., "loaves", "pizzas", "baguettes", "bagels"
}

export interface DoughPreset {
  id: DoughType;
  name: string;
  description: string;
  defaultHydration: number; // percentage
  hydrationRange: { min: number; max: number };
  saltPercentage: number; // as % of flour
  yeastPercentage: number; // as % of flour
  sugarPercentage?: number; // optional
  fatPercentage?: number; // optional (oil, butter)
  enabled?: boolean; // whether this preset is available for use
  bakingInfo?: string; // baking instructions specific to this dough type
  yieldCalculation?: YieldCalculation; // how to calculate yield for this dough type
}

export interface SourdoughRatio {
  flour: number;
  water: number;
  starter: number;
}

export interface PrefermentConfig {
  type: PrefermentType;
  flourPercentage: number; // % of total flour in preferment
  hydration: number; // % hydration of preferment
  yeastPercentage?: number; // for poolish/biga
  starterPercentage?: number; // for sourdough (as % of flour)
  sourdoughRatio?: SourdoughRatio; // for sourdough: flour:water:starter ratio
}

export interface RecipeInputs {
  doughType: DoughType;
  flourWeight: number; // grams
  hydration: number; // percentage
  preferment: PrefermentConfig | null;
}

export interface StarterBreakdown {
  flour: number;
  water: number;
  starter: number;
}

export interface IngredientAmounts {
  flour: {
    total: number;
    inDough: number;
    inPreferment: number;
  };
  water: {
    total: number;
    inDough: number;
    inPreferment: number;
  };
  salt: number;
  yeast: {
    total: number;
    inDough: number;
    inPreferment: number;
  };
  sugar?: number;
  fat?: number;
  starter?: number; // for sourdough - total amount
  starterBreakdown?: StarterBreakdown; // for sourdough - breakdown of ingredients
}

export interface BakingInstructions {
  prefermentTime?: string;
  bulkFermentTime?: string;
  proofingTime?: string;
}

export interface CalculatedRecipe {
  inputs: RecipeInputs;
  ingredients: IngredientAmounts;
  bakingInstructions: BakingInstructions;
  totalDoughWeight: number;
}
