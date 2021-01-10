import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import { SelectOptionQuiz } from "./SelectOptionQuiz";
import { buildSource } from "./builders";

import sourceData from './cyrillic.json' 

console.log(sourceData)

const source = buildSource(sourceData)

const App = () => (
  <div className="app">
    <SelectOptionQuiz quiz={source.quizzes[0]} autoNext={true} />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById("root")
);