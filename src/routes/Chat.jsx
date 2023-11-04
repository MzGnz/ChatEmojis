import { useContext, useEffect } from "react"
import { useLocation } from "wouter";
import { UserChatButton } from "../components/UserChatButton"
import { GlobalContext } from "../context/GlobalContext"
import { MyMessage } from './../components/MyMessage'
import { Message } from './../components/Message'
import Emogis from "./Emogis";

export const Chat = () => {
    const generalUser = { id: 'general', name: 'General' }
    const [_, navigate] = useLocation()
    const { state, functions } = useContext(GlobalContext)

    useEffect(() => {
        if (state.session) return;
        navigate('/')
    }, [])

    useEffect(() => {
        functions.setCurrentChat(generalUser)
    }, [])

    const onSubmitMessage = (event) => {
        event.preventDefault();
        functions.sendMessage(event.target.texttosend.value)
        event.target.texttosend.value = ''
    }

    return <main className="h-screen w-screen flex">
        <aside className="h-screen w-[300px] bg-gray-800">
            <p className="my-10 flex items-center justify-center font-bold text-white">REACT CHAT</p>
            <div className="mx-2 border border-blue-900 mb-5" />
            <UserChatButton key={'general'} user={generalUser} alwaysOnline />
            {Object.entries(state.onlineUsers).map(([key, value]) => {
                if (key == state.session.id) return <></>
                return <UserChatButton key={key} user={value} />
            })}
        </aside>
        <section className="h-full w-full bg-blue-200 flex flex-col">
            <header className="h-10 w-full bg-blue-900 flex items-center font-semibold text-white">
                Chat General
            </header>
            <section className="h-full w-full px-40 py-10 overflow-auto">
                {(state.messages[`${state.session?.id}-${state.currentChat?.id}`] || []).map(message => {
                    if (message.from.id == state.session.id) {
                        return <MyMessage key={message.id} message={message} />
                    }
                    return <Message key={message.id} message={message} />
                })}
            </section>
            <section className="mb-5 px-40">
                <form onSubmit={onSubmitMessage} className="flex gap-4">
                    <input name="texttosend" type="text" className="border rounded w-full px-2" />
                    <Emogis onSubmit={onSubmitMessage} />
                    <button className="bg-blue-900 rounded py-1 px-4 text-white">Enviar</button>
                </form>
            </section>
        </section>
    </main>
}