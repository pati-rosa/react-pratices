import React from "react"
import "./App.css"
import GroceryManager from "./components/GroceryManager"

const title = "Grocery List Manager"

const App = () => {
  return (
    <div className="App text-center">
      <h8k-navbar header={title}></h8k-navbar>
      <GroceryManager />
    </div>
  )
}

export default App
