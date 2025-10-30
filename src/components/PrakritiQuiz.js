import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/prakritiQuestions";
import "../styles/PrakritiQuiz.css";

const PrakritiQuiz = ({ onComplete = () => {} }) => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  const handleAnswer = (option) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const prakriti = calculatePrakriti(updatedAnswers);
      onComplete(prakriti);
      updateUserPrakriti(prakriti);
      navigate("/dashboard/diet", { state: { prakritiType: prakriti } });
    }
  };

  const calculatePrakriti = (answers) => {
    const score = { vata: 0, pitta: 0, kapha: 0 };
    answers.forEach((a) => (score[a] = (score[a] || 0) + 1));
    return Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));
  };

  const updateUserPrakriti = (prakritiType) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length > 0) {
      const latestUser = users[users.length - 1];
      latestUser.prakriti = prakritiType;
      localStorage.setItem("users", JSON.stringify(users));
    }
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-card">
        <h1 className="quiz-title">🧘 Prakriti Quiz</h1>
        <p className="quiz-subtitle">
          Let’s discover your Ayurvedic body type — answer a few simple questions to find your <strong>Prakriti</strong> 🌿
        </p>

        <div className="quiz-progress-bar">
          <div
            className="quiz-progress-fill"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="quiz-content">
          <h3 className="quiz-question">
            {questions[current].question}
          </h3>

          <div className="quiz-options">
            {questions[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.type)}
                className="quiz-btn"
              >
                {opt.text}
              </button>
            ))}
          </div>

          <p className="quiz-count">
            Question {current + 1} of {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrakritiQuiz;
