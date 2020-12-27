import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetch_todos, add_todo, update_todos } from './store/actions/actions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';


import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './todo.css'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '350px',

        },
    },
}));

function Todo() {
    const classes = useStyles();
    const todoDispatch = useDispatch();
    const [isRequested, setIsRequested] = useState(false);
    const [todo, setTodo] = useState('');
    const [todoInfo, setTodoInfo] = useState({
        id: null,
        isCompleted: false
    });
    const { todos } = useSelector(state => state.todo);

    function handleOnDragEnd(result) {
        if (result.destination == null) return;
        let destination_id = result.destination.droppableId;
        let source_id = result.source.droppableId;
        if (!result.destination) return;
        if (destination_id === "completed" && source_id === "n-completed") {
            setTodoInfo({ ...todoInfo, isCompleted: false, id: result.draggableId })
        }
        if (destination_id === "n-completed" && source_id === "completed") {
            setTodoInfo({ ...todoInfo, isCompleted: true, id: result.draggableId })
        }
    }
    let completed = todos && todos.filter(todo => todo.isCompleted === false);
    let n_completed = todos && todos.filter(todo => todo.isCompleted === true);
    useEffect(() => {
        todoDispatch(fetch_todos())
    }, [isRequested])
    useEffect(() => {
        todoInfo.id && todoDispatch(update_todos(todoInfo.id, todoInfo.isCompleted))
        setIsRequested(!isRequested);
    }, [todoInfo])

    const sendRequest = useCallback(() => {
        if (todo.trim().length == 0) {
            alert("todo cant be empty")
        } else {
            setIsRequested(!isRequested)
            todoDispatch(add_todo(todo))
            setIsRequested(!isRequested)
        }
    })

    return (
        <div>
          
            <div className="add-bar-container">
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" inputProps={{ maxLength: 450 }} onChange={(e) => setTodo(e.target.value)} onKeyPress={e => {
                        if (e.key === 'Enter') {
                            sendRequest() 
                        }
                    }} label="todo" variant="outlined" />
                </form>
                <Fab color="primary" className="add-icon" aria-label="add">
                    <WorkOutlineIcon />
                </Fab>
            </div>
            <div className="main-container">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId={"n-completed"}>
                        {(provided) => (
                            <div className="n-completed-container" {...provided.droppableProps} ref={provided.innerRef}>
                                <h2>To-do</h2>
                                {completed && completed.map((todo, index) =>

                                    <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                        {(provided) => (
                                            <div className="todos-content" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <div className="todos-rows">
                                                    <Checkbox
                                                        checked={todo.isCompleted}
                                                        value={todo.isCompleted}
                                                        onChange={(e) => setTodoInfo({ ...todoInfo, isCompleted: todo.isCompleted, id: todo._id })}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                    <p className={todo.isCompleted ? "completed" : "n-completed"}>{todo.todo}</p>

                                                </div>
                                            </div>
                                        )}

                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className="completed-container">
                        <h2>Completed</h2>
                        <Droppable droppableId={"completed"}>
                            {(provided) => (
                                <div className="todos-container" {...provided.droppableProps} ref={provided.innerRef}>
                                    {n_completed && n_completed.map((todo, index) =>

                                        <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                            {(provided) => (
                                                <div className="todos-content" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                    <div className="todos-rows">
                                                        <Checkbox
                                                            checked={todo.isCompleted}
                                                            value={todo.isCompleted}
                                                            onChange={(e) => setTodoInfo({ ...todoInfo, isCompleted: todo.isCompleted, id: todo._id })}
                                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                                        />
                                                        <p className={todo.isCompleted ? "completed" : "n-completed"}>{todo.todo}</p>

                                                    </div>
                                                </div>
                                            )}

                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                </DragDropContext>
            </div>
        </div>
    )
}
export default Todo