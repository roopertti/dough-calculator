import { DOUGH_PRESETS } from '@data/doughPresets';
import type {
  CalculatedRecipe,
  ColdFermentationType,
  DoughPreset,
  FermentationInstructions,
  IngredientAmounts,
  PrefermentConfig,
  RecipeInputs,
} from '@types';

export function calculateRecipe(inputs: RecipeInputs): CalculatedRecipe {
  const preset = DOUGH_PRESETS[inputs.doughType];
  const { flourWeight, hydration, preferment } = inputs;

  let ingredients: IngredientAmounts;

  if (!preferment || preferment.type === 'none') {
    // Simple calculation without preferment
    ingredients = calculateSimpleRecipe(flourWeight, hydration, preset);
  } else {
    // With preferment
    ingredients = calculateWithPreferment(flourWeight, hydration, preferment, preset);
  }

  const totalDoughWeight = calculateTotalWeight(ingredients);
  const bakingInstructions = formatBakingInstructions(preferment);

  return {
    inputs,
    ingredients,
    bakingInstructions,
    totalDoughWeight,
  };
}

function calculateSimpleRecipe(
  flourWeight: number,
  hydration: number,
  preset: DoughPreset
): IngredientAmounts {
  const yeastAmount = Math.max(flourWeight * (preset.yeastPercentage / 100), 0.5);

  return {
    flour: {
      total: flourWeight,
      inDough: flourWeight,
      inPreferment: 0,
    },
    water: {
      total: flourWeight * (hydration / 100),
      inDough: flourWeight * (hydration / 100),
      inPreferment: 0,
    },
    salt: flourWeight * (preset.saltPercentage / 100),
    yeast: {
      total: yeastAmount,
      inDough: yeastAmount,
      inPreferment: 0,
    },
    sugar: preset.sugarPercentage ? flourWeight * (preset.sugarPercentage / 100) : undefined,
    fat: preset.fatPercentage ? flourWeight * (preset.fatPercentage / 100) : undefined,
  };
}

function calculateWithPreferment(
  totalFlour: number,
  targetHydration: number,
  preferment: PrefermentConfig,
  preset: DoughPreset
): IngredientAmounts {
  // Preferment calculations
  const prefermentFlour = totalFlour * (preferment.flourPercentage / 100);
  const prefermentWater = prefermentFlour * (preferment.hydration / 100);

  // Main dough calculations
  const doughFlour = totalFlour - prefermentFlour;
  const totalWater = totalFlour * (targetHydration / 100);
  const doughWater = totalWater - prefermentWater;

  // Yeast distribution
  let prefermentYeast = 0;
  let doughYeast = 0;

  if (preferment.type === 'poolish' || preferment.type === 'biga') {
    // Use specified yeast percentage or default to 0.2%
    prefermentYeast = Math.max(prefermentFlour * ((preferment.yeastPercentage || 0.2) / 100), 0.5);
    doughYeast = Math.max(totalFlour * (preset.yeastPercentage / 100) - prefermentYeast, 0.5);
  } else if (preferment.type === 'sourdough') {
    // No commercial yeast typically
    prefermentYeast = 0;
    doughYeast = 0;
  }

  // Calculate sourdough starter amount based on ratio
  let starterAmount: number | undefined;
  if (preferment.type === 'sourdough') {
    const ratio = preferment.sourdoughRatio || { flour: 1, water: 1, starter: 1 };
    starterAmount = prefermentFlour * (ratio.starter / ratio.flour);
  }

  return {
    flour: {
      total: totalFlour,
      inPreferment: prefermentFlour,
      inDough: doughFlour,
    },
    water: {
      total: totalWater,
      inPreferment: prefermentWater,
      inDough: doughWater,
    },
    salt: totalFlour * (preset.saltPercentage / 100),
    yeast: {
      total: prefermentYeast + doughYeast,
      inPreferment: prefermentYeast,
      inDough: doughYeast,
    },
    sugar: preset.sugarPercentage ? totalFlour * (preset.sugarPercentage / 100) : undefined,
    fat: preset.fatPercentage ? totalFlour * (preset.fatPercentage / 100) : undefined,
    starter: starterAmount,
  };
}

function calculateTotalWeight(ingredients: IngredientAmounts): number {
  let total = 0;

  total += ingredients.flour.total;
  total += ingredients.water.total;
  total += ingredients.salt;
  total += ingredients.yeast.total;

  if (ingredients.sugar !== undefined) {
    total += ingredients.sugar;
  }

  if (ingredients.fat !== undefined) {
    total += ingredients.fat;
  }

  if (ingredients.starter !== undefined) {
    total += ingredients.starter;
  }

  return total;
}

function formatBakingInstructions(preferment: PrefermentConfig | null): FermentationInstructions {
  let prefermentTime: string | undefined;
  let bulkFermentTime: string | undefined;
  let coldFermentationOptions: ColdFermentationType[] | undefined;

  if (preferment && preferment.type !== 'none') {
    if (preferment.type === 'poolish') {
      prefermentTime = '12-16 hours at room temperature';
      bulkFermentTime = '2-3 hours';
      coldFermentationOptions = ['1-hour-room-temp', '1-day-fridge'];
    } else if (preferment.type === 'biga') {
      prefermentTime = '12-16 hours at room temperature';
      bulkFermentTime = '2-3 hours';
      coldFermentationOptions = ['1-hour-room-temp', '1-day-fridge'];
    } else if (preferment.type === 'sourdough') {
      prefermentTime = '4-8 hours at room temperature (or use active starter)';
      bulkFermentTime = '4-6 hours';
      coldFermentationOptions = ['1-day-fridge', '2-days-fridge'];
    }
  } else {
    // Estimate based on yeast amount
    bulkFermentTime = '1.5-2 hours';
    coldFermentationOptions = ['1-hour-room-temp', '1-day-fridge'];
  }

  return {
    prefermentTime,
    bulkFermentTime,
    coldFermentationOptions,
  };
}
