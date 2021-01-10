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
}

export const SelectOptionQuiz = (props: SelectOptionQuizProperties) => {
  const [question, setQuestion] = useState<OptionCase|undefined>(undefined);
  const [cardDataItems, setCardDataItems] = useState<CardData[]>([]);

  if (question === undefined) {
    const quizCase = generateQuizCase(props.quiz)
    setQuestion(quizCase.question)
    setCardDataItems(generateCardDataItems(quizCase.options))
    return <div>Loading...</div>
  }
  
  const optionCards = cardDataItems.map((cardData, index) => {
    const onSelected = () => {
      cardData.covered = false
      setCardDataItems([...cardDataItems])
      
      if (cardData.optionCase.isAnswer) {
        setTimeout(() => {
          setQuestion(undefined)
        }, DELAY);
      }
    }

    const status = cardData.covered ? undefined : cardData.optionCase.isAnswer;
    return <Card key={index} terms={cardData.optionCase.terms} onSelected={onSelected} status={status} />
  })

  return (
    <div className="select-option-quiz">
      <div className="card-container question">
        <Card terms={question.terms} />
      </div>
      <div className="card-container options">
        {optionCards}
      </div>
      <div>
        
      </div>
    </div>
  )
}
