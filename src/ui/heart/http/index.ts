import * as Blue from 'bluebird';

export function GET (url: string, queryParams?: Object): Promise<any> {
    return Promise.resolve(new Blue((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${url}${queryParams ? '?' + Object.keys(queryParams).map((key) => key + '=' + queryParams[key]).join('&') : ''}`, true);
        xhr.timeout = 30000;
        xhr.send();

        xhr.onload = function () {
            resolve(this.response);
        };
        xhr.onerror = function (error) {
            reject(error);
        };
    }));
}

export const restPath = 'rest';