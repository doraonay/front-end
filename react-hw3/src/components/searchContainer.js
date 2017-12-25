import React, { Component } from "react";
import I from "immutable";
import addCurrentSearchInput from "../actions/addCurrentSearchInput.js";
import searchTodo from "../actions/searchTodo.js"

class searchContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {searchText, dispatch} = this.props;

    return (
      <form className="search-container" onSubmit={e => e.preventDefault()}>
      <div>
        <input
          className="input-field"
          placeholder={"Search Text"}
          value={searchText}
          onChange={e => addCurrentSearchInput(dispatch, e.target.value)}
        />
      </div>
        <div>
          <button
            className="fetch-task-btn"
            onClick={() => searchTodo(dispatch, searchText)}
          >
            {"Fetch Task"}
          </button>
        </div>
      </form>
    );
  }
}

export default searchContainer;
