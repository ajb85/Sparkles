import React, { Component } from "react";
import Lightning from "./classes/Lightning.js";
let gameWidth = 50;
let gameHeight = gameWidth;
let cellWidth = "15px";
let cellHeight = cellWidth; //"10px";

let cellStyle = {
  width: cellWidth,
  height: cellHeight
};
let row = [];

trLoop();

class CreateTable extends Component {
  componentDidMount() {
    createOnclick();
  }
  render() {
    return row;
  }
}

function trLoop() {
  for (let heightCount = 0; heightCount < gameHeight; heightCount++) {
    row.push(<tr>{tdLoop()}</tr>);
  }
}

function tdLoop() {
  let tds = [];
  for (let widthCount = 0; widthCount < gameWidth; widthCount++) {
    tds.push(<td style={cellStyle} />);
  }
  return tds;
}

function createOnclick() {
  let table = document.getElementById("gameSpace");
  if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        table.rows[i].cells[j].onclick = function() {
          let column = this.cellIndex;
          let row = this.parentNode.rowIndex;
          let bolt = new Lightning(table, column, row, 0.95, 0.5);
          bolt.lightningBolt();
        };
      }
    }
  }
}

export default CreateTable;
