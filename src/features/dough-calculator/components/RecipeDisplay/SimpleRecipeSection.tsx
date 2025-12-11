import type { IngredientAmounts } from '@types';
import { RecipeSection } from '@ui';
import { calculateBakerPercentage, formatWeight } from '@utils/formatters';
import IngredientList, { type Ingredient } from './IngredientList';

interface SimpleRecipeSectionProps {
  ingredients: IngredientAmounts;
}

export default function SimpleRecipeSection({ ingredients }: SimpleRecipeSectionProps) {
  const simpleIngredients: Ingredient[] = [
    {
      name: 'Flour',
      amount: formatWeight(ingredients.flour.total),
      bakerPercentage: '100%',
    },
    {
      name: 'Water',
      amount: formatWeight(ingredients.water.total),
      bakerPercentage: calculateBakerPercentage(ingredients.water.total, ingredients.flour.total),
    },
    {
      name: 'Salt',
      amount: formatWeight(ingredients.salt),
      bakerPercentage: calculateBakerPercentage(ingredients.salt, ingredients.flour.total),
    },
    {
      name: 'Yeast',
      amount: formatWeight(ingredients.yeast.total),
      bakerPercentage: calculateBakerPercentage(ingredients.yeast.total, ingredients.flour.total),
    },
  ];

  if (ingredients.sugar !== undefined) {
    simpleIngredients.push({
      name: 'Sugar',
      amount: formatWeight(ingredients.sugar),
      bakerPercentage: calculateBakerPercentage(ingredients.sugar, ingredients.flour.total),
    });
  }

  if (ingredients.fat !== undefined) {
    simpleIngredients.push({
      name: 'Oil/Fat',
      amount: formatWeight(ingredients.fat),
      bakerPercentage: calculateBakerPercentage(ingredients.fat, ingredients.flour.total),
    });
  }

  return (
    <RecipeSection title="Ingredients">
      <IngredientList ingredients={simpleIngredients} />
    </RecipeSection>
  );
}
