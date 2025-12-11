import type { IngredientAmounts } from '@types';
import { RecipeSection, TimingNote } from '@ui';
import { calculateBakerPercentage, formatWeight } from '@utils/formatters';
import IngredientList, { type Ingredient } from './IngredientList';

interface PrefermentSectionProps {
  ingredients: IngredientAmounts;
  prefermentType: string;
  prefermentTime?: string;
}

export default function PrefermentSection({
  ingredients,
  prefermentType,
  prefermentTime,
}: PrefermentSectionProps) {
  const prefermentIngredients: Ingredient[] = [];

  if (ingredients.flour.inPreferment > 0) {
    prefermentIngredients.push({
      name: 'Flour',
      amount: formatWeight(ingredients.flour.inPreferment),
      bakerPercentage: calculateBakerPercentage(
        ingredients.flour.inPreferment,
        ingredients.flour.total
      ),
    });
  }

  if (ingredients.water.inPreferment > 0) {
    prefermentIngredients.push({
      name: 'Water',
      amount: formatWeight(ingredients.water.inPreferment),
      bakerPercentage: calculateBakerPercentage(
        ingredients.water.inPreferment,
        ingredients.flour.total
      ),
    });
  }

  if (ingredients.yeast.inPreferment > 0) {
    prefermentIngredients.push({
      name: 'Yeast',
      amount: formatWeight(ingredients.yeast.inPreferment),
      bakerPercentage: calculateBakerPercentage(
        ingredients.yeast.inPreferment,
        ingredients.flour.total
      ),
    });
  }

  if (ingredients.starter !== undefined) {
    prefermentIngredients.push({
      name: 'Sourdough Starter',
      amount: formatWeight(ingredients.starter),
      bakerPercentage: calculateBakerPercentage(ingredients.starter, ingredients.flour.total),
    });
  }

  return (
    <RecipeSection title={`Preferment (${prefermentType})`}>
      <IngredientList ingredients={prefermentIngredients} />
      {prefermentTime && <TimingNote>Ferment: {prefermentTime}</TimingNote>}
    </RecipeSection>
  );
}
