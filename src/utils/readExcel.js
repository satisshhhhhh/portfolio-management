// // src/utils/readExcel.js
// import * as XLSX from 'xlsx';

// export const readExcel = async (file) => {
//   const response = await fetch(file);
//   const data = await response.arrayBuffer();
//   const workbook = XLSX.read(data, { type: 'array' });
//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//   return jsonData;
// };

// =====================================

// import * as XLSX from 'xlsx';

// export const readExcel = async (filePath) => {
//   const response = await fetch(filePath);
//   const arrayBuffer = await response.arrayBuffer();
//   const data = new Uint8Array(arrayBuffer);
//   const workbook = XLSX.read(data, { type: 'array' });

//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//   return jsonData;
// };

// =====================================

// import * as XLSX from 'xlsx';

// export const readExcel = async (filePath) => {
//   const response = await fetch(filePath);
//   const arrayBuffer = await response.arrayBuffer();
//   const data = new Uint8Array(arrayBuffer);
//   const workbook = XLSX.read(data, { type: 'array' });

//   const sheetName = workbook.SheetNames[0];
//   const worksheet = workbook.Sheets[sheetName];
//   const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//   // Skip the first 5 lines
//   const relevantData = jsonData.slice(5).map(row => ({
//     date: row[0],
//     nav: parseFloat(row[1])
//   }));

//   return relevantData;
// };

// export const calculateReturns = (data) => {
//   const returns = {
//     daily: [],
//     weekly: [],
//     monthly: [],
//     yearly: []
//   };

//   const calculateReturn = (start, end) => ((end.nav - start.nav) / start.nav) * 100;

//   // Calculate daily returns
//   for (let i = 1; i < data.length; i++) {
//     returns.daily.push({
//       date: new Date(data[i].date),
//       return: calculateReturn(data[i - 1], data[i])
//     });
//   }

//   // Calculate weekly returns
//   for (let i = 7; i < data.length; i += 7) {
//     returns.weekly.push({
//       date: new Date(data[i].date),
//       return: calculateReturn(data[i - 7], data[i])
//     });
//   }

//   // Calculate monthly returns
//   const monthlyData = data.filter((item, index) => new Date(item.date).getDate() === 1);
//   for (let i = 1; i < monthlyData.length; i++) {
//     returns.monthly.push({
//       date: new Date(monthlyData[i].date),
//       return: calculateReturn(monthlyData[i - 1], monthlyData[i])
//     });
//   }

//   // Calculate yearly returns
//   const yearlyData = data.filter((item, index) => new Date(item.date).getMonth() === 0 && new Date(item.date).getDate() === 1);
//   for (let i = 1; i < yearlyData.length; i++) {
//     returns.yearly.push({
//       date: new Date(yearlyData[i].date),
//       return: calculateReturn(yearlyData[i - 1], yearlyData[i])
//     });
//   }

//   return returns;
// };

// =====================================// =====================================

// export const calculateTrailingReturns = (data) => {
//   if (data.length === 0) return {};

//   // Filter data for the period from March 2023 to March 2024
//   const filteredData = data.filter((item) => {
//     const startDate = new Date("2023-03-01");
//     const endDate = new Date("2024-03-31");
//     return item.date >= startDate && item.date <= endDate;
//   });

//   const today = filteredData[filteredData.length - 1];
//   const trailingReturns = {
//     ytd: undefined,
//     oneDay: undefined,
//     oneWeek: undefined,
//     oneMonth: undefined,
//     threeMonths: undefined,
//     drawdown: undefined,
//     maxDrawdown: undefined,
//   };

//   const findNavByOffset = (offsetDays) => {
//     const targetDate = new Date(today.date);
//     targetDate.setDate(today.date.getDate() - offsetDays);
//     return filteredData.find(
//       (item) => item.date.getTime() <= targetDate.getTime()
//     );
//   };

//   // Calculate YTD return
//   const startOfYear = new Date(today.date.getFullYear(), 0, 1);
//   const ytdNav = filteredData.find(
//     (item) => item.date.getTime() >= startOfYear.getTime()
//   );
//   trailingReturns.ytd = calculateReturn(ytdNav, today);

//   // Calculate 1D return
//   const oneDayNav = findNavByOffset(1);
//   trailingReturns.oneDay = calculateReturn(oneDayNav, today);

//   // Calculate 1W return
//   const oneWeekNav = findNavByOffset(7);
//   trailingReturns.oneWeek = calculateReturn(oneWeekNav, today);

//   // Calculate 1M return
//   const oneMonthNav = findNavByOffset(30);
//   trailingReturns.oneMonth = calculateReturn(oneMonthNav, today);

