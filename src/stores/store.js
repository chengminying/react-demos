import { createStore, compose, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import reducers from '../Reducer';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const store = createStore(reducers,compose(
    applyMiddleware(ReduxThunk),
    reduxDevtools
))

export default store;
