import { useEffect, useRef, useState } from 'react';
import type { Ingredient } from '../components/RecipeDisplay/IngredientList';

/**
 * Hook to track which ingredients have changed
 * Returns a Set of ingredient names that changed in the last render
 */
export function useIngredientChangeTracking(ingredients: Ingredient[]): Set<string> {
  const [changedIngredients, setChangedIngredients] = useState<Set<string>>(new Set());
  const previousIngredientsRef = useRef<Map<string, { amount: string; percentage: string }>>(
    new Map()
  );

  useEffect(() => {
    const changed = new Set<string>();
    const previousMap = previousIngredientsRef.current;

    // Check each ingredient for changes
    ingredients.forEach((ingredient) => {
      const previous = previousMap.get(ingredient.name);

      if (previous) {
        // Check if amount or percentage changed
        if (
          previous.amount !== ingredient.amount ||
          previous.percentage !== ingredient.bakerPercentage
        ) {
          changed.add(ingredient.name);
        }
      }
      // Don't highlight on initial render (when previous is undefined)
    });

    // Update the changed set
    if (changed.size > 0) {
      setChangedIngredients(changed);

      // Clear the highlight after animation completes (600ms)
      const timer = setTimeout(() => {
        setChangedIngredients(new Set());
      }, 600);

      return () => clearTimeout(timer);
    }

    // Always update the reference for next comparison
    const newMap = new Map<string, { amount: string; percentage: string }>();
    ingredients.forEach((ingredient) => {
      newMap.set(ingredient.name, {
        amount: ingredient.amount,
        percentage: ingredient.bakerPercentage,
      });
    });
    previousIngredientsRef.current = newMap;
  }, [ingredients]);

  return changedIngredients;
}
