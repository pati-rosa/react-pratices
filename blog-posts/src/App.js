import React from "react";
import "./App.css";
import Home from "./components/Home";

const title = "Blog Post";

const App = () => {
  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <Home />
    </div>
  );
};

export default App;
