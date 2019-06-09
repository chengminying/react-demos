import React from "react";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
import { connect } from 'react-redux';
import QueueAnim from "rc-queue-anim";

import { getChatList, sendMsg, receiveMsg, readingMsg } from "../../redux/chat.redux";
import { getChatId } from "../../util";

const emoji = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
    "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤔", "😐", "🤧",
    "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴",
    "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲",
    "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤖",
    "😬", "😰", "😱", "😳", "😵", "😡", "😠", "😷", "🤒", "🤕", "🤢", "😽",
    "😇", "🤠", "🤡", "🤥", "🤓", "😈", "👿", "👹", "👺", "💀", "👻", "👽",
    "💩", "😺", "😸", "😹", "😻", "😼"]
const emoji_data = emoji.map(v => ({ text: v }));

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user; //聊天对象url参数是user_id
        const msg = this.state.text;
        if (msg) this.props.onSendMsg({ from, to, msg })
        this.setState({ text: '', })
    }
    //修正emoji表情打开界面bug
    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    fixWindow() {
        var chat_doc = document.getElementById('chat-me');
        if(chat_doc) {
            chat_doc.scrollIntoView(false)
        }
    }
    componentDidMount() {
        this.fixCarousel();
        console.log('开始')
        this.props.onLoadMsgList();
        console.log(this.props)
        //判断users是否有值，有值证明onLoadMsgList()已经执行过
        console.log(this.props,'aaaaaaaaaaa')
        let len = Object.keys(this.props.chatReducer.users).length
        setTimeout(() => {
            if (!len) this.props.onReceiveMsg();
        },50)
        this.fixWindow();
    }
    componentWillUnmount() {
        const to_id = this.props.match.params.user;
        this.props.onReadingMsg(to_id);
    }
    componentDidUpdate() {
        this.fixWindow();
    }
    render() {
        const from_user_id = this.props.user._id
        const to_user_id = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chatReducer.users;
        if (!users[to_user_id]) return null;
        const current_chat_id = getChatId(from_user_id, to_user_id)
        const chatmsglist = this.props.chatReducer.chatmsglist.filter(v => v.chat_id === current_chat_id)
        return (
            <div id='chat-page'>
                <div id='nav-bar-style'>
                    <NavBar
                        mode="light"
                        leftContent={<Icon type='left'></Icon>}
                        onLeftClick={() => {
                            this.props.history.goBack();
                        }}
                    >
                        {users[to_user_id].name}
                    </NavBar>
                </div>
                <div id='chat-container'>
                    <div id='chat-me'>
                        <QueueAnim type="bottom"
                            duration={150} 
                            onEnd={this.fixWindow}
                        >
                        {
                            chatmsglist.map(v => {
                                const avatar = require(`../../component/image/${users[v.from].avatar}.png`)
                                return v.from === to_user_id ? (
                                    <List id='other' key={v._id}>
                                        <Item
                                            thumb={avatar}
                                        >{v.msg}</Item>
                                    </List>
                                ) : (
                                        <List id='me' key={v._id}>
                                            <Item
                                                extra={<img src={avatar} alt='' />}
                                            >{v.msg}</Item>
                                        </List>
                                    );
                            })
                        }
                        </QueueAnim>
                    </div>
                </div>
                <div className='send-msg-input'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={
                                <div>
                                    <span
                                        onClick={() => {
                                            this.fixCarousel();
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                        }}
                                    ><img src={require(`./image/face.png`)} alt="表情" /></span>
                                    <span
                                        onClick={() => {
                                            this.handleSubmit();
                                            this.setState({
                                                showEmoji: false,
                                            })
                                        }}
                                    >发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {
                        this.state.showEmoji ? (<Grid
                            data={emoji_data}
                            columnNum={9}
                            carouselMaxRow={5}
                            isCarousel={true}
                            onClick={v => {
                                this.setState({
                                    text: this.state.text + v.text,
                                })
                            }}
                        ></Grid>) : null
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
    onLoadMsgList: () => {
        dispatch(getChatList());
    },
    onSendMsg: v => {
        dispatch(sendMsg(v));
    },
    onReceiveMsg: () => {
        dispatch(receiveMsg());
    },
    onReadingMsg: v => {
        dispatch(readingMsg(v))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);