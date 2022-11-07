import * as React from "react";
import {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
// import {connect} from "react-redux";
import styles from "./Sidebar.module.css"
import {useMediaQuery} from "../../helpers/useMediaQuery";
import AuthService from "../../services/authService";

import logo_small from "../../assets/img/tynda_logo.png"
import logo from "../../assets/img/tynda_logo.png"
import {
  AbcOutlined,
  Contactless, ContactlessOutlined,
  Home,
  HomeOutlined,
  LibraryMusic, LibraryMusicOutlined, LibraryMusicRounded, LibraryMusicTwoTone,
  MusicNote,
  MusicNoteOutlined, MusicNoteSharp, Search, SearchOffOutlined, SearchOutlined,
  Stream
} from "@mui/icons-material";

const navs = [
  {
    id: 1, name: "Home",
    icon: <HomeOutlined />, icon_clicked: <Home/>,
    to: "/"},
  {
    id: 2, name: "Search",
    icon: <SearchOutlined />, icon_clicked: <Search/>,
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
    icon: <LibraryMusicOutlined />, icon_clicked: <LibraryMusicTwoTone/>,
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
      else if (location.pathname.includes("podcasts"))
        setActiveNav(2);
      else if (location.pathname.includes("stream"))
        setActiveNav(3);
      else if (location.pathname.includes("tracks"))
        setActiveNav(4);
      else if (location.pathname.includes("contact"))
        setActiveNav(5);
      else
        setActiveNav(0);
    })

    if (localStorage.getItem("user")) {
      setIsLogged(true);
    }
  }, [location]);

  let isPageSmall = useMediaQuery('(max-width:860px)')

  const showMenu = () => {
    if (!checked) {
      document.body.style.overflow = 'hidden';
    } else
      document.body.style.overflow = 'initial';

    setChecked(prevState => !prevState);
  }

  const navigate = useNavigate()

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
      {/*
                <div className={styles.wrapper + " " + styles.container}>

                    <input type="checkbox"
                           checked={checked}
                           // defaultChecked={checked}
                           onChange={() => showMenu()}
                    />
                    <span className={styles.hamburger}> </span>

                    <NavLink to={"/"} className={styles.logo}>
                        <img
                            src={isPageSmall ? logo_small : logo}
                            alt="Logo"/>
                    </NavLink>

                    <div className={styles.search_box}>*
                        <input type="text" placeholder={"search...."}/>
                        <a href="#">
                            <Search/>
                        </a>
                    </div>

                    <Box
                        sx={{display: 'flex'}}
                    >
                        {
                            !isPageSmall &&

                            <>
                            <Box
                                pr={4}
                                sx={{
                                    fontWeight: '800',
                                    color: '#61ddfb',
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    cursor: "pointer"
                                }}
                                className={styles.nav_link}
                            >
                                <span className={styles.nav_link__span}>
                                    <PermMedia sx={{
                                        width: isPageSmall ? '24px' : '30px',
                                        height: '30px',
                                        color: '#61ddfb'
                                    }}/>
                                </span>
                                <a onClick={()=>{onMedia()}}>{ "Add Media" }</a>
                            </Box>
                            <Box
                                pr={4}
                                sx={{
                                    fontWeight: '800',
                                    color: '#61ddfb',
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    cursor: "pointer"
                                }}
                                className={styles.nav_link}
                            >
                                <span className={styles.nav_link__span}>
                                    <Person sx={{
                                        width: isPageSmall ? '24px' : '30px',
                                        height: '30px',
                                        color: '#61ddfb'
                                    }}/>
                                </span>
                                <a onClick={()=>{onLogin()}}>{ isLogged ? "Log out" : "Login"}</a>
                            </Box>
                            </>
                        }

                        <Box
                            component={NavLink}
                            to={"/playlists"}
                            sx={{fontWeight: '800', color: '#61ddfb'}}
                            className={styles.nav_link}
                        >
                            <Badge
                                color={"secondary"}
                                badgeContent={basketSize}
                                className={styles.nav_link__span}
                                sx={{textTransform: "uppercase"}}
                            >
                                <ShoppingBasket
                                    sx={{
                                        width: isPageSmall ? '24px' : '30px',
                                        height: '30px',
                                        color: '#61ddfb',
                                    }}/>
                                Library
                            </Badge>
                        </Box>
                    </Box>

                </div>
                */}

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

      {/*<AppBar*/}
      {/*    position="static"*/}
      {/*    sx={{*/}
      {/*        position: "relative",*/}
      {/*        padding: "20px 0",*/}
      {/*        // backgroundColor:'#252525',#61ddfb*/}
      {/*        background: 'linear-gradient(to right,#cb11ab 0,#481173 100%) no-repeat;',*/}
      {/*        // backgroundImage: 'linear-gradient(90deg,#FF1493FF,#7E57C2,#573491FF)',*/}
      {/*        // borderBottomLeftRadius: "40px",*/}
      {/*        // borderBottomRightRadius: "40px",*/}
      {/*        // flex: "1"*/}
      {/*    }}*/}
      {/*>*/}
      {/*    <div className={styles.wrapper}>*/}

      {/*        <Box*/}
      {/*            sx={{*/}
      {/*                position:"relative",*/}
      {/*                // display: "flex",*/}
      {/*                width: "33px",*/}
      {/*                height: "33px"*/}
      {/*            }}*/}
      {/*        >*/}
      {/*            <input type="checkbox"/>*/}
      {/*            <span className={styles.hamburger}> </span>*/}
      {/*            <div className={styles.menu_items}>*/}
      {/*                <li><a href="#">Home</a></li>*/}
      {/*                <li><a href="#">About</a></li>*/}
      {/*                <li><a href="#">Service</a></li>*/}
      {/*            </div>*/}
      {/*        </Box>*/}

      {/*        <Box*/}
      {/*            sx={{*/}
      {/*                // flexGrow: 1,*/}
      {/*            }}*/}
      {/*        >*/}
      {/*            <NavLink to={"/"} className={styles.logo}>*/}
      {/*                <img*/}
      {/*                    src={isPageSmall ? logo_small : logo}*/}
      {/*                    alt="Logo"/>*/}
      {/*            </NavLink>*/}
      {/*        </Box>*/}

      {/*        <Box*/}
      {/*            // sx={{flexGrow: 1}}*/}
      {/*        >*/}
      {/*            <div className={styles.search_box}>*/}
      {/*                <input type="text" placeholder={"search...."}/>*/}
      {/*                <a href="#">*/}
      {/*                    <Search/>*/}
      {/*                </a>*/}
      {/*            </div>*/}
      {/*        </Box>*/}

      {/*        <Box*/}
      {/*            sx={{display: 'flex'}}*/}
      {/*        >*/}
      {/*            <Box*/}
      {/*                component={NavLink}*/}
      {/*                to={"/login"}*/}
      {/*                pr={4}*/}
      {/*                sx={{fontWeight: '800', color: '#61ddfb'}}*/}
      {/*                className={styles.nav_link}*/}
      {/*            >*/}
      {/*            <span className={styles.nav_link__span}>*/}
      {/*                <Person sx={{width: '30px', height: '30px', color: '#61ddfb'}}/>*/}
      {/*            </span>*/}
      {/*                Login*/}
      {/*            </Box>*/}

      {/*            <Box*/}
      {/*                component={NavLink}*/}
      {/*                to={"/cart"}*/}
      {/*                sx={{fontWeight: '800', color: '#61ddfb'}}*/}
      {/*                className={styles.nav_link}*/}
      {/*            >*/}
      {/*                <Badge*/}
      {/*                    color={"secondary"}*/}
      {/*                    badgeContent={basketSize}*/}
      {/*                    className={styles.nav_link__span}*/}
      {/*                >*/}
      {/*                    /!*<span >*!/*/}
      {/*                    <ShoppingBasket sx={{width: '30px', height: '30px', color: '#61ddfb'}}/>*/}
      {/*                    /!*</span>*!/*/}
      {/*                    Cart*/}
      {/*                </Badge>*/}
      {/*            </Box>*/}
      {/*        </Box>*/}
      {/*    </div>*/}
      {/*</AppBar>*/}
      {/*/!*<nav className={styles.nav + " " + styles.menu_items}>*!/*/}
      {/*/!*    <div>*!/*/}
      {/*/!*        {*!/*/}
      {/*/!*            navs.map(nav =>*!/*/}
      {/*/!*                <NavLink*!/*/}
      {/*/!*                    // onClick={() => setActiveNav(nav.id)}*!/*/}
      {/*/!*                    key={nav.id}*!/*/}
      {/*/!*                    to={nav.to}*!/*/}
      {/*/!*                    className={nav.id === activeNav && styles.active}>*!/*/}
      {/*/!*                    {nav.name}*!/*/}
      {/*/!*                </NavLink>)*!/*/}
      {/*/!*        }*!/*/}
      {/*/!*    </div>*!/*/}
      {/*/!*</nav>*!/*/}
    </>
  )
}

// const mapStateToProps = (state) => ({basketSize: state.basket.basketItems.length})
// export default connect(mapStateToProps, null)(Header);
export default Sidebar;