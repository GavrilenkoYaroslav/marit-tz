import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {heroesReducer} from "./heroes-reducer";

const root = combineReducers({
    heroes: heroesReducer,
});

export const store = createStore(root, applyMiddleware(thunkMiddleware));