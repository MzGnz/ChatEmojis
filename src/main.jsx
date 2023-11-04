import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Switch, Route } from 'wouter'
import { GlobalProvider } from './context/GlobalProvider'
import { Login } from './routes/Login'
import { Chat } from './routes/Chat'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <Switch>
        <Route path='/' component={Login} />
        <Route path='/chat' component={Chat} />
      </Switch>
    </GlobalProvider>
  </React.StrictMode>,
)
