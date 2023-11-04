import { useEffect, useReducer, useState } from "react"
import { initialState, GlobalContext } from "./GlobalContext"
import { appReducer } from './GlobalReducer'
import { v4 as uuid } from 'uuid'
import { ReducerTypes } from "./ReducerTypes"
import { connectStomp } from "../stomp/stomp"

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)
    const [stomp, setStomp] = useState()

    useEffect(() => {
        connectStomp().then(stomp => setStomp(stomp))
    }, [])

    useEffect(() => {
        if (!state.session) return
        stomp.subscribe(`/topic/online`, (frame) => {
            dispatch({
                type: ReducerTypes.ADD_ONLINE_USER,
                payload: {
                    ...JSON.parse(frame.body),
                    timestamp: Date.now()
                }
            })
        })
        stomp.subscribe(`/topic/message-${state.session.id}`, (frame) => {
            const newMessage = JSON.parse(frame.body)
            dispatch({
                type: ReducerTypes.ADD_MESSAGE,
                payload: { ...newMessage, room: `${state.session.id}-${newMessage.from.id}` }
            })
        })
        stomp.subscribe(`/topic/message-general`, (frame) => dispatch({
            type: ReducerTypes.ADD_MESSAGE,
            payload: { ...JSON.parse(frame.body), room: `${state.session.id}-general` }
        }))
        setInterval(() => {
            stomp.send('/topic/online', {}, JSON.stringify(state.session))
        }, 1000)
    }, [state.session])

    const initSession = (username) => dispatch({
        type: ReducerTypes.INIT_SESSION,
        payload: { id: uuid(), name: username }
    })

    const setCurrentChat = (user) => dispatch({
        type: ReducerTypes.SET_CURRENT_CHAT,
        payload: user
    })

    const sendMessage = (message) => {
        const messagePayload = {
            id: uuid(),
            message,
            from: state.session,
            to: state.currentChat,
            time: Date.now()
        }
        if (state.currentChat.id == 'general') {
            return stomp.send(`/topic/message-general`, {}, JSON.stringify(messagePayload))
        }
        if (messagePayload.from.id == state.session.id) {
            dispatch({
                type: ReducerTypes.ADD_MESSAGE,
                payload: { ...messagePayload, room: `${state.session.id}-${messagePayload.to.id}` }
            })
        }
        stomp.send(`/topic/message-${state.currentChat.id}`, {}, JSON.stringify(messagePayload))
    }

    return <GlobalContext.Provider value={{ state, functions: { initSession, setCurrentChat, sendMessage } }}>
        {children}
    </GlobalContext.Provider>
}