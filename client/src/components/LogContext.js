// LogContext.js
import React, { createContext, useState } from "react";

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [consentData, setConsentData] = useState(null);
  const [infoData, setInfoData] = useState({});
  const [chatLogs, setChatLogs] = useState([]);
  const [evaluationData, setEvaluationData] = useState([]);

  const saveConsentData = (data) => setConsentData(data);
  const saveInfoData = (data) => setInfoData(data);
  const saveChatLog = (log) => setChatLogs((prevLogs) => [...prevLogs, log]);
  const saveEvaluationData = (data) =>
    setEvaluationData((prevData) => [...prevData, data]);

  return (
    <LogContext.Provider
      value={{
        consentData,
        infoData,
        chatLogs,
        evaluationData,
        saveConsentData,
        saveInfoData,
        saveChatLog,
        saveEvaluationData,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};
