import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Page.css";
import { LogContext } from "../components/LogContext";

function BasicInfoPage() {
  const navigate = useNavigate();
  const { pid } = useParams();
  const { saveInfoData } = useContext(LogContext);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    gender: "",
    education: "",
    job: "",
    frequency: "",
    knowledge1: "",
    knowledge2: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleNext = () => {
    saveInfoData({ pid, formData });
    if (isFormValid) {
      navigate(`/${pid}/T1`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const {
      name,
      age,
      phone,
      gender,
      education,
      job,
      frequency,
      knowledge1,
      knowledge2,
    } = formData;
    const isValid =
      name &&
      age &&
      phone &&
      gender &&
      education &&
      job &&
      frequency &&
      knowledge1 &&
      knowledge2;
    setIsFormValid(isValid);
  }, [formData]);

  return (
    <div className="container">
      <div className="page-container">
        <div className="info-container">
          <h2>참가자 기본 정보 - {pid}</h2>
          <form>
            <div>
              <label>성함</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>나이</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>전화번호</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>성별</label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />{" "}
                남자
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />{" "}
                여자
              </label>
            </div>
            <div>
              <label>학력</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
              >
                <option value="">선택하세요</option>
                <option value="highschool">고등학교 졸업</option>
                <option value="bachelor">학사</option>
                <option value="master">석사</option>
                <option value="phd">박사</option>
              </select>
            </div>
            <div>
              <label>직업</label>
              <input
                type="text"
                name="job"
                value={formData.job}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className="info-container">
          <h2>실험 주제 관련 사전 질문</h2>
          <form>
            <div>
              <h3>Q1. 귀하의 ChatGPT 사용 빈도는 어느 정도 인가요?</h3>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="1"
                  checked={formData.frequency === "1"}
                  onChange={handleChange}
                />{" "}
                한 달에 한 번 이하
              </label>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="2"
                  checked={formData.frequency === "2"}
                  onChange={handleChange}
                />{" "}
                2~3주에 한 번
              </label>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="3"
                  checked={formData.frequency === "3"}
                  onChange={handleChange}
                />{" "}
                1주에 한 번
              </label>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="4"
                  checked={formData.frequency === "4"}
                  onChange={handleChange}
                />{" "}
                2~3일에 한 번
              </label>
              <label>
                <input
                  type="radio"
                  name="frequency"
                  value="5"
                  checked={formData.frequency === "5"}
                  onChange={handleChange}
                />{" "}
                거의 매일
              </label>
            </div>
            <div>
              <h3>
                Q2. 귀하는 GPT와 같은 대형 언어 모델(Large Language Model,
                LLM)에 대해 얼마나 잘 알고 있다고 생각하나요?
              </h3>
              <label>
                <input
                  type="radio"
                  name="knowledge1"
                  value="1"
                  checked={formData.knowledge1 === "1"}
                  onChange={handleChange}
                />{" "}
                전혀 모른다
              </label>
              <label>
                <input
                  type="radio"
                  name="knowledge1"
                  value="2"
                  checked={formData.knowledge1 === "2"}
                  onChange={handleChange}
                />{" "}
                거의 모른다
              </label>
              <label>
                <input
                  type="radio"
                  name="knowledge1"
                  value="3"
                  checked={formData.knowledge1 === "3"}
                  onChange={handleChange}
                />{" "}
                보통이다
              </label>
              <label>
                <input
                  type="radio"
                  name="knowledge1"
                  value="4"
                  checked={formData.knowledge1 === "4"}
                  onChange={handleChange}
                />{" "}
                조금 안다
              </label>
              <label>
                <input
                  type="radio"
                  name="knowledge1"
                  value="5"
                  checked={formData.knowledge1 === "5"}
                  onChange={handleChange}
                />{" "}
                많이 안다
              </label>
            </div>
            <div>
              <h3>
                Q3. 귀하는 인공지능 프롬프팅(prompting) 대해 얼마나 잘 알고
                있다고 생각하나요?
              </h3>
              <label>
                <input
                  type="radio"
                  name="knowledge2"
                  value="1"
                  checked={formData.knowledge2 === "1"}
                  onChange={handleChange}
                />{" "}
                전혀 모른다
              </label>
              <label>
                <input
                  type="radio"
                  name="knowledge2"
                  value="2"
                  checked={formData.knowledge2 === "2"}
                  onChange={handleChange}
                />{" "}
                거의 모른다
              </label>
              <label>
                <input
                  type="radio"
                  name="knowledge2"
                  value="3"
                  checked={formData.knowledge2 === "3"}
                  onChange={handleChange}
                />{" "}
                보통이다
              </label>
              <label>
                <input
                  type="radio"
                  name="knowledge2"
                  value="4"
                  checked={formData.knowledge2 === "4"}
                  onChange={handleChange}
                />{" "}
                조금 안다
              </label>
              <label>
                <input
                  type="radio"
                  name="knowledge2"
                  value="5"
                  checked={formData.knowledge2 === "5"}
                  onChange={handleChange}
                />{" "}
                많이 안다
              </label>
            </div>
          </form>
        </div>
      </div>
      <div className="button-container">
        <button
          type="button"
          onClick={handleNext}
          disabled={!isFormValid} // 입력이 모두 완료되지 않으면 비활성화
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default BasicInfoPage;
