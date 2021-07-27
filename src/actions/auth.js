import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventClearLogout } from "./events";


export const startLogin = (email, password) => {
    return async (dispatch) => {

        const res = await fetchWithoutToken("auth/", { email, password }, "POST");
        const body = await res.json();

        // console.log(body);

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        const res = await fetchWithoutToken("auth/new", { name, email, password }, "POST");
        const body = await res.json();

        // console.log(body);
        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

const login = (user) => {
    return {
        type: types.authLogin,
        payload: user
    };
};



export const startChecking = () => {
    return async (dispatch) => {
        const res = await fetchWithToken("auth/renew");
        const body = await res.json();

        // console.log(body);

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            dispatch(checkingFinish());
        }
    };
};

const checkingFinish = () => {
    return {
        type: types.authCheckingFinish
    };
};

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
        dispatch(eventClearLogout());
    };
};

const logout = () => {
    return {
        type: types.authLogout
    };
};