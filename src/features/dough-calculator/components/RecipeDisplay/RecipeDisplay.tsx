import { DOUGH_PRESETS } from '@data/doughPresets';
import type { CalculatedRecipe } from '@types';
import { InstructionText, RecipeSection, TotalWeight } from '@ui';
import { calculateYield } from '@utils/yieldCalculator';
import MainDoughSection from './MainDoughSection';
import PrefermentSection from './PrefermentSection';
import SimpleRecipeSection from './SimpleRecipeSection';

interface RecipeDisplayProps {
  recipe: CalculatedRecipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const { ingredients, bakingInstructions, totalDoughWeight, inputs } = recipe;
  const hasPreferment = inputs.preferment && inputs.preferment.type !== 'none';
  const doughPreset = DOUGH_PRESETS[inputs.doughType];
  const yieldText = calculateYield(inputs.flourWeight, doughPreset.yieldCalculation);

  console.log(bakingInstructions);

  return (
    <>
      <TotalWeight weight={totalDoughWeight} />
      {yieldText && <InstructionText label="Yield">{yieldText}</InstructionText>}

      {hasPreferment && (
        <>
          <PrefermentSection
            ingredients={ingredients}
            prefermentType={inputs.preferment?.type || ''}
            prefermentTime={bakingInstructions.prefermentTime}
          />
          <MainDoughSection ingredients={ingredients} />
        </>
      )}

      {!hasPreferment && <SimpleRecipeSection ingredients={ingredients} />}

      <RecipeSection title="Baking Instructions">
        {bakingInstructions.bulkFermentTime && (
          <InstructionText label="Bulk Fermentation">
            {bakingInstructions.bulkFermentTime}
          </InstructionText>
        )}
        {bakingInstructions.proofingTime && (
          <InstructionText label="Proofing time">{bakingInstructions.proofingTime}</InstructionText>
        )}
        {doughPreset.bakingInfo && (
          <InstructionText label="Baking">{doughPreset.bakingInfo}</InstructionText>
        )}
      </RecipeSection>
    </>
  );
}
