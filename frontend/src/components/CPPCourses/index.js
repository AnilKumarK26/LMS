import { Component } from "react";
import "./index.css"; // Make sure this points to your beautified CSS

class CppCourses extends Component {
    render() {
        return (
            <div className="cpp-course-content" id="cpp-course-content">
                {/* New course badge */}
                <div className="new-course-badge">New Course!</div>
                
                <h1 className="cpp-course-title" id="cpp-course-title">C++ Programming</h1>
                
                <div className="cpp-content" id="cpp-content">
                    <p className="cpp-introduction" id="cpp-introduction">
                        Welcome to <strong className="cpp-highlight" id="cpp-highlight">C++ Basics</strong>: A Practical Introduction to C++. This
                        course is designed to help developers of all levels explore C++, a
                        high-performance programming language known for its versatility and
                        speed.<br /><br />
                        Whether you're an experienced programmer or just starting out, C++ 
                        will empower you to create everything from small applications to
                        complex systems software.
                    </p>
                    
                    <h2 className="cpp-why-choose" id="cpp-why-choose">Why Choose C++?</h2>
                    <p className="cpp-advantages" id="cpp-advantages">
                        C++ is a highly efficient, compiled programming language that enables
                        fine control over system resources and memory. It's widely used in
                        systems programming, game development, real-time applications, and
                        performance-critical applications like operating systems and
                        embedded systems.
                    </p>
                    
                    <p className="cpp-performance" id="cpp-performance">
                        With C++, you can write programs that require high performance while
                        also having the flexibility to operate at both high and low levels of
                        abstraction.
                    </p>
                    
                    <h2 className="cpp-key-features" id="cpp-key-features">Key Features of C++</h2>
                    <div className="feature-cards">
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3>Object-Oriented Programming</h3>
                            <p>
                                C++ was one of the first widely adopted languages to support OOP. 
                                Concepts like classes, inheritance, polymorphism, and encapsulation 
                                allow developers to build complex systems that are modular and maintainable.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🧠</div>
                            <h3>Memory Manipulation</h3>
                            <p>
                                C++ gives you direct access to memory through pointers and manual memory management. 
                                This allows for optimized and precise control, making it a favorite for 
                                performance-critical applications.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">📚</div>
                            <h3>Standard Template Library</h3>
                            <p>
                                C++ comes with the STL, a powerful library of algorithms, data structures, 
                                and iterators that makes programming more efficient and reusable.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🌐</div>
                            <h3>Cross-Platform Support</h3>
                            <p>
                                C++ can be used to develop applications for a wide range of platforms, 
                                from Windows to Linux and embedded systems, making it versatile in various environments.
                            </p>
                        </div>
                    </div>
                    
                    <div className="code-section">
                        <strong className="cpp-example-title" id="cpp-example-title">
                            Here's an example of a simple C++ program that prints "Hello, World":
                        </strong>
                        <pre className="cpp-code-example" id="cpp-code-example">
                            <code>
                                <span className="keyword">#include</span> <span className="string">&lt;iostream&gt;</span>
{`using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`}
                            </code>
                        </pre>
                    </div>
                    
                    <p className="cpp-summary" id="cpp-summary">
                        C++ is a language that balances power and flexibility. It's the backbone of
                        many performance-intensive applications, providing developers with
                        the tools they need to write high-performance software that can run on
                        multiple platforms.
                    </p>
                    
                    <div className="cta-container">
                        <a className="cpp-learn-more" id="cpp-learn-more" href="https://www.cplusplus.com/doc/tutorial/">
                            Start Learning Now
                        </a>
                        <p className="course-stats">
                            <span>⭐ 4.8/5 Rating</span> • <span>👨‍💻 10,542 Students</span> • <span>🕒 12 Hours</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CppCourses;