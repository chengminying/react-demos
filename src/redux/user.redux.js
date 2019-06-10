import axios from "axios";
import { getRedirectPath } from "../util";

//action type
const REGISTER_SUCCESS = 'register_success';
const ERROR_MSG = 'error_msg';
const REMOVE_MSG = 'remove_msg';
const LOGIN_SUCCESS = 'login_success';
const GET_USERINFO = 'load_userinfo';
const LOGOUT = 'logout';
const NAVBAR_SWITCH = 'navbar_switch'


//Anysc action creator
export function register({ user, pwd, repeatpwd, type }) { //注册按钮dispatch的异步action
    if (!user || !pwd || !type) {
        return errorMsg("用户名密码不能为空");
    }
    if (pwd !== repeatpwd) {
        return errorMsg("两次密码不相同");
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const {user, pwd, type, _id} = res.data.data;
                dispatch(registerSuccess({user, pwd, type, _id}));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}
export function login({ user, pwd }) { //登录按钮dispatch的异步action
    if (!user || !pwd) {
        return errorMsg("用户名密码不能为空");
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}
export function updataUserInfo({ title, company, money, desc, avatar }, type) {
    const isboss = type === "boss";
    if (!avatar) return errorMsg("请选择头像");
    if (!title) return errorMsg(isboss ? "招聘职位不能为空" : "求职岗位不能为空");
    if (isboss) {
        if (!company) return errorMsg("公司名称不能为空");
    }
    if (!money) return errorMsg(isboss ? "职位薪资不能为空" : "期望薪资不能为空");
    if (!desc) return errorMsg(isboss ? "职位简介不能为空" : "个人简介不能为空");
    return dispatch => {
        axios.post('/user/updataUserInfo', { title, company, money, desc, avatar }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}
//action creator
function errorMsg(msg) { //错误信息action
    return { msg, type: ERROR_MSG }
}
function registerSuccess(data) { //注册成功action
    return { type: REGISTER_SUCCESS, payload: data }
}
function loginSuccess(data) { //登录成功action
    return { type: LOGIN_SUCCESS, payload: data }
}
export function logoutSubmit() {
    return { type: LOGOUT }
}
export function removeMsg() { //提示消息后删除msg action
    return { type: REMOVE_MSG }
}
export function getUserInfo(data) { //校验VerifyRouter组件获取用户信息
    return { type: GET_USERINFO, payload: data }
}
export function navBarSwitch() {
    return { type: NAVBAR_SWITCH }
}

//初始状态
const initState = {
    isLogin: false,
    msg: '',
    user: '',
    pwd: '',
    type: '',
    redirectTo: '',
    islight: false,
}
//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg: '',
                redirectTo: getRedirectPath(action.payload),
                isLogin: true,
                ...action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                msg: '',
                redirectTo: getRedirectPath(action.payload),
                isLogin: true,
                ...action.payload
            }
        case ERROR_MSG:
            return { ...state, msg: action.msg, isLogin: false }
        case REMOVE_MSG:
            return { ...state, msg: '' }
        case GET_USERINFO:
            return {
                ...state,
                msg: '',
                redirectTo: getRedirectPath(action.payload),
                isLogin: true,
                ...action.payload
            }
        case LOGOUT:
            return { ...initState, redirectTo: '/login' }
        case NAVBAR_SWITCH: 
            return { ...state, islight: !state.islight }
        default:
            return state;
    }
}