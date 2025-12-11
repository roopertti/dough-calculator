import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface MainProps {
  children: React.ReactNode;
  className?: string;
}

const styles = stylex.create({
  main: {
    flex: 1,
    padding: '2rem 1rem',
    backgroundColor: colors.bgPrimary,
    '@media (max-width: 768px)': {
      padding: '1rem 0.5rem',
    },
  },
});

export default function Main({ children, className }: MainProps) {
  const stylexProps = stylex.props(styles.main);

  return (
    <main
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      {children}
    </main>
  );
}
