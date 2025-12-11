import * as stylex from '@stylexjs/stylex';
import { colors, radius, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface CardContentProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  badge?: string;
  className?: string;
}

const styles = stylex.create({
  title: {
    margin: `0 0 ${spacing.sm} 0`,
    color: colors.textPrimary,
    fontSize: '1.1rem',
  },
  description: {
    margin: '0 0 0.75rem 0',
    color: colors.textSecondary,
    fontSize: '0.9rem',
  },
  badge: {
    display: 'inline-block',
    padding: `0.25rem ${spacing.sm}`,
    backgroundColor: colors.accent,
    color: 'white',
    borderRadius: radius.sm,
    fontSize: '0.85rem',
    fontWeight: 500,
  },
});

export default function CardContent({
  title,
  description,
  badge,
  children,
  className,
}: CardContentProps) {
  return (
    <div className={className}>
      {title && <h3 {...stylex.props(styles.title)}>{title}</h3>}
      {description && <p {...stylex.props(styles.description)}>{description}</p>}
      {badge && <span {...stylex.props(styles.badge)}>{badge}</span>}
      {children}
    </div>
  );
}
