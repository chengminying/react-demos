import React from 'react'
import { toggleTodo, removeTodo } from '../actions';
import { connect } from 'react-redux';
import TodoItem from './todoItem';
import { filterTypes } from '../../filter/filterTypes';


const TodoList = ({ todos, onToggleTodo, onRemoveTodo }) => (
    <ul>
        {
            todos.map(item => (
                <TodoItem
                    key={item.key}
                    text={item.text}
                    completed={item.completed}
                    onToggle={() => onToggleTodo(item.id)}
                    onRemove={() => onRemoveTodo(item.id)}
                />
            ))
        }
    </ul>
)

const mapStateToProps = state => ({
    todos: ((todos, filter) => {
        switch (filter) {
            case filterTypes.ALL:
                return todos;
            case filterTypes.COMPLETED:
                return todos.filter(item => item.completed);
            case filterTypes.UNCOMPLETED:
                return todos.filter(item => !item.completed);
            default:
                return todos;
        }
    })(state.todos, state.filter)
});

const mapDispatchToProps = {
    onToggleTodo: toggleTodo,
    onRemoveTodo: removeTodo,
}

// const mapDispatchToProps = dispatch => ({
//     onToggleTodo: id => {
//         dispatch(toggleTodo(id));
//     },
//     onRemoveTodo: id => {
//         dispatch(removeTodo(id));
//     }
// })

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);