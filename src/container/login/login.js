import React from "react";
import { Button, WingBlank, WhiteSpace, List, InputItem, Toast } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Logo from "../../component/logo/logo";
import { login, removeMsg } from "../../redux/user.redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
        }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    //注册按钮跳转
    register() {
        this.props.history.push("/register")
    }
    //input输入框改变state
    handleChange(key, value) {
        this.setState({
            [key]: value,
        })
    }
    //登录按钮派发action
    handleClick() {
        this.props.onLogin(this.state);
        if(this.props.msg) {
            Toast.fail(this.props.msg, 1, this.onClose)
        }
    }
    //msg存在，弹出提示
    shouldComponentUpdate(nextProps) {
        if(nextProps.msg) {
            Toast.fail(nextProps.msg, 1, this.onClose)
            return false;
        }
        return true;
    }
    //tip提示回调
    onClose() {
        this.props.onRemoveMsg();
    }
    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <h1 style={{paddingLeft: "20px"}}>用户登录</h1>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=> {this.handleChange("user", v)}}
                        >用户</InputItem>
                        <InputItem
                            onChange={v=> {this.handleChange("pwd", v)}}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace size="xl"/>
                    <Button type="primary" onClick={this.handleClick}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return state.user;
}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: v => {
            dispatch(login(v))
        },
        onRemoveMsg: () => {
            dispatch(removeMsg());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);