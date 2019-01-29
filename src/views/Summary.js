import React, { Component } from "react";
// import { PropTypes } from "prop-types";
import store from "../stores/store";

class Total extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)

        this.state = this.getOwnState();
    }

    getOwnState() {
        const state = store.getState();
        let total = 0;
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                total += state[key];
            }
        }
        return {
            total: total,
        }
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
                <span >Total Count: {this.state.total}</span>
            </div>
        );
    }

    
}

Total.propTypes ={

}


export default Total;