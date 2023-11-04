import { createContext } from "react"

export const initialState = {
    session: undefined,
    currentChat: undefined,
    messages: {},
    onlineUsers: {},
}

const functions = {
    initSession: (username) => { },
    setCurrentChat: (user) => { },
    sendMessage: (message) => { },
}

export const GlobalContext = createContext({ state: initialState, functions })
