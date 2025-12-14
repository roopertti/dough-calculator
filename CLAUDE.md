# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React web application that calculates bread dough recipes using baker's percentages. The app supports multiple dough types (bread, pizza, baguette, bagel, focaccia, ciabatta) with adjustable hydration and optional preferments (poolish, biga, sourdough).

**Core Concept**: Baker's percentages express all ingredients as percentages of flour weight (flour = 100%). This allows recipes to scale while maintaining proper ratios.

**Key Features**:
- **Adjustable sourdough ratios**: Customize flour:water:starter ratios for sourdough preferments
- **URL sharing**: Share recipes via URL parameters with copy-to-clipboard functionality
- **Yield calculations**: Automatic approximation of how many pieces (loaves, pizzas, etc.) the recipe will make
- **Dough-specific baking instructions**: Each dough type includes tailored baking guidance
- **Minimum yeast amounts**: Yeast is clamped to a minimum of 0.5g for practical measurement
- **Ingredient animations**: Visual feedback with background flash when ingredient values change
- **Collapsible accordions**: Organize content into expandable sections with smooth slide animations
- **Smart URL detection**: Auto-collapses settings when navigating via shared link

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
Yeast = max(Flour × (YeastPercentage / 100), 0.5g)  // Minimum 0.5g
```

**With Preferment (Poolish/Biga)**:
- Flour and water split between preferment and main dough
- Total hydration maintained across both parts
- Yeast distributed between preferment and main dough
- Each yeast portion has minimum 0.5g

**With Sourdough** (special handling):
- **Starter is an additional ingredient** - NOT split from main dough flour/water
- Flour and water amounts are the full recipe amounts (user-specified hydration)
- Starter amount = Flour × (StarterPercentage / 100) × (ratio.starter / ratio.flour)
- Starter breakdown calculated based on customizable flour:water:starter ratio
- No commercial yeast in sourdough recipes
- Default ratio is 1:1:1 (equal parts flour, water, and active starter)

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
- Provides setter functions, reset action, and `getShareableUrl()`
- **URL State Synchronization**:
  - Reads initial state from URL parameters on page load
  - Automatically updates URL when any setting changes (using `history.replaceState`)
  - Enables recipe sharing via URL links

**Context Pattern** (`src/features/dough-calculator/context/DoughCalculatorContext.tsx`):
- Wraps custom hook in React Context
- Eliminates prop drilling across component tree
- All components access state via `useDoughCalculatorContext()` hook

**Usage Example**:
```typescript
// In component
const { selectedDoughType, setSelectedDoughType, recipe, getShareableUrl } = useDoughCalculatorContext();
```

### Type System

All types defined in `src/types/dough.ts`:

**Key Interfaces**:
- `DoughPreset`: Configuration for each dough type (hydration ranges, percentages, baking specs, yield calculations)
  - Optional fields: `enabled`, `bakingInfo`, `yieldCalculation`
- `RecipeInputs`: User selections (type, flour weight, hydration, preferment)
- `PrefermentConfig`: Preferment configuration including optional `sourdoughRatio`
- `SourdoughRatio`: Customizable flour:water:starter ratio for sourdough (default 1:1:1)
- `IngredientAmounts`: Calculated weights split between `inDough` and `inPreferment`
  - Includes optional `starter` and `starterBreakdown` for sourdough
- `StarterBreakdown`: Breakdown of sourdough starter into flour, water, and active starter components
- `YieldCalculation`: Configuration for calculating recipe yield (gramsPerPiece, unitName, unitNamePlural)
- `CalculatedRecipe`: Complete output with ingredients, instructions, total weight

Ingredients track three values: `total`, `inDough`, `inPreferment` to support preferment splitting.

For sourdough, `starterBreakdown` provides the components needed to build/feed the starter.

## Extending the Application

### Adding New Dough Types

1. Add type to `DoughType` union in `src/types/dough.ts`
2. Add preset configuration in `src/data/doughPresets.ts` with:
   - Hydration range (min/max)
   - Salt, yeast, sugar, fat percentages
   - `enabled: true` to make it available (or `false` for "Coming soon" state)
   - `bakingInfo`: Specific baking instructions for this dough type
   - `yieldCalculation`: Configuration for yield approximation
     - `gramsPerPiece`: Flour weight per piece (e.g., 500g for bread loaf)
     - `unitName`: Singular form (e.g., "loaf", "pizza")
     - `unitNamePlural`: Plural form (e.g., "loaves", "pizzas")
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

**Animation Timing Tokens** (3 tokens):
- `durationFast`: 0.15s (150ms)
- `durationNormal`: 0.3s (300ms)
- `durationSlow`: 0.5s (500ms)

**Animation Easing Tokens** (3 tokens):
- `standard`: cubic-bezier(0.4, 0.0, 0.2, 1) - Material Design standard
- `decelerate`: cubic-bezier(0.0, 0.0, 0.2, 1) - Deceleration curve
- `accelerate`: cubic-bezier(0.4, 0.0, 1, 1) - Acceleration curve

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
- `Collapsible`: Smooth height-based slide animation wrapper with opacity transition
- `Accordion`: Collapsible section with clickable header, title, and rotating chevron icon

**Content Components**:
- `Card`: Interactive card with selected state, hover effects, and disabled state
  - `disabled` prop prevents interaction and shows "Coming soon" badge
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
- Preferment flour: 10-50% of total flour (for poolish/biga)
- Sourdough starter: 10-50% of total flour weight
- Yeast: Minimum 0.5g per portion (for practical measurement)
- All percentages rounded to 1 decimal place for display
- Calculations maintain full precision until final display

## URL State Sharing

The app supports sharing recipes via URL parameters (`src/utils/urlState.ts`):

**URL Parameters**:
- `type`: Dough type (bread, pizza, etc.)
- `flour`: Flour weight in grams
- `hydration`: Hydration percentage
- `pref`: Preferment type (poolish, biga, sourdough)
- `prefFlour`: Preferment flour percentage (included for all preferment types)
- `ratio`: Sourdough ratio as comma-separated values (e.g., "1,1,1") - **sourdough only**
- `hideControls`: Boolean flag to auto-collapse Recipe Settings accordion

**Important Notes**:
- Poolish and biga **always use fixed defaults** for hydration and yeast (cannot be manipulated via URL)
  - Poolish: 100% hydration, 0.1% yeast
  - Biga: 60% hydration, 0.1% yeast
- All preferments have customizable `prefFlour` parameter in the URL.
- Only sourdough includes customizable `ratio` parameter in the URL
- If URL is shared to someone, the Recipe Settings accordion auto-collapses

**Implementation**:
- `serializeRecipeToUrl()`: Converts current state to URL
- `deserializeRecipeFromUrl()`: Reads URL params and restores state
- URL updates automatically when settings change (via `useEffect` in `useDoughCalculator`)
- `CopyLinkButton` component provides one-click sharing with clipboard API

## Yield Calculations

Automatic approximation of how many pieces the recipe will make (`src/utils/yieldCalculator.ts`):

**Current Yield Configurations**:
- Bread: 500g flour per loaf
- Pizza: 275g flour per pizza
- Baguette: 250g flour per baguette
- Bagel: 90g flour per bagel
- Focaccia: 500g flour per sheet
- Ciabatta: 500g flour per loaf

**Display Logic**:
- Less than 1 piece: "Less than 1 loaf"
- Exactly 1 piece: "1 loaf"
- Multiple pieces: "2 loaves" (uses plural form)

## Sourdough Features

Special handling for sourdough preferments:

**Adjustable Ratios** (`SourdoughRatioInput` component):
- Default ratio: 1:1:1 (flour:water:starter)
- User can customize each value independently
- Minimum 0.1 for each component
- Examples:
  - 1:1:1 = equal parts (300g starter for 300g preferment flour)
  - 5:5:1 = less starter (60g starter for 300g preferment flour)
  - 2:2:1 = moderate starter (150g starter for 300g preferment flour)

**Calculation Method**:
- Starter is **additional** to main dough (not split from it)
- Main dough uses full flour and water amounts
- Starter breakdown shown separately (flour, water, active starter components)
- No commercial yeast in sourdough recipes

**Display**:
- Preferment section shows three ingredients:
  - "Flour (for starter)" - flour needed to feed starter
  - "Water (for starter)" - water needed to feed starter
  - "Active Starter" - active starter from fridge

## Animations

The app includes smooth CSS-based animations using StyleX (no animation libraries):

**Ingredient Highlight Animation** (`src/features/dough-calculator/hooks/useIngredientChangeTracking.ts`):
- Detects when ingredient values change (amount or baker's percentage)
- Applies accent-colored background flash to changed ingredients
- Animation duration: 600ms (300ms fade in + 300ms fade out)
- Uses `useRef` to track previous values and avoid highlighting on initial render
- Automatically works across all recipe sections (simple, main dough, preferment)

**Collapsible/Accordion Animations** (`src/components/ui/Collapsible/Collapsible.tsx`):
- Height-based slide animation for expanding/collapsing content
- Combines height transition with opacity fade
- Uses `scrollHeight` measurement for smooth animations
- Sets height to `auto` after opening to allow dynamic content resizing
- Duration: 300ms with deceleration easing

**PrefermentControls Slide Animation**:
- Wraps controls in `Collapsible` component
- Smoothly slides down when "Add Preferment" is clicked
- Smoothly slides up when "Hide Preferment" is clicked

**Accordion Component** (`src/components/ui/Accordion/Accordion.tsx`):
- Combines clickable header with `Collapsible` content area
- Rotating chevron icon (180deg rotation)
- Section-style header with hover effects
- Keyboard accessible (Enter/Space to toggle)
- ARIA attributes for screen readers

**Animation Tokens**:
All animations use centralized timing tokens from `tokens.stylex.ts` for consistency:
- `animations.durationFast`, `animations.durationNormal`, `animations.durationSlow`
- `easing.standard`, `easing.decelerate`, `easing.accelerate`

## Accordions

The main app layout uses accordion components to organize content (`src/features/dough-calculator/DoughCalculator.tsx`):

**Recipe Settings Accordion**:
- Contains: `DoughTypeSelector` and `RecipeInputs`
- Default: Open on direct page visit
- Auto-closes when navigating via shared URL (uses `hideControls` URL param)

**Your Recipe Accordion**:
- Contains: `RecipeDisplay` with calculated recipe
- Default: Always open

**Implementation Details**:
- State managed in `DoughCalculatorContent` component
- Uses `Accordion` UI component for visual presentation
- URL detection via `URLSearchParams` on component mount
- Child components (DoughTypeSelector, RecipeInputs, RecipeDisplay) have Section wrappers removed
- Section titles moved to Accordion `title` props

## Version Display

App version from `package.json` is displayed in the footer (`src/App.tsx`):
```typescript
import { version } from '../package.json';
// Footer displays: "Built with React + TypeScript + Vite | v1.0.0"
```
