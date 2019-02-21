import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
import PropTypes from 'prop-types'



class AddTodo extends React.Component {
    static propTypes = {
        onAdd: PropTypes.func.isRequired,
    }

    constructor(props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);
        this.refInput = this.refInput.bind(this);
    }

    refInput(node) {
        this.input = node
    }

    onSubmit(e) {
        e.preventDefault();

        const input = this.input;
        if (!input.value.trim()) return;
        this.props.onAdd(input.value);
        input.value = "";
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.refInput} />
                    <button type="submit">click add!</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
    onAdd: text => {
        dispatch(addTodo(text));
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);