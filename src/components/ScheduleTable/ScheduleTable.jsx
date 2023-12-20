import React, { useEffect, useState } from "react";

const ScheduleTable = ({ isLoading, rowCount, tableData, weekday }) => {
  return (
    <div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <td>{weekday}</td>
            </tr>
          </thead>
          <tbody>
            {rowCount > 0 &&
              Array.from({ length: rowCount }, (_, i) => (
                <tr key={i}>
                  {tableData.map((column, index) => (
                    <td key={index}>{column[i]}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScheduleTable;
