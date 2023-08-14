import React, { useState, useEffect } from 'react';
import { techQuestions, geographyQuestions, gkQuestions, sportsQuestions } from './Questions2';
import '../css/quiz.css';

const Quiz2 = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timer, setTimer] = useState(10); // Timer state
  const [selectedTheme, setSelectedTheme] = useState('Tech'); // Selected theme state

  const themeQuestionSets = {
    Tech: techQuestions,
    Geography: geographyQuestions,
    'General Knowledge': gkQuestions,
    Sports: sportsQuestions,
  };

  const { questions, topic } = themeQuestionSets[selectedTheme];
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    setSelectedAnswer(answer === correctAnswer);
  };

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          onClickNext();
          return prevTimer;
        }
      });
    }, 1000);
  
    return interval;
  };

  const resetTimer = (interval) => {
    clearInterval(interval);
    setTimer(10);
  };

  useEffect(() => {
    if (!showResult) {
      const timerInterval = startTimer();

      return () => {
        resetTimer(timerInterval);
      };
    }
  }, [activeQuestion, showResult]);

  const renderThemeSelector = () => (
    <div className="theme-selector">
      <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
        {Object.keys(themeQuestionSets).map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="quiz-page">
      {renderThemeSelector()}
      {!showResult ? (
        <div className="quiz-container">
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions.length)}</span>
          </div>
          <h2>{question}</h2>
          <div className="timer">{timer} seconds remaining</div>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={selectedAnswerIndex === index ? 'selected-answer' : null}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz2;
