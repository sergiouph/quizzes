import React from "react";
import ReactDOM from "react-dom";
import {
  Switch,
  Route,
  Link,
  useParams,
  HashRouter
} from "react-router-dom";


import "./style.scss";
import { SelectOptionQuiz } from "./SelectOptionQuiz";
import { buildSource } from "./builders";

import sourceData from './cyrillic.json' 
import { Quizzes } from "./Quizzes";
import { Source } from "./types";
import { findQuiz } from "./sourceLib";
import { Library } from "./Library";

console.log(sourceData)

const source = buildSource(sourceData)

const App = () => { 
  return (
    <div className="app">
      <HashRouter>
        <nav>
        </nav>
        <Switch>
          <Route path="/quizzes/:id">
            <Link to="/">Back</Link>
            <QuizzesID source={source} />
          </Route>
          <Route path="/library">
            <Link to="/">Back</Link>
            <Library source={source} />
          </Route>
          <Route path="/">
            <Link to="/library">Library</Link>
            <Quizzes quizzes={source.quizzes} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

function QuizzesID(props: {source: Source}) {
  const { id } = useParams<{id: string}>();
  const quiz = findQuiz(id, source)
  return (
    <SelectOptionQuiz quiz={quiz} />
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)