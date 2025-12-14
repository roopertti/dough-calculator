import { DOUGH_PRESETS } from '@data/doughPresets';
import type { DoughType } from '@types';
import { Card, CardContent, Grid } from '@ui';

interface DoughTypeSelectorProps {
  selectedType: DoughType;
  onSelect: (type: DoughType) => void;
}

export default function DoughTypeSelector({ selectedType, onSelect }: DoughTypeSelectorProps) {
  const doughTypes = Object.values(DOUGH_PRESETS);

  return (
    <Grid columns="auto-fit" minColumnWidth="200px" gap="md">
      {doughTypes.map((preset) => {
        const isEnabled = preset.enabled !== false;
        const badge = isEnabled ? `${preset.defaultHydration}% hydration` : 'Coming soon';

        return (
          <Card
            key={preset.id}
            selected={selectedType === preset.id && isEnabled}
            onClick={isEnabled ? () => onSelect(preset.id) : undefined}
            variant="interactive"
            disabled={!isEnabled}
          >
            <CardContent title={preset.name} description={preset.description} badge={badge} />
          </Card>
        );
      })}
    </Grid>
  );
}
