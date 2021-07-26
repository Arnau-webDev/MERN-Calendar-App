import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";

const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) {
        return <h5>Please wait...</h5>;
    }

    return (
        <Router>
            <Switch>

                {!!uid
                    ? (
                        <Router>
                            <Route exact path="/" component={CalendarScreen}></Route>
                            <Redirect to="/" />
                        </Router>
                    )
                    : <Route exact path="/login" component={LoginScreen}></Route>
                }

                <Redirect to="/login" />
            </Switch>
        </Router>
    );
};

export default AppRouter;
