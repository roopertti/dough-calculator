import { useEffect, useState } from 'react';
import { Input } from '@ui';

interface FlourWeightInputProps {
  value: number;
  onChange: (weight: number) => void;
}

const MIN_FLOUR = 100;
const MAX_FLOUR = 5000;

export default function FlourWeightInput({ value, onChange }: FlourWeightInputProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  // Sync input value when parent value changes (e.g., reset)
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const numValue = parseFloat(inputValue);

    if (Number.isNaN(numValue)) {
      // Reset to current valid value if input is invalid
      setInputValue(value.toString());
      return;
    }

    // Clamp value to valid range
    const clampedValue = Math.max(MIN_FLOUR, Math.min(MAX_FLOUR, numValue));
    setInputValue(clampedValue.toString());

    if (clampedValue !== value) {
      onChange(clampedValue);
    }
  };

  return (
    <Input
      id="flour"
      label="Flour Weight (g)"
      type="number"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      min={MIN_FLOUR}
      max={MAX_FLOUR}
      step={10}
    />
  );
}
