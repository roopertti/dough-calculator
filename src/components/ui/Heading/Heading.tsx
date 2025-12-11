import * as stylex from '@stylexjs/stylex';
import { colors, spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  marginBottom?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const styles = stylex.create({
  heading: {
    margin: 0,
    color: colors.textPrimary,
  },
  marginBottomSm: {
    marginBottom: spacing.sm,
  },
  marginBottomMd: {
    marginBottom: spacing.md,
  },
  marginBottomLg: {
    marginBottom: spacing.lg,
  },
});

export default function Heading({
  children,
  level = 2,
  marginBottom = 'md',
  className,
}: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;

  const marginStyle =
    marginBottom === 'sm'
      ? styles.marginBottomSm
      : marginBottom === 'md'
        ? styles.marginBottomMd
        : marginBottom === 'lg'
          ? styles.marginBottomLg
          : null;

  const stylexProps = stylex.props(styles.heading, marginStyle);

  return (
    <Tag
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {children}
    </Tag>
  );
}
