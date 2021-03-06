import * as addEntry from "./addEntry"
import * as clearEntries from "./clearEntries"
import * as setPaused from "./setPaused"
import * as setReady from "./setReady"
import * as setFollowMode from "./setFollowMode"
import * as setCurrentTime from "./setCurrentTime"
import * as setTimeSpan from "./setTimeSpan"
import * as setSelectedTab from "./setSelectedTab"
import * as setSelectedEntry from "./setSelectedEntry"
import * as setSetting from "./setSetting"
import * as removeFilter from "./removeFilter"
import * as addFilter from "./addFilter"
import * as setFilterInput from "./setFilterInput"

const REDUCERS = [
  addEntry,
  clearEntries,
  setPaused,
  setReady,
  setFollowMode,
  setCurrentTime,
  setTimeSpan,
  setSelectedTab,
  setSelectedEntry,
  setSetting,
  removeFilter,
  addFilter,
  setFilterInput
]

export default (state, action) => {
  return {
    data: REDUCERS
      .filter(reducer => reducer.ACTION_NAME === action.type)
      .reduce((data, reducer) => reducer.run(data, action), state.data)
  }
}
