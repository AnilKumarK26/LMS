import React, { useState } from 'react';
import './index.css'; // Import CSS file for styling
import QuizReview from '../PythonQuizReview';
const questions = [
    {
        question: "What is the output of print(2 + 2 * 3 - 1)?",
        options: ["3", "7", "8", "11"],
        answer: "7",
        topic: "Basic Arithmetic"
    },
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["def", "function", "define", "func"],
        answer: "def",
        topic: "Functions"
    },
    {
        question: "What is the result of 2 ** 3 in Python?",
        options: ["6", "8", "9", "16"],
        answer: "8",
        topic: "Operators"
    },
    {
        question: "What is the output of 'Hello' + 'World'?",
        options: ["HelloWorld", "Hello World", "Hello+World", "Syntax Error"],
        answer: "HelloWorld",
        topic: "Strings"
    },
    {
        question: "Which of the following is not a valid data type in Python?",
        options: ["int", "str", "char", "float"],
        answer: "char",
        topic: "Data Types"
    },
    {
        question: "What does the 'len()' function do in Python?",
        options: ["Returns the length of a string", "Returns the length of a list", "Returns the length of a tuple", "All of the above"],
        answer: "All of the above",
        topic: "Functions"
    },
    {
        question: "What is the correct way to comment multiple lines in Python?",
        options: ["/* */", "//", "#", "<!-- -->"],
        answer: "#",
        topic: "Syntax"
    },
    {
        question: "What will be the output of the code 'print(5 == 5 and 10 < 12)'?",
        options: ["True", "False", "Error", "None"],
        answer: "True",
        topic: "Operators"
    },
    {
        question: "Which of the following is an immutable data type in Python?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        answer: "Tuple",
        topic: "Data Types"
    },
    {
        question: "What is the output of the expression '3 * 3 ** 3'?",
        options: ["9", "27", "81", "729"],
        answer: "81",
        topic: "Basic Arithmetic"
    },
    {
        question: "What is the output of print(10 / 3)?",
        options: ["3", "3.333", "3.0", "3.33"],
        answer: "3.333",
        topic: "Basic Arithmetic"
    },
    {
        question: "What is the purpose of the 'elif' keyword in Python?",
        options: ["To begin a loop", "To end a function", "To handle multiple conditions", "To define a class"],
        answer: "To handle multiple conditions",
        topic: "Control Structures"
    },
    {
        question: "What will be the output of the code 'print('hello' * 3)'?",
        options: ["hellohellohello", "3hello", "hello3", "Syntax Error"],
        answer: "hellohellohello",
        topic: "Strings"
    },
    {
        question: "Which of the following is used to import the 'math' module in Python?",
        options: ["import math", "include <math>", "using math", "importing math"],
        answer: "import math",
        topic: "Modules"
    },
    {
        question: "What is the output of the expression '10 % 3'?",
        options: ["3", "1", "0", "10"],
        answer: "1",
        topic: "Operators"
    },
];



const PythonQuizApp = () => {
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
          body: JSON.stringify({"email":email,"examName":"Python","marks":correct,"topics":suggestions})
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
            <h2 className="python">Python Quiz</h2>
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

export default PythonQuizApp;
