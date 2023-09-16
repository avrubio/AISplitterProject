import { AccessTokenProvider } from "../../contexts/AccessTokenContext";
import Header from "../Header";
import Router from "../Routing/Router";

function App() {
  return (
    <AccessTokenProvider>
      <Header></Header>
      <Router />
      {/* <Route path="/textsplitter" element={<TextSplitter />} />
      <Route path="/YoutubeTextSplitter" element={<YoutubeTextSplitter />} /> */}
    </AccessTokenProvider>
  );
}

export default App;
