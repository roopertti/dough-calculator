import { DOUGH_PRESETS } from '@data/doughPresets';
import type { DoughType, PrefermentConfig, RecipeInputs } from '@types';
import { calculateRecipe } from '@utils/calculations';
import { deserializeRecipeFromUrl, serializeRecipeToUrl } from '@utils/urlState';
import { useEffect, useMemo, useState } from 'react';

// Load state from URL only once on module load
const initialUrlState = deserializeRecipeFromUrl();

export function useDoughCalculator() {
  const [selectedDoughType, setSelectedDoughType] = useState<DoughType>(
    initialUrlState?.doughType || 'bread'
  );
  const [flourWeight, setFlourWeight] = useState<number>(initialUrlState?.flourWeight || 500);
  const [hydration, setHydration] = useState<number>(
    initialUrlState?.hydration || DOUGH_PRESETS.bread.defaultHydration
  );
  const [preferment, setPreferment] = useState<PrefermentConfig | null>(
    initialUrlState?.preferment || null
  );

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

  // Update URL when state changes
  useEffect(() => {
    const inputs: RecipeInputs = {
      doughType: selectedDoughType,
      flourWeight,
      hydration,
      preferment,
    };
    const url = serializeRecipeToUrl(inputs);
    window.history.replaceState(null, '', url);
  }, [selectedDoughType, flourWeight, hydration, preferment]);

  // Reset all values to defaults
  const handleReset = () => {
    setSelectedDoughType('bread');
    setFlourWeight(500);
    setHydration(DOUGH_PRESETS.bread.defaultHydration);
    setPreferment(null);
  };

  // Get shareable URL
  const getShareableUrl = () => {
    const inputs: RecipeInputs = {
      doughType: selectedDoughType,
      flourWeight,
      hydration,
      preferment,
    };
    return serializeRecipeToUrl(inputs);
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
    getShareableUrl,
  };
}

export type DoughCalculatorState = ReturnType<typeof useDoughCalculator>;
