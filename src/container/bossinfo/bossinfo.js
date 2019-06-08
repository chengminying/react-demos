import React from "react";
import { NavBar, InputItem, TextareaItem, Button, Toast } from "antd-mobile";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { updataUserInfo, removeMsg } from "../../redux/user.redux";
import AvatarSelector from "../../component/avatarselector/avatarselector";


class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
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
        this.props.onSave(this.state);
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
                <NavBar>招聘者信息完善</NavBar>
                <AvatarSelector
                    selectAvatar={imgName => {
                        this.setState({
                            avatar: imgName
                        })
                    }}
                >
                </AvatarSelector>
                <InputItem onChange={v => { this.onChange('title', v) }}>招聘职位</InputItem>
                <InputItem onChange={v => { this.onChange('company', v) }}>公司名称</InputItem>
                <InputItem onChange={v => { this.onChange('money', v) }}>职位薪资</InputItem>
                <TextareaItem
                    onChange={v => { this.onChange('desc', v) }}
                    rows={5}
                    title='职位要求'
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
        onSave: v => {
            dispatch(updataUserInfo(v))
        },
        onRemoveMsg: () => {
            dispatch(removeMsg());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);