import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root') as HTMLElement);
registerServiceWorker();
