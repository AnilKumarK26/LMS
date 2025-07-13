import { Component } from "react";
import { FaPlay } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa6";

import "./index.css"

class Services extends Component {
  render() {
    const serviceCards = [
      {
        icon: <FaPlay className="service-icon" />,
        title: "COLLABORATIVE LEARNING",
        description: "Seamless collaboration with Real-time communication, shared projects for enhanced learning."
      },
      {
        icon: <IoBarChart className="service-icon" />,
        title: "PROGRESS EVALUATION",
        description: "Develop a comprehensive analytics dashboard offering detailed insights into user progress, strength, and areas for improvement."
      },
      {
        icon: <FaLightbulb className="service-icon" />,
        title: "CAREER HORIZON HUB",
        description: "Course related articles to make you updated, job opportunities available related to the course are provided to make it helpful."
      }
    ];

    return (
      <div className="services-page">
        <div className="services-content">
          <h1 className="services-heading">Our Services</h1>
          <p className="services-para">
            We make your journey more personalized and interactive by providing the below features in more effective and improvised way. 
            Master your course journey by using the best of these features.
          </p>
          
          <div className="card-container">
            {serviceCards.map((card, index) => (
              <div className="service-card" key={index}>
                <div className="icon-wrapper">
                  {card.icon}
                </div>
                <h3 className="card-heading">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Services;