import { AccessTokenProvider } from "../../contexts/AccessTokenContext";
import Header from "../Header";
import Router from "../Routing/Router";

function App() {
  return (
    <AccessTokenProvider>
      <Header></Header>
      <Router />
    </AccessTokenProvider>
  );
}

export default App;
