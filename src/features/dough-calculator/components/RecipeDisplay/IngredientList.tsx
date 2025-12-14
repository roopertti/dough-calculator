import * as stylex from '@stylexjs/stylex';
import { animations, colors, easing, radius, spacing } from '../../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations
import { useIngredientChangeTracking } from '../../hooks/useIngredientChangeTracking';

export interface Ingredient {
  name: string;
  amount: string;
  bakerPercentage: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
}

const styles = stylex.create({
  ingredientList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  ingredientItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing.sm} 0`,
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.borderLight,
    transition: `background-color ${animations.durationNormal} ${easing.standard}`,
    ':last-child': {
      borderBottomWidth: 0,
    },
  },
  highlighted: {
    backgroundColor: colors.accentLight,
    borderRadius: radius.sm,
    marginLeft: `-${spacing.sm}`,
    marginRight: `-${spacing.sm}`,
  },
  ingredient: {
    fontWeight: 500,
    color: colors.textPrimary,
  },
  amount: {
    fontWeight: 600,
    color: colors.textPrimary,
  },
  percentage: {
    marginLeft: spacing.sm,
    color: colors.textSecondary,
    fontWeight: 400,
    fontSize: '0.9rem',
  },
});

export default function IngredientList({ ingredients }: IngredientListProps) {
  const changedIngredients = useIngredientChangeTracking(ingredients);

  return (
    <ul {...stylex.props(styles.ingredientList)}>
      {ingredients.map((ingredient) => {
        const isHighlighted = changedIngredients.has(ingredient.name);

        return (
          <li
            key={ingredient.name}
            {...stylex.props(styles.ingredientItem, isHighlighted && styles.highlighted)}
          >
            <span {...stylex.props(styles.ingredient)}>{ingredient.name}</span>
            <span {...stylex.props(styles.amount)}>
              {ingredient.amount}g
              <span {...stylex.props(styles.percentage)}>({ingredient.bakerPercentage})</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
