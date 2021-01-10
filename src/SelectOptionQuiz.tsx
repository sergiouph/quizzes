import React from "react";
import { Card } from "./Card";
import { generateQuizCase } from "./selectOptionLib";
import "./style.scss";
import { Quiz } from "./types";

export interface SelectOptionQuizProperties {
  quiz: Quiz
}

export const SelectOptionQuiz = (props: SelectOptionQuizProperties) => {
  const quizCase = generateQuizCase(props.quiz);
  const optionCards = quizCase.options.map((option, index) => {
    const onClick = () => {
      if (option.isAnswer) {
        alert('OK')
      }
      else {
        alert('NO!')
      }
    }
    return <Card key={index} terms={option.terms} onClick={onClick} />
  })
  return (
    <div className="select-option-quiz">
      <div className="card-container question">
        <Card terms={quizCase.question.terms} />
      </div>
      <div className="card-container options">
        {optionCards}
      </div>
      <div>
        
      </div>
    </div>
  )
}
