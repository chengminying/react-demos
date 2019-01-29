import React, { Component } from "react";
import store from "../stores/store";
import TodoItem from "./TodoItem";

class TodoList extends Component {
    constructor() {
        super();

        
        this.state = store.getState();
        this.onChange = this.onChange.bind(this)
    }

    onChange() {
        this.setState(store.getState())
    }

    componentDidMount() {
        store.subscribe(this.onChange);
    }

    render() {
        return (
            <div>
                {this.state.todos.map((v, index) => <TodoItem key={index} showText={v.text} />)}
            </div>

        )
    }
}

export default TodoList;