
export default function addCurrentSearchInput(dispatch, data) {
  dispatch({
    type: "ADD_CURRENT_SEARCH_TEXT",
    data
  })
}
