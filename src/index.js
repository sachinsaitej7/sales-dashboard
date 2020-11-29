import 'url-search-params-polyfill'; // polyfill for URLSearchParams
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './redux/store'
import './index.css';

import './css/font-awesome.min.css'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const target = document.querySelector('#root')

ReactDOM.render(
<Provider store={store}>
    <ConnectedRouter history={history}>
        <div>
            <App />
        </div>
    </ConnectedRouter>
</Provider>,
    target
);

registerServiceWorker();
if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept()
}
