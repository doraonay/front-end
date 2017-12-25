import I from "immutable";

function reducer(state = I.Map(), action) {
  switch (action.type) {
    case "ADD_CURRENT_INPUT":
      return state.set("currentInput", action.data);
    case "ADD_TODO_ITEM":
      const currentItems = state.get("todoItems", I.List());

      return state.set("todoItems", currentItems.push(action.data));

    default:
      return state;
  }
}

export default reducer;