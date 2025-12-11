import * as stylex from '@stylexjs/stylex';
import { colors, radius, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface CardProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'interactive';
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
    transition: 'all 0.2s ease',
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
});

export default function Card({
  children,
  selected = false,
  onClick,
  variant = 'default',
  className,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // If there's an onClick handler, always make it interactive
  const isInteractive = onClick !== undefined;

  const stylexProps = stylex.props(
    styles.card,
    variant === 'interactive' && styles.interactive,
    selected && styles.selected
  );

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Role and keyboard events are conditionally applied when interactive
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
      onClick={onClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      {children}
    </div>
  );
}
