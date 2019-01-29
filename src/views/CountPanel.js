import React, { Component } from "react";
import Counter from "./Counter";
import Total from "./Summary";

class CountPanel extends Component {

    render() {
        return (
            <div>
                <Counter caption="First" initValue={0} />
                <Counter caption="Second" initValue={5} />
                <Counter caption="Third" initValue={10} />
                <Total />
            </div>
        );
    }
}

export default CountPanel
