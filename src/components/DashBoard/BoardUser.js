import React, { useState, useEffect } from "react";
import styles from "./BoardUser.module.css"
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import withAuthRedirect from "../../utils/withAuthRedirect";
import {connect} from "react-redux";

const BoardUser = ({ userLogin, userRole }) => {
  const [content, setContent] = useState("");
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    )
    if (localStorage.getItem("user"))
      setUser(JSON.parse(localStorage.getItem("user")))
    ;
  }, []);

  return (
    <div className={styles.board}>
      <div>
        { content }
      </div>
      <div>
        <p>Email: { userLogin && userLogin.email }</p>
        <p>Username: { userLogin && userLogin.username }</p>
        <p>Password: { userLogin && userLogin.password }</p>
      </div>
      <br/>
      <div>
        Role:{ userLogin && userLogin.roles[0]}
        <br/>
        Role2:{ userRole && userRole}
      </div>
    </div>
  );
};


const Playlist = withAuthRedirect(BoardUser);
export default connect(({user: {userLogin, userRole}})=>({userLogin, userRole}), {})(Playlist);
