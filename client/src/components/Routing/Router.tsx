import { Route, Routes } from "react-router-dom";

import FileNotFound from "../FileNotFound/FileNotFound";
import Home from "../Home/Home";
import TextSplitter from "../Splitters/TextSplitter";
import ProtectedRoute from "./ProtectedRoute";

function Router() {
  return (
    <Routes>
      {/* The ProtectedRoute will redirect the user to the login form if they haven't logged in. */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      {/* TODO:: ADD Login component back, this is temp since server isnt running */}
      <Route path="/login" element={<TextSplitter />} />

      {/* If no matches, display a 404 File Not Found page if logged in. If not logged in, the <ProtectedRoute /> will redirect to the login form. */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <FileNotFound />
          </ProtectedRoute>
        }
      />
      {/* TODO add these routes back once everything should be running as normal */}
      {/* <Route path="/textsplitter" element={<TextSplitter />} />
      <Route path="/youtubetextsplitter" element={<YoutubeTextSplitter />} /> */}
    </Routes>
  );
}

export default Router;
