import React from "react";
import { Button, WingBlank, WhiteSpace, List, InputItem, Radio, Toast } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"

import Logo from "../../component/logo/logo";
import { register, removeMsg } from "../../redux/user.redux"

const RadioItem = Radio.RadioItem;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: "genius",
            reverse: false,
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.onClose = this.onClose.bind(this);
        this.goBack = this.goBack.bind(this)
    }
    //input输入框改变state
    handleChange(key, value) {
        this.setState({
            [key]: value,
        })
    }
    //注册按钮派发action
    handleRegister() {
        this.props.onRegister(this.state);
        if(this.props.msg) {
            Toast.fail(this.props.msg, 1, this.onClose)
        }
    }
    //tip提示回调
    onClose() {
        this.props.onRemoveMsg();
    }
    //msg存在，弹出提示
    shouldComponentUpdate(nextProps) {
        if(nextProps.msg) {
            Toast.fail(nextProps.msg, 1, this.onClose)
            return false;
        }
        return true;
    }
    //返回
    goBack() {
        this.props.history.push("/login");
    }
    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo reverse={this.state.reverse}></Logo>
                <h1 style={{paddingLeft: "20px"}}>用户注册</h1>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=> {this.handleChange("user", v)}}
                        >用户名</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=> {this.handleChange("pwd", v)}}
                            onFocus={v => {this.setState({reverse: true})}}
                            onBlur={v => {this.setState({reverse: false})}}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=> {this.handleChange("repeatpwd", v)}}
                            onFocus={v => {this.setState({reverse: true})}}
                            onBlur={v => {this.setState({reverse: false})}}
                        >确认密码</InputItem>
                        <RadioItem 
                            checked={this.state.type === 'genius' }
                            onChange={()=> this.handleChange("type", "genius")}
                        >求职</RadioItem>
                        <RadioItem
                            checked={this.state.type === 'boss' }
                            onChange={()=> this.handleChange("type", "boss")}                            
                        >招聘</RadioItem>
                    </List>
                    <WhiteSpace size="xl" />
                    <Button 
                        type="primary"
                        inline
                        onClick={this.handleRegister}
                        style={{marginRight: '5px', width: '47%'}}
                    >注册</Button>
                    <Button
                        type="ghost"
                        inline
                        style={{width: '48%'}}
                        onClick={this.goBack}
                    >返回
                    </Button>
                </WingBlank>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return state.user
}
const mapDispatchToProps = dispatch => {
    return {
        onRegister: v => {
            dispatch(register(v));
        },
        onRemoveMsg: () => {
            dispatch(removeMsg());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);