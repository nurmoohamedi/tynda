import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {Grid} from "@mui/material";
import logo from "../../assets/img/tynda_logo.png"
import styles from "./PlayerBar.module.css"
import {Facebook, Instagram, Telegram, Twitter, YouTube} from "@mui/icons-material";

const PlayerBar = () => {
    return (
        <footer className={styles.playerBar}>
            <Container>
                {/*
                <Grid container className={styles.footer_top}>
                    <Grid item xs={12} sm={9} md={5} className={styles.footer_logo}>
                        <img src={logo} alt="Footer Logo"/>
                        <Box className={styles.footer_text}>
                            <span>Tynda</span> - is the free kazakh streaming service. It helps to share national content.
                        </Box>
                        <Box className={styles.footer_media}>
                            <a href="https://facebook.com">
                                <Facebook/>
                            </a>
                            <a href="https://twitter.com">
                                <Twitter/>
                            </a>
                            <a href="https://telegram.com">
                                <Telegram/>
                            </a>
                            <a href="https://instagram.com">
                                <Instagram/>
                            </a>
                            <a href="https://youtube.com">
                                <YouTube/>
                            </a>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <p className={styles.footer_header}>Products</p>
                        <Box
                            className={styles.footer_links}
                        >
                            <a href="/tracks">Tracks</a>
                            <a href="/playlist">Playlist</a>
                            <a href="store/stream">Stream</a>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <p className={styles.footer_header}>Useful Links</p>
                        <Box
                            className={styles.footer_links}
                        >
                            <a href="store">Podcast</a>
                            <a href="#">About Us</a>
                            <a href="#">Contact</a>
                            <a href="#">Basket</a>
                            <a href="#">My Library</a>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={1}>
                        <p className={styles.footer_header}>Address</p>
                        <Box
                            className={styles.footer_links}
                        >
                            <a href="#">Auezov, 144A</a>
                            <a href="#">Almaty, Qazaqstan</a>
                        </Box>
                    </Grid>
                </Grid>
                */}
                <Box
                    className={styles.footer_bottom}
                >
                    <p>
                        {'Copyright © '}
                        {new Date().getFullYear()}
                        {' '}
                        <Link color="inherit" href="https://qos.ltd.com/">
                            Tynda
                        </Link>{' . '}
                        All rights reserved
                    </p>
                    <p>
                        Designed By <span className={styles.developer}>Nurmoohamedi</span>.
                    </p>
                </Box>
            </Container>
        </footer>
    );
}

export default PlayerBar;