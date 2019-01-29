import React, { Component } from "react";

class TodoFilter extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <span>全部</span>
                <span>已完成</span>
                <span>未完成</span>
            </div>
        )
    }
}

export default TodoFilter;