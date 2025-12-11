import * as stylex from '@stylexjs/stylex';
import { colors, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface TimingNoteProps {
  children: React.ReactNode;
  className?: string;
}

const styles = stylex.create({
  timing: {
    marginTop: spacing.md,
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.accentLight,
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    borderLeftColor: colors.accent,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
});

export default function TimingNote({ children, className }: TimingNoteProps) {
  const stylexProps = stylex.props(styles.timing);

  return (
    <p
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {children}
    </p>
  );
}
