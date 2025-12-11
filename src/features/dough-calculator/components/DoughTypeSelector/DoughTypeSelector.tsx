import { DOUGH_PRESETS } from '@data/doughPresets';
import type { DoughType } from '@types';
import { Card, CardContent, Grid, Section } from '@ui';

interface DoughTypeSelectorProps {
  selectedType: DoughType;
  onSelect: (type: DoughType) => void;
}

export default function DoughTypeSelector({ selectedType, onSelect }: DoughTypeSelectorProps) {
  const doughTypes = Object.values(DOUGH_PRESETS);

  return (
    <Section title="Select Dough Type">
      <Grid columns="auto-fit" minColumnWidth="200px" gap="md">
        {doughTypes.map((preset) => (
          <Card
            key={preset.id}
            selected={selectedType === preset.id}
            onClick={() => onSelect(preset.id)}
            variant="interactive"
          >
            <CardContent
              title={preset.name}
              description={preset.description}
              badge={`${preset.defaultHydration}% hydration`}
            />
          </Card>
        ))}
      </Grid>
    </Section>
  );
}
