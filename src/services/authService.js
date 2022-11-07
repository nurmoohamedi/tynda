import axios from "axios";

// const service = axios.create({
//    API_URL: "http://localhost:8080/api/auth"
// })

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", { username, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            }, reason => {
                return reason.response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password,
        }).then((response) => {
            if (response)
            return response.data;
        }, reason => {
            return reason.response.data;
        });
    }
}

export default new AuthService();
