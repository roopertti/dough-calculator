import * as stylex from '@stylexjs/stylex';
import { animations, colors, easing, radius, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'text';
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const styles = stylex.create({
  button: {
    padding: `0.75rem ${spacing.lg}`,
    borderWidth: 0,
    borderRadius: radius.sm,
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    transition: `all ${animations.durationFast} ${easing.standard}`,
    fontFamily: 'inherit',
    ':hover': {
      transform: 'translateY(-1px)',
    },
    ':active': {
      transform: 'translateY(0)',
    },
  },
  primary: {
    backgroundColor: colors.primary,
    color: 'white',
    ':hover': {
      backgroundColor: colors.primaryDark,
    },
  },
  secondary: {
    backgroundColor: colors.border,
    color: colors.textPrimary,
    ':hover': {
      backgroundColor: colors.borderDark,
    },
  },
  text: {
    backgroundColor: 'transparent',
    color: colors.primary,
    padding: `0.5rem ${spacing.md}`,
    ':hover': {
      backgroundColor: colors.primaryLight,
    },
  },
  fullWidth: {
    width: '100%',
  },
});

export default function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  onClick,
  type = 'button',
  className,
}: ButtonProps) {
  const stylexProps = stylex.props(styles.button, styles[variant], fullWidth && styles.fullWidth);

  return (
    <button
      type={type}
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
