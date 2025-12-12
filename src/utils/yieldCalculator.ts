import type { YieldCalculation } from '@types';

export function calculateYield(flourWeight: number, yieldConfig?: YieldCalculation): string {
  if (!yieldConfig) {
    return '';
  }

  const pieces = Math.round(flourWeight / yieldConfig.gramsPerPiece);

  if (pieces === 0) {
    return `Less than 1 ${yieldConfig.unitName}`;
  }

  if (pieces === 1) {
    return `1 ${yieldConfig.unitName}`;
  }

  return `${pieces} ${yieldConfig.unitNamePlural}`;
}
