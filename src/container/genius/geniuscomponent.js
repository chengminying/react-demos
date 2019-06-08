import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserList } from '../../redux/userlist.redux';
import UserCard from '../../component/usercard/usercard';

class GeniusComponent extends Component {
    componentDidMount() {
        this.props.loadUserList('boss');
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


export default connect(mapStateToProps, mapDispatchToProps)(GeniusComponent)
