import React, { useState, useEffect } from 'react';
import { ImBooks } from "react-icons/im";
import { MdQuiz } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { GiProgression } from "react-icons/gi";
import { FcCollaboration } from "react-icons/fc";
import './index.css';

const LeftNav = () => {
  const [activePath, setActivePath] = useState('');
  
  useEffect(() => {
    // Set active path based on current URL
    setActivePath(window.location.pathname);
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
    </div>
  );
};

export default LeftNav;