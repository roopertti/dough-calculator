import type { DoughType, PrefermentConfig, RecipeInputs } from '@types';

export interface URLState extends Partial<RecipeInputs> {
  hideControls?: boolean;
}

export function serializeRecipeToUrl(inputs: RecipeInputs, hideRecipeControls?: boolean): string {
  const params = new URLSearchParams();

  if (hideRecipeControls) {
    params.set('hideControls', 'true');
  }

  params.set('type', inputs.doughType);
  params.set('flour', inputs.flourWeight.toString());
  params.set('hydration', inputs.hydration.toString());

  if (inputs.preferment && inputs.preferment.type !== 'none') {
    params.set('pref', inputs.preferment.type);
    params.set('prefFlour', inputs.preferment.flourPercentage.toString());

    // Only include ratio for sourdough
    if (inputs.preferment.type === 'sourdough') {
      if (inputs.preferment.sourdoughRatio) {
        const { flour, water, starter } = inputs.preferment.sourdoughRatio;
        params.set('ratio', `${flour},${water},${starter}`);
      }
    }
  }

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function deserializeRecipeFromUrl(): URLState | null {
  const params = new URLSearchParams(window.location.search);

  if (!params.has('type')) {
    return null;
  }

  const result: URLState = {};

  const hideControls = params.get('hideControls');
  if (hideControls) {
    result.hideControls = hideControls === 'true';
  }

  const type = params.get('type') as DoughType;
  if (type) result.doughType = type;

  const flour = params.get('flour');
  if (flour) result.flourWeight = Number.parseFloat(flour);

  const hydration = params.get('hydration');
  if (hydration) result.hydration = Number.parseFloat(hydration);

  const pref = params.get('pref');
  if (pref && pref !== 'none') {
    const prefermentType = pref as PrefermentConfig['type'];
    let preferment: PrefermentConfig;

    if (prefermentType === 'sourdough') {
      // For sourdough, read from URL or use defaults
      preferment = {
        type: 'sourdough',
        flourPercentage: Number.parseFloat(params.get('prefFlour') || '30'),
        hydration: 100,
        yeastPercentage: undefined,
        starterPercentage: 10,
        sourdoughRatio: { flour: 1, water: 1, starter: 1 },
      };

      const ratio = params.get('ratio');
      if (ratio) {
        const [flour, water, starter] = ratio.split(',').map((v) => Number.parseFloat(v));
        if (flour && water && starter) {
          preferment.sourdoughRatio = { flour, water, starter };
        }
      }
    } else if (prefermentType === 'poolish') {
      preferment = {
        type: 'poolish',
        flourPercentage: Number.parseFloat(params.get('prefFlour') || '30'),
        hydration: 100,
        yeastPercentage: 0.1,
        starterPercentage: undefined,
      };
    } else {
      preferment = {
        type: 'biga',
        flourPercentage: Number.parseFloat(params.get('prefFlour') || '30'),
        hydration: 60,
        yeastPercentage: 0.1,
        starterPercentage: undefined,
      };
    }

    result.preferment = preferment;
  }

  return result;
}
