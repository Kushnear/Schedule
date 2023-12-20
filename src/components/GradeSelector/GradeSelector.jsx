import React, { useState } from "react";

const GradeSelector = ({ grades, setGrade }) => {
  const [gradesAreShown, setGradesAreShown] = useState(false);

  const handleGradeClick = (grade) => {
    setGrade(grade);
    setGradesAreShown(false);
  };

  const toggleGrades = () => {
    setGradesAreShown(!gradesAreShown);
  };

  return (
    <div>
      {!gradesAreShown ? (
        <button onClick={toggleGrades}>Выбери класс</button>
      ) : (
        <div>
          {grades.map((grade, index) => (
            <button key={index} onClick={() => handleGradeClick(grade)}>
              {grade}
            </button>
          ))}
          <button onClick={toggleGrades}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default GradeSelector;
