# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React web application that calculates bread dough recipes using baker's percentages. The app supports multiple dough types (bread, pizza, baguette, bagel, focaccia, ciabatta) with adjustable hydration and optional preferments (poolish, biga, sourdough).

**Core Concept**: Baker's percentages express all ingredients as percentages of flour weight (flour = 100%). This allows recipes to scale while maintaining proper ratios.

## Project Structure

```
src/
├── components/           # Reusable UI components (with styling)
│   └── ui/              # Styled components using StyleX
├── features/            # Domain-specific feature modules
│   └── dough-calculator/
│       ├── components/  # Feature-specific components (no styling)
│       ├── context/     # React Context providers
│       └── hooks/       # Custom React hooks
├── data/                # Static data and presets
├── styles/              # StyleX design tokens
├── types/               # TypeScript type definitions
└── utils/               # Utility functions and calculations
```

## Path Aliases

The project uses TypeScript path aliases to avoid long relative imports. These are configured in `tsconfig.app.json` and `vite.config.ts`.

### Available Aliases

| Alias | Path | Usage Example |
|-------|------|---------------|
| `@/*` | `src/*` | `import { App } from '@/App'` |
| `@components/*` | `src/components/*` | `import { Button } from '@components/ui/Button'` |
| `@ui` | `src/components/ui/` | `import { Button, Card } from '@ui'` |
| `@features/*` | `src/features/*` | `import { DoughCalculator } from '@features/dough-calculator'` |
| `@styles/*` | `src/styles/*` | `import { colors } from '@styles/tokens.stylex'` |
| `@types` | `src/types/` | `import type { DoughType } from '@types'` |
| `@utils/*` | `src/utils/*` | `import { formatWeight } from '@utils/formatters'` |
| `@data/*` | `src/data/*` | `import { DOUGH_PRESETS } from '@data/doughPresets'` |

### Usage Guidelines

**Always use aliases instead of relative imports:**

```typescript
// ✅ Good - Using aliases
import { Button, Input } from '@ui';
import type { DoughType } from '@types';
import { calculateRecipe } from '@utils/calculations';

// ❌ Bad - Relative imports
import { Button, Input } from '../../../../components/ui';
import type { DoughType } from '../../../../types/dough';
import { calculateRecipe } from '../../utils/calculations';
```

**Exception**: StyleX token imports require relative paths due to babel plugin limitations:
```typescript
// StyleX tokens must use relative paths
import { colors, spacing } from '../../../styles/tokens.stylex';
```

## Development Commands

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

## Architecture

### Data Flow

The app follows a unidirectional data flow with React Context:

1. **User Input** → `RecipeInputs` captures flour weight, hydration %, and preferment options
2. **State Management** → `useDoughCalculator` custom hook manages all calculator state
3. **Context Distribution** → `DoughCalculatorContext` provides state to all child components
4. **Calculation** → `utils/calculations.ts` computes ingredient amounts using baker's percentages
5. **Display** → `RecipeDisplay` shows calculated ingredients split between preferment and main dough

### Core Calculation Logic

Located in `src/utils/calculations.ts`:

**Simple Recipe (no preferment)**:
```
Water = Flour × (Hydration% / 100)
Salt = Flour × (SaltPercentage / 100)
Yeast = Flour × (YeastPercentage / 100)
```

**With Preferment**:
- Flour and water split between preferment and main dough
- Total hydration maintained across both parts
- Yeast distributed (poolish/biga) or omitted (sourdough)
- For sourdough: starter amount calculated, assumes 100% hydration

### Component Architecture

**Two-Layer Component Structure**:

1. **UI Components** (`src/components/ui/`)
   - Encapsulate all styling logic using StyleX
   - Provide reusable, styled building blocks
   - Export both component and type definitions
   - Examples: Button, Card, Input, Slider, Container, Section, Grid

2. **Feature Components** (`src/features/dough-calculator/`)
   - Contain business logic and domain-specific behavior
   - Compose UI components without any styling code
   - No StyleX imports - purely compositional
   - Examples: DoughTypeSelector, RecipeInputs, RecipeDisplay

**Philosophy**: Feature components should only use UI components as building blocks. All styling concerns are hidden within UI components.

### State Management

**Custom Hook Pattern** (`src/features/dough-calculator/hooks/useDoughCalculator.ts`):
- Centralized state management for all calculator inputs
- Manages: `selectedDoughType`, `flourWeight`, `hydration`, `preferment`
- Automatically recalculates recipe using `useMemo` when inputs change
- Provides setter functions and reset action

**Context Pattern** (`src/features/dough-calculator/context/DoughCalculatorContext.tsx`):
- Wraps custom hook in React Context
- Eliminates prop drilling across component tree
- All components access state via `useDoughCalculatorContext()` hook

**Usage Example**:
```typescript
// In component
const { selectedDoughType, setSelectedDoughType, recipe } = useDoughCalculatorContext();
```

### Type System

All types defined in `src/types/dough.ts`:

**Key Interfaces**:
- `DoughPreset`: Configuration for each dough type (hydration ranges, percentages, baking specs)
- `RecipeInputs`: User selections (type, flour weight, hydration, preferment)
- `IngredientAmounts`: Calculated weights split between `inDough` and `inPreferment`
- `CalculatedRecipe`: Complete output with ingredients, instructions, total weight

