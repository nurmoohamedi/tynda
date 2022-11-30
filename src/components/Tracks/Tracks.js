import React, { useState, useEffect } from "react";
import styles from "./Tracks.module.css"
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import withAuthRedirect from "../../utils/withAuthRedirect";
import {Container} from "@mui/material";

const Tracks = () => {

  return (
      <Container sx={{
          marginTop: "50px"
      }}>
        <div>
          <div>
           This is User's Liked Songs!
          </div>
        </div>
      </Container>
  );
};

export default withAuthRedirect(Tracks);
