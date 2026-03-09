import React from "react";

import surveyData from "../constants/surveyData";
import SurveyQuestion from "./SurveyQuestion";
import SurveySummary from "./SurveySummary";
import useSurvey from "../hooks/useSurvey";

// Implement the missing functionality in this component
const DynamicSurveyBuilder = () => {
  const {
    currentQuestion,
    responses,
    handleResponseChange,
    handleEdit,
    resetSurvey,
  } = useSurvey(surveyData);

  return (
    <div>
      {currentQuestion ? (
        <SurveyQuestion
          question={currentQuestion}
          onAnswer={handleResponseChange}
        />
      ) : (
        <SurveySummary
          responses={responses}
          surveyData={surveyData}
          onEdit={handleEdit}
          onReset={resetSurvey}
        />
      )}
    </div>
  );
};

export default DynamicSurveyBuilder;
