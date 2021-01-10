import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { generateQuizCase, OptionCase, QuizCase } from "./selectOptionLib";
import "./style.scss";
import { Quiz } from "./types";

const DELAY = 500;

interface CardData {
  optionCase: OptionCase
  covered: boolean
}

function generateCardDataItems(optionCases: OptionCase[]): CardData[] {
  return optionCases.map(optionCase => ({
    optionCase,
    covered: true,
  }))
}

export interface SelectOptionQuizProperties {
  quiz: Quiz
  autoNext: boolean
}

export const SelectOptionQuiz = (props: SelectOptionQuizProperties) => {
  const [question, setQuestion] = useState<OptionCase|undefined>(undefined);
  const [cardDataItems, setCardDataItems] = useState<CardData[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  if (question === undefined) {
    const quizCase = generateQuizCase(props.quiz)
    setQuestion(quizCase.question)
    setCardDataItems(generateCardDataItems(quizCase.options))
    setCompleted(false)
    return <div>Loading...</div>
  }
  
  const onNext = () => {
    setQuestion(undefined)
  }

  const optionCards = cardDataItems.map((cardData, index) => {
    const onSelected = () => {
      cardData.covered = false
      setCardDataItems([...cardDataItems])

      
      if (cardData.optionCase.isAnswer) {
        if (props.autoNext) {
          setTimeout(() => {
            onNext()
          }, DELAY);
        }
        else {
          setCompleted(true)
        }
      }
    }

    const status = cardData.covered ? undefined : cardData.optionCase.isAnswer;
    return <Card key={index} terms={cardData.optionCase.terms} onSelected={cardData.covered ? onSelected : undefined} status={status} />
  })

  const onIDK = () => {
    for (const cardData of cardDataItems) {
      cardData.covered = !cardData.optionCase.isAnswer
    }

    setCardDataItems([...cardDataItems])
    setCompleted(true)
  }

  return (
    <div className="select-option-quiz">
      <div className="question card-container">
        <Card terms={question.terms} />
      </div>
      <div className="options card-container">
        {optionCards}
      </div>
      <div className="actions">
        {completed ? <button onClick={onNext}>Next</button> : <button onClick={onIDK}>I don't know</button> }
      </div>
    </div>
  )
}
