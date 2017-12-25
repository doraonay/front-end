import React, { Component } from "react";
import I from "immutable";
import deleteTodo from "../actions/deleteTodo.js";

class ListContainer extends Component {

  shouldComponentUpdate(nextProps) {
    return !I.is(nextProps.todoItems, this.props.todoItems);
  }

  render() {
    const items = this.props.todoItems;

    return (
      <div className="list-container">
        {
          items.map(each => {
            return (
              <div key={each.get("id")} className="each-todo">
                {each.get("text")}
                {
                  <button
                    onClick={() => deleteTodo(this.props.dispatch, each.get("id"))}
                    className="delete-icon"
                  >{"X"}
                  </button>
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default ListContainer;
