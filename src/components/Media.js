import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import withAuthRedirect from "../helpers/withAuthRedirect";
import {Container} from "@mui/material";

const BoardUser = () => {
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
        <Container sx={{marginTop:"50px"}}>
            <div>
                { content }
            </div>
            <div>
                <p>Email: { user && user.email }</p>
                <p>Username: { user && user.username }</p>
                <p>Password: { user && user.password }</p>
                <br/><br/>
                <div>
                    Role:{ user && user.roles[0]}
                </div>
            </div>
        </Container>
    );
};

export default withAuthRedirect(BoardUser);
