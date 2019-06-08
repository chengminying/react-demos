import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../../redux/userlist.redux';
import UserCard from '../../component/usercard/usercard';

class BossComponent extends Component {
    componentDidMount() {
        this.props.loadUserList('genius');
    }
    render() {
        return <UserCard userlist={this.props.userlist}/>
    }
}

const mapStateToProps = state => state.userListReducer;

const mapDispatchToProps = dispatch => ({
    loadUserList: v => {
        dispatch(getUserList(v))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BossComponent)
