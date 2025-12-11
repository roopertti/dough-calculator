import { DOUGH_PRESETS } from '@data/doughPresets';
import type { DoughType } from '@types';
import { Slider } from '@ui';

interface HydrationSliderProps {
  value: number;
  onChange: (hydration: number) => void;
  doughType: DoughType;
}

export default function HydrationSlider({ value, onChange, doughType }: HydrationSliderProps) {
  const preset = DOUGH_PRESETS[doughType];

  return (
    <Slider
      id="hydration"
      label="Hydration:"
      value={value}
      onChange={onChange}
      min={preset.hydrationRange.min}
      max={preset.hydrationRange.max}
      step={1}
      unit="%"
      helperText={`(recommended: ${preset.hydrationRange.min}-${preset.hydrationRange.max}%)`}
    />
  );
}
