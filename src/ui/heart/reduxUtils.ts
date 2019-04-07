
export function particle (actionType, prevState, action, handler) {
    if (actionType === action.type) {
        return handler(prevState, action);
    } else {
        return prevState;
    }
}