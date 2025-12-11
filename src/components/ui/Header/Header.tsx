import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const styles = stylex.create({
  header: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '2.5rem',
    fontWeight: 700,
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
  },
  subtitle: {
    margin: 0,
    fontSize: '1.1rem',
    opacity: 0.9,
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
});

export default function Header({ title, subtitle, className }: HeaderProps) {
  const stylexProps = stylex.props(styles.header);

  return (
    <header
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      <h1 {...stylex.props(styles.title)}>{title}</h1>
      {subtitle && <p {...stylex.props(styles.subtitle)}>{subtitle}</p>}
    </header>
  );
}
