import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"
import Root from "./containers/Root"
import store from "./store"
import "./ui/reset.less"
import "react-tabs/style/react-tabs.less";

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById("app-root")
)
