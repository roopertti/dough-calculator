import * as stylex from '@stylexjs/stylex';
import { formatWeight } from '@utils/formatters';
import { colors, radius, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface TotalWeightProps {
  weight: number;
  className?: string;
}

const styles = stylex.create({
  totalWeight: {
    padding: spacing.md,
    backgroundColor: colors.primaryLight,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: colors.primary,
    borderRadius: radius.sm,
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
});

export default function TotalWeight({ weight, className }: TotalWeightProps) {
  const stylexProps = stylex.props(styles.totalWeight);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      Total Dough Weight: {formatWeight(weight)}g
    </div>
  );
}
