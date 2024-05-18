// import React, { useEffect, useState } from 'react';
// import { Container, Table, Button, Input } from 'reactstrap';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import { readExcel, calculateTrailingReturns } from '../utils/readExcel';

// const Portfolio = () => {
//   const [data, setData] = useState([]);
//   const [niftyData, setNiftyData] = useState([]);
//   const [yahooData, setYahooData] = useState([]);
//   const [trailingReturns, setTrailingReturns] = useState({
//     ytd: 0,
//     oneDay: 0,
//     oneWeek: 0,
//     oneMonth: 0,
//     threeMonths: 0,
//     drawdown: 0,
//     maxDrawdown: 0,
//   });
//   const [startDate, setStartDate] = useState('2015-05-24');
//   const [endDate, setEndDate] = useState('2024-04-24');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const excelData = await readExcel('/excelData.xlsx');
//         setData(excelData);
//         const calculatedTrailingReturns = calculateTrailingReturns(excelData);
//         setTrailingReturns(calculatedTrailingReturns);

//         // Fetch NIFTY50 data
//      //    const niftyResponse = await axios.get('API_URL_FOR_NIFTY50');
//      //    setNiftyData(niftyResponse.data);

//         // Fetch Yahoo Finance data
//      //    const yahooResponse = await axios.get('API_URL_FOR_YAHOO_FINANCE');
//      //    setYahooData(yahooResponse.data);
//       } catch (error) {
//         console.error('Error reading data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const filterDataByDateRange = (data) => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     return data.filter((item) => item.date >= start && item.date <= end);
//   };

//   const formatValue = (value) => (value !== undefined ? value.toFixed(2) : 'N/A');

//   const equityCurveData = {
//     labels: filterDataByDateRange(data).map((item) => item.date.toISOString().split('T')[0]),
//     datasets: [
//       {
//         label: 'Focused',
//         data: filterDataByDateRange(data).map((item) => item.nav),
//         borderColor: 'green',
//         fill: false,
//       },
//       {
//         label: 'NIFTY50',
//         data: filterDataByDateRange(niftyData).map((item) => item.nav),
//         borderColor: 'blue',
//         fill: false,
//       },
//       {
//         label: 'Yahoo Finance',
//         data: filterDataByDateRange(yahooData).map((item) => item.nav),
//         borderColor: 'red',
//         fill: false,
//       },
//     ],
//   };

//   return (
//     <Container>
//       <h2>Portfolio Statistics</h2>
//       <h3>Trailing Returns</h3>
//       <Table striped>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>YTD</th>
//             <th>1D</th>
//             <th>1W</th>
//             <th>1M</th>
//             <th>3M</th>
//             <th>6M</th>
//             <th>1Y</th>
//             <th>3Y</th>
//             <th>SI</th>
//             <th>DD</th>
//             <th>Max DD</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Focused</td>
//             <td>{formatValue(trailingReturns.ytd)}%</td>
//             <td>{formatValue(trailingReturns.oneDay)}%</td>
//             <td>{formatValue(trailingReturns.oneWeek)}%</td>
//             <td>{formatValue(trailingReturns.oneMonth)}%</td>
//             <td>{formatValue(trailingReturns.threeMonths)}%</td>
//             <td>...</td> {/* Add additional columns as needed */}
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//             <td>{formatValue(trailingReturns.drawdown)}%</td>
//             <td>{formatValue(trailingReturns.maxDrawdown)}%</td>
//           </tr>
//           <tr>
//             <td>NIFTY50</td>
//             <td>3.1%</td>
//             <td>0.1%</td>
//             <td>1.1%</td>
//             <td>...</td>
//             <td>...</td> {/* Add additional columns as needed */}
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//           </tr>
//           <tr>
//             <td>Yahoo Finance</td>
//             <td>N/A</td>
//             <td>N/A</td>
//             <td>N/A</td>
//             <td>...</td>
//             <td>...</td> {/* Add additional columns as needed */}
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//             <td>...</td>
//           </tr>
//         </tbody>
//       </Table>
//       <div>
//         <Input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//         <Input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//         <Line data={equityCurveData} />
//       </div>
//     </Container>
//   );
// };

// export default Portfolio;

import React, { useEffect, useState } from "react";
import { Container, Table, Card, Input } from "reactstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { readExcel, calculateTrailingReturns } from "../utils/readExcel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
//     Legend
);

const Portfolio = () => {
  const [data, setData] = useState([]);
  const [trailingReturns, setTrailingReturns] = useState({
    ytd: 0,
    oneDay: 0,
    oneWeek: 0,
    oneMonth: 0,
    threeMonths: 0,
    drawdown: 0,
    maxDrawdown: 0,
  });
  const [startDate, setStartDate] = useState("2015-05-24");
  const [endDate, setEndDate] = useState("2024-04-24");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const excelData = await readExcel("/excelData.xlsx");
        setData(excelData);
        const calculatedTrailingReturns = calculateTrailingReturns(excelData);
        setTrailingReturns(calculatedTrailingReturns);
      } catch (error) {
        console.error("Error reading data:", error);
      }
    };
    fetchData();
  }, []);

  const filterDataByDateRange = (data) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return data.filter((item) => item.date >= start && item.date <= end);
  };

  const formatValue = (value) =>
    value !== undefined ? value.toFixed(2) : "N/A";

  const equityCurveData = {
    labels: filterDataByDateRange(data).map(
      (item) => item.date.toISOString().split("T")[0]
    ),
    datasets: [
      {
        label: "Focused",
        data: filterDataByDateRange(data).map((item) => item.nav),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        type: "category",
        reverse: true,
        title: {
          display: true,
          text: "",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Container >
      <Card className="mt-2 p-3">
        <h4>Trailing Returns</h4>
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>YTD</th>
              <th>1D</th>
              <th>1W</th>
              <th>1M</th>
              <th>3M</th>
              <th>6M</th>
              <th>1Y</th>
              <th>3Y</th>
              <th>SI</th>
              <th>DD</th>
              <th>Max DD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Focused</td>
              <td>{formatValue(trailingReturns.ytd)}%</td>
              <td>{formatValue(trailingReturns.oneDay)}%</td>
              <td>{formatValue(trailingReturns.oneWeek)}%</td>
              <td>{formatValue(trailingReturns.oneMonth)}%</td>
              <td>{formatValue(trailingReturns.threeMonths)}%</td>
              <td>{formatValue(trailingReturns.sixMonths)}%</td>
              <td>{formatValue(trailingReturns.oneYear)}%</td>
              <td>{formatValue(trailingReturns.threeYears)}%</td>
              <td>...</td>
              <td>{formatValue(trailingReturns.drawdown)}%</td>
              <td>{formatValue(trailingReturns.maxDrawdown)}%</td>
            </tr>
          </tbody>
        </Table>
        <div className="d-flex d-flex justify-content-between align-items-center">
          <div>
            <h4>Equity Curve</h4>
          </div>
          <div className="d-flex">
            <div style={{ marginRight: "20px" }}>
              <span> From Date</span>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <span>To Date</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <Line data={equityCurveData} options={options} />
        </div>
      </Card>
    </Container>
  );
};

export default Portfolio;
