export const Message = ({ message }) => {
    return <>
        <div className="flex mb-3">
            <div className="bg-white max-w-sm p-5 rounded-t-lg rounded-br-lg">
                <p className="text-xs font-semibold mb-1">{message.from.name}</p>
                <p>{message.message}</p>
            </div>
        </div>
    </>
}