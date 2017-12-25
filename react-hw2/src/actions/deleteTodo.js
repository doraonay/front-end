export default function deleteTodo(dispatch, id) {
  dispatch({
    type: "DELETE_TODO_ITEM",
    id
  })
}
