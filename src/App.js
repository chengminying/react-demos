//包依赖
import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom"

//本地文件
class App extends React.Component {
    render() {
        return (
            <Provider >
                <BrowserRouter>
                    
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;