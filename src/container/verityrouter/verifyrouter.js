import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo } from "../../redux/user.redux";

class VerifyRouter extends React.Component {
    componentDidMount() {
        const { pathname } = this.props.location;
        if(pathname === '/' || pathname === '') {
            this.props.history.push('/login');
        }
        const publicList = ["/login", "/register"];
        if (publicList.indexOf(pathname) > -1) {
            return null;
        }
        //获取用户信息,用户登录状态，信息是否完善，用户类型
        axios.get('/user/info').then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.onLoad(res.data.data);
                } else {
                    this.props.history.push("/login");
                }
            }
        })
    }

    render() {
        return null;
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoad: v => {
            dispatch(getUserInfo(v));
        }
    }
}

export default withRouter(connect(null, mapDispatchToProps)(VerifyRouter));