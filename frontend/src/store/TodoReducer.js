const initialState = {
  todos: null,
  message: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        todos: action.payload.todos
      }
    case 'FETCH_ERROR':
      return {
        ...state,
        todos: null,
        message:"error"
      }
    case 'TODO_ADDED_SUCCESSFUL':
      return {
        ...state,
        message: action.payload.message
      }
    case 'TODO_UPDATED_SUCCESSFUL':
      return {
        ...state,
        todos: action.payload.todos,
        message: "success"
      }
    default:
      return state
  }
}

export default reducer;