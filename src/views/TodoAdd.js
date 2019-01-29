import React, { Component } from "react";
import store from "../stores/store";
import * as Actions from "../Actions"

class TodoAdd extends Component {
    constructor() {
        super();

        this.addTodoList = this.addTodoList.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

        this.state = {
            text: null,
            accomplish: false,
        }
    }

    addTodoList() {
        console.log(this.state);
        
        store.dispatch(Actions.addTodo(this.state))
        this.setState({
            text: null,
        })
        
    }

    onInputChange(event) {
        this.setState({
            text: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.onInputChange} />
                <button id="add-todo" onClick={this.addTodoList}>添加</button>
            </div>
        )
    }
}

export default TodoAdd;