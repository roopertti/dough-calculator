import { DoughCalculator } from '@features/dough-calculator';
import { Footer, Header, Main, PageLayout } from '@ui';
import { version } from '../package.json';

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

      <Footer>
        <a href="https://github.com/roopertti/dough-calculator">Github</a> | v{version}
      </Footer>
    </PageLayout>
  );
}

export default App;
