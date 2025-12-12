import { Button, Container, Stack } from '@ui';
import CopyLinkButton from './components/CopyLinkButton/CopyLinkButton';
import DoughTypeSelector from './components/DoughTypeSelector/DoughTypeSelector';
import RecipeDisplay from './components/RecipeDisplay/RecipeDisplay';
import RecipeInputs from './components/RecipeInputs/RecipeInputs';
import {
  DoughCalculatorProvider,
  useDoughCalculatorContext,
} from './context/DoughCalculatorContext';

function DoughCalculatorContent() {
  const { selectedDoughType, setSelectedDoughType, recipe, reset } = useDoughCalculatorContext();

  return (
    <Container maxWidth="xl" padding="lg">
      <DoughTypeSelector selectedType={selectedDoughType} onSelect={setSelectedDoughType} />
      <RecipeInputs />
      <RecipeDisplay recipe={recipe} />
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
