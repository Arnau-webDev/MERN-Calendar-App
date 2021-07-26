import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { startLogout } from "../../actions/auth";

const Navbar = () => {
    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(startLogout());
        history.push("/login");
    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">{name}</span>
            <button className="btn btn-outline-danger mr-4" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Logout </span>
            </button>

        </div>
    );
};

export default Navbar;

