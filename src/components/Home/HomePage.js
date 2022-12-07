import {Grid} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";

import styles from "./HomePage.module.css"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PlaylistsService from "../../services/playlistsService";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylists = () => {
    PlaylistsService.getPlaylists()
      .then(data => {
        if (data?.data?.content) {
          setPlaylists(data.data.content);
        }
        debugger
      })
      .catch(error => {
        console.log(error)
      })
  }

  const onPlaylistClicked = (id) => {
    debugger
    navigate("/playlist/" + id);
  }

  return (
    <div className={styles.home}>
      <div className={styles.back_grad}></div>
      <div className={styles.home_page}>
        <section className={styles.playlist}>
          <div className={styles.playlist__top}>
            <p className={styles.playlist__title}>Your top mixes</p>
            <div className={styles.playlist__all}>See all</div>
          </div>
          <Grid container gap={2} className={styles.playlist__container}>
            {
              playlists && playlists.map(playlist => (
                <Grid key={playlist.id} item xs={12} sm={3} md={2}
                      className={styles.playlist__item}>
                  <div className={styles.playlist__inner} onClick={()=>onPlaylistClicked(playlist.id)}>
                    <div className={styles.playlist__img}>
                      <img src={playlist.img_link}/>
                    </div>
                    <div className={styles.playlist__details}>
                      <p className={styles.playlist__details_title}>{playlist.name}</p>
                      <p className={styles.playlist__details_more}>jeltoksan.,ARO, Marhaba Sabi and ...</p>
                    </div>
                  </div>
                </Grid>
              ))
            }
          </Grid>
        </section>
      </div>
    </div>
  )
}

export default HomePage;