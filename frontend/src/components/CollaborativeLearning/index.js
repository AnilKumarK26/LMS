import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { BookOpen, Share, FileText, Award } from 'lucide-react';
import LeftNav from "../Navbar"; // Import your LeftNav component
import './index.css';

const CollaborativeLearning = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const stats = [
        { number: "10K+", label: "Notes Shared" },
        { number: "500+", label: "Active Users" },
        { number: "95%", label: "Success Rate" }
    ];

    return (
        <div className="main-container">
            <LeftNav />
            <div className="collaborative-learning-container">
                {/* Animated Background Elements */}
                <div className="bg-element bg-element-1"></div>
                <div className="bg-element bg-element-2"></div>
                <div className="bg-element bg-element-3"></div>

                <div className="content-wrapper">
                    <div className={`main-content ${isVisible ? 'visible' : ''}`}>
                        
                        {/* Header Section */}
                        <div className="header-section">
                            <h1 className="main-title">
                                Collaborative Learning
                            </h1>
                            <p className="main-description">
                                Unlock the power of shared knowledge and transform your learning experience
                            </p>
                            
                            {/* Stats Row */}
                            <div className="stats-container">
                                {stats.map((stat, index) => (
                                    <div 
                                        key={index} 
                                        className={`stat-item ${isVisible ? 'visible' : ''}`}
                                        style={{transitionDelay: `${index * 200}ms`}}
                                    >
                                        <div className="stat-number">{stat.number}</div>
                                        <div className="stat-label">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Main Card Section */}
                        <div className="card-section">
                            {/* Primary Card - Notes Sharing Portal */}
                            <Link to="/notes-list" style={{ textDecoration: "none" }}>
                                <div className={`primary-card-wrapper ${isVisible ? 'visible' : ''}`}>
                                    <div className="card-glow"></div>
                                    
                                    <div 
                                        className={`primary-card ${hoveredCard === 'main' ? 'hovered' : ''}`}
                                        onMouseEnter={() => setHoveredCard('main')}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        <div className="status-indicator"></div>
                                        
                                        <div className="card-content">
                                            <div className="icon-container">
                                                <div className={`icon-wrapper ${hoveredCard === 'main' ? 'hovered' : ''}`}>
                                                    <FileText size={40} />
                                                </div>
                                            </div>
                                            
                                            <h2 className="card-title">
                                                Notes Sharing Portal
                                            </h2>
                                            
                                            <p className="card-description">
                                                Share your notes or acquire knowledge from a vast collection of shared educational resources
                                            </p>
                                            
                                            <div className="features-row">
                                                <div className="feature-item">
                                                    <Share size={16} />
                                                    Share
                                                </div>
                                                <div className="feature-item">
                                                    <BookOpen size={16} />
                                                    Learn
                                                </div>
                                                <div className="feature-item">
                                                    <Award size={16} />
                                                    Grow
                                                </div>
                                            </div>
                                            
                                            <button className="primary-button">
                                                Get Started
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Bottom CTA */}
                        <div className={`cta-section ${isVisible ? 'visible' : ''}`}>
                            <p className="cta-text">Ready to start your collaborative learning journey?</p>
                            <div className="cta-buttons">
                                <button className="cta-button primary">
                                    Join Community
                                </button>
                                <button className="cta-button secondary">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollaborativeLearning;