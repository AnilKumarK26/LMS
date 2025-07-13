import React, { useState } from 'react';
import './index.css'; // Import CSS file for styling
import QuizReview from '../PythonQuizReview';

const cppQuestions = [
    {
        question: "What does C++ stand for?",
        options: [
            "C with classes",
            "C with functions",
            "C with templates",
            "C with objects"
        ],
        answer: "C with classes",
        topic: "C++ Basics"
    },
    {
        question: "Which of the following is a valid C++ identifier?",
        options: [
            "int",
            "2ndValue",
            "_value",
            "class"
        ],
        answer: "_value",
        topic: "Identifiers"
    },
    {
        question: "What is the output of `cout << 10 + 5;`?",
        options: [
            "10",
            "15",
            "105",
            "Error"
        ],
        answer: "15",
        topic: "Operators"
    },
    {
        question: "Which of the following is used for dynamic memory allocation in C++?",
        options: [
            "malloc()",
            "new",
            "calloc()",
            "free()"
        ],
        answer: "new",
        topic: "Memory Management"
    },
    {
        question: "What is a constructor in C++?",
        options: [
            "A special member function that is called automatically",
            "A function to destroy objects",
            "A regular function",
            "A type of variable"
        ],
        answer: "A special member function that is called automatically",
        topic: "Classes and Objects"
    },
    {
        question: "Which of the following is NOT a feature of OOP?",
        options: [
            "Encapsulation",
            "Inheritance",
            "Polymorphism",
            "Compilation"
        ],
        answer: "Compilation",
        topic: "OOP Concepts"
    },
    {
        question: "What is the purpose of the `virtual` keyword?",
        options: [
            "To create a virtual machine",
            "To declare a function as virtual",
            "To allow for polymorphism",
            "Both b and c"
        ],
        answer: "Both b and c",
        topic: "Polymorphism"
    },
    {
        question: "Which of the following statements is true?",
        options: [
            "C++ supports multiple inheritance",
            "C++ does not support multiple inheritance",
            "C++ supports only single inheritance",
            "None of the above"
        ],
        answer: "C++ supports multiple inheritance",
        topic: "Inheritance"
    },
    {
        question: "What is the use of the `#include` directive?",
        options: [
            "To include libraries or header files",
            "To define a macro",
            "To include comments",
            "To initialize variables"
        ],
        answer: "To include libraries or header files",
        topic: "Preprocessor Directives"
    },
    {
        question: "Which operator is used to access members of a class?",
        options: [
            ".",
            "->",
            "[]",
            "Both a and b"
        ],
        answer: "Both a and b",
        topic: "Classes and Objects"
    }
];

const CPPQuizApp = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]); // This will store all answers with their question numbers
    const [selectedOption, setSelectedOption] = useState('');
    const [showReview, setShowReview] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const handleNext = () => {
        // Save the current answer before moving to next question
        if (selectedOption) {
            updateSelectedOptions();
        }
        setCurrentSlide(currentSlide + 1);
        // Reset selected option for the new question
        setSelectedOption(getCurrentAnswerOrEmpty());
    };

    const handlePrev = () => {
        // Save the current answer before moving to previous question
        if (selectedOption) {
            updateSelectedOptions();
        }
        setCurrentSlide(currentSlide - 1);
        // Set selected option to the previously selected answer for this question
        setSelectedOption(getCurrentAnswerOrEmpty());
    };

    // Get the current answer for this question if it exists
    const getCurrentAnswerOrEmpty = () => {
        const existingAnswer = selectedOptions.find(item => item.questionNumber === currentSlide);
        return existingAnswer ? existingAnswer.answer : '';
    };

    // Update or add the answer to selectedOptions
    const updateSelectedOptions = () => {
        const newSelectedOptions = [...selectedOptions];
        const existingIndex = newSelectedOptions.findIndex(item => item.questionNumber === currentSlide);
        
        if (existingIndex !== -1) {
            // Update existing answer
            newSelectedOptions[existingIndex].answer = selectedOption;
        } else {
            // Add new answer
            newSelectedOptions.push({
                questionNumber: currentSlide,
                answer: selectedOption
            });
        }
        
        setSelectedOptions(newSelectedOptions);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = async () => {
        // Save the final answer if there is one
        if (selectedOption) {
            updateSelectedOptions();
        }
        
        let correct = 0;
        const newSuggestions = [];
        
        // Calculate the score and identify topics to review
        for (let i = 0; i < cppQuestions.length; i++) {
            const userAnswer = selectedOptions.find(item => item.questionNumber === i);
            
            if (userAnswer && userAnswer.answer === cppQuestions[i].answer) {
                correct += 1;
            } else {
                // Only add to suggestions if user answered incorrectly or didn't answer
                newSuggestions.push(cppQuestions[i].topic);
            }
        }
        
        // Remove duplicate topics
        const uniqueSuggestions = [...new Set(newSuggestions)];
        setSuggestions(uniqueSuggestions);
        setShowReview(true);
        
        try {
            const email = localStorage.getItem("mail");
            const response = await fetch('http://localhost:3000/attempt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                body: JSON.stringify({ 
                    email, 
                    examName: "CPP", 
                    marks: correct, 
                    topics: uniqueSuggestions 
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // When component mounts or when current slide changes, set the selected option
    React.useEffect(() => {
        setSelectedOption(getCurrentAnswerOrEmpty());
    }, [currentSlide]);

    return (
        <div className="quiz-container">
            <h2>C++ Quiz</h2>
            {!showReview ? (
                <>
                    <div className="question-slide">
                        <p className="question">{cppQuestions[currentSlide].question}</p>
                        <form>
                            {cppQuestions[currentSlide].options.map((option, index) => (
                                <label key={index} className="option">
                                    <input
                                        type="radio"
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={handleOptionChange}
                                        name={`question-${currentSlide}`}
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
                        {currentSlide !== cppQuestions.length - 1 ? (
                            <button onClick={handleNext} className='next-button'>Next</button>
                        ) : (
                            <button onClick={handleSubmit}>Submit</button>
                        )}
                    </div>
                </>
            ) : (
                <QuizReview 
                    questions={cppQuestions} 
                    userAnswers={selectedOptions} 
                    suggestions={suggestions} 
                />
            )}
        </div>
    );
};

export default CPPQuizApp;