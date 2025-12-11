import { DoughCalculator } from '@features/dough-calculator';
import * as stylex from '@stylexjs/stylex';
import { colors } from './styles/tokens.stylex'; // Note: StyleX requires relative paths due to babel plugin limitations

const styles = stylex.create({
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: colors.primary,
    color: 'white',
    padding: '2rem',
    textAlign: 'center',
  },
  headerTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '2.5rem',
    fontWeight: 700,
    '@media (max-width: 768px)': {
      fontSize: '2rem',
    },
  },
  headerSubtitle: {
    margin: 0,
    fontSize: '1.1rem',
    opacity: 0.9,
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  main: {
    flex: 1,
    padding: '2rem 1rem',
    backgroundColor: colors.bgPrimary,
    '@media (max-width: 768px)': {
      padding: '1rem 0.5rem',
    },
  },
  footer: {
    backgroundColor: colors.bgSecondary,
    padding: '1.5rem',
    textAlign: 'center',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: colors.border,
  },
  footerText: {
    margin: 0,
    color: colors.textSecondary,
    fontSize: '0.9rem',
  },
});

function App() {
  return (
    <div {...stylex.props(styles.app)}>
      <header {...stylex.props(styles.header)}>
        <h1 {...stylex.props(styles.headerTitle)}>Bread Dough Calculator</h1>
        <p {...stylex.props(styles.headerSubtitle)}>
          Calculate precise bread recipes using baker's percentages
        </p>
      </header>

      <main {...stylex.props(styles.main)}>
        <DoughCalculator />
      </main>

      <footer {...stylex.props(styles.footer)}>
        <p {...stylex.props(styles.footerText)}>Built with React + TypeScript + Vite</p>
      </footer>
    </div>
  );
}

export default App;
