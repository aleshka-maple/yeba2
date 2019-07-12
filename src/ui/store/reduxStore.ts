import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {HeartReducer} from "heart/reducer";
import {IHeartReduxState} from "../heart/reducer";

export interface IReduxStore {
    heart: IHeartReduxState;
}

const reduxStoreMap = {
    heart: HeartReducer
};

export const store = createStore(combineReducers(reduxStoreMap), applyMiddleware(thunk));

function logger ({getState}) {
    return (_dispatch) => (_action) => {
        console.log('will dispatch', _action);
        const action = _dispatch(_action);
        console.log('state after dispatch', getState());
        return action;
    }
}