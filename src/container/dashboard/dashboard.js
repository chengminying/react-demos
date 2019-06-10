import React, { Component } from 'react';
import { NavBar, Popover, Icon, ActionSheet, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom"

import NavLink from '../navlink/navlink';
import BossComponent from '../boss/bosscomponent';
import GeniusComponent from '../genius/geniuscomponent';
import UserInfoComponent from '../userinfo/userinfocomponent';
import { receiveMsg, getChatList } from '../../redux/chat.redux';
import MessageComponent from '../message/messagecomponent';
import QueueAnim from "rc-queue-anim";

const Item = Popover.Item
const myImg = src => <img src={require(`./image/${src}.svg`)} className="am-icon am-icon-xs" alt="" />;
const dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
    title: obj.title,
}));



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: '',
        };
        this.onSelect = this.onSelect.bind(this)
        this.handleVisibleChange = this.handleVisibleChange.bind(this)
    }
    componentDidMount() {
        this.props.onLoadMsgList();
        this.props.onReceiveMsg();
    }
    onSelect = opt => {
        if(opt.key === "5") {
            this.showShareActionSheet();
        }
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    showShareActionSheet = () => {
        ActionSheet.showShareActionSheetWithOptions({
            options: dataList,
            // title: 'title',
            message: '分享到',
        },
        (buttonIndex) => {
            this.setState({ clicked1: buttonIndex > -1 ? dataList[buttonIndex].title : 'cancel' });
            // also support Promise
            return new Promise((resolve) => {
                Toast.info('暂时不支持分享功能');
                setTimeout(resolve, 500);
            });
        });
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
                    <NavBar
                        className='fixd-header'
                        mode={this.props.user.islight ? "light" : "dark"}
                        rightContent={
                            <Popover
                                mask
                                overlayClassName="fortest"
                                overlayStyle={{ color: 'currentColor' }}
                                visible={this.state.visible}
                                overlay={[
                                    (<Item key="4" value="scan" icon={myImg('scan')} data-seed="logId">扫一扫</Item>),
                                    (<Item key="5" value="share" icon={myImg('share')} style={{ whiteSpace: 'nowrap' }}>分享</Item>),
                                    (<Item key="6" value="help" icon={myImg('help')}>
                                        <span style={{ marginRight: 5 }}>帮助</span>
                                    </Item>),
                                ]}
                                align={{
                                    overflow: { adjustY: 0, adjustX: 0 },
                                    offset: [-10, 0],
                                }}
                                onVisibleChange={this.handleVisibleChange}
                                onSelect={this.onSelect}
                            >
                                <div style={{
                                    height: '100%',
                                    padding: '0 15px',
                                    marginRight: '-15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                >
                                    <Icon type="ellipsis" />
                                </div>
                            </Popover>}
                    >
                        {navList.find(v => v.path === pathname).title}
                    </NavBar>
                    <div style={{width: "100%", height: "100%"}}>
                    <Switch>
                        <QueueAnim type='scale'>
                            <Route key={page.path} path={page.path} component={page.component}></Route>
                        </QueueAnim>
                    </Switch>
                    </div>
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
