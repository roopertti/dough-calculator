import type { DoughPreset, DoughType } from '../types/dough';

export const DOUGH_PRESETS: Record<DoughType, DoughPreset> = {
  bread: {
    id: 'bread',
    name: 'Basic Bread',
    description: 'Basic white or wheat bread with lean dough',
    defaultHydration: 70,
    hydrationRange: { min: 60, max: 75 },
    saltPercentage: 2.1,
    yeastPercentage: 0.4,
    sugarPercentage: 0,
    enabled: true,
    bakingInfo:
      'Bake inside a Dutch oven at 250°C for 20 minutes with the lid on, then remove the lid and bake for an additional 20 minutes at 230°C.',
  },
  pizza: {
    id: 'pizza',
    name: 'Pizza Dough',
    description: 'Neapolitan or NY-style pizza',
    defaultHydration: 65,
    hydrationRange: { min: 60, max: 70 },
    saltPercentage: 2.5,
    yeastPercentage: 0.5,
    fatPercentage: 2,
    enabled: false,
    bakingInfo:
      'Bake at 500°F (260°C) or higher for 8-12 minutes until crust is golden and cheese is bubbly. For best results, use a pizza stone or steel preheated for at least 45 minutes.',
  },
  baguette: {
    id: 'baguette',
    name: 'Baguette',
    description: 'Classic French baguette',
    defaultHydration: 70,
    hydrationRange: { min: 65, max: 75 },
    saltPercentage: 2,
    yeastPercentage: 1,
    enabled: false,
    bakingInfo:
      'Score the top with diagonal slashes. Bake at 475°F (245°C) with steam for 20-25 minutes until deeply golden. Steam during first 15 minutes is essential for proper crust development.',
  },
  bagel: {
    id: 'bagel',
    name: 'Bagels',
    description: 'Chewy boiled bagels',
    defaultHydration: 55,
    hydrationRange: { min: 50, max: 60 },
    saltPercentage: 2,
    yeastPercentage: 2,
    sugarPercentage: 4,
    enabled: false,
    bakingInfo:
      'Boil shaped bagels in water with malt syrup or honey for 1 minute per side. Bake at 425°F (220°C) for 20-25 minutes until golden brown. Add toppings after boiling, before baking.',
  },
  focaccia: {
    id: 'focaccia',
    name: 'Focaccia',
    description: 'Italian flatbread',
    defaultHydration: 75,
    hydrationRange: { min: 70, max: 85 },
    saltPercentage: 2,
    yeastPercentage: 1.5,
    fatPercentage: 8,
    enabled: false,
    bakingInfo:
      'Dimple the dough generously with fingertips, drizzle with olive oil, and add toppings. Bake at 425°F (220°C) for 20-25 minutes until golden on top and bottom. Let rest 5 minutes before cutting.',
  },
  ciabatta: {
    id: 'ciabatta',
    name: 'Ciabatta',
    description: 'High-hydration Italian bread',
    defaultHydration: 80,
    hydrationRange: { min: 75, max: 85 },
    saltPercentage: 2,
    yeastPercentage: 0.8,
    enabled: false,
    bakingInfo:
      'Handle gently to preserve air pockets. Bake at 450°F (230°C) with steam for 25-30 minutes until golden brown with an open crumb structure. Avoid degassing during shaping.',
  },
};
