import API from "../api/heroesAPI";

const RECEIVE_HEROES = 'APP/HEROES_REDUCER/RECEIVE_HEROES';

const initialState = {
    heroes: [],
};

export const heroesReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_HEROES: {
            return { ...state, heroes: action.payload}
        }
        default: return state
    }
};


const receive = (heroes) => {
    return {
        type: RECEIVE_HEROES,
        payload: heroes
    }
};

let _unsubscribe = null;

export const subscribe = () => dispatch => {
    _unsubscribe = API.subscribe((heroes) => {
        dispatch(receive(heroes));
    })
};

export const unsubscribe = () => dispatch => {
    if (_unsubscribe){
        _unsubscribe();
        _unsubscribe = null;
    }
    API.disconnect();
};

export const connectToWS = () => dispatch => {
    API.connect()
};
