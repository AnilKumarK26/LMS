import React, { useState } from 'react';
import './index.css'; // Import CSS file for styling
import QuizReview from '../PythonQuizReview';

const questions = [
    {
        question: "What is a closure in JavaScript?",
        options: [
            "A function with its own scope",
            "A function bundled with its lexical environment",
            "A function inside another function",
            "None of the above"
        ],
        answer: "A function bundled with its lexical environment",
        topic: "Closures" // Updated topic
    },
    {
        question: "Which of the following is used to declare a variable in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "All of the above"
        ],
        answer: "All of the above",
        topic: "Variables" // Updated topic
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        options: [
            "It refers to the global object",
            "It refers to the current object in the context",
            "It refers to the previous object",
            "None of the above"
        ],
        answer: "It refers to the current object in the context",
        topic: "'this' Keyword" // Updated topic
    },
    {
        question: "Which JavaScript array method is used to add elements to the end of an array?",
        options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
        ],
        answer: "push()",
        topic: "Array Methods" // Updated topic
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: [
            "React",
            "Django",
            "Flask",
            "Spring"
        ],
        answer: "React",
        topic: "JavaScript Frameworks" // Updated topic
    },
    {
        question: "What is hoisting in JavaScript?",
        options: [
            "Moving declarations to the top of the scope",
            "Lifting variables to global scope",
            "Raising functions to the top of the document",
            "None of the above"
        ],
        answer: "Moving declarations to the top of the scope",
        topic: "Hoisting" // Updated topic
    },
    {
        question: "Which method is used to convert JSON data into a JavaScript object?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "toJSON()",
            "Object.parse()"
        ],
        answer: "JSON.parse()",
        topic: "JSON Methods" // Updated topic
    },
    {
        question: "What is the output of 'typeof null' in JavaScript?",
        options: [
            "'null'",
            "'undefined'",
            "'object'",
            "'boolean'"
        ],
        answer: "'object'",
        topic: "Data Types" // Updated topic
    },
    {
        question: "What does the 'bind' method do in JavaScript?",
        options: [
            "It binds an event to a function",
            "It creates a new function with 'this' keyword set to the provided value",
            "It merges two arrays together",
            "None of the above"
        ],
        answer: "It creates a new function with 'this' keyword set to the provided value",
        topic: "Function Methods" // Updated topic
    },
    {
        question: "Which of the following is a primitive data type in JavaScript?",
        options: [
            "Object",
            "Number",
            "Array",
            "Function"
        ],
        answer: "Number",
        topic: "Data Types" // Updated topic
    }
];

const JavaScriptQuizApp = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [showReview, setShowReview] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleNext = () => {
        setCurrentSlide(currentSlide + 1);
    };

    const handlePrev = () => {
        setCurrentSlide(currentSlide - 1);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        const data = {
            questionNumber: currentSlide,
            answer: e.target.value
        };
        setSelectedOptions([...selectedOptions, data]);
    };

    const handleSubmit = async () => {
        let correct = 0;
        const newSuggestions = []; // Initialize a new suggestions array
        for (let each of selectedOptions) {
            if (each.answer === questions[each.questionNumber].answer) {
                correct += 1;
            } else {
                newSuggestions.push(questions[each.questionNumber].topic);
            }
        }
        setSuggestions(newSuggestions); // Set the new suggestions
        setShowReview(true);
        try {
            const email = localStorage.getItem("mail");
            const response = await fetch('http://localhost:3000/attempt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                body: JSON.stringify({ email, examName: "JavaScript", marks: correct, topics: newSuggestions })
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
            <h2>JavaScript Quiz</h2>
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
            {showReview && <QuizReview questions={questions} userAnswers={selectedOptions} suggestions={suggestions} />}
        </div>
    );
};

export default JavaScriptQuizApp;
