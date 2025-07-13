import React, { useState } from 'react';
import './index.css'; // Import CSS file for styling
import QuizReview from '../PythonQuizReview';
const questions = [
    {
        question: "What does JSX stand for?",
        options: ["JavaScript XML", "JavaScript Extension", "JavaScript Xerox", "Java Syntax"],
        answer: "JavaScript XML",
        topic: "React"
    },
    {
        question: "Which lifecycle method is invoked immediately after a component is mounted?",
        options: ["componentWillMount", "componentDidMount", "componentWillUnmount", "componentDidUpdate"],
        answer: "componentDidMount",
        topic: "React"
    },
    {
        question: "What is React?",
        options: ["A JavaScript library for building user interfaces", "A programming language", "An IDE for React development", "A server-side framework"],
        answer: "A JavaScript library for building user interfaces",
        topic: "React"
    },
    {
        question: "What function is used in React to render elements?",
        options: ["render()", "createElement()", "buildElement()", "updateDOM()"],
        answer: "render()",
        topic: "React"
    },
    {
        question: "Which of the following is NOT a way to define a component in React?",
        options: ["Class Components", "Functional Components", "Arrow Components", "Stateful Components"],
        answer: "Arrow Components",
        topic: "React"
    },
    {
        question: "What is the purpose of state in React?",
        options: ["To store data that can change over time", "To store constant data", "To store only numbers", "To store global data"],
        answer: "To store data that can change over time",
        topic: "React"
    },
    {
        question: "What hook is used to add state to a functional component?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        answer: "useState",
        topic: "React Hooks"
    },
    {
        question: "Which method is used to fetch data in React?",
        options: ["fetchData()", "fetch()", "get()", "axios()"],
        answer: "fetch()",
        topic: "React"
    },
    {
        question: "What is the purpose of the key prop in React lists?",
        options: ["To uniquely identify elements and help React efficiently update the DOM", "To style elements", "To assign a class to elements", "To add event listeners"],
        answer: "To uniquely identify elements and help React efficiently update the DOM",
        topic: "React"
    },
    {
        question: "What is the file extension for React components?",
        options: [".jsx", ".js", ".html", ".react"],
        answer: ".jsx",
        topic: "React"
    }
];

const ReactQuizApp = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showReview,setShowReview] = useState(false)

    const handleNext = () => {
        setCurrentSlide(currentSlide + 1);
    };

    const handlePrev = () => {
        setCurrentSlide(currentSlide - 1);
    };

    const handleOptionChange = (e) => {
        console.log(e.target.value)
        setSelectedOption(e.target.value)
        const data = {
            "questionNumber":currentSlide,
            "answer":e.target.value
        }
        setSelectedOptions([...selectedOptions,data]);
        console.log(selectedOptions)
    };
    const handleSubmit = async() => {
       let correct = 0
       for(let each of selectedOptions){
         if(each.answer === questions[each.questionNumber].answer){
            correct+=1
         }
         else{
            suggestions.push(questions[each.questionNumber].topic)
            
         }
       }
       setSuggestions(suggestions)
       setShowReview(true)
       try {
       const email = localStorage.getItem("mail")
        const response = await fetch('http://localhost:3000/attempt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode:"cors",
          body: JSON.stringify({"email":email,"examName":"React Js","marks":correct,"topics":suggestions})
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
  
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    return (
        <div className="quiz-container">
            <h2>React Quiz</h2>
            <div className="question-slide">
                <p className="question">{questions[currentSlide].question}</p>
                <form>
                    {questions[currentSlide].options.map((option, index) => (
                        <label key={index} className="option">
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                            />
                            <span className='each-option'>{option}</span>
                        </label>
                    ))}
                </form>
            </div>
            <div className="navigation-buttons">
                {currentSlide !== 0 && (
                    <button onClick={handlePrev} className='prev-button'>Previous</button>
                )}
                {currentSlide !== questions.length - 1 ? (
                    <button onClick={handleNext} className='next-button'>Next</button>
                ) : (
                    <button disabled={!selectedOption} onClick={handleSubmit}>Submit</button>
                )}
            </div>
            {showReview && <QuizReview questions={questions} userAnswers = {selectedOptions} />}
        </div>
    );
};

export default ReactQuizApp;
