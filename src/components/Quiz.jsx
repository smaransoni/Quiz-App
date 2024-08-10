import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js'; //dummy raw data
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';

export default function Quiz() {
  //assumming we get an array of questions
  //Hence, managing the currently active question with an index
  //   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answerState, setAnswerState] = useState(''); //empty string means unanswered
  const [userAnswers, setUserAnswers] = useState([]);

  // OPTIMISING NOTE: WHEN WORKING IN REACT, WE WANT TO MANAGE AS LITTLE STATE AS POSSIBLE AND DERIVE AS MUCH STATE AS POSSIBLE
  //Using derived/computed state value to determine the active question
  //LOGIC: If the userAnswers[A,B] has two answers inside it, it means that we have to display the third question
  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1; // if userAnswers[] would be empty this would return 0. Therefore, we'll show the first question
  // if the length is 1, then this would return 1 which would display the second question because the index in array starts from 0

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState('answered');
      setUserAnswers(prevUserAnswers => {
        return [...prevUserAnswers, selectedAnswer];
      }); //preserving the old state, i.e., answers to previous questions
      // NOTE: Therefore, updating the <state using the function form> as we want to update the state based on the previous version fo the state

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState('correct');
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  ); //as function handleSelectAnswer must be re-created whenver the activeQuestionIndex gets updated, therfore added the later as dependency

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon"></img>
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
