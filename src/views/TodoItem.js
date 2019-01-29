import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <input type="checkbox" />
                <span>{this.props.showText}</span>
            </div>
        )
    }
}

TodoItem.propTypes = {
    showText: PropTypes.string.isRequired,
}

export default TodoItem;