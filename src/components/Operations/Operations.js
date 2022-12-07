import React from 'react';
import {connect} from "react-redux";
import "./Operations.css";
import Messages from "../../utils/messages";
import OperationsTable from "./OperationsTable";
import {useEffect, useState} from "react";
import PlaylistsService from "../../services/playlistsService";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid,
  IconButton, Input,
  Slide,
  styled
} from "@mui/material";
import {setModal} from "../../reducers/commonReducer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Close, MusicNoteSharp} from "@mui/icons-material";
import PropTypes from "prop-types";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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

const Operations = ({type, setModal}) => {

  const [data, setData] = useState(null);

  let operationsList = [];

  useEffect(() => {
    if (type === 'playlist') {
      getPlaylists();
    }
  }, [type])

  const getPlaylists = () => {
    PlaylistsService.getPlaylists(0, 20)
      .then(data => {
        if (data.resultCode === 0) {
          // operationsList = data.data.content;
          setData(data.data.content);
        } else {
          alert(data)
        }
      })
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
  const openModal = () => {
    handleClickOpen();

    // setModal({
    //   open: true,
    //   expCloseable: true,
    //   title: 'Create playlist',
    //   content: (
    //     <div>
    //       <h5>'Create playlist'</h5>
    //     </div>
    //   )
    // });
  }

  const onSave = (data) => {
    PlaylistsService.savePlaylist(data)
      .then(data => {
          handleClose();
          getPlaylists();
        }, error => {
          alert(error)
        }
      );
  }

  const onDelete = (id) => {
    PlaylistsService.deletePlaylist(id)
      .then(data => {
          getPlaylists();
        }, error => {
          alert(error)
        }
      );
  }

  return (
    <div className="operations">
      <p className="operations-title">{type} managing</p>
      <div className="operations-actions">
        <p className="operations-subtitle">{type} actions</p>
        <div className="btns">
          <button
            className="btn btn-filled"
            type="button"
            onClick={openModal}
          >{Messages('addNew')}</button>
        </div>
      </div>
      <div className="operations-table">
        <div className="operations-table__top">
          <p className="operations-subtitle">{type} table</p>
          <p className="operations-subtitle">{data?.length} {type}</p>
        </div>
        <div>
          <OperationsTable
            type={type}
            data={data}
            actions={null}
            deletePlaylist={onDelete}
          />
        </div>
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="custom-modal"
        id="modal-wrapper"
        open={open}
      >
        <BootstrapDialogTitle id="modal-header" onClose={handleClose}>
          Add Playlist
        </BootstrapDialogTitle>
        <DialogContent dividers id="modal-body">
          <form onSubmit={onSubmit}>
            <div className="modal-wrapper">
              <div className="modal-album">
                <input type="file" name="img" accept="image/png, image/jpeg"/>
                <div className="album-icon">
                  <MusicNoteSharp width="48px"/>
                </div>
              </div>
              <div className="modal-name">
                <input type="text" name="name" required placeholder="Name"/>
              </div>
              <div className="modal-description">
                <textarea name="desc" id="" placeholder="Description"></textarea>
              </div>
              <div className="modal-save">
                <button type="submit" className="btn btn-filled">Add</button>
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

export default connect(null, {setModal})(Operations)