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
    <>
      <FlourWeightInput value={flourWeight} onChange={setFlourWeight} />
      <HydrationSlider value={hydration} onChange={setHydration} doughType={selectedDoughType} />
      <PrefermentControls preferment={preferment} onChange={setPreferment} />
    </>
  );
}
