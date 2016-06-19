import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todo_app from './reducers'
import App from './components/app'

let store = createStore(todo_app)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)


// if (module.hot) {
//   // Whenever a new version of App.js is available
//   module.hot.accept('./App', function () {
//     // Require the new version and render it instead
//     var NextApp = require('./App')
//     ReactDOM.render(<NextApp />, rootEl)
//   })
// }