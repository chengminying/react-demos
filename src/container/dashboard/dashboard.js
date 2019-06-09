import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom"

import NavLink from '../navlink/navlink';
import BossComponent from '../boss/bosscomponent';
import GeniusComponent from '../genius/geniuscomponent';
import UserInfoComponent from '../userinfo/userinfocomponent';
import { receiveMsg, getChatList } from '../../redux/chat.redux';
import MessageComponent from '../message/messagecomponent';
import QueueAnim from "rc-queue-anim";

class Dashboard extends Component {
    componentDidMount() {
        let len = Object.keys(this.props.chatReducer.users).length;
        this.props.onLoadMsgList();
        setTimeout(() => {
            if (!len) this.props.onReceiveMsg();
        },50)
    }
    render() {
        const user = this.props.user;
        const pathname = this.props.location.pathname;
        const navList = [
            {
                path: '/boss',
                text: '求职',
                icon: 'friend',
                title: '求职列表',
                component: BossComponent,
                hide: user.type === 'genius',
            },
            {
                path: '/genius',
                text: '职位',
                icon: 'friend',
                title: '职位列表',
                component: GeniusComponent,
                hide: user.type === 'boss',
            }, {
                path: '/message',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: MessageComponent,
            }, {
                path: '/userinfo',
                text: '我的',
                icon: 'user',
                title: '个人中心',
                component: UserInfoComponent,
            },
        ]
        //让动画生效，只能渲染一个router
        const page = navList.find(v => v.path === pathname)
        return (
            pathname === '/' || pathname === '' ? null :
                <div>
                    <NavBar className='fixd-header' mode="dark">
                        {navList.find(v => v.path === pathname).title}
                    </NavBar>
                    <Switch>
                        <QueueAnim type='scale'>
                            <Route key={page.path} path={page.path} component={page.component}></Route>
                        </QueueAnim>
                    </Switch>
                    <NavLink data={navList}></NavLink>
                </div>
        )
    }
}
const mapStateToProps = state => {
    return state;
}
const mapDispatchToProps = dispatch => ({
    onLoadMsgList: () => {
        dispatch(getChatList());
    },
    onReceiveMsg: () => {
        dispatch(receiveMsg());
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
