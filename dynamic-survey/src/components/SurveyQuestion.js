import { useState } from "react";

const SurveyQuestion = ({ question, onAnswer }) => {
  const [textAreaContent, setTextAreaContent] = useState("");
  if (!question) return null;

  return (
    <div data-testid="question-block">
      <h2>{question.question}</h2>
      {question.type === "text" ? (
        <>
          <textarea
            data-testid="input-field"
            value={textAreaContent}
            onChange={(e) => setTextAreaContent(e.target.value)}
          />
          <br />
          <button onClick={() => onAnswer(question.id, textAreaContent)}>
            Submit
          </button>
        </>
      ) : (
        question.options.map((option) => (
          <button
            key={option}
            data-testid="option-btn"
            onClick={() => onAnswer(question.id, option)}
          >
            {option}
          </button>
        ))
      )}
    </div>
  );
};

export default SurveyQuestion;
