import { useRef } from 'react';

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    //The code below only gets executed only if we have a question to display
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map(answer => {
        const isSelected = selectedAnswer === answer; //helper constant to check if the answer that we are currently displaying/creating in the list is the one that the user has selected
        let cssClass = '';

        if (answerState === 'answered' && isSelected) {
          cssClass = 'selected';
        }
        if (
          (answerState === 'correct' || answerState === 'wrong') &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
