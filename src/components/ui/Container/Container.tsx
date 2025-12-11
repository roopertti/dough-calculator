import * as stylex from '@stylexjs/stylex';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

const styles = stylex.create({
  container: {
    margin: '0 auto',
  },
  maxWidthSm: {
    maxWidth: '640px',
  },
  maxWidthMd: {
    maxWidth: '768px',
  },
  maxWidthLg: {
    maxWidth: '1024px',
  },
  maxWidthXl: {
    maxWidth: '1200px',
  },
  paddingSm: {
    padding: '1rem',
  },
  paddingMd: {
    padding: '1.5rem',
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
  paddingLg: {
    padding: '2rem',
    '@media (max-width: 768px)': {
      padding: '1rem',
    },
  },
});

export default function Container({
  children,
  maxWidth = 'xl',
  padding = 'lg',
  className,
}: ContainerProps) {
  const maxWidthStyle =
    maxWidth === 'sm'
      ? styles.maxWidthSm
      : maxWidth === 'md'
        ? styles.maxWidthMd
        : maxWidth === 'lg'
          ? styles.maxWidthLg
          : styles.maxWidthXl;

  const paddingStyle =
    padding === 'sm' ? styles.paddingSm : padding === 'md' ? styles.paddingMd : styles.paddingLg;

  const stylexProps = stylex.props(styles.container, maxWidthStyle, paddingStyle);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {children}
    </div>
  );
}
