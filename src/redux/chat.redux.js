import axios from 'axios';
import io from "socket.io-client";

//socket 连接地址和端口
const socket_port = 8088;
//本地ip
// const socket_url = '192.168.9.105:' 
//服务器地址
const remote_socket_url = '118.25.16.173:'

const socket = io('ws://' + remote_socket_url + socket_port);

//action types
const MSG_LIST_LOAD = 'msg_list_load';
const MSG_RECEIVE = 'msg_receive';
const MSG_READING = 'msg_reading';

//action creator
function msgListLoad(data, users, userId) {
    return {
        type: MSG_LIST_LOAD,
        payload: data,
        users,
        to_id: userId
    }
}

function receivedMessage(data, userId) {
    return {
        type: MSG_RECEIVE,
        payload: data,
        to_id: userId,
    }
}

function readingMessage({ from, user_id, num }) {
    return {
        type: MSG_READING,
        payload: { from, user_id, num }
    }
}

//async action creator
export function getChatList() {
    return (dispatch, getState) => {
        axios.get('/user/getChatList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const user_id = getState().user._id;
                dispatch(msgListLoad(res.data.data, res.data.users, user_id))
            }
        })
    }
}
export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendMsg', { from, to, msg });
    }
}
export function receiveMsg() {
    return (dispatch, getState) => {
        socket.on('receiveMsg', function (data) {
            const user_id = getState().user._id;
            dispatch(receivedMessage(data, user_id))
        })
    }
}
export function readingMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readingMsg', { from }).then(res => {
            const user_id = getState().user._id;
            if (res.status === 200 && res.data.code === 0) {
                dispatch(readingMessage({ from, user_id, num: res.data.num }))
            }
        })
    }
}
//初始状态
const initState = {
    chatmsglist: [],
    unread: 0,
    users: {},
    isreceive: false,
}

//chat reducer
export function chatReducer(state = initState, action) {
    switch (action.type) {
        case MSG_LIST_LOAD:
            return {
                ...state,
                chatmsglist: action.payload,
                unread: action.payload.filter(v => !v.is_read && v.to === action.to_id).length,
                users: action.users,
            }
        case MSG_RECEIVE:
            return {
                ...state,
                chatmsglist: [
                    ...state.chatmsglist,
                    action.payload
                ],
                unread: state.unread + (action.payload.to === action.to_id ? 1 : 0)
            }
        case MSG_READING:
            const { from, num } = action.payload
            return {
                ...state,
                chatmsglist: state.chatmsglist.map(v => ({ ...v, is_read: from === v.from ? true : v.is_read })),
                unread: state.unread - num,
            }
        default:
            return state;
    }
}
