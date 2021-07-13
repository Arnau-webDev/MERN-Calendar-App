import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={LoginScreen}></Route>
                <Route path="/" component={CalendarScreen}></Route>

                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default AppRouter;
