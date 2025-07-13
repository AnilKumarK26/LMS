import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import "./index.css";

const CPPExamDashboard = () => {
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Color variables
  const COLORS = ['#4361ee', '#4cc9f0', '#f72585', '#f8961e', '#ef476f'];
  const PASTEL_COLORS = ['#a8dadc', '#e9ecef', '#ffddd2', '#dfe7fd', '#d8f3dc'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const email = localStorage.getItem("mail");
        const response = await fetch('http://localhost:3000/get-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: "cors",
          body: JSON.stringify({ "email": email })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const cppAttempt = data.progress.find(attempt => attempt.examName === 'CPP');
        
        if (!cppAttempt) {
          throw new Error('No C++ exam data found');
        }
        
        console.log('C++ Exam Data:', cppAttempt);
        setExamData(cppAttempt);
        setError(null);
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to calculate overall statistics
  const getOverallStats = () => {
    if (!examData || !examData.attempts || examData.attempts.length === 0) {
      return {
        totalAttempts: 0,
        avgMarks: 0,
        highestMarks: 0,
        lowestMarks: 0,
        totalQuestionsAttempted: 0,
        improvementRate: 0
      };
    }

    const marks = examData.attempts.map(attempt => attempt.marks);
    const totalAttempts = examData.attempts.length;
    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    const avgMarks = totalMarks / totalAttempts;
    const highestMarks = Math.max(...marks);
    const lowestMarks = Math.min(...marks);
    
    // Calculate improvement (comparing first and last attempt)
    let improvementRate = 0;
    if (totalAttempts > 1) {
      const firstMark = examData.attempts[0].marks;
      const lastMark = examData.attempts[totalAttempts - 1].marks;
      improvementRate = ((lastMark - firstMark) / firstMark) * 100;
    }

    // Assuming each exam has 10 questions
    const totalQuestionsAttempted = totalAttempts * 10;

    return {
      totalAttempts,
      avgMarks: avgMarks.toFixed(1),
      highestMarks,
      lowestMarks,
      totalQuestionsAttempted,
      improvementRate: improvementRate.toFixed(1)
    };
  };

  // Function to get all unique topics that need improvement
  const getTopicsNeedingImprovement = () => {
    if (!examData || !examData.attempts) return [];
    
    // Collect all unique topics from all attempts
    const allTopics = new Set();
    examData.attempts.forEach(attempt => {
      attempt.topics.forEach(topic => allTopics.add(topic));
    });
    
    return Array.from(allTopics);
  };

  // Function to get topic frequency (how many times each topic appeared as problematic)
  const getTopicFrequency = () => {
    if (!examData || !examData.attempts) return [];
    
    const topicFrequency = {};
    
    examData.attempts.forEach(attempt => {
      attempt.topics.forEach(topic => {
        if (topicFrequency[topic]) {
          topicFrequency[topic]++;
        } else {
          topicFrequency[topic] = 1;
        }
      });
    });
    
    // Convert to array for recharts
    return Object.keys(topicFrequency).map(topic => ({
      name: topic,
      count: topicFrequency[topic]
    }));
  };

  // Calculate performance trend data for line chart
  const getPerformanceTrendData = () => {
    if (!examData || !examData.attempts) return [];
    
    return examData.attempts.map((attempt, index) => ({
      name: `Attempt ${index + 1}`,
      marks: attempt.marks,
      topics: attempt.topics.length
    }));
  };

  // Render loading state
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading your C++ exam data...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  // Render no data state
  if (!examData || !examData.attempts || examData.attempts.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="no-data-message">
          <h2>No C++ Exam Data Available</h2>
          <p>You haven't taken any C++ exams yet. Start your first attempt to see your performance dashboard.</p>
        </div>
      </div>
    );
  }

  const stats = getOverallStats();
  const trendData = getPerformanceTrendData();
  const topicsData = getTopicFrequency();

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">C++ Exam Dashboard</h1>
        <p className="dashboard-subtitle">Track your progress and performance in C++ examinations</p>
      </div>

      {/* Overview Statistics */}
      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{stats.totalAttempts}</div>
          <div className="stat-label">Total Attempts</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{stats.avgMarks}</div>
          <div className="stat-label">Avg. Marks</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{stats.highestMarks}</div>
          <div className="stat-label">Highest Score</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">{stats.improvementRate}%</div>
          <div className="stat-label">Improvement</div>
        </div>
      </div>

      {/* Performance Trends Section */}
      <div className="section">
        <h3 className="section-title">Performance Trends</h3>
        <div className="chart-content">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#4361ee" />
              <YAxis yAxisId="right" orientation="right" stroke="#f72585" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="marks" 
                name="Marks" 
                stroke="#4361ee" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="topics" 
                name="Incorrect Topics" 
                stroke="#f72585" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Attempts Details and Bar Chart */}
      <div className="charts-container">
        <div className="chart-wrapper">
          <h3 className="chart-title">Score Distribution</h3>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" name="Score" fill="#4361ee" radius={[4, 4, 0, 0]}>
                  {trendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper">
          <h3 className="chart-title">Challenging Topics</h3>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={topicsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  name="Frequency" 
                  stroke="#f72585" 
                  fill="url(#colorCount)" 
                />
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f72585" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f72585" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Attempts Table Section */}
      <div className="section">
        <h3 className="section-title">Attempt Details</h3>
        <div className="attempts-table-container">
          <table className="attempts-table">
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Score</th>
                <th>Topics Needing Improvement</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {examData.attempts.map((attempt, index) => (
                <tr key={index}>
                  <td>Attempt {index + 1}</td>
                  <td className="marks-cell">{attempt.marks}/10</td>
                  <td>
                    <div className="topics-badges">
                      {attempt.topics.map((topic, i) => (
                        <span key={i} className="topic-badge">{topic}</span>
                      ))}
                      {attempt.topics.length === 0 && <span>All topics correct</span>}
                    </div>
                  </td>
                  <td>
                    {attempt.marks >= 8 ? '🌟 Excellent' : 
                     attempt.marks >= 6 ? '✅ Good' : 
                     attempt.marks >= 4 ? '⚠️ Average' : '❗ Needs Improvement'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Correct vs Wrong Answers Section */}
      <div className="section">
        <h3 className="section-title">Correct vs. Wrong Answers</h3>
        <div className="pie-charts-grid">
          {examData.attempts.map((attempt, index) => {
            const totalQuestions = 10;
            const totalCorrect = attempt.marks;
            const totalWrong = totalQuestions - totalCorrect;
            
            const data = [
              { name: 'Correct', value: totalCorrect },
              { name: 'Wrong', value: totalWrong }
            ];
            
            return (
              <div key={index} className="pie-chart-container">
                <h4 className="pie-chart-title">Attempt {index + 1}</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index === 0 ? '#4cc9f0' : '#ef476f'} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommendations">
        <h3 className="recommendations-title">Personalized Recommendations</h3>
        <ul className="recommendations-list">
          {getTopicsNeedingImprovement().length > 0 ? (
            getTopicsNeedingImprovement().map((topic, index) => (
              <li key={index} className="recommendations-item">
                Focus on improving your understanding of <strong>{topic}</strong>
              </li>
            ))
          ) : (
            <li className="recommendations-item">
              Great job! Continue practicing to maintain your excellent performance.
            </li>
          )}
          
          {stats.avgMarks < 7 && (
            <li className="recommendations-item">
              Consider reviewing the core C++ concepts to improve your overall score.
            </li>
          )}
          
          {stats.improvementRate < 0 && (
            <li className="recommendations-item">
              Your performance shows a decline. Try revisiting earlier topics to strengthen your foundation.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CPPExamDashboard;