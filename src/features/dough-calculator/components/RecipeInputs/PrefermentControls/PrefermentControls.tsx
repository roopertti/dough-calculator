import type { PrefermentConfig, PrefermentType, SourdoughRatio } from '@types';
import { Button, ControlSection } from '@ui';
import { useState } from 'react';
import PrefermentFlourSlider from './PrefermentFlourSlider';
import PrefermentTypeSelector from './PrefermentTypeSelector';
import SourdoughRatioInput from './SourdoughRatioInput';

interface PrefermentControlsProps {
  preferment: PrefermentConfig | null;
  onChange: (preferment: PrefermentConfig | null) => void;
}

export default function PrefermentControls({ preferment, onChange }: PrefermentControlsProps) {
  // Show preferment controls if preferment is already set (e.g., from URL)
  const [showPreferment, setShowPreferment] = useState(
    preferment !== null && preferment.type !== 'none'
  );

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
      starterPercentage: type === 'sourdough' ? 10 : undefined,
      sourdoughRatio: type === 'sourdough' ? { flour: 1, water: 1, starter: 1 } : undefined,
    });
  };

  const handlePrefermentFlourChange = (percentage: number) => {
    if (preferment) {
      onChange({ ...preferment, flourPercentage: percentage });
    }
  };

  const handleSourdoughRatioChange = (ratio: SourdoughRatio) => {
    if (preferment) {
      onChange({ ...preferment, sourdoughRatio: ratio });
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
            <>
              <PrefermentFlourSlider
                value={preferment.flourPercentage}
                onChange={handlePrefermentFlourChange}
                prefermentType={preferment.type}
              />

              {preferment.type === 'sourdough' && preferment.sourdoughRatio && (
                <SourdoughRatioInput
                  ratio={preferment.sourdoughRatio}
                  onChange={handleSourdoughRatioChange}
                />
              )}
            </>
          )}
        </ControlSection>
      )}
    </div>
  );
}
