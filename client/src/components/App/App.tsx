import { ThemeProvider } from '@mui/material';
import {
  createTheme,
  ThemeOptions,
} from '@mui/material/styles';

import { AccessTokenProvider } from '../../contexts/AccessTokenContext';
import Header from '../Header';
import Router from '../Routing/Router';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#651fff",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

const theme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AccessTokenProvider>
        <Header /> <Router />
      </AccessTokenProvider>
    </ThemeProvider>
  );
}

export default App;
