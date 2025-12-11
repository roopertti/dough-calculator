import { Section } from '@ui';
import { useDoughCalculatorContext } from '../../context/DoughCalculatorContext';
import FlourWeightInput from './FlourWeightInput';
import HydrationSlider from './HydrationSlider';
import PrefermentControls from './PrefermentControls/PrefermentControls';

export default function RecipeInputs() {
  const {
    selectedDoughType,
    flourWeight,
    setFlourWeight,
    hydration,
    setHydration,
    preferment,
    setPreferment,
  } = useDoughCalculatorContext();

  return (
    <Section title="Recipe Parameters" variant="elevated">
      <FlourWeightInput value={flourWeight} onChange={setFlourWeight} />
      <HydrationSlider value={hydration} onChange={setHydration} doughType={selectedDoughType} />
      <PrefermentControls preferment={preferment} onChange={setPreferment} />
    </Section>
  );
}
