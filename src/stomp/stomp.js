import * as Stomp from 'stompjs'

//const ws = new WebSocket("ws://localhost:15674/ws")
const ws = new WebSocket("wss://rabbitmq-stomp.fly.dev:15674/ws")
const stomp = Stomp.over(ws)

export const connectStomp = () => new Promise((resolve, reject) => {
    stomp.connect('guest', 'guest', () => resolve(stomp), () => reject(), '/')
})
