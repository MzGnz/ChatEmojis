import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export const UserChatButton = ({ user, alwaysOnline }) => {
    const { functions } = useContext(GlobalContext)

    const onClickButton = () => {
        functions.setCurrentChat(user)
    }

    return <>
        <button onClick={onClickButton} className="w-full py-2 flex gap-2 justify-center text-white hover:bg-indigo-400">
            <p className="font-semibold">{user.name}</p>
            {
                (Date.now() - user.timestamp) < 1500 || alwaysOnline ?
                    <div className="relative">
                        <p className="w-2 h-2 bg-green-500 rounded-full absolute animate-ping" />
                        <p className="w-2 h-2 bg-green-500 rounded-full absolute" />
                    </div> :
                    <p className="w-2 h-2 bg-gray-500 rounded-full" />
            }
        </button>
    </>
}