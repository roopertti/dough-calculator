import * as stylex from '@stylexjs/stylex';
import { colors } from '../../../styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

export interface FooterProps {
  children: React.ReactNode;
  className?: string;
}

const styles = stylex.create({
  footer: {
    backgroundColor: colors.bgSecondary,
    padding: '1.5rem',
    textAlign: 'center',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },
  text: {
    margin: 0,
    color: colors.textSecondary,
    fontSize: '0.9rem',
  },
});

export default function Footer({ children, className }: FooterProps) {
  const stylexProps = stylex.props(styles.footer);

  return (
    <footer
      {...stylexProps}
      className={className ? `${stylexProps.className} ${className}` : stylexProps.className}
    >
      <p {...stylex.props(styles.text)}>{children}</p>
    </footer>
  );
}
