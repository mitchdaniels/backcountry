import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import PackingList from "./PackingList"
  
var destination = document.querySelector("#container");
  
ReactDOM.render(
    <div>
        <PackingList />
    </div>,
    destination
);
