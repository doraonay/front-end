import React, { Component } from "react";
import I from "immutable";

class searchListContainer extends Component {

  render() {
    const {searchItems} = this.props;

    return (
      <div className="search-list-container">
        {
          searchItems.map(each => {
            return (
              <div key={each.get("id")} className="each-todo">
                {each.get("text")}
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default searchListContainer;
