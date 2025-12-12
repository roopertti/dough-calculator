import type { PrefermentType } from '@types';
import { Slider } from '@ui';

interface PrefermentFlourSliderProps {
  value: number;
  onChange: (percentage: number) => void;
  prefermentType: PrefermentType;
}

export default function PrefermentFlourSlider({
  value,
  onChange,
  prefermentType,
}: PrefermentFlourSliderProps) {
  const handleChange = (newValue: number) => {
    if (newValue >= 10 && newValue <= 50) {
      onChange(newValue);
    }
  };

  const label = prefermentType === 'sourdough' ? 'Starter (% of flour):' : 'Flour in Preferment:';

  return (
    <Slider
      id="prefermentFlour"
      label={label}
      value={value}
      onChange={handleChange}
      min={10}
      max={50}
      step={1}
      unit="%"
    />
  );
}
