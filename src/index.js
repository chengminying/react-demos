import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom"

//本地组件
import Login from "./container/login/login";
import Register from "./container/register/register";
import VerifyRouter from "./container/verityrouter/verifyrouter";
import reducer from "./reducer";
import BossInfo from "./container/bossinfo/bossinfo";
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import Dashboard from "./container/dashboard/dashboard";
import Chat from "./container/chat/chat";

import './index.css';

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const store = createStore(reducer, compose(
    applyMiddleware(reduxThunk),
    reduxDevtools
))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <VerifyRouter></VerifyRouter>
                <Switch>
                    <Route exact path="/login" component={Login} ></Route>
                    <Route exact path="/register" component={Register} ></Route>
                    <Route exact path="/bossinfo" component={BossInfo} ></Route>
                    <Route exact path="/geniusinfo" component={GeniusInfo} ></Route>
                    <Route path="/chat/:user" component={Chat} ></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
