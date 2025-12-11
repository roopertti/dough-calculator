import * as stylex from '@stylexjs/stylex';
import { colors, spacing } from '../../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

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
    ':last-child': {
      borderBottomWidth: 0,
    },
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
  return (
    <ul {...stylex.props(styles.ingredientList)}>
      {ingredients.map((ingredient) => (
        <li key={ingredient.name} {...stylex.props(styles.ingredientItem)}>
          <span {...stylex.props(styles.ingredient)}>{ingredient.name}</span>
          <span {...stylex.props(styles.amount)}>
            {ingredient.amount}g
            <span {...stylex.props(styles.percentage)}>({ingredient.bakerPercentage})</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
