import {
  Route,
  Routes,
} from 'react-router-dom';

import FileNotFound from '../FileNotFound/FileNotFound';
import Home from '../Home/Home';
import Login from '../Login/Login';
import TextSplitter from '../Splitters/TextSplitter';
import YoutubeTextSplitter from '../Splitters/YoutubeTextSplitter';
import ProtectedRoute from './ProtectedRoute';

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

      <Route path="/login" element={<Login />} />

      {/* If no matches, display a 404 File Not Found page if logged in. If not logged in, the <ProtectedRoute /> will redirect to the login form. */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <FileNotFound />
          </ProtectedRoute>
        }
      />
      <Route path="/textsplitter" element={<TextSplitter />} />
      <Route path="/youtubetextsplitter" element={<YoutubeTextSplitter />} />
    </Routes>
  );
}

export default Router;
