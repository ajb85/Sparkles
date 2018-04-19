import React, { Component } from "react";
import "./App.css";
import CreateTable from "./createGamespace.js";

class App extends Component {
  render() {
    return (
      <div id="DIVSEVERYWHERE">
        <table id="gameSpace" border="1">
          <CreateTable />
        </table>
      </div>
    );
  }
}

export default App;
