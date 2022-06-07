import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import GlobalStyle from './app/GlobalStyle';
import RouterPart from './app/RouterPart';

import theme from './theme/theme';
import { RootState } from './app/store';

function App() {
  const themeMode = useSelector((state: RootState) => state.themeMode.value);

  return (
    <ThemeProvider theme={theme[themeMode]}>
      <GlobalStyle />
      <RouterPart />
    </ThemeProvider>
  );
}

export default App;
