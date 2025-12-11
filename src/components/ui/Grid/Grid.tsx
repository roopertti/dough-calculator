import * as stylex from '@stylexjs/stylex';
import { spacing } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface GridProps {
  children: React.ReactNode;
  columns?: number | 'auto-fit';
  minColumnWidth?: string;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const styles = stylex.create({
  grid: {
    display: 'grid',
  },
  gapSm: {
    gap: spacing.sm,
  },
  gapMd: {
    gap: spacing.md,
  },
  gapLg: {
    gap: spacing.lg,
  },
});

export default function Grid({
  children,
  columns = 'auto-fit',
  minColumnWidth = '200px',
  gap = 'md',
  className,
}: GridProps) {
  const gapStyle = gap === 'sm' ? styles.gapSm : gap === 'md' ? styles.gapMd : styles.gapLg;

  const gridTemplateColumns =
    columns === 'auto-fit'
      ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
      : `repeat(${columns}, 1fr)`;

  const stylexProps = stylex.props(styles.grid, gapStyle);

  return (
    <div
      {...stylexProps}
      style={{ gridTemplateColumns }}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {children}
    </div>
  );
}
