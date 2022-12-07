import * as React from "react";
import {useEffect, useState} from "react";

import "./Playlist.css"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {useParams} from "react-router-dom";
import Paginator from "../../common/Paginator";
import PlaylistsService from "../../services/playlistsService";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  styled,
  TextField
} from "@mui/material";
import non_img from '../../assets/icons/i_playlist.webp'
import {Close, MusicNoteSharp} from "@mui/icons-material";
import PropTypes from "prop-types";

const CssTextField = styled(TextField)({
  '& label': {
    color: '#508080'
  },
  '& label.Mui-focused': {
    color: '#508080',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#508080',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#508080',
    },
    '&:hover fieldset': {
      borderColor: '#508080',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#508080',
    },
  },
});

const CssSelect = styled(InputBase)({
  'label + &': {
    marginTop: '15px',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#508080',
    border: '1px solid #508080',
    fontSize: 14,
    padding: '10px 26px 10px 12px',
    transition: '0.3s',
  },
});

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    color: '#fff',
    borderTop: '1px solid #3e3e3e',
    borderBottom: '1px solid #3e3e3e'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    borderRadius: '8px',
    backgroundColor: '#282828'
  },
}));

function BootstrapDialogTitle(props) {
  const {children, onClose, ...other} = props;

  return (
    <DialogTitle sx={{m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close/>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Playlist = () => {
  const [page_size, setPageSize] = useState(5);
  const {id} = useParams();

  const [playlist, setPlaylist] = useState({});
  const [musics, setMusics] = useState({});
  const [cur_page, setCur_page] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPlaylistById();
    getMusics(cur_page, page_size);
  }, []);

  useEffect(() => {
    getMusics(cur_page, page_size);
  }, [page_size])

  const getPlaylistById = () => {
    PlaylistsService.getPlaylistById(id)
      .then(data => {
        if (data) {
          setPlaylist(data)
        }
      })
  }

  const getMusics = (pageNo, pageSize, sortBy, sortDir) => {
    PlaylistsService.getMusics(pageNo, pageSize, sortBy, sortDir)
      .then(data => {
        setMusics(data);
      })
      .catch(error => {
        console.log(error)
      });
  }

  const onCurrPageClicked = (p) => {
    setCur_page(p);
    getMusics(p, page_size);
  }

  const [currentCol, setCurrentCol] = useState({
    col: "id",
    orderByAsc: false
  });
  const filterTable = (orderBy) => {
    let orderDir;
    if (currentCol.col !== orderBy)
      orderDir = "asc";
    else
      orderDir = !currentCol.orderByAsc ? "asc" : "desc";

    getMusics(cur_page, page_size, orderBy, orderDir);

    setCurrentCol({
      col: orderBy,
      orderByAsc: !currentCol.orderByAsc
    })
  }

  const onSearchChange = (e) => {
    setSearch(e.target.value);

    setTimeout(() => {
      let music_list = musics.content.filter(music => {
        if (music.name.toLowerCase().includes(e.target.value.toLowerCase()))
          return music;
      });
      if (e.target.value.length !== 0) {
        setMusics({
          ...musics,
          content: music_list
        });
      } else {
        getMusics(cur_page, page_size);
      }
      debugger;
    }, 1500);
  }

  const onSearch = () => {
    // let music_list = musics.content.filter(music => {
    //   if (music.name.toLowerCase().includes(search.toLowerCase()))
    //     return music;
    // })
    let music_list = [];
    for (let muz in musics.content) {
      if (musics.content[muz].name.toLowerCase().includes(search.toLowerCase())) {
        music_list.push(musics.content[muz]);
      }
    }
    if (music_list.length !== 0)
      setMusics(music_list)
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const body = {
      img_link: null,
      name: data.get('name'),
      musics: null
    };
    onSave(body);
  }

  const onSave = (data) => {
    PlaylistsService.updatePlaylist(playlist.id, data)
      .then(data => {
        handleClose();
        getPlaylistById();
        }, error => {
          alert(error)
        }
      );
  }

  const onValueChange = (event) => {
    console.log(event.target.value)

    let pl = playlist;
    pl.name = event.target.value;
    console.log(pl)
    setPlaylist({...pl})
  }

  return (
    <div className="wrapper">
      <div className="playlist__top">
        <div className="playlist-img pointer" onClick={handleClickOpen}>
          <img src={playlist?.img_link || non_img}/>
        </div>
        <div className="playlist-details">
          {
            playlist.musics
              ? (
                <>
                  <div className="playlist__title">
                    {playlist.name}
                  </div>
                  <div className="playlist__detail">
                    {musics.totalElements} songs, 2 hr 5 min
                  </div>
                </>
              ) : null
          }
        </div>
      </div>
      <div className="container">
        <div className="filter">
          <div className="search">
            <CssTextField
              id="music_search"
              label="Search Music"
              value={search}
              onChange={onSearchChange}
            />
          </div>
          <div className="group">
            <Select
              labelId="demo-simple-select-label"
              id="music-select"
              value={page_size}
              label="Age"
              onChange={(p) => {
                debugger
                setPageSize(p.target.value)
              }}
              input={<CssSelect/>}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
            </Select>
          </div>
        </div>
        {
          musics.content && musics.content.length !== 0
            ? (
              <table className="playlist-table">
                <thead>
                <tr>
                  <th className="table-col-1" onClick={() => filterTable("id")}>#</th>
                  <th onClick={() => filterTable("name")}>Title</th>
                  <th onClick={() => filterTable("artist")}>Artist</th>
                  <th>Album</th>
                  <th>Duration</th>
                </tr>
                </thead>
                <tbody>
                {
                  musics.content && musics.content.map(music => (
                    <tr key={music.id}>
                      <th className="table-col-1">{music.id}</th>
                      <th className="table-col-2">
                        <img src={music.img_link}/>
                        <p>{music.name}</p>
                      </th>
                      <th>{music.artist}</th>
                      <th>{playlist.name}</th>
                      <th>{music.duration}</th>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            ) : (
              <div className="not-found">
                There's no music in playlist!
              </div>
            )
        }
        {
          musics.content && musics.content.length !== 0
            ? (
              <div className="pagination">
                {
                  playlist.musics && playlist.musics.length !== 0
                    ? <Paginator
                      totalItemsCount={musics.totalElements}
                      pageSize={musics.pageSize}
                      currentPage={cur_page}
                      onCurrentPageClick={(p) => (onCurrPageClicked(p))}
                    />
                    : null
                }
              </div>
            ) : null
        }
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="custom-modal"
        id="modal-wrapper"
        open={open}
      >
        <BootstrapDialogTitle id="modal-header" onClose={handleClose}>
          Change Playlist
        </BootstrapDialogTitle>
        <DialogContent dividers id="modal-body">
          <form onSubmit={onSubmit}>
            <div className="modal-wrapper">
              <div className="modal-album">
                <input type="file" name="img" accept="image/png, image/jpeg"/>
                <div className="album-icon">
                  {
                    playlist?.img_link
                      ? <img className="album-img" src={playlist.img_link} alt=""/>
                      : <MusicNoteSharp width="48px"/>
                  }
                </div>
              </div>
              <div className="modal-name">
                <input type="text" name="name" value={playlist.name} onChange={onValueChange} required placeholder="Name"/>
              </div>
              <div className="modal-description">
                <textarea name="desc" id="" placeholder="Description"></textarea>
              </div>
              <div className="modal-save">
                <button type="submit" className="btn btn-filled">Save</button>
              </div>
            </div>
          </form>
        </DialogContent>
        {/*<DialogActions id="modal-footer">*/}
        {/*  <Button autoFocus onClick={handleClose}>*/}
        {/*    Save changes*/}
        {/*  </Button>*/}
        {/*</DialogActions>*/}
      </BootstrapDialog>
    </div>
  )
}

export default Playlist;