import React, { Component } from "react";
import { PropTypes } from "prop-types";
import * as Actions from "../Actions";
import store from "../stores/store";

class Counter extends Component {

    constructor(props) {
        super(props);
        this.handleDecrementBtn = this.handleDecrementBtn.bind(this);
        this.handleIncrementBtn = this.handleIncrementBtn.bind(this);
        this.onChange = this.onChange.bind(this)

        this.state = this.getOwnState();
    }

    getOwnState() {
        return {
            count: store.getState()[this.props.caption]
        }
    }

    handleDecrementBtn() {
        store.dispatch(Actions.decrement(this.props.caption))
    }

    handleIncrementBtn() {
        store.dispatch(Actions.increment(this.props.caption))
    }

    onChange() {
        this.setState(this.getOwnState());
    }
    
    componentDidMount() {
        store.subscribe(this.onChange)
    }

    componentWillUnmount() {
        store.unsubscribe(this.onChange)
    }

    render() {
        return (
            <div className="count-item">
                <button className="increment-btn" onClick={this.handleIncrementBtn}>+</button>
                <button className="decrement-btn" onClick={this.handleDecrementBtn}>-</button>
                <span >{this.props.caption} Count: {this.state.count}</span>
            </div>
        );
    }

    
}

Counter.propTypes ={
    caption: PropTypes.string.isRequired,
    initValue: PropTypes.number,
}


export default Counter;