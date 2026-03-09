import { useState } from "react";

const useSurvey = (surveyData) => {
  const [responses, setResponses] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(surveyData[0].id);

  const currentQuestion = surveyData.find((q) => q.id === currentQuestionId);

  const handleResponseChange = (questionId, answer) => {
   setResponses(prev => ({
    ...prev,
    [questionId]: answer
   }))

   const question = surveyData.find(q => q.id === questionId)
   const nextQuestionId = question.next[answer] || question.next.default
   console.log(nextQuestionId)
   setCurrentQuestionId(nextQuestionId)
  };

  // Implement the handleEdit function
  const handleEdit = (questionId) => {

  };

  const resetSurvey = () => {
    setResponses({});
    setCurrentQuestionId(surveyData[0].id);
  };

  return {
    currentQuestion,
    responses,
    handleResponseChange,
    handleEdit,
    resetSurvey,
  };
};

export default useSurvey;