Ingredients track three values: `total`, `inDough`, `inPreferment` to support preferment splitting.

## Extending the Application

### Adding New Dough Types

1. Add type to `DoughType` union in `src/types/dough.ts`
2. Add preset configuration in `src/data/doughPresets.ts` with:
   - Hydration range (min/max)
   - Salt, yeast, sugar, fat percentages
   - Fermentation information (preferment time, bulk ferment time, cold fermentation options)
3. Component automatically renders new type (no UI changes needed)

### Adding New UI Components

When creating new styled components in `src/components/ui/`:

1. **Create component file** with StyleX styling
2. **Import design tokens** from `src/styles/tokens.stylex.ts`
3. **Export both component and type** in the component file
4. **Add exports** to `src/components/ui/index.ts`
5. **Use proper className merging** pattern:
   ```typescript
   const stylexProps = stylex.props(styles.component);
   return (
     <div
       {...stylexProps}
       className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
     >
       {children}
     </div>
   );
   ```

### Modifying Feature Components

When working with feature components in `src/features/`:

1. **Never import StyleX** - feature components should be style-agnostic
2. **Use UI components** for all visual elements
3. **Access state** via `useDoughCalculatorContext()` hook
4. **Keep business logic** separate from presentation
5. **Composition over styling** - build features by composing UI components

Example:
```typescript
// ✅ Good - Composing UI components
import { Section, Grid, Card } from '../../../../components/ui';

export default function MyFeature() {
  const { data } = useDoughCalculatorContext();
  return (
    <Section title="My Feature">
      <Grid columns="auto-fit" gap="md">
        <Card>{data}</Card>
      </Grid>
    </Section>
  );
}

// ❌ Bad - Direct styling
import * as stylex from '@stylexjs/stylex';
const styles = stylex.create({ ... });
```

## Styling

**StyleX** - Meta's atomic CSS-in-JS library with compile-time CSS generation

### Design Token System

All design tokens centralized in `src/styles/tokens.stylex.ts`:

**Color Tokens** (12 tokens):
- Primary colors: `primary`, `primaryDark`, `primaryLight`
- Accent colors: `accent`, `accentLight`
- Background colors: `bgPrimary`, `bgSecondary`
- Text colors: `textPrimary`, `textSecondary`
- Border colors: `border`, `borderLight`, `borderDark`
- Theme: Brown/tan palette fitting bread theme

**Spacing Tokens** (5 tokens):
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)

**Border Radius** (3 tokens):
- `sm`: 4px
- `md`: 8px
- `lg`: 12px

**Responsive Breakpoints**:
- `mobile`: @media (max-width: 768px)

### StyleX Usage

**In UI Components Only**:
```typescript
import * as stylex from '@stylexjs/stylex';
import { colors, spacing, radius } from '../../../styles/tokens.stylex';

const styles = stylex.create({
  button: {
    padding: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
  },
});

export default function Button() {
  const stylexProps = stylex.props(styles.button);
  return <button {...stylexProps} />;
}
```

**Feature components must NOT import StyleX** - they should only compose UI components.

### Styling Rules

- All styling logic encapsulated in `src/components/ui/`
- Feature components use UI components as building blocks
- Design tokens provide consistency and type safety
- StyleX generates atomic CSS at build time for optimal bundle size
- All buttons must have `type="button"` (Biome enforces this for accessibility)

## Code Standards

- **Linter**: Biome (not ESLint)
- **Formatting**: Single quotes, 2 spaces, 100 char line width
- **Type Safety**: Explicit types required, `any` triggers warning
- **Accessibility**: Button types required, labels must be associated with inputs
- **Number Checks**: Use `Number.isNaN()` not `isNaN()` (Biome enforces)

## Units

All calculations use **metric only** (grams). This is a deliberate design decision for accuracy. Temperatures in Fahrenheit (can be changed in presets if needed).

## UI Component Library

Available styled components in `src/components/ui/`:

**Form Components**:
- `Button`: Primary, secondary, text variants with fullWidth option
- `Input`: Text input with label and helper text
- `Slider`: Range slider with label and value display
- `RadioGroup`: Radio button group with label

**Layout Components**:
- `Container`: Responsive container with maxWidth ('sm'|'md'|'lg'|'xl') and padding options
- `Section`: Content section with optional title and variant ('default'|'elevated')
- `Grid`: CSS Grid with auto-fit columns and configurable gap

**Content Components**:
- `Card`: Interactive card with selected state and hover effects
- `CardContent`: Card content with title, description, and badge
- `Heading`: Headings (h1-h6) with configurable margins
- `RecipeSection`: Recipe section with title and bottom border separator
- `TotalWeight`: Styled total weight display box
- `TimingNote`: Timing note with accent left border
- `InstructionText`: Instruction text with optional bold label
- `ControlSection`: Control section with background styling

**Usage**: Import from `src/components/ui/index.ts` which exports all components and their types.

## Important Constraints

- Flour weight: 100-5000g (validation in RecipeInputs)
- Hydration: Range varies by dough type (enforced by preset)
- Preferment flour: 10-50% of total flour
- All percentages rounded to 1 decimal place for display
- Calculations maintain full precision until final display
