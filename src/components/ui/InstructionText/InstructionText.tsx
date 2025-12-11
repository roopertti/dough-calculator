import * as stylex from '@stylexjs/stylex';
import { colors, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface InstructionTextProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
}

const styles = stylex.create({
  instructions: {
    color: colors.textPrimary,
  },
  paragraph: {
    margin: `${spacing.sm} 0`,
  },
  strong: {
    color: colors.primary,
  },
});

export default function InstructionText({ children, label, className }: InstructionTextProps) {
  const stylexProps = stylex.props(styles.instructions);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      <p {...stylex.props(styles.paragraph)}>
        {label && <strong {...stylex.props(styles.strong)}>{label}:</strong>} {children}
      </p>
    </div>
  );
}
