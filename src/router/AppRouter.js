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

                {!uid
                    ? <Route exact path="/login" component={LoginScreen}></Route>
                    : <Route path="/" component={CalendarScreen}></Route>
                }

                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default AppRouter;
