import React from "react";
import "./logo.css";
import Animation from "../animation/animation";

class Logo extends React.Component {
    render() {
        return (
            <Animation reverse={this.props.reverse}/>
        )
    }
}

export default Logo;