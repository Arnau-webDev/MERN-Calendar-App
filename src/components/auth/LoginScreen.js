import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "../auth/login.css";

const LoginScreen = () => {

    const [missingFieldsToInform, setMissingFieldsToInform] = useState(true);

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: "newUser223@gmail.com",
        lPassword: "123456"
    });

    const { lEmail, lPassword } = formLoginValues;

    const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
        rName: "",
        rEmail: "",
        rPassword: "",
        rPassword2: ""
    });

    const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

    const toggleClassSubmitBtn = () => {
        const btnSubmit = document.querySelector(".register");

        if (missingFieldsToInform) {
            btnSubmit.classList.add("disabled");
        } else {
            btnSubmit.classList.remove("disabled");
        }
    };

    useEffect(() => {
        console.log("---------------------------------------------------");
        console.log(rName.length);
        console.log(rEmail.length);
        console.log(rPassword.length);
        console.log(rPassword2.length);
        if (rName.length > 2 && rEmail.length > 2 && rPassword.length > 2 && rPassword2.length > 2) {
            setMissingFieldsToInform(false);
        } else {
            setMissingFieldsToInform(true);
        }

        toggleClassSubmitBtn();
    }, [rName, rEmail, rPassword, rPassword2]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(startRegister(rName, rEmail, rPassword));
        reset();
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword"
                                value={rPassword}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                value={rPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit register"
                                value="Crear cuenta"
                                disabled={missingFieldsToInform}

                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
