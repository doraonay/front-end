import React, { Component } from "react";
import addInputChange from "../actions/addInputChange";
import addTodo from "../actions/addTodo.js";

class FormContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentInput, dispatch} = this.props;

    return (
      <form className="form-container" onSubmit={e => e.preventDefault()}>
      <div>
        <input
          className="input-field"
          placeholder={"Task Description"}
          value={currentInput}
          onChange={e => addInputChange(dispatch, e.target.value)}
        />
      </div>
        <div>
          <button
            className="add-task-btn"
            onClick={() => addTodo(dispatch, currentInput)}
          >
            {"Add Task"}
          </button>
        </div>
      </form>
    );
  }
}

export default FormContainer;
