import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";
import { Quiz } from "./types";

export interface QuizzesProperties {
  quizzes: Quiz[]
}

export function Quizzes(props: QuizzesProperties) {
    const children = props.quizzes.map((quiz, index) => {
        const url = `/quizzes/${quiz.id}`

        return (
            <div key={index}>
                <Link to={url}>{quiz.name}</Link>
            </div>
        )
    })
    return (
        <div>
            <h1>Quizzes</h1>
            {children}
        </div>
    )
}
