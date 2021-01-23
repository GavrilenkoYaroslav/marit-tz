import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {useDispatch} from "react-redux";
import {connectToWS, subscribe, unsubscribe} from "./store/heroes-reducer";

export const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectToWS());
        dispatch(subscribe());
        return () => dispatch(unsubscribe());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="app">
                <Switch>
                <Route exact path={'/'} render={() => <HomePage/>}/>
                <Route path={'*'} render={() => <h1>NOT FOUND</h1>}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
};