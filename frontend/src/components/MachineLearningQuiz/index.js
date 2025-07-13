import React, { useState } from 'react';
import './index.css'; // Import CSS file for styling
import QuizReview from '../PythonQuizReview';

const questions = [
    {
        question: "What is supervised learning?",
        options: [
            "Learning with labeled data",
            "Learning without labeled data",
            "Learning with partial data",
            "None of the above"
        ],
        answer: "Learning with labeled data",
        topic: "Supervised Learning" // Updated topic
    },
    {
        question: "Which algorithm is commonly used for classification tasks?",
        options: [
            "Linear Regression",
            "Logistic Regression",
            "K-Means",
            "PCA"
        ],
        answer: "Logistic Regression",
        topic: "Classification Algorithms" // Updated topic
    },
    {
        question: "What is the purpose of cross-validation?",
        options: [
            "To improve the model's performance",
            "To validate the model on unseen data",
            "To tune hyperparameters",
            "All of the above"
        ],
        answer: "All of the above",
        topic: "Model Evaluation" // Updated topic
    },
    {
        question: "Which library is commonly used for machine learning in Python?",
        options: [
            "Pandas",
            "NumPy",
            "Scikit-Learn",
            "Matplotlib"
        ],
        answer: "Scikit-Learn",
        topic: "Libraries and Tools" // Updated topic
    },
    {
        question: "What does overfitting mean?",
        options: [
            "Model performs well on training data but poorly on unseen data",
            "Model performs poorly on all data",
            "Model performs well on unseen data",
            "None of the above"
        ],
        answer: "Model performs well on training data but poorly on unseen data",
        topic: "Model Evaluation" // Updated topic
    },
    {
        question: "Which of the following is NOT a type of machine learning?",
        options: [
            "Supervised Learning",
            "Unsupervised Learning",
            "Reinforcement Learning",
            "Automated Learning"
        ],
        answer: "Automated Learning",
        topic: "Types of Machine Learning" // Updated topic
    },
    {
        question: "What is the main goal of clustering algorithms?",
        options: [
            "To find groups in data",
            "To predict outcomes",
            "To reduce dimensions",
            "To classify data"
        ],
        answer: "To find groups in data",
        topic: "Clustering Algorithms" // Updated topic
    },
    {
        question: "What is a common evaluation metric for regression tasks?",
        options: [
            "Accuracy",
            "Precision",
            "Recall",
            "Mean Squared Error"
        ],
        answer: "Mean Squared Error",
        topic: "Model Evaluation" // Updated topic
    },
    {
        question: "What is feature engineering?",
        options: [
            "Creating new features from existing data",
            "Selecting the best features for the model",
            "Normalizing data",
            "All of the above"
        ],
        answer: "All of the above",
        topic: "Feature Engineering" // Updated topic
    },
    {
        question: "What is the purpose of a confusion matrix?",
        options: [
            "To evaluate the performance of a classification model",
            "To visualize data",
            "To optimize model parameters",
            "None of the above"
        ],
        answer: "To evaluate the performance of a classification model",
        topic: "Model Evaluation" // Updated topic
    }
];


const MachineLearningQuizApp = () => {
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
                body: JSON.stringify({ email, examName: "Machine Learning", marks: correct, topics: newSuggestions })
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
            <h2>Machine Learning Quiz</h2>
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

export default MachineLearningQuizApp;
