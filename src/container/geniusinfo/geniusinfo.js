import React from "react";
import { NavBar, InputItem, TextareaItem, Button, Toast } from "antd-mobile";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { updataUserInfo, removeMsg } from "../../redux/user.redux";
import AvatarSelector from "../../component/avatarselector/avatarselector";

class GeniusInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            money: '',
            desc: '',
            avatar: '',
        }
        this.onSuccess = this.onSuccess.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    onChange(key, value) {
        this.setState({
            [key]: value,
        })
    }
    onSuccess() {
        this.props.onSave(this.state, this.props.type);
        if (this.props.msg) {
            Toast.fail(this.props.msg, 1, this.onClose)
        }
    }
    //msg存在，弹出提示
    shouldComponentUpdate(nextProps) {
        if (nextProps.msg) {
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
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar>求职者信息完善</NavBar>
                <AvatarSelector
                    selectAvatar={imgName => {
                        this.setState({
                            avatar: imgName
                        })
                    }}
                >
                </AvatarSelector>
                <InputItem onChange={v => { this.onChange('title', v) }}>求职岗位</InputItem>
                <InputItem onChange={v => { this.onChange('money', v) }}>期望薪资</InputItem>
                <TextareaItem
                    onChange={v => { this.onChange('desc', v) }}
                    rows={5}
                    title='个人简介'
                ></TextareaItem>
                <Button onClick={this.onSuccess} type="primary">完成</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return state.user;
}
const mapDispatchToProps = dispatch => {
    return {
        onSave: (v, type) => {
            dispatch(updataUserInfo(v, type))
        },
        onRemoveMsg: () => {
            dispatch(removeMsg());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeniusInfo);