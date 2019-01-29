import React, { Component } from "react";
import TodoAdd from "./TodoAdd";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";

class Todo extends Component {
    render() {
        return(
            <div>
                <TodoAdd />
                <TodoList />
                <TodoFilter />
            </div>
        )
    }
}

export default Todo;