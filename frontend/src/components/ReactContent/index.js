import { Component } from "react";
import "./index.css";

class ReactCourses extends Component {
    render() {
        return (
            <div className="course-content">
                <h1 className="course-nameP">React</h1>
                <div className="content">
                    <p>
                        Welcome to <strong>React.js Basics</strong>: A Practical Introduction to React. This
                        course is designed to help developers of all levels dive into the world
                        of React, one of the most popular JavaScript libraries for building
                        dynamic user interfaces.<br />
                        Whether you're coming from a different programming language or new to
                        front-end development, this guide will help you start building
                        efficient and scalable web applications with React.
                    </p>
                    <h1>Why Choose React?</h1>
                    <p>
                        React is a powerful library used to create dynamic and responsive web
                        applications. Unlike traditional web frameworks, React allows you to build
                        components, making your code reusable, maintainable, and more efficient.<br />
                        With React, you can break your UI into small, self-contained components,
                        each managing its own state, making it easier to build and maintain large
                        applications over time.
                    </p>
                    <p>
                        <strong>JSX:</strong> React uses a syntax extension called JSX, which allows you
                        to write HTML directly within JavaScript. This makes writing components
                        and managing the UI much more intuitive.
                    </p>
                    <h1>Key Features of React</h1>
                    <p>
                        <strong>Component-Based Architecture:</strong> React encourages building your
                        UI as small, reusable components, allowing you to break down complex
                        interfaces into smaller, manageable pieces.<br />
                        <strong>Virtual DOM:</strong> React introduces the concept of a Virtual DOM,
                        which ensures fast updates and efficient rendering by comparing the
                        current and previous states and updating only the parts that have changed.
                    </p>
                    <strong>
                        Here’s an example of a simple React component that displays a message:
                    </strong>
                    <pre>
                        <code>
                            {`function Welcome() {
    return <h1>Hello, World!</h1>;
}`}
                        </code>
                    </pre>
                    <p>
                        <strong>State and Props:</strong> React’s core concepts of state and props make it easy
                        to pass data between components and manage dynamic content.<br />
                        <strong>React Hooks:</strong> With the introduction of hooks, managing state and other
                        React features has become more streamlined and functional.
                    </p>
                    <p>
                        Whether you are building a simple website or a complex web application,
                        React provides the tools and flexibility you need to succeed. Its
                        component-based architecture, efficient rendering, and thriving ecosystem
                        make it an excellent choice for front-end developers.
                    </p>
                    <a href="https://reactjs.org/docs/getting-started.html">Click Here to Learn More...</a>
                </div>
            </div>
        );
    }
}

export default ReactCourses;
