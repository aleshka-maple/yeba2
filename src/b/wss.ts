export function wss () {
    return new (require('ws')).Server({
        port: 4446
    });
}
