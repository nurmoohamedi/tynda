import axios from "axios";

const GET_ALL_PLAYLIST = "http://localhost:8080/api/playlist/all";
const SAVE_PLAYLIST = "http://localhost:8080/api/playlist/save";
const UPDATE_PLAYLIST = "http://localhost:8080/api/playlist/update/";
const DELETE_PLAYLIST = "http://localhost:8080/api/playlist/delete/";
const GET_PLAYLIST_BY_ID = "http://localhost:8080/api/playlist/";
const GET_ALL_MUSIC = "http://localhost:8080/api/music/all";

class PlaylistsService {
  // const []

  getPlaylists(currentPage, pageSize) {
    return axios
      .get(GET_ALL_PLAYLIST)
      .then((response) => {
        if (response.data.resultCode === 0) {
          localStorage.setItem('playlists', JSON.stringify(response.data.data));
          return response.data;
        }
      });
  }

  savePlaylist(body) {
    return axios
      .post(SAVE_PLAYLIST, body)
      .then(response => response.data);
  }

  updatePlaylist(id, body) {
    return axios
      .put(UPDATE_PLAYLIST + id, body)
      .then(response => response.data);
  }

  deletePlaylist(id) {
    return axios
      .delete(DELETE_PLAYLIST + id)
      .then(response => response.data);
  }

  getPlaylistsWithParams(currentPage, pageSize) {
    return axios
      .get(GET_ALL_PLAYLIST + `?pageNo=${currentPage}&pageSize=${pageSize}`)
      .then((response) => {
        if (response.data.resultCode === 0) {
          localStorage.setItem('playlists', JSON.stringify(response.data.data))
          return response.data.data;
        }
      }, reason => {
        return reason;
      });
  }
  getPlaylistById(id) {
    return axios
      .get(GET_PLAYLIST_BY_ID + id)
      .then((response) => {
        if (response.data.resultCode === 0) {
          return response.data.data;
        }
      }, reason => {
        return reason;
      });
  }
  getMusics(currentPage, pageSize, sortBy, sortDir) {
    let params = "?";
    if (currentPage)
      params = params + `pageNo=${currentPage}`;
    if (pageSize)
      params = params + `&pageSize=${pageSize}`;
    if (sortBy)
      params = params + `&sortBy=${sortBy}`;
    if (sortDir)
      params = params + `&sortDir=${sortDir}`;
    return axios
      .get(GET_ALL_MUSIC + params)
      .then((response) => {
        if (response.data.resultCode === 0) {
          return response.data.data;
        }
      }, reason => {
        return reason;
      });
  }
}

export default new PlaylistsService();
