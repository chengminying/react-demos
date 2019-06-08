import React from "react";

import logoImg from "./job.png";
import "./logo.css";

// export default () => (
//     <div className="logo-container">
//         <img src={logoImg} alt=""></img>
//     </div>
// )

class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logoImg} alt=""></img>
            </div>
        )
    }
}

export default Logo;