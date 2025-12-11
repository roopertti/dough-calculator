import * as stylex from '@stylexjs/stylex';
import { colors, radius, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface ControlSectionProps {
  children: React.ReactNode;
  className?: string;
}

const styles = stylex.create({
  section: {
    padding: spacing.md,
    backgroundColor: colors.bgPrimary,
    borderRadius: radius.sm,
    marginTop: spacing.md,
  },
});

export default function ControlSection({ children, className }: ControlSectionProps) {
  const stylexProps = stylex.props(styles.section);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {children}
    </div>
  );
}
