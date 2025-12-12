import * as stylex from '@stylexjs/stylex';
import { spacing } from '../../../styles/tokens.stylex';

interface StackProps {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
}

const styles = stylex.create({
  stack: {
    display: 'flex',
    flexDirection: 'column',
  },
  sm: {
    gap: spacing.sm,
  },
  md: {
    gap: spacing.md,
  },
  lg: {
    gap: spacing.lg,
  },
});

export default function Stack({ children, spacing = 'md' }: StackProps) {
  const stylexProps = stylex.props(styles.stack, styles[spacing]);

  return <div {...stylexProps}>{children}</div>;
}
