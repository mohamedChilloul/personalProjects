import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
