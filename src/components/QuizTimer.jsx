import { useEffect, useState } from 'react';

export default function QuizTimer({ onTimeout, timeout }) {
  const [timeRemaining, setTimeRemaining] = useState(timeout);

  useEffect(() => {
    console.log('Setting timer');
    const timer = setTimeout(() => {
      onTimeout(); // add null as ans for current question
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log('Setting interval');
    const interval = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress id="question-time" max={timeout} value={timeRemaining} />;
}
