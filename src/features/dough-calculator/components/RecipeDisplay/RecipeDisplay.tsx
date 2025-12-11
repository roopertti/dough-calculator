import type { CalculatedRecipe } from '@types';
import { InstructionText, RecipeSection, Section, TotalWeight } from '@ui';
import MainDoughSection from './MainDoughSection';
import PrefermentSection from './PrefermentSection';
import SimpleRecipeSection from './SimpleRecipeSection';

interface RecipeDisplayProps {
  recipe: CalculatedRecipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const { ingredients, bakingInstructions, totalDoughWeight, inputs } = recipe;
  const hasPreferment = inputs.preferment && inputs.preferment.type !== 'none';

  console.log(bakingInstructions);

  return (
    <Section title="Your Recipe" variant="elevated">
      <TotalWeight weight={totalDoughWeight} />

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
        {bakingInstructions.coldFermentationOptions && (
          <InstructionText label="Cold Fermentation Options">
            {bakingInstructions.coldFermentationOptions.join(', ')}
          </InstructionText>
        )}
      </RecipeSection>
    </Section>
  );
}
