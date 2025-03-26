import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setClientToken } from "../spotify.jsx";
import Library from "./screens/Library.jsx";
import Favorites from "./screens/Favorites";
import Player from "./screens/Player";
import Trending from "./screens/Trending";
import Sidebar from "./components/sidebar/index.jsx";
import Login from "./screens/auth/login.jsx";

function App() {
  const [token, setToken] = useState("");
  const [favoriteSongs, setFavoriteSongs] = useState([]); // Thêm state cho favoriteSongs

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="h-[100vh] w-[100vw] bg-white rounded-[30px] flex ">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route
            path="/favorites"
            element={<Favorites favoriteSongs={favoriteSongs} />}
          />
          <Route path="/player" element={<Player />} />
          <Route
            path="/trending"
            element={
              <Trending
                favoriteSongs={favoriteSongs}
                setFavoriteSongs={setFavoriteSongs}
              />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
