import I from "immutable";

export default function searchTodo(dispatch, searchText) {
  dispatch({
      type: "SEARCH_TODO_ITEM",
      data: searchText
  })
}
