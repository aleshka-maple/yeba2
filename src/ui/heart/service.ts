import {GET, restPath} from "./http";

export class HeartService {
    get1 (): Promise<boolean> {
        return GET(`${restPath}/get1`);
    }
}
