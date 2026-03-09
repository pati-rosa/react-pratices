const SurveySummary = ({ responses, surveyData, onEdit, onReset }) => (
  <div data-testid="summary-block">
    <h2>Survey Summary</h2>
    <ul>
      {Object.entries(responses).map(([questionId, answer]) => {
        const questionText = surveyData.find(
          (q) => q.id === questionId
        ).question;
        return (
          <li key={questionId}>
            <strong>{questionText}</strong>: {answer}{" "}
            <button data-testid="edit-btn" onClick={() => onEdit(questionId)}>
              Edit
            </button>
          </li>
        );
      })}
    </ul>
    <button data-testid="reset-btn" onClick={onReset}>
      Restart Survey
    </button>
  </div>
);

export default SurveySummary;
