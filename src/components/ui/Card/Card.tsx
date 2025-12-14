import * as stylex from '@stylexjs/stylex';
import { animations, colors, easing, radius, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface CardProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'interactive';
  disabled?: boolean;
  className?: string;
}

const styles = stylex.create({
  card: {
    padding: spacing.lg,
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.bgSecondary,
    transition: `all ${animations.durationFast} ${easing.standard}`,
  },
  interactive: {
    cursor: 'pointer',
    ':hover': {
      borderColor: colors.primary,
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    ':hover': {
      borderColor: colors.border,
      transform: 'none',
      boxShadow: 'none',
    },
  },
});

export default function Card({
  children,
  selected = false,
  onClick,
  variant = 'default',
  disabled = false,
  className,
}: CardProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // If there's an onClick handler and not disabled, make it interactive
  const isInteractive = onClick !== undefined && !disabled;

  const stylexProps = stylex.props(
    styles.card,
    variant === 'interactive' && !disabled && styles.interactive,
    selected && !disabled && styles.selected,
    disabled && styles.disabled
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Role and keyboard events are conditionally applied when interactive
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
      onClick={handleClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
}
