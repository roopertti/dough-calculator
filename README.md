# Bread Dough Calculator

A React web application that calculates bread dough recipes using baker's percentages. Perfect for home bakers who want precise, scalable recipes.

## Features

- **6 Dough Types**: Bread, Pizza, Baguette, Bagel, Focaccia, and Ciabatta
- **Adjustable Hydration**: Customize water percentage with recommended ranges for each dough type
- **Preferment Support**: Add poolish, biga, or sourdough starter to your recipes
- **Baker's Percentages**: All ingredients calculated as percentages of flour weight
- **Real-time Calculations**: Recipe updates instantly as you adjust parameters
- **Baking Instructions**: Get temperature and time recommendations based on dough type

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

Dependencies are already installed. To start the application:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Linting and Formatting

The project uses Biome for fast linting and formatting:

```bash
# Check for linting issues
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Format code
npm run format
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

## Dough Type Defaults

- **Bread**: 65% hydration, 2% salt, 1.5% yeast, 375°F, 30-40 min
- **Pizza**: 65% hydration, 2.5% salt, 0.5% yeast, 2% oil, 500°F, 8-12 min
- **Baguette**: 70% hydration, 2% salt, 1% yeast, 450°F, 20-25 min
- **Bagel**: 55% hydration, 2% salt, 2% yeast, 4% sugar, 425°F, 18-22 min
- **Focaccia**: 75% hydration, 2% salt, 1.5% yeast, 8% oil, 425°F, 20-25 min
- **Ciabatta**: 80% hydration, 2% salt, 0.8% yeast, 425°F, 25-30 min

## Technology Stack

- React 18
- TypeScript
- Vite
- Biome (for linting and formatting)
- CSS Modules

## Project Structure

```
src/
├── components/        # React components
├── data/             # Dough presets configuration
├── types/            # TypeScript type definitions
├── utils/            # Calculation and formatting utilities
└── styles/           # Global CSS styles
```

## Future Enhancements

- Save/load recipes
- Print recipe view
- Ingredient scaling (2x, 3x batches)
- Imperial units support
- Multiple recipe comparison
- Fermentation timing calculator

## License

MIT
