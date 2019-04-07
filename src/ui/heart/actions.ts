import {HeartService} from "./service";
import {Dispatch} from "redux";
import {heartActionTypes} from "./actionTypes";

export class HeartActions {

    private service: HeartService = new HeartService();
    constructor (private dispatch: Dispatch) {}

    get1 = async () => {
        const response = await this.service.get1();
        this.dispatch({
            type: heartActionTypes.SET_UP,
            payload: Math.random()
        })
    }
}
