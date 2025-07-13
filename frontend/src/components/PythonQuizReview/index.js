import React from 'react';
import './index.css'; // Import CSS file for styling

const QuizReview = ({ questions, userAnswers, suggestions }) => {
  // Function to get the user's answer for a specific question number
  const getUserAnswer = (questionNumber) => {
    const answer = userAnswers.find(item => item.questionNumber === questionNumber);
    return answer ? answer.answer : 'Not answered';
  };

  // Calculate the total score
  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      const userAnswer = getUserAnswer(index);
      if (userAnswer === question.answer) {
        correctCount++;
      }
    });
    return correctCount;
  };

  return (
    <div className="quiz-review-container">
      <h2>Quiz Results</h2>
      <div className="score-summary">
        <h3>Your Score: {calculateScore()} out of {questions.length}</h3>
        <p>Percentage: {Math.round((calculateScore() / questions.length) * 100)}%</p>
      </div>

      {suggestions && suggestions.length > 0 && (
        <div className="topics-to-review">
          <h3>Topics to Review:</h3>
          <ul>
            {suggestions.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Question Review:</h3>
      {questions.map((question, index) => {
        const userAnswer = getUserAnswer(index);
        const isCorrect = userAnswer === question.answer;
        
        return (
          <div key={index} className={`review-question ${isCorrect ? 'correct' : 'incorrect'}`}>
            <h4>Question {index + 1}: {question.question}</h4>
            <p className="topic"><strong>Topic:</strong> {question.topic}</p>
            
            <div className="answer-details">
              <div className="answer-row">
                <span className="answer-label">Your Answer:</span>
                <span className={`answer-value ${isCorrect ? 'correct-text' : 'incorrect-text'}`}>
                  {userAnswer}
                </span>
              </div>
              
              <div className="answer-row">
                <span className="answer-label">Correct Answer:</span>
                <span className="answer-value correct-text">{question.answer}</span>
              </div>
              
              <div className="result-indicator">
                {isCorrect ? 
                  <span className="correct-indicator">✓ Correct</span> : 
                  <span className="incorrect-indicator">✗ Incorrect</span>
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizReview;