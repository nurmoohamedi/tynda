import React from "react";
// import {connect} from "react-redux";
import {Route, Routes, Navigate} from "react-router-dom";
import {connect} from "react-redux";


const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
})
const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        // constructor() {
        //     super();
        //     this.state = { isAuth: false };
        // }
        // componentDidMount() {
        //     if (localStorage.getItem('user')) {
        //         this.state.isAuth = true;
        //         this.setState((prevState) => ({
        //             isAuth: true
        //         }))
        //     }
        //     else {
        //         this.setState((prevState) => ({
        //             isAuth: false
        //         }))
        //     }
        //     debugger
        // }

        render() {
            if (!this.props.isAuth) {
                return <Navigate to="/login"/>
            }
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToProps)(RedirectComponent);
}

export default withAuthRedirect;