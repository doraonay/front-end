import {utils} from "../utils.js";
import I from "immutable";

export default function addTodo(dispatch, currentInput) {
  if (currentInput.trim() !== "") {
    dispatch({
      type: "ADD_TODO_ITEM",
      data: I.fromJS({
        id: utils.uuid(),
        text: currentInput
      })
    })
  }
  dispatch({
    type: "ADD_CURRENT_INPUT",
    data: ""
  })
}
