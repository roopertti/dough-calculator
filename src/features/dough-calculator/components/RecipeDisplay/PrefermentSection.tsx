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

  if (ingredients.starterBreakdown) {
    // Display sourdough starter breakdown
    prefermentIngredients.push({
      name: 'Flour (for starter)',
      amount: formatWeight(ingredients.starterBreakdown.flour),
      bakerPercentage: calculateBakerPercentage(
        ingredients.starterBreakdown.flour,
        ingredients.flour.total
      ),
    });
    prefermentIngredients.push({
      name: 'Water (for starter)',
      amount: formatWeight(ingredients.starterBreakdown.water),
      bakerPercentage: calculateBakerPercentage(
        ingredients.starterBreakdown.water,
        ingredients.flour.total
      ),
    });
    prefermentIngredients.push({
      name: 'Active Starter',
      amount: formatWeight(ingredients.starterBreakdown.starter),
      bakerPercentage: calculateBakerPercentage(
        ingredients.starterBreakdown.starter,
        ingredients.flour.total
      ),
    });
  } else if (ingredients.starter !== undefined) {
    // Fallback for old format (shouldn't happen with new calculations)
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
