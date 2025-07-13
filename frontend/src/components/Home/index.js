import React, { useState, useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [displayedText, setDisplayedText] = useState("");
    const fullText = "Kausala";
    const [isLoaded, setIsLoaded] = useState(false);
    
    const moveToLogin = () => {
        navigate("/login");
    };

    const moveToSignup = () => {
        navigate("/signup");
    };

    useEffect(() => {
        // Text typing animation
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(intervalId);
            }
        }, 150);

        // Page load animation trigger
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 300);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
            <div className="hero-section">
                <div className="content-left">
                    <div className="logo-container">
                        <h1 className="site-logo">{displayedText}<span className="accent">.</span></h1>
                        <p className="tagline">The Learning Platform</p>
                    </div>
                    
                    <h2 className="hero-title">
                        Begin your learning journey <span className="highlight">today</span>
                    </h2>
                    
                    <p className="hero-description">
                        The ultimate guide to master any course with personalized learning paths,
                        expert instructors, and interactive content.
                    </p>
                    
                    <div className="cta-buttons">
                        <button className="btn btn-primary" onClick={moveToSignup}>
                            Get Started
                        </button>
                        <button className="btn btn-secondary" onClick={moveToLogin}>
                            Sign In
                        </button>
                    </div>
                    
                    <div className="stats-container">
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Courses</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">50k+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Satisfaction</span>
                        </div>
                    </div>
                </div>
                
                <div className="content-right">
                    <div className="video-container">
                        <video 
                            className="feature-video" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                        >
                            <source src="/Animation - 1746077240192.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="video-overlay"></div>
                    </div>
                </div>
            </div>
            
            <nav className="main-nav">
                <div className="nav-links">
                    <a href="our-services" className="nav-link">Services</a>
                    <a href="courses" className="nav-link">Courses</a>
                    <a href="about-us" className="nav-link">About</a>
                    <a href="contact-us" className="nav-link">Contact</a>
                </div>
                <div className="theme-toggle">
                    <span className="material-icons">dark_mode</span>
                </div>
            </nav>
            
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
            </div>
        </div>
    );
};

export default Home;