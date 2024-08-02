import { useState } from 'react';
import QUESTIONS from '../questions.js'; //dummy raw data
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
  //assumming we get an array of questions
  //Hence, managing the currently active question with an index
  //   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // OPTIMISING NOTE: WHEN WORKING IN REACT, WE WANT TO MANAGE AS LITTLE STATE AS POSSIBLE AND DERIVE AS MUCH STATE AS POSSIBLE
  //Using derived/computed state value to determine the active question
  //LOGIC: If the userAnswers[A,B] has two answers inside it, it means that we have to display the third question
  const activeQuestionIndex = userAnswers.length; // if userAnswers[] would be empty this would return 0. Therefore, we'll show the first question
  // if the length is 1, then this would return 1 which would display the second question because the index in array starts from 0

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers(prevUserAnswers => {
      return [...prevUserAnswers, selectedAnswer];
    }); //preserving the old state, i.e., answers to previous questions
    // NOTE: Therefore, updating the <state using the function form> as we want to update the state based on the previous version fo the state
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon"></img>
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  //The code below only gets executed only if we have a question to display
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map(answer => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
