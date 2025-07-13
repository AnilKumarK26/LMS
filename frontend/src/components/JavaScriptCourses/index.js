import { Component } from "react";
import "./index.css";

class JavaScriptCourses extends Component {
    render() {
        return (
            <div className="js-course-content" id="js-course-content">
                <h1 className="js-course-title" id="js-course-title">JavaScript</h1>
                <div className="js-content" id="js-content">
                    <p className="js-introduction" id="js-introduction">
                        Welcome to <strong className="js-highlight" id="js-highlight">JavaScript Essentials</strong>: A Comprehensive Introduction to JavaScript. This course is designed for developers of all levels to dive into the world of JavaScript, a versatile language that powers the modern web.<br />
                        Whether you're a beginner or an experienced developer, JavaScript will equip you with the skills to create dynamic and interactive web applications.
                    </p>
                    <h1 className="js-why-choose" id="js-why-choose">Why Choose JavaScript?</h1>
                    <p className="js-advantages" id="js-advantages">
                        JavaScript is the backbone of web development, enabling developers to create interactive and dynamic content. It runs on the client side, allowing for faster response times and improved user experience.<br />
                        From building simple websites to complex web applications, JavaScript is essential for creating engaging online experiences.
                    </p>
                    <h1 className="js-key-features" id="js-key-features">Key Features of JavaScript</h1>
                    <p className="js-dynamic" id="js-dynamic">
                        <strong className="js-feature-highlight" id="js-feature-highlight">Dynamic Typing:</strong> JavaScript is dynamically typed, meaning you can declare variables without specifying their data type. This flexibility allows for rapid development.<br />
                        <strong className="js-event-driven" id="js-event-driven">Event-Driven Programming:</strong> JavaScript excels in creating interactive applications through event-driven programming, allowing developers to respond to user actions.
                    </p>
                    <strong className="js-example-title" id="js-example-title">
                        Here’s an example of a simple JavaScript program that prints “Hello, World”:
                    </strong>
                    <pre className="js-code-example" id="js-code-example">
                        <code>
                            {`console.log("Hello, World!");`}
                        </code>
                    </pre>
                    <p className="js-compatibility" id="js-compatibility">
                        <strong className="js-feature-highlight" id="js-feature-highlight-2">Browser Compatibility:</strong> JavaScript is supported by all modern web browsers, ensuring your applications run smoothly across different platforms.<br />
                        <strong className="js-frameworks" id="js-frameworks">Rich Ecosystem:</strong> JavaScript has a vast ecosystem of libraries and frameworks (like React, Angular, and Vue.js) that streamline development and enhance productivity.
                    </p>
                    <p className="js-summary" id="js-summary">
                        JavaScript is a powerful language that bridges the gap between front-end and back-end development. With its wide range of applications, it is essential for anyone looking to excel in web development.
                    </p>
                    <h1 className="js-advanced-topics" id="js-advanced-topics">Advanced Topics in JavaScript</h1>
                    <p className="js-asynchronous" id="js-asynchronous">
                        <strong className="js-feature-highlight" id="js-feature-highlight-3">Asynchronous Programming:</strong> JavaScript supports asynchronous programming through callbacks, promises, and async/await syntax. This allows for non-blocking operations, enhancing the performance of applications.
                    </p>
                    <p className="js-modules" id="js-modules">
                        <strong className="js-feature-highlight" id="js-feature-highlight-4">Modules:</strong> JavaScript modules allow developers to break down applications into reusable components, promoting better organization and maintainability of code.
                    </p>
                    <p className="js-typescipt" id="js-typescipt">
                        <strong className="js-feature-highlight" id="js-feature-highlight-5">TypeScript:</strong> TypeScript is a superset of JavaScript that adds static typing to the language. It helps catch errors early in the development process and improves code quality.
                    </p>
                    <h1 className="js-use-cases" id="js-use-cases">Use Cases for JavaScript</h1>
                    <p className="js-web-development" id="js-web-development">
                        <strong className="js-use-case-highlight" id="js-use-case-highlight-1">Web Development:</strong> JavaScript is primarily used for client-side web development, enabling interactive features on websites and web applications.
                    </p>
                    <p className="js-server-side" id="js-server-side">
                        <strong className="js-use-case-highlight" id="js-use-case-highlight-2">Server-Side Development:</strong> With the introduction of Node.js, JavaScript can now be used for server-side programming, allowing developers to build scalable network applications.
                    </p>
                    <p className="js-mobile-apps" id="js-mobile-apps">
                        <strong className="js-use-case-highlight" id="js-use-case-highlight-3">Mobile Applications:</strong> Frameworks like React Native enable developers to build mobile applications using JavaScript, providing a seamless experience across platforms.
                    </p>
                    <h1 className="js-learning-resources" id="js-learning-resources">Learning Resources</h1>
                    <p className="js-books" id="js-books">
                        Some recommended books for learning JavaScript include:
                        <ul>
                            <li><strong>JavaScript: The Good Parts</strong> by Douglas Crockford</li>
                            <li><strong>Eloquent JavaScript</strong> by Marijn Haverbeke</li>
                            <li><strong>You Don’t Know JS</strong> by Kyle Simpson</li>
                        </ul>
                    </p>
                    <p className="js-online-courses" id="js-online-courses">
                        You can also explore online platforms like:
                        <ul>
                            <li><strong>freeCodeCamp</strong>: Offers a comprehensive JavaScript curriculum.</li>
                            <li><strong>Codecademy</strong>: Provides interactive JavaScript courses for beginners.</li>
                            <li><strong>Udemy</strong>: Hosts a variety of JavaScript courses tailored to different skill levels.</li>
                        </ul>
                    </p>
                    <a className="js-learn-more" id="js-learn-more" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide">Click Here to Learn More...</a>
                </div>
            </div>
        );
    }
}

export default JavaScriptCourses;
