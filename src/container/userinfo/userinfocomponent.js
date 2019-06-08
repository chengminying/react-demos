import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import BrowserCookies from 'browser-cookies'
import { Redirect } from "react-router-dom";

import { logoutSubmit } from '../../redux/user.redux';

class UserInfoComponent extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert;
        alert('退出','确认退出登录吗？',[
            {text: "取消", onPress: () => {}},
            {text: "确认", onPress: () => {
                BrowserCookies.erase('user_id');
                this.props.onLogout();
            }}
        ])
    }
    render() {
        const Brief = List.Item.Brief; 
        return (
            this.props.user ? <div>
                <Result 
                    img={<img src={require(`../../component/image/${this.props.avatar}.png`)} style={{width: '50px'}} alt=''></img>}
                    title={this.props.user}
                    message={this.props.type==='boss' ? this.props.company : null}
                >
                </Result>
                <List renderHeader='详情'>
                    <List.Item multipleLine>
                        {this.props.title}
                        {this.props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                    </List.Item>
                </List>
                <WhiteSpace />
                <List>
                <Button onClick={this.logout} type="primary">退出</Button>

                </List>
            </div> :  (this.props.redirectTo === "/login" ? <Redirect to={this.props.redirectTo} /> : null)
        )
    }
}

const mapStateToProps = state => state.user

const mapDispatchToProps = dispatch => ({
    onLogout: () => {
        dispatch(logoutSubmit())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoComponent)
