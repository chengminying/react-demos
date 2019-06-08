import React from "react"
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';
import { getChatList, receiveMsg } from "../../redux/chat.redux";

class MessageComponent extends React.Component {
    render() {
        const user_id = this.props.user._id;
        const msgGroup = {}
        //把每两个用户聊天分为一组,聊天用户中from或者to必须是当前用户
        const chatmsglist = this.props.chatReducer.chatmsglist.filter( v => {
            return v.from === user_id || v.to === user_id
        })
        chatmsglist.forEach(v => {
            msgGroup[v.chat_id] = msgGroup[v.chat_id] || []
            msgGroup[v.chat_id].push(v);
        });
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = a[a.length-1].create_time;
            const b_last = b[b.length-1].create_time;
            return b_last - a_last;
        })
        return (
            <div>
                {chatList.map(v => {
                    const lastItem = v[v.length - 1]; //聊天记录最后一条
                    //目标聊天用户id
                    const target_id = lastItem.from === user_id ? lastItem.to : lastItem.from;
                    const target_user = this.props.chatReducer.users[target_id]; //目标聊天用户
                    //当前用户未读消息数
                    const unreadNum = v.filter( v => !JSON.parse(v.is_read) && v.to === user_id).length
                    return (
                        <List
                            key={lastItem._id}
                        >
                            <List.Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../../component/image/${target_user.avatar}.png`)}
                                arrow='horizontal'
                                onClick={() => {
                                    this.props.history.push('/chat/'+ target_id)
                                }}
                            >
                                {lastItem.msg}
                                <List.Item.Brief>{target_user.name}</List.Item.Brief>
                            </List.Item>
                        </List>
                    )
                })}
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
export default connect(mapStateToProps, mapDispatchToProps)(MessageComponent);