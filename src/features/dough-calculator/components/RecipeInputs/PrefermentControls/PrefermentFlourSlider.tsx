import { Slider } from '@ui';

interface PrefermentFlourSliderProps {
  value: number;
  onChange: (percentage: number) => void;
}

export default function PrefermentFlourSlider({ value, onChange }: PrefermentFlourSliderProps) {
  const handleChange = (newValue: number) => {
    if (newValue >= 10 && newValue <= 50) {
      onChange(newValue);
    }
  };

  return (
    <Slider
      id="prefermentFlour"
      label="Flour in Preferment:"
      value={value}
      onChange={handleChange}
      min={10}
      max={50}
      step={5}
      unit="%"
    />
  );
}