//   // Calculate 3M return
//   const threeMonthsNav = findNavByOffset(90);
//   trailingReturns.threeMonths = calculateReturn(threeMonthsNav, today);

//   // Calculate drawdowns
//   let peak = filteredData[0].nav;
//   let maxDrawdown = 0;
//   filteredData.forEach((item) => {
//     if (item.nav > peak) {
//       peak = item.nav;
//     }
//     const drawdown = ((peak - item.nav) / peak) * 100;
//     if (drawdown > maxDrawdown) {
//       maxDrawdown = drawdown;
//     }
//   });
//   trailingReturns.maxDrawdown = maxDrawdown;

//   return trailingReturns;
// };

import * as XLSX from "xlsx";

export const readExcel = async (filePath) => {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);
  const workbook = XLSX.read(data, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // Skip the first 5 lines
  const relevantData = jsonData.slice(5).map((row) => ({
    date: new Date(row[0]),
    nav: parseFloat(row[1]),
  }));

  return relevantData;
};

const calculateReturn = (start, end) =>
  start && end ? ((end.nav - start.nav) / start.nav) * 100 : undefined;

export const calculateTrailingReturns = (data) => {
  if (data.length === 0) return {};

  // Filter data for the period from March 2023 to March 2024
  const filteredData = data.filter((item) => {
    const startDate = new Date("2023-03-01");
    const endDate = new Date("2024-03-31");
    return item.date >= startDate && item.date <= endDate;
  });

  const today = filteredData[filteredData.length - 1];
  const trailingReturns = {
    ytd: undefined,
    oneDay: undefined,
    oneWeek: undefined,
    oneMonth: undefined,
    threeMonths: undefined,
    sixMonths: undefined,
    oneYear: undefined,
    threeYears: undefined,
    drawdown: undefined,
    maxDrawdown: undefined,
  };

  const findNavByOffset = (offsetDays) => {
    const targetDate = new Date(today.date);
    console.log(`today.date.getDate() --> ${today.date.getDate()}`);
    console.log(
      `today.date.getDate() - offsetDays --> ${
        today.date.getDate() - offsetDays
      }`
    );
    targetDate.setDate(today.date.getDate() - offsetDays);
    return filteredData.find(
      (item) => item.date.getTime() <= targetDate.getTime()
    );
  };

  // Calculate YTD return
  const startOfYear = new Date(today.date.getFullYear(), 0, 1);
  const ytdNav = filteredData.find(
    (item) => item.date.getTime() >= startOfYear.getTime()
  );
  trailingReturns.ytd = calculateReturn(ytdNav, today);

  // Calculate 1D return
  const oneDayNav = findNavByOffset(1);
  trailingReturns.oneDay = calculateReturn(oneDayNav, today);

  // Calculate 1W return
  const oneWeekNav = findNavByOffset(7);
  trailingReturns.oneWeek = calculateReturn(oneWeekNav, today);

  // Calculate 1M return
  const oneMonthNav = findNavByOffset(30);
  trailingReturns.oneMonth = calculateReturn(oneMonthNav, today);

  // Calculate 3M return
  const threeMonthsNav = findNavByOffset(90);
  trailingReturns.threeMonths = calculateReturn(threeMonthsNav, today);

  // Calculate 6M return
  const sixMonthsNav = findNavByOffset(180);
  trailingReturns.sixMonths = calculateReturn(sixMonthsNav, today);

  // Calculate 1Y return
  const oneYearNav = findNavByOffset(365);
  trailingReturns.oneYear = calculateReturn(oneYearNav, today);

  // Calculate 3Y return
  const threeYearsNav = findNavByOffset(3 * 365);
  trailingReturns.threeYears = calculateReturn(threeYearsNav, today);

  // Calculate drawdowns
  let peak = filteredData[0].nav;
  let maxDrawdown = 0;
  filteredData.forEach((item) => {
    if (item.nav > peak) {
      peak = item.nav;
    }
    const drawdown = ((peak - item.nav) / peak) * 100;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });
  let drawdown = 0;
  data.forEach((item) => {
    if (item.nav > peak) {
      peak = item.nav;
    }
    const currentDrawdown = ((peak - item.nav) / peak) * 100;
    if (currentDrawdown > maxDrawdown) {
      maxDrawdown = currentDrawdown;
    }
    drawdown = currentDrawdown;
  });
  trailingReturns.drawdown = drawdown;
  trailingReturns.maxDrawdown = maxDrawdown;

  return trailingReturns;
};


