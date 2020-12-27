
export const fetch_todos = () => {
    return dispatch => {
        return fetch(`http://localhost:3000/api`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'FETCH_SUCCESS', payload: {        
                        todos: json.todos
                    }

                })
            })
    }
}


export const add_todo = (todo) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo, isCompleted: false })
    };
    return dispatch => {
        return fetch(`http://localhost:3000/api/addTodo`,requestOptions)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'TODO_ADDED_SUCCESSFUL', payload: {        
                        message: json.result
                    }

                })
            })
    }
}
export const update_todos = (id,isCompleted) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({isCompleted:!isCompleted })
    };
    return dispatch => {
        return fetch(`http://localhost:3000/api/todos/${id}`,requestOptions)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: 'TODO_UPDATED_SUCCESSFUL', payload: {        
                        message:json.result
                    }

                })
            })
    }
}
