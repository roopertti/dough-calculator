import { Input } from '@ui';

interface FlourWeightInputProps {
  value: number;
  onChange: (weight: number) => void;
}

export default function FlourWeightInput({ value, onChange }: FlourWeightInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!Number.isNaN(newValue) && newValue >= 100 && newValue <= 5000) {
      onChange(newValue);
    }
  };

  return (
    <Input
      id="flour"
      label="Flour Weight (g)"
      type="number"
      value={value}
      onChange={handleChange}
      min={100}
      max={5000}
      step={10}
    />
  );
}
