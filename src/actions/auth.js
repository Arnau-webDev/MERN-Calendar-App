import Swal from "sweetalert2";
import { fetchWithoutToken } from "../helpers/fetch";
import { types } from "../types/types";


export const startLogin = (email, password) => {
    return async (dispatch) => {

        const res = await fetchWithoutToken("auth/", { email, password }, "POST");
        const body = await res.json();

        console.log(body);

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
            dispatch(checkingFinish());
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        const res = await fetchWithoutToken("auth/new", { name, email, password }, "POST");
        const body = await res.json();

        console.log(body);
        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
            dispatch(checkingFinish());
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

const checkingFinish = () => {
    return {
        type: types.authCheckingFinish
    };
};