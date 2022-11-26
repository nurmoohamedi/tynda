import './App.css';
import Login from "./components/Login/Login";
import * as React from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import {useState} from "react";
import HomePage from "./components/Home/HomePage";
import PlayerBar from "./components/Footer/PlayerBar";
import Sidebar from "./components/Header/Sidebar";
import BoardUser from "./components/DashBoard/BoardUser";
import Tracks from "./components/Tracks/Tracks";
import Media from "./components/Media";
import Playlist from "./components/Playlists/Playlist";

function App() {

  const [isSnackOpen, setSnackOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const showSnack = (status, message) => {
    setStatus(status);
    setMessage(message);
    setSnackOpen(true);
  }

  return (
      <>
        <div className="app-wrapper">
          <div className="app-sidebar">
            <Sidebar />
          </div>
          <div className="app-main">
            <div className="app-header">
              <div className="app-header-left"></div>
              <div className="app-header-right">
                {
                  true ? (
                    <div className="login_buttons">
                      <NavLink to="/signup" className="btn btn-outlined">Sing up</NavLink>
                      <NavLink to="/login" className="btn btn-filled">Login</NavLink>
                    </div>
                  ) : null
                }
              </div>
            </div>
            <Routes>
              <Route path={"/login"} element={<Login/>}/>
              {/*<Route path={"app/*"} element={<Main showSnack={showSnack}/>}/>*/}
              <Route path={"/playlists"} element={<BoardUser />}/>
              <Route path={"/playlist/:id"} element={<Playlist />}/>
              <Route path={"/tracks"} element={<Tracks />}/>
              <Route path={"/media"} element={<Media />}/>
              <Route path={"/"} exact element={<HomePage />}/>
              {/*<Route path={"/*"} element={<NotFound/>}/>*/}
            </Routes>
          </div>
        </div>
        <PlayerBar />
      </>
  );
}

export default App;