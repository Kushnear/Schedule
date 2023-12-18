import React, { useEffect, useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const spreadsheetId = "1OeUNll981VnEn-di51D_8Ty6aZ1UdUiiIowA-Dfnd4c";
  const sheetName = "monday";
  const apiKey = "AIzaSyDZYXNIrPE1-tL_skTlclgtESDT9i02hFc";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A1:S9?majorDimension=COLUMNS&key=${apiKey}`
        );
        setData(response.data.values);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyComponent;
