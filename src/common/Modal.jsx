import React from 'react';
import { connect } from 'react-redux';
import { CLOSE_MODAL } from '../reducers/commonReducer';
import {Dialog, DialogActions, DialogContent, DialogTitle, IconButton, withStyles} from '@mui/material';
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const Modal = ({ modal, dispatch }) => {
  let onClose;
  if (modal?.closeable) {
    if (modal?.mainPage) {
      onClose = () => {
        dispatch({ type: CLOSE_MODAL })
        modal?.returnMainPage()
      }
    } else {
      onClose = () => {dispatch({ type: CLOSE_MODAL })}
    }
  } else {
    onClose = null
  }

  const onExpClose = modal.expCloseable
    ? () => dispatch({ type: CLOSE_MODAL })
    : null;
  // const classes = useStyles();
  const classes = null;
  debugger
  return (
    <Dialog
      disableEnforceFocus
      onExited={modal.onExited}
      open={modal.open || false}
      onClose={onClose}
      maxWidth={modal.maxWidth}
      fullWidth={modal.fullWidth}
      fullScreen={modal.fullScreen}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      classes={{paperWidthSm: classes?.paperWidthSm}}
    >
      <DialogTitle className={`${modal.title ? 'modal-title__d' : 'modal-title__n'}`} onClose={onExpClose} id='alert-dialog-title'>
        {modal.title || ''}
      </DialogTitle>
      <DialogContent
        className='modal-content__d'>
        {modal.content}
        <DialogActions classes={{spacing:classes.spacing}}>
          {modal.actions}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default connect(({ common: { modal } }) => ({ modal }))(Modal);
