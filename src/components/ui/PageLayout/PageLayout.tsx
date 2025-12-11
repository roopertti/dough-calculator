import * as stylex from '@stylexjs/stylex';

export interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const styles = stylex.create({
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function PageLayout({ children, className }: PageLayoutProps) {
  const stylexProps = stylex.props(styles.layout);

  return (
    <div
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {children}
    </div>
  );
}
