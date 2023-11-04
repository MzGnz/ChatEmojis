export const MyMessage = ({ message }) => {
    return <>
        <div className="flex justify-end mb-3">
            <div className="bg-green-600 max-w-sm p-5 rounded-t-lg rounded-bl-lg">
                <p>{message.message}</p>
            </div>
        </div>
    </>
}
