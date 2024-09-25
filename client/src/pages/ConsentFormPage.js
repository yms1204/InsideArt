import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LogContext } from "../components/LogContext";
import "./Page.css";

function ConsentFormPage() {
  const navigate = useNavigate();
  const { pid } = useParams();
  const { saveConsentData } = useContext(LogContext);

  const [consent, setConsent] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNext = () => {
    saveConsentData({ pid, consent: "agree" });
    if (isFormValid) {
      navigate(`/${pid}/info`);
    }
  };

  const handleConsentChange = (e) => {
    setConsent(e.target.value);
  };

  useEffect(() => {
    setIsFormValid(consent === "agree");
  }, [consent]);

  return (
    <div className="page-container">
      <div className="info-container">
        <h2>연구 참여 동의서 - {pid} </h2>
        <h3 style={{ textAlign: "center", fontWeight: "500" }}>
          안녕하세요. 실험에 참여해주셔서 감사합니다.
        </h3>
        <div>
          <h3>1. 연구 대상자의 참여 시간, 절차 및 소요 시간</h3>
          <label>
            연구 참여 시간은 60분 이내 이며 실험 절차는 다음과 같습니다.
          </label>
          <div className="study-process">
            <label> 1. 연구 참가 동의서</label>
            <label> 2. 참가자 정보 수집</label>
            <label> 3. 실험 전 인터뷰</label>
            <label> 4. 실험 설명</label>
            <label> 5. 본 실험</label>
            <label> 6. 인터뷰</label>
          </div>
        </div>
        <div>
          <h3>2. 연구 배경 및 목적</h3>
          <label>
            본 연구는 온라인에서 활동하는 작가들이 청중의 반응을 더 깊이 이해할
            수 있도록, 대화형 에이전트를 활용해 사용자의 감상을 보다 풍부하게
            이끌어내는 시스템을 제안하는 것입니다.
          </label>
        </div>
        <div>
          <h3>3. 개인정보와 비밀 보장</h3>
          <label>
            수집된 데이터는 연구 목적으로만 이용될 것이며, 특정 개인을 추적하여
            분석을 절대 진행하지 않습니다. 수집된 개인정보(이름, 성별, 전화번호
            등)은 통계 분석으로만 사용되며, 실험이 끝난 후 즉시 폐기됩니다. 이
            연구에서 얻어진 개인 정보가 학회에 공개될 때 응답자의 이름 및 다른
            개인정보는 사용되지 않습니다. 연구대상자의 참여가 중지되거나 철회될
            경우 연구대상자의 자료 및 정보는 즉시 폐기됩니다.
          </label>
        </div>
        <div>
          <h3>4. 참여 철회 및 중지 보상</h3>
          <label>
            참가자는 본 연구 참가 진행 도중 개인이 원할 시 중도 참여 포기를 할
            수 있습니다. 참여 포기 시, 개인정보 및 자료는 즉시 폐기되며
            보관되거나 분석의 대상이 되지 않습니다.
          </label>
        </div>
        <div>
          <h3
            style={{ color: "#9195f6", textAlign: "center", marginTop: "50px" }}
          >
            위의 실험 내용에 관한 정보를 모두 읽었으며, 본 연구에 대한 참여는
            자발적 참여라는 것을 이해하였고 동의합니다.
          </h3>
          <div>
            <div className="study-process">
              <label style={{ backgroundColor: "white", fontSize: "20px" }}>
                <input
                  type="radio"
                  name="consent"
                  value="agree"
                  checked={consent === "agree"}
                  onChange={handleConsentChange}
                />{" "}
                동의합니다.
              </label>
              <label style={{ backgroundColor: "white", fontSize: "20px" }}>
                <input
                  type="radio"
                  name="consent"
                  value="disagree"
                  checked={consent === "disagree"}
                  onChange={handleConsentChange}
                />{" "}
                동의하지 않습니다.
              </label>
            </div>
          </div>
        </div>
        <div className="button-container" style={{ justifyContent: "center" }}>
          <button
            type="button"
            onClick={handleNext}
            disabled={!isFormValid} // 동의하지 않으면 비활성화
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentFormPage;
