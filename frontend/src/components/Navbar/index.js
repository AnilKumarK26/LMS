import React, { useState, useEffect } from 'react';
import { ImBooks } from "react-icons/im";
import { MdQuiz } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { GiProgression } from "react-icons/gi";
import { FcCollaboration } from "react-icons/fc";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import './index.css';

const LeftNav = () => {
  const [activePath, setActivePath] = useState('');
  const [userName, setUserName] = useState('User'); // State for username
  
  useEffect(() => {
    // Set active path based on current URL
    setActivePath(window.location.pathname);
    
    // Fetch user details to get username
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("mail");
        if (!email) return;
        
        const response = await fetch('http://localhost:3000/get-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: "cors",
          body: JSON.stringify({"email": email})
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        // Set username from response (adjust field name based on your API response)
        setUserName(data.name || data.username || data.firstName || 'User');
        
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const navItems = [
    { icon: <ImBooks />, label: 'Courses', path: '/courses' },
    { icon: <MdQuiz />, label: 'Take Test', path: '/quizzes' },
    { icon: <GiProgression />, label: 'Progress', path: '/progress' },
    { icon: <FcCollaboration />, label: 'Collaborative Learning', path: '/collaborative-learning' },
    { icon: <CiLogout />, label: 'Logout', path: '/' }
  ];

  return (
    <div className="left-nav">
      {/* Brand Header */}
      <div className="brand-header">
        <h2 className="brand-title">Kushala</h2>
      </div>

      <div className="options">
        {navItems.map((item, index) => (
          <div 
            key={index} 
            className={`option-container ${activePath === item.path ? 'active' : ''}`}
            onClick={() => setActivePath(item.path)}
          >
            {item.icon}
            <a href={item.path} className='option'>
              {item.label}
            </a>
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="user-profile-section">
        <div className="user-profile">
          <FaUserCircle className="profile-icon" />
          <span className="username">{userName}</span>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;