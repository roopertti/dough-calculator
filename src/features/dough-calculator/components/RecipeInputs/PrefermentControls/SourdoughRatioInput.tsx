import type { SourdoughRatio } from '@types';
import { Input } from '@ui';

interface SourdoughRatioInputProps {
  ratio: SourdoughRatio;
  onChange: (ratio: SourdoughRatio) => void;
}

export default function SourdoughRatioInput({ ratio, onChange }: SourdoughRatioInputProps) {
  const handleFlourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 1;
    onChange({ ...ratio, flour: Math.max(0.1, value) });
  };

  const handleWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 1;
    onChange({ ...ratio, water: Math.max(0.1, value) });
  };

  const handleStarterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value) || 1;
    onChange({ ...ratio, starter: Math.max(0.1, value) });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <Input
        id="sourdough-ratio-flour"
        label="Flour"
        type="number"
        value={ratio.flour}
        onChange={handleFlourChange}
        min={0.1}
        step={0.5}
        helperText="Parts flour"
      />
      <Input
        id="sourdough-ratio-water"
        label="Water"
        type="number"
        value={ratio.water}
        onChange={handleWaterChange}
        min={0.1}
        step={0.5}
        helperText="Parts water"
      />
      <Input
        id="sourdough-ratio-starter"
        label="Starter"
        type="number"
        value={ratio.starter}
        onChange={handleStarterChange}
        min={0.1}
        step={0.5}
        helperText="Parts starter"
      />
    </div>
  );
}
