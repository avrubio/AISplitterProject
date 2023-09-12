import { BrowserRouter } from 'react-router-dom';

import { AccessTokenProvider } from '../../contexts/AccessTokenContext';
import Header from '../Header';
import Router from '../Routing/Router';

function App() {
  return (
    <BrowserRouter>
      <AccessTokenProvider>
        <Header></Header>
        <Router />
      </AccessTokenProvider>
    </BrowserRouter>
  );
}

export default App;
