import { createContext, useContext } from 'react';
import type { DoughCalculatorState } from '../hooks/useDoughCalculator';
import { useDoughCalculator } from '../hooks/useDoughCalculator';

const DoughCalculatorContext = createContext<DoughCalculatorState | null>(null);

export function DoughCalculatorProvider({ children }: { children: React.ReactNode }) {
  const doughCalculator = useDoughCalculator();

  return (
    <DoughCalculatorContext.Provider value={doughCalculator}>
      {children}
    </DoughCalculatorContext.Provider>
  );
}

export function useDoughCalculatorContext() {
  const context = useContext(DoughCalculatorContext);
  if (!context) {
    throw new Error('useDoughCalculatorContext must be used within DoughCalculatorProvider');
  }
  return context;
}
