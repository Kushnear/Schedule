import React, { useEffect, useState } from "react";

const DayTabs = ({ handleDayTabClick, daysOfTheWeek }) => {
  return (
    <div>
      {Object.entries(daysOfTheWeek).map(
        ([dayInEnglish, dayInRussian], index) => {
          return (
            <button key={index} onClick={() => handleDayTabClick(dayInEnglish)}>
              {dayInRussian}
            </button>
          );
        }
      )}
    </div>
  );
};

export default DayTabs;
