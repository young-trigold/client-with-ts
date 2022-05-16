import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import GlobalStyle from './app/GlobalStyle';
import RouterPart from './app/RouterPart';

import theme from './theme/theme';

function App() {
  const themeMode = useSelector((state) => state.themeMode.value);

  return (
    <ThemeProvider theme={theme[themeMode]}>
      <GlobalStyle />
      <RouterPart />
    </ThemeProvider>
  );
}

export default App;
