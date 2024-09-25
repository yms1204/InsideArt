import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EvaluationPage.css";
import { LogContext } from "../components/LogContext";

function EvaluationPage() {
  const { pid, tid } = useParams();
  const navigate = useNavigate();
  const { saveEvaluationData } = useContext(LogContext);

  const [ratings, setRatings] = useState({
    engagement1: null,
    engagement2: null,
    engagement3: null,
    comprehension1: null,
    comprehension2: null,
    satisfaction1: null,
    satisfaction2: null,
  });
  const [feedback, setFeedback] = useState("");

  const handleRatingChange = (question, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [question]: value,
    }));
  };

  const handleNext = () => {
    saveEvaluationData({ pid, tid, ratings, feedback });
    if (parseInt(tid.replace("T", "")) === 10) {
      navigate(`/${pid}/end`);
    } else {
      const nextTid = `T${parseInt(tid.replace("T", "")) + 1}`;
      navigate(`/${pid}/${nextTid}`);
    }
  };

  return (
    <div className="page-container" style={{ width: "600px" }}>
      <div className="info-container">
        <h2>대화 평가 - {tid}</h2>

        {/* Engagement Questions */}
        <div className="question-section">
          <h3>
            1. 이 시스템과의 상호작용에 적극적으로 참여하고 있다고 느꼈다.
          </h3>
          <div className="likert-scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`engagement1-${value}`}>
                <input
                  type="radio"
                  name="engagement1"
                  value={value}
                  checked={ratings.engagement1 === value}
                  onChange={() => handleRatingChange("engagement1", value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <div className="question-section">
          <h3>2. 이 시스템은 내가 쉽게 참여할 수 있도록 도와주었다.</h3>
          <div className="likert-scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`engagement2-${value}`}>
                <input
                  type="radio"
                  name="engagement2"
                  value={value}
                  checked={ratings.engagement2 === value}
                  onChange={() => handleRatingChange("engagement2", value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <div className="question-section">
          <h3>
            3. 이 시스템과의 상호작용은 자연스럽고 지속적인 대화를 나누는 것처럼
            느껴졌다.
          </h3>
          <div className="likert-scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`engagement3-${value}`}>
                <input
                  type="radio"
                  name="engagement3"
                  value={value}
                  checked={ratings.engagement3 === value}
                  onChange={() => handleRatingChange("engagement3", value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        {/* Comprehension Questions */}
        <div className="question-section">
          <h3>4. 이 시스템은 내가 의도한 바를 명확하게 이해한다고 느꼈다.</h3>
          <div className="likert-scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`comprehension1-${value}`}>
                <input
                  type="radio"
                  name="comprehension1"
                  value={value}
                  checked={ratings.comprehension1 === value}
                  onChange={() => handleRatingChange("comprehension1", value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <div className="question-section">
          <h3>5. 이 시스템은 나에게 적절한 질문을 했다고 느꼈다.</h3>
          <div className="likert-scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`comprehension2-${value}`}>
                <input
                  type="radio"
                  name="comprehension2"
                  value={value}
                  checked={ratings.comprehension2 === value}
                  onChange={() => handleRatingChange("comprehension2", value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        {/* Satisfaction Questions */}
        <div className="question-section">
          <h3>6. 이 시스템과의 상호작용이 즐거웠다.</h3>
          <div className="likert-scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`satisfaction1-${value}`}>
                <input
                  type="radio"
                  name="satisfaction1"
                  value={value}
                  checked={ratings.satisfaction1 === value}
                  onChange={() => handleRatingChange("satisfaction1", value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        <div className="question-section">
          <h3>
            7. 이 시스템이 나의 감상을 더욱 깊이 있게 하는 데 도움을 주었다.
          </h3>
          <div className="likert-scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={`satisfaction2-${value}`}>
                <input
                  type="radio"
                  name="satisfaction2"
                  value={value}
                  checked={ratings.satisfaction2 === value}
                  onChange={() => handleRatingChange("satisfaction2", value)}
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="question-section">
          <label>8. 추가 의견</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="여기에 의견을 작성하세요."
          />
        </div>

        {/* Navigation Buttons */}
        <div className="button-container">
          <button onClick={handleNext}>다음</button>
        </div>
      </div>
    </div>
  );
}

export default EvaluationPage;
