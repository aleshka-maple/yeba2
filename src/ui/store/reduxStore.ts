import {createStore, combineReducers, applyMiddleware} from 'redux';
import {HeartReducer} from "heart/reducer";

const storeMap = {
    heart: HeartReducer
};

export const store = createStore(combineReducers(storeMap), applyMiddleware(logger));

function logger ({getState}) {
    return (_dispatch) => (_action) => {
        console.log('will dispatch', _action);
        const action = _dispatch(_action);
        console.log('state after dispatch', getState());
        return action;
    }
}