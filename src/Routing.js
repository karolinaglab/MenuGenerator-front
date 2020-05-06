import React from 'react'
import {
    Switch,
    Route
} from "react-router-dom";

import SignIn from "./components/SignIn";
import MainPage from './components/MainPage';
import SignUp from './components/SignUp';
import IngredientsSearch from './components/IngredientsSearch';



export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <SignIn/>
                </Route>
                <Route exact path="/main">
                    <MainPage/>
                </Route>
                <Route exact path="/signup">
                    <SignUp/>
                </Route>
                <Route exact path="/ingredients">
                    <IngredientsSearch/>
                </Route>
            </Switch>
        </>
    )
}