import { DOUGH_PRESETS } from '@data/doughPresets';
import type { DoughType, PrefermentConfig, RecipeInputs } from '@types';
import { calculateRecipe } from '@utils/calculations';
import { useMemo, useState } from 'react';

export function useDoughCalculator() {
  const [selectedDoughType, setSelectedDoughType] = useState<DoughType>('bread');
  const [flourWeight, setFlourWeight] = useState<number>(500);
  const [hydration, setHydration] = useState<number>(DOUGH_PRESETS.bread.defaultHydration);
  const [preferment, setPreferment] = useState<PrefermentConfig | null>(null);

  // Update hydration when dough type changes
  const handleDoughTypeChange = (type: DoughType) => {
    setSelectedDoughType(type);
    setHydration(DOUGH_PRESETS[type].defaultHydration);
  };

  // Calculate recipe whenever inputs change
  const recipe = useMemo(() => {
    const inputs: RecipeInputs = {
      doughType: selectedDoughType,
      flourWeight,
      hydration,
      preferment,
    };
    return calculateRecipe(inputs);
  }, [selectedDoughType, flourWeight, hydration, preferment]);

  // Reset all values to defaults
  const handleReset = () => {
    setSelectedDoughType('bread');
    setFlourWeight(500);
    setHydration(DOUGH_PRESETS.bread.defaultHydration);
    setPreferment(null);
  };

  return {
    // State values
    selectedDoughType,
    flourWeight,
    hydration,
    preferment,
    recipe,
    // State setters
    setSelectedDoughType: handleDoughTypeChange,
    setFlourWeight,
    setHydration,
    setPreferment,
    // Actions
    reset: handleReset,
  };
}

export type DoughCalculatorState = ReturnType<typeof useDoughCalculator>;
