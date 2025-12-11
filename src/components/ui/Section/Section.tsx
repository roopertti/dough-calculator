import * as stylex from '@stylexjs/stylex';
import { colors, radius, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface SectionProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'default' | 'elevated';
  className?: string;
}

const styles = stylex.create({
  section: {
    marginBottom: spacing.xl,
  },
  elevated: {
    padding: spacing.lg,
    backgroundColor: colors.bgSecondary,
    borderRadius: radius.md,
  },
  heading: {
    margin: `0 0 ${spacing.lg} 0`,
    color: colors.textPrimary,
  },
});

export default function Section({ children, title, variant = 'default', className }: SectionProps) {
  const stylexProps = stylex.props(styles.section, variant === 'elevated' && styles.elevated);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {title && <h2 {...stylex.props(styles.heading)}>{title}</h2>}
      {children}
    </div>
  );
}
