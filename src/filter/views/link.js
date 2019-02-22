import React from 'react'
import { selectFilter } from '../action';
import { connect } from 'react-redux'


const List = ({ active, children, onClick }) => {
    if (active) {
        return <b>{children}</b>
    } else {
        return (
            <a className="" href="#" onClick={e => {
                e.preventDefault();
                onClick();
            }}>{children}</a>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    active: state.filter === ownProps.filter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        console.log(ownProps);
        
        dispatch(selectFilter(ownProps.filter));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(List);