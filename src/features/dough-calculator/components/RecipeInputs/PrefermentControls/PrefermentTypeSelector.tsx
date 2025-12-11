import type { PrefermentType } from '@types';
import type { RadioOption } from '@ui';
import { RadioGroup } from '@ui';

interface PrefermentTypeSelectorProps {
  value: PrefermentType;
  onChange: (type: PrefermentType) => void;
}

export default function PrefermentTypeSelector({ value, onChange }: PrefermentTypeSelectorProps) {
  const options: RadioOption[] = [
    { value: 'poolish', label: 'Poolish' },
    { value: 'biga', label: 'Biga' },
    { value: 'sourdough', label: 'Sourdough' },
  ];

  return (
    <RadioGroup
      name="prefermentType"
      label="Preferment Type"
      options={options}
      value={value}
      onChange={(val) => onChange(val as PrefermentType)}
    />
  );
}
