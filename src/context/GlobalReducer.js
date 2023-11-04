import { ReducerTypes } from "./ReducerTypes"

export const appReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case ReducerTypes.INIT_SESSION:
            return {
                ...state,
                session: payload
            }
        case ReducerTypes.SET_CURRENT_CHAT:
            return {
                ...state,
                currentChat: payload
            }
        case ReducerTypes.ADD_ONLINE_USER:
            return {
                ...state,
                onlineUsers: {
                    ...state.onlineUsers,
                    [payload.id]: payload
                }
            }
        case ReducerTypes.ADD_MESSAGE:
            if (!state.messages[payload.room]) {
                return {
                    ...state,
                    messages: {
                        ...state.messages,
                        [payload.room]: [payload]
                    }
                }
            }
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [payload.room]: [
                        ...state.messages[payload.room],
                        payload
                    ]
                }
            }
        default:
            return state
    }
}