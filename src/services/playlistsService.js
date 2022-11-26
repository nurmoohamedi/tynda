import axios from "axios";

const GET_ALL_PLAYLIST = "http://localhost:8080/api/playlist/all";
const GET_PLAYLIST_BY_ID = "http://localhost:8080/api/playlist/";
const GET_ALL_MUSIC = "http://localhost:8080/api/music/all";

class PlaylistsService {
  // const []

  getPlaylists(currentPage, pageSize) {
    return axios
      .get(GET_ALL_PLAYLIST)
      .then((response) => {
        if (response.data.resultCode === 0) {
          localStorage.setItem('playlists', JSON.stringify(response.data.data))
          debugger
          return response.data.data;
        }
      }, reason => {
        return reason;
      });
  }
  getPlaylistsWithParams(currentPage, pageSize) {
    return axios
      .get(GET_ALL_PLAYLIST + `?pageNo=${currentPage}&pageSize=${pageSize}`)
      .then((response) => {
        if (response.data.resultCode === 0) {
          debugger
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
          debugger
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
    debugger
    return axios
      .get(GET_ALL_MUSIC + params)
      .then((response) => {
        if (response.data.resultCode === 0) {
          return response.data.data;
        }
          debugger
      }, reason => {
        return reason;
      });
  }
}

export default new PlaylistsService();
