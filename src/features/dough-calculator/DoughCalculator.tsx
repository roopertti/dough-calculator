import { Accordion, Button, Container, Stack } from '@ui';
import { useState } from 'react';
import CopyLinkButton from './components/CopyLinkButton/CopyLinkButton';
import DoughTypeSelector from './components/DoughTypeSelector/DoughTypeSelector';
import RecipeDisplay from './components/RecipeDisplay/RecipeDisplay';
import RecipeInputs from './components/RecipeInputs/RecipeInputs';
import {
  DoughCalculatorProvider,
  useDoughCalculatorContext,
} from './context/DoughCalculatorContext';

function DoughCalculatorContent() {
  const { selectedDoughType, setSelectedDoughType, recipe, reset, getURLStateParamValue } =
    useDoughCalculatorContext();
  const isControlsHidden = getURLStateParamValue('hideControls');

  const [isSettingsOpen, setIsSettingsOpen] = useState(!isControlsHidden);
  const [isRecipeOpen, setIsRecipeOpen] = useState(true);

  return (
    <Container maxWidth="xl" padding="lg">
      <Accordion
        title="Recipe Settings"
        isOpen={isSettingsOpen}
        onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
      >
        <DoughTypeSelector selectedType={selectedDoughType} onSelect={setSelectedDoughType} />
        <RecipeInputs />
      </Accordion>

      <Accordion
        title="Your Recipe"
        isOpen={isRecipeOpen}
        onToggle={() => setIsRecipeOpen(!isRecipeOpen)}
      >
        <RecipeDisplay recipe={recipe} />
      </Accordion>

      <Stack>
        <Button variant="secondary" fullWidth onClick={reset}>
          Reset to Defaults
        </Button>
        <CopyLinkButton />
      </Stack>
    </Container>
  );
}

export default function DoughCalculator() {
  return (
    <DoughCalculatorProvider>
      <DoughCalculatorContent />
    </DoughCalculatorProvider>
  );
}
