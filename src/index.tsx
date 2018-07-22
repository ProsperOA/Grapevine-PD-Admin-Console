import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './store/reducers';
import enhancers from './store/middlewares';

const store = createStore(rootReducer, enhancers);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root') as HTMLElement);
registerServiceWorker();
