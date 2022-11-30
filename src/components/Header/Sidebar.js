import * as React from "react";
import {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
// import {connect} from "react-redux";
import styles from "./Sidebar.module.css"
import {useMediaQuery} from "../../utils/useMediaQuery";
import AuthService from "../../services/authService";

import logo_small from "../../assets/img/tynda_logo.png"
import logo from "../../assets/img/tynda_logo.png"
import {
  Contactless,
  ContactlessOutlined,
  Home,
  HomeOutlined,
  LibraryMusic,
  LibraryMusicOutlined,
  MusicNote,
  MusicNoteOutlined,
  Search,
  ZoomInSharp
} from "@mui/icons-material";

const navs = [
  {
    id: 1, name: "Home",
    icon: <HomeOutlined />, icon_clicked: <Home/>,
    to: "/"},
  {
    id: 2, name: "Search",
    icon: <Search />, icon_clicked: <ZoomInSharp/>,
    to: "/search"
  },
  {
    id: 3, name: "Podcasts and books",
    icon: <MusicNoteOutlined />, icon_clicked: <MusicNote/>,
    to: "/podcast"
  },
  {id: 4, name: "Streams",
    icon: <ContactlessOutlined />, icon_clicked: <Contactless/>,
    to: "/stream"},
  // {id: 3, name: "Streams", icon: <Stream />, to: "/stream"},
  {
    id: 5, name: "Liked Songs",
    icon: <LibraryMusicOutlined />, icon_clicked: <LibraryMusic />,
    to: "/tracks"},
  // {id: 5, name: "Contact", icon: <Contactless />, to: "/contact"},
]

const Sidebar = ({basketSize}) => {

  const [activeNav, setActiveNav] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [checked, setChecked] = useState(false);

  const location = useLocation();

  useEffect(() => {
    navs.forEach(nav => {
      if (location.pathname === "/")
        setActiveNav(1);
      else if (location.pathname.includes("search"))
        setActiveNav(2);
      else if (location.pathname.includes("podcast"))
        setActiveNav(3);
      else if (location.pathname.includes("stream"))
        setActiveNav(4);
      else if (location.pathname.includes("tracks"))
        setActiveNav(5);
      else
        setActiveNav(0);
    })

    if (localStorage.getItem("user")) {
      setIsLogged(true);
    }
  }, [location]);

  let isPageSmall = useMediaQuery('(max-width:860px)')
  const navigate = useNavigate()

  const showMenu = () => {
    if (!checked) {
      document.body.style.overflow = 'hidden';
    } else
      document.body.style.overflow = 'initial';

    setChecked(prevState => !prevState);
  }

  const onLogin = () => {
    if (isLogged) {
      AuthService.logout();
      setIsLogged(false);
      navigate('/login')
    } else {
      navigate('/login')
    }
  }
  const onMedia = () => {
    let userInfo = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')) : '';

    if (userInfo && userInfo.roles[0] === "ROLE_MODERATOR") {
      navigate('/media')
    } else {
      navigate('/login')
    }
    debugger
  }
  return (
    <>
      <div className={styles.sidebar_top}>
        <NavLink to={"/"}>
          <img
            className={styles.sidebar_logo}
            src={isPageSmall ? logo_small : logo}
            alt="Logo"/>
        </NavLink>
      </div>
      <nav className={isPageSmall ? styles.menu_items + " " + (checked && styles.active) : styles.nav}>
        {
          navs.map(nav =>
            <NavLink
              onClick={() => setChecked(false)}
              key={nav.id}
              to={nav.to}
              className={nav.id === activeNav && styles.active}>
              { nav.id === activeNav ? nav.icon_clicked : nav.icon }
              <span>
                {nav.name}
              </span>
            </NavLink>
          )
        }
      </nav>
    </>
  )
}

// const mapStateToProps = (state) => ({basketSize: state.basket.basketItems.length})
// export default connect(mapStateToProps, null)(Header);
export default Sidebar;