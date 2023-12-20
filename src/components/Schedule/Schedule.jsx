import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DayTabs from "../DayTabs/DayTabs";
import ScheduleTable from "../ScheduleTable/ScheduleTable";
import GradeSelector from "../GradeSelector/GradeSelector";

const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const SPREADSHEET_ID = "1OeUNll981VnEn-di51D_8Ty6aZ1UdUiiIowA-Dfnd4c";
const API_KEY = "AIzaSyDZYXNIrPE1-tL_skTlclgtESDT9i02hFc";

const daysOfTheWeek = {
  monday: "понедельник",
  tuesday: "вторник",
  wednesday: "среда",
  thursday: "четверг",
  friday: "пятница",
};

const fetchData = async (day, grade, setData, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await axios.get(
      `${BASE_URL}/${SPREADSHEET_ID}/values/${day}!A1:S9?majorDimension=COLUMNS&key=${API_KEY}`
    );
    const data = grade
      ? response.data.values.filter((column) => column[0] === grade)
      : response.data.values.slice(1);
    setData({
      weekday: response.data.values[0][1],
      grades: response.data.values.slice(2).map((column) => column[0]),
      tableData: data,
      rowCount: data.reduce((max, arr) => Math.max(max, arr.length), 0),
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
  } finally {
    setIsLoading(false);
  }
};

const Schedule = () => {
  const [day, setDay] = useState("tuesday");
  const [grade, setGrade] = useState("");
  const [data, setData] = useState({
    weekday: "",
    grades: [],
    tableData: [],
    rowCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(day, grade, setData, setIsLoading);
  }, [day, grade]);

  return (
    <div>
      <DayTabs handleDayTabClick={setDay} daysOfTheWeek={daysOfTheWeek} />
      <GradeSelector grades={data.grades} setGrade={setGrade} />
      <ScheduleTable
        isLoading={isLoading}
        rowCount={data.rowCount}
        tableData={data.tableData}
        weekday={data.weekday}
      />
    </div>
  );
};

export default Schedule;
