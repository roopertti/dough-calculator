import { DoughCalculator } from '@features/dough-calculator';
import { Footer, Header, Main, PageLayout } from '@ui';

function App() {
  return (
    <PageLayout>
      <Header
        title="Bread Dough Calculator"
        subtitle="Calculate precise bread recipes using baker's percentages"
      />

      <Main>
        <DoughCalculator />
      </Main>

      <Footer>Built with React + TypeScript + Vite</Footer>
    </PageLayout>
  );
}

export default App;
