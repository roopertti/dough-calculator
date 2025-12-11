import type { PrefermentConfig, PrefermentType } from '@types';
import { Button, ControlSection } from '@ui';
import { useState } from 'react';
import PrefermentFlourSlider from './PrefermentFlourSlider';
import PrefermentTypeSelector from './PrefermentTypeSelector';

interface PrefermentControlsProps {
  preferment: PrefermentConfig | null;
  onChange: (preferment: PrefermentConfig | null) => void;
}

export default function PrefermentControls({ preferment, onChange }: PrefermentControlsProps) {
  const [showPreferment, setShowPreferment] = useState(false);

  const handleToggle = () => {
    const newShowPreferment = !showPreferment;
    setShowPreferment(newShowPreferment);

    if (newShowPreferment) {
      // Initialize with poolish by default when adding preferment
      onChange({
        type: 'poolish',
        flourPercentage: 30,
        hydration: 100,
        yeastPercentage: 0.1,
        starterPercentage: undefined,
      });
    } else {
      // Clear preferment when hiding
      onChange(null);
    }
  };

  const handlePrefermentTypeChange = (type: PrefermentType) => {
    const defaultHydration = type === 'poolish' ? 100 : type === 'biga' ? 60 : 100;
    onChange({
      type,
      flourPercentage: 30,
      hydration: defaultHydration,
      yeastPercentage: type === 'sourdough' ? undefined : 0.1,
      starterPercentage: type === 'sourdough' ? 20 : undefined,
    });
  };

  const handlePrefermentFlourChange = (percentage: number) => {
    if (preferment) {
      onChange({ ...preferment, flourPercentage: percentage });
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleToggle}>
        {showPreferment ? 'Hide' : 'Add'} Preferment
      </Button>

      {showPreferment && (
        <ControlSection>
          <PrefermentTypeSelector
            value={preferment?.type || 'poolish'}
            onChange={handlePrefermentTypeChange}
          />

          {preferment && (
            <PrefermentFlourSlider
              value={preferment.flourPercentage}
              onChange={handlePrefermentFlourChange}
            />
          )}
        </ControlSection>
      )}
    </div>
  );
}
