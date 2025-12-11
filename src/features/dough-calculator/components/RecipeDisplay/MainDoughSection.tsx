import type { IngredientAmounts } from '@types';
import { RecipeSection } from '@ui';
import { calculateBakerPercentage, formatWeight } from '@utils/formatters';
import IngredientList, { type Ingredient } from './IngredientList';

interface MainDoughSectionProps {
  ingredients: IngredientAmounts;
}

export default function MainDoughSection({ ingredients }: MainDoughSectionProps) {
  const mainDoughIngredients: Ingredient[] = [];

  if (ingredients.flour.inDough > 0) {
    mainDoughIngredients.push({
      name: 'Flour',
      amount: formatWeight(ingredients.flour.inDough),
      bakerPercentage: calculateBakerPercentage(ingredients.flour.inDough, ingredients.flour.total),
    });
  }

  if (ingredients.water.inDough > 0) {
    mainDoughIngredients.push({
      name: 'Water',
      amount: formatWeight(ingredients.water.inDough),
      bakerPercentage: calculateBakerPercentage(ingredients.water.inDough, ingredients.flour.total),
    });
  }

  mainDoughIngredients.push({
    name: 'Salt',
    amount: formatWeight(ingredients.salt),
    bakerPercentage: calculateBakerPercentage(ingredients.salt, ingredients.flour.total),
  });

  if (ingredients.yeast.inDough > 0) {
    mainDoughIngredients.push({
      name: 'Yeast',
      amount: formatWeight(ingredients.yeast.inDough),
      bakerPercentage: calculateBakerPercentage(ingredients.yeast.inDough, ingredients.flour.total),
    });
  }

  if (ingredients.sugar !== undefined) {
    mainDoughIngredients.push({
      name: 'Sugar',
      amount: formatWeight(ingredients.sugar),
      bakerPercentage: calculateBakerPercentage(ingredients.sugar, ingredients.flour.total),
    });
  }

  if (ingredients.fat !== undefined) {
    mainDoughIngredients.push({
      name: 'Oil/Fat',
      amount: formatWeight(ingredients.fat),
      bakerPercentage: calculateBakerPercentage(ingredients.fat, ingredients.flour.total),
    });
  }

  return (
    <RecipeSection title="Main Dough">
      <IngredientList ingredients={mainDoughIngredients} />
    </RecipeSection>
  );
}
