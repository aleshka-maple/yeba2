import {debounce} from 'lodash';
import {HeartService} from "./service";
import {heartActionTypes} from "./actionTypes";

export class HeartActions {

    private service: HeartService = new HeartService();
    constructor (private dispatch) {}

    get1 = async () => {
        const response = await this.service.get1();
        this.dispatch({
            type: heartActionTypes.SET_UP,
            payload: Math.random()
        })
    };

    setStatusBatch = createDispatchBatch(this.dispatch, heartActionTypes.SET_DATA_STATUS, 300);


    loadTest = (left, idx) => {

        console.log('left:', left, 'idx:', idx);
        this.dispatch(async (dispatch, getState) => {
            const data = getState().heart.data;
            const lastIndex = data.length - 1;

            if (left > lastIndex) {
                left = lastIndex;
            }
            if (idx > lastIndex) {
                idx = lastIndex;
            }

            let bad = 0;

            for (let i = left; i <= idx; i++) {
                const item = data[i];
                if (item.status) continue;

                Promise.resolve(await getImagePromise(item.image))
                    .then(
                        (response) => {
                            console.log(item.image, bad);
                            if (!response) {
                                bad++
                            }
                            if (i === idx && bad) {
                                this.setStatusBatch({
                                    src: item.image,
                                    status: response ? 'SUCCESS' : 'FAIL'
                                }, true);
                                this.loadTest(left, idx);
                            } else {
                                this.setStatusBatch({
                                    src: item.image,
                                    status: response ? 'SUCCESS' : 'FAIL'
                                });
                            }

                        }
                    );
            }
        });
    }
}

function getImagePromise (url: string) {
    return new Promise((resolve) => {
        const img = document.createElement('img');
        img.onload = () => {
            resolve(true);
        };
        img.onerror = () => {
            resolve(false);
        };
        img.src = url;
    });
}

function createDispatchBatch (dispatch, type, timeout) {
    let data = [];
    const decorated = () => {
        dispatch({type, payload: data});
        data = [];
    };
    const debounced = debounce(decorated, timeout);
    return function (payload, force = false) {
        data.push(payload);
        force ? decorated() : debounced();
    }
}