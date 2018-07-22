import { applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(applyMiddleware(reduxThunk));