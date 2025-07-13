import { Component } from "react";
import "./index.css";

class MachineLearningCourses extends Component {
  render() {
    return (
      <div className="course-content">
        <h1 className="course-nameP">Machine Learning</h1>
        <div className="content">
          <p>
            Welcome to Machine Learning! In this course, you will explore the
            foundations of machine learning and understand how you can
            implement and apply various machine learning models in real-world
            scenarios.<br />
            Machine learning is a branch of artificial intelligence (AI) and
            computer science which focuses on the use of data and algorithms to
            imitate the way that humans learn, gradually improving its accuracy.
          </p>
          <h1>What is Machine Learning?</h1>
          <p>
            Machine learning is a method of data analysis that automates
            analytical model building. It is a branch of artificial intelligence
            based on the idea that systems can learn from data, identify
            patterns, and make decisions with minimal human intervention.
          </p>
          <strong>Here’s an example of machine learning code:</strong>
          <p>
            Let’s say you want to train a machine learning model to classify
            images of cats and dogs. With a labeled dataset of images and a
            machine learning algorithm, you can teach a computer to recognize
            cats and dogs with high accuracy. Here’s an example in Python using
            a common machine learning library called `scikit-learn`:
          </p>
          <strong>
            <pre>
              {`from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

# Load your dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# Create an SVM model
model = SVC()

# Train the model
model.fit(X_train, y_train)

# Test the model
accuracy = model.score(X_test, y_test)
print(f"Accuracy: {accuracy * 100:.2f}%")`}
            </pre>
          </strong>
          <p>
            Machine learning models rely on training data to find patterns and
            make decisions. This process requires datasets with enough examples
            to allow the model to generalize and perform well on unseen data.
          </p>
          <p>
            As a machine learning practitioner, you will learn how to prepare
            data, build models, and evaluate their performance across various
            tasks, including classification, regression, and clustering.
          </p>
          <strong>Further Reading</strong>
          <p>
            To dive deeper into machine learning, refer to additional resources
            and documentation on popular libraries like TensorFlow, Keras, and
            scikit-learn. Explore the official course material:
          </p>
          <a href="https://scikit-learn.org/stable/">Click Here...</a>
        </div>
      </div>
    );
  }
}

export default MachineLearningCourses;
