import {Reducer} from "redux";
import {compact} from 'lodash';
import {particle} from "./reduxUtils";
import {heartActionTypes} from "./actionTypes";
import {data1} from "./mock/data";

export interface IHeartReduxState {
    test: number;
    data: IImage[];
}

export interface IImage {
    image: string;
    status: boolean;
    onStart?: boolean;
}

const initialState = {
    get state () {
        return {
            test: 6,
            data: data1
        }
    }
};

export const HeartReducer: Reducer<IHeartReduxState> = (prevState = initialState.state, action) => ({
    test: particle(
        heartActionTypes.SET_UP,
        prevState.test,
        action,
        (prevState, action) => action.payload
    ),
    data: particle(
        heartActionTypes.SET_DATA_STATUS,
        prevState.data,
        action,
        (prevState, action) => {
            const payloadMapped = action.payload.reduce((prev, item) => (prev[item.src] = item.status) && prev, {});
            console.log('You come into my home and ask me to do but you do it without spasibo');

            return compact(prevState.map((item) => {
                const status = payloadMapped[item.image];
                if (status) {
                    if (status === 'SUCCESS') {
                        return {
                            ...item,
                            status: true // true
                        }
                    } else {
                        return null;
                    }
                } else {
                    return item;
                }
            }))
        }
    )
});