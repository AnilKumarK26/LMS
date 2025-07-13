import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import "./index.css";

const JavaScriptExamDashboard = () => {
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        const jsAttempt = data.progress.find(attempt => attempt.examName === 'JavaScript'); // Look for JavaScript
        console.log(jsAttempt);
        setExamData(jsAttempt);

      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []);

  if (!examData) {
    return <div className="loading">Loading...</div>;
  }

  const renderAttemptsTable = () => {
    return (
      <table className="attempts-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Marks</th>
            <th>Topics You Have Failed To Attempt Correctly</th>
          </tr>
        </thead>
        <tbody>
          {examData.attempts.map((attempt, index) => (
            <tr key={attempt._id}>
              <td>{index + 1}</td>
              <td>{attempt.marks}</td>
              <td>{attempt.topics.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderBarChart = () => {
    const data = examData.attempts.map((attempt, index) => ({
      name: `Attempt ${index + 1}`,
      marks: attempt.marks
    }));

    return (
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="marks" fill="#8884d8" />
      </BarChart>
    );
  };

  const renderPieCharts = () => {
    return examData.attempts.map((attempt, index) => {
      const totalQuestions = 10; // Adjust according to your exam
      const totalRightAnswers = attempt.marks; // Assuming marks represent correct answers
      const totalWrongAnswers = totalQuestions - totalRightAnswers;

      const data = [
        { name: 'Correct', value: totalRightAnswers },
        { name: 'Wrong', value: totalWrongAnswers }
      ];

      const COLORS = ['#0088FE', '#FF8042'];

      return (
        <div key={index} className="pie-chart-container">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      );
    });
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">JavaScript Exam Dashboard</h2> {/* Change title */}
      <div className="section">
        <h3 className="section-title">Attempts Table</h3>
        {renderAttemptsTable()}
      </div>
      <div className="section">
        <h3 className="section-title">Marks Distribution</h3>
        {renderBarChart()}
      </div>
      <div className="section">
        <h3 className="section-title">Correct vs. Wrong Answers</h3>
        {renderPieCharts()}
      </div>
    </div>
  );
};

export default JavaScriptExamDashboard;
