import {Reducer} from "redux";
import {particle} from "./reduxUtils";
import {heartActionTypes} from "./actionTypes";

interface IHeartReduxState {
    test: number;
}

const initialState = {
    get state () {
        return {
            test: 6
        }
    }
};

export const HeartReducer: Reducer<IHeartReduxState> = (prevState = initialState.state, action) => ({
    test: particle(
        heartActionTypes.SET_UP,
        prevState.test,
        action,
        (prevState, action) => action.payload
    )
});