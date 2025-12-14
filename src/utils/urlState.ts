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
    params.set('prefHydration', inputs.preferment.hydration.toString());

    if (inputs.preferment.yeastPercentage !== undefined) {
      params.set('prefYeast', inputs.preferment.yeastPercentage.toString());
    }

    if (inputs.preferment.sourdoughRatio) {
      const { flour, water, starter } = inputs.preferment.sourdoughRatio;
      params.set('ratio', `${flour},${water},${starter}`);
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
    const preferment: PrefermentConfig = {
      type: pref as PrefermentConfig['type'],
      flourPercentage: Number.parseFloat(params.get('prefFlour') || '30'),
      hydration: Number.parseFloat(params.get('prefHydration') || '100'),
    };

    const yeast = params.get('prefYeast');
    if (yeast) {
      preferment.yeastPercentage = Number.parseFloat(yeast);
    }

    const ratio = params.get('ratio');
    if (ratio && pref === 'sourdough') {
      const [flour, water, starter] = ratio.split(',').map((v) => Number.parseFloat(v));
      if (flour && water && starter) {
        preferment.sourdoughRatio = { flour, water, starter };
      }
    }

    result.preferment = preferment;
  }

  return result;
}
