import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { LogContext } from "../components/LogContext";

function EndPage() {
  const { pid } = useParams();
  const { consentData, infoData, chatLogs, evaluationData } =
    useContext(LogContext);

  const handleSubmit = async () => {
    const allData = {
      consentData,
      infoData,
      chatLogs,
      evaluationData,
    };
    console.log("데이터", allData); // 서버에 데이터를 전송하는 코드로 대체

    try {
      const response = await fetch("http://localhost:4000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allData),
      });

      if (!response.ok) {
        throw new Error("서버 응답이 올바르지 않습니다.");
      }

      const result = await response.json();
      console.log("서버 응답:", result);
      alert("데이터가 성공적으로 제출되었습니다.");
    } catch (error) {
      console.error("데이터 전송 중 오류 발생:", error);
      alert("데이터 전송 중 오류가 발생했습니다. 나중에 다시 시도하세요.");
    }
  };

  return (
    <div className="page-container">
      <div className="info-container">
        <h3 style={{ textAlign: "center" }}>수고하셨습니다! - {pid}</h3>
        <div className="button-container">
          <button onClick={handleSubmit}>제출</button>
        </div>
      </div>
    </div>
  );
}

export default EndPage;
