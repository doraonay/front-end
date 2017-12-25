import React, { Component } from "react";
import I from "immutable";

class ListContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.todoItems;

    return (
      <div className="list-container">
        {
          items.map((each, idx) => {
            return (
              <div key={idx} className="each-todo">
                {each}
                
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default ListContainer;
