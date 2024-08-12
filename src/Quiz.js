import React, { useState } from 'react';
import { questions } from '../../quiz-data/questions';
import { options } from '../../quiz-data/options';

const Quiz = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [result, setResult] = useState(null);

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId,
    });
  };

  const calculateResult = () => {
    const score = { typeA: 0, typeB: 0 };

    Object.keys(selectedOptions).forEach((questionId) => {
      const optionId = selectedOptions[questionId];
      const selectedOption = options.find(option => option.id === optionId);
      score.typeA += selectedOption.points.typeA;
      score.typeB += selectedOption.points.typeB;
    });

    const finalResult = score.typeA > score.typeB ? 'Type A' : 'Type B';
    setResult(finalResult);
  };

  return (
    <div>
      <h1>Quiz</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <h2>{question.text}</h2>
          {question.options.map((optionId) => {
            const option = options.find(opt => opt.id === optionId);
            return (
              <div key={optionId}>
                <input
                  type="radio"
                  id={`question-${question.id}-option-${optionId}`}
                  name={`question-${question.id}`}
                  value={optionId}
                  onChange={() => handleOptionChange(question.id, optionId)}
                />
                <label htmlFor={`question-${question.id}-option-${optionId}`}>
                  {option.text}
                </label>
              </div>
            );
          })}
        </div>
      ))}
      <button onClick={calculateResult}>Get Result</button>
      {result && <h2>Your result: {result}</h2>}
    </div>
  );
};

export default Quiz;

