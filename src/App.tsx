import { ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import GlobalStyle from './app/GlobalStyle';
import RouterPart from './app/RouterPart';

import themes from './theme/themes';
import { RootState } from './app/store';

function App() {
  const themeMode = useSelector((state: RootState) => state.themeMode.value);
  const theme = themes[themeMode];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterPart />
    </ThemeProvider>
  );
}

export default App;
