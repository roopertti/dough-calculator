# Bread Dough Calculator

A React web application that calculates bread dough recipes using baker's percentages. Perfect for home bakers who want precise, scalable recipes with professional accuracy.

## Features

- **6 Dough Types**: Bread, Pizza, Baguette, Bagel, Focaccia, and Ciabatta
- **Adjustable Hydration**: Customize water percentage with recommended ranges for each dough type
- **Preferment Support**: Add poolish, biga, or sourdough starter to your recipes
- **Baker's Percentages**: All ingredients calculated as percentages of flour weight
- **Real-time Calculations**: Recipe updates instantly as you adjust parameters
- **Fermentation Instructions**: Timing guidance for preferments, bulk fermentation, and cold fermentation options
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:5173

# Build
npm run build        # TypeScript compilation + production build

# Code Quality
npm run lint         # Check for linting issues (Biome)
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Biome

# Preview
npm run preview      # Preview production build locally
```

## How to Use

1. **Select a Dough Type**: Choose from bread, pizza, baguette, bagel, focaccia, or ciabatta
2. **Enter Flour Weight**: Input your desired flour amount in grams (100-5000g)
3. **Adjust Hydration**: Use the slider to fine-tune water percentage
4. **Add Preferment (Optional)**: Click "Add Preferment" to include poolish, biga, or sourdough starter
5. **View Recipe**: Your calculated recipe appears in real-time with all ingredients and baking instructions

## Baker's Percentages Explained

Baker's percentages express each ingredient as a percentage of the total flour weight:
- Flour = 100%
- Water = 65% means 650g water per 1000g flour
- Salt = 2% means 20g salt per 1000g flour

This system makes it easy to scale recipes up or down while maintaining the same ratios.

## Dough Type Presets

Each dough type has specific hydration ranges and ingredient percentages:

| Dough Type | Hydration Range | Salt | Yeast | Other Ingredients |
|------------|-----------------|------|-------|-------------------|
| **Bread** | 60-75% (default 65%) | 2% | 1.5% | - |
| **Pizza** | 55-70% (default 65%) | 2.5% | 0.5% | 2% oil |
| **Baguette** | 65-75% (default 70%) | 2% | 1% | - |
| **Bagel** | 50-60% (default 55%) | 2% | 2% | 4% sugar |
| **Focaccia** | 70-85% (default 75%) | 2% | 1.5% | 8% oil |
| **Ciabatta** | 75-85% (default 80%) | 2% | 0.8% | - |

### Preferment Options

- **Poolish**: 100% hydration, 0.1% yeast, 12-16 hour fermentation
- **Biga**: 60% hydration, 0.1% yeast, 12-16 hour fermentation
- **Sourdough**: 100% hydration (assumed), 10% starter (of preferment flour), 4-8 hour fermentation

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **StyleX** - Meta's atomic CSS-in-JS library with compile-time CSS generation
- **Biome** - Fast linter and formatter (replaces ESLint + Prettier)

## Project Architecture

The project follows a clean, feature-based architecture with strict separation of concerns:

### Directory Structure

```
src/
├── components/              # Reusable UI components (with styling)
│   └── ui/                 # Styled components using StyleX
│       ├── Button/
│       ├── Card/
│       ├── Header/
│       ├── Footer/
│       ├── Input/
│       ├── Slider/
│       └── ...
├── features/               # Domain-specific feature modules
│   └── dough-calculator/
│       ├── components/     # Feature-specific components (no styling)
│       ├── context/        # React Context providers
│       └── hooks/          # Custom React hooks
├── data/                   # Static data and presets
├── styles/                 # StyleX design tokens
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions and calculations
```

### Component Architecture

The project uses a **two-layer component structure**:

1. **UI Components** (`src/components/ui/`)
   - Encapsulate all styling logic using StyleX
   - Provide reusable, styled building blocks
   - Export both component and type definitions
   - Examples: Button, Card, Input, Slider, Header, Footer

2. **Feature Components** (`src/features/dough-calculator/`)
   - Contain business logic and domain-specific behavior
   - Compose UI components without any styling code
   - No StyleX imports - purely compositional
   - Examples: DoughTypeSelector, RecipeInputs, RecipeDisplay

**Philosophy**: Feature components should only use UI components as building blocks. All styling concerns are hidden within UI components.

### State Management

- **Custom Hook Pattern**: `useDoughCalculator` hook manages all calculator state
- **Context Pattern**: `DoughCalculatorContext` provides state to components without prop drilling
- **Calculated Values**: Recipes recalculate automatically using `useMemo` when inputs change

### Path Aliases

The project uses TypeScript path aliases to avoid long relative imports:

```typescript
import { Button, Input } from '@ui';           // src/components/ui/
import type { DoughType } from '@types';       // src/types/
import { calculateRecipe } from '@utils/calculations';  // src/utils/
import { DOUGH_PRESETS } from '@data/doughPresets';    // src/data/
```

See `CLAUDE.md` for complete alias documentation.

## Styling System

The project uses **StyleX** with a centralized design token system:

### Design Tokens (`src/styles/tokens.stylex.ts`)

- **Colors**: 12 tokens (primary, accent, backgrounds, text, borders)
- **Spacing**: 5 tokens (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)
- **Border Radius**: 3 tokens (sm: 4px, md: 8px, lg: 12px)
- **Breakpoints**: Mobile-first responsive design

### Styling Rules

- All styling logic in `src/components/ui/`
- Feature components use UI components as building blocks
- Design tokens provide consistency and type safety
- StyleX generates atomic CSS at build time for optimal bundle size

## Baker's Percentages Explained

Baker's percentages express each ingredient as a percentage of the total flour weight:
- **Flour** = 100% (always)
- **Water** = 65% means 650g water per 1000g flour
- **Salt** = 2% means 20g salt per 1000g flour

This system makes it easy to scale recipes up or down while maintaining the same ratios. It's the professional standard in bakeries worldwide.

## CI/CD

The project uses **GitHub Actions** for continuous integration:

- **Quality Checks**: Runs on Node.js 20, 22, 24 (matrix testing)
  - Linting (Biome)
  - Type checking (TypeScript)
  - Build verification
  - Code formatting checks

- **Dependency Audit**: Security vulnerability scanning
- **Deployment**: Automatic deployment to GitHub Pages on push to main

## Contributing

For detailed development guidelines, see `CLAUDE.md` which includes:
- Complete path alias reference
- Component creation guidelines
- StyleX usage patterns
- Code standards and best practices

## License

MIT
