"use client";

import DateRangeInput from "../components/DateRangeInput";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import LogoutButton from "../components/LogoutButton";

export default function Home() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getRange();
  }, [startDate, endDate]);

  const createTableData = (data: any) => {
    let result: any = [];

    data.forEach((entry: any) => {
      let dateKey = Object.keys(entry)[0];
      let dateValue = entry[dateKey];

      dateValue.forEach((item: any) => {
        let scope = item.scope;
        let count = item.count;

        let existingEntry = result.find((x: any) => x.scope === scope);

        if (existingEntry) {
          existingEntry.total += count;
          existingEntry[dateKey.slice(-2)] = count;
        } else {
          let newEntry: any = { scope: scope, total: count };
          newEntry[dateKey.slice(-2)] = count;
          result.push(newEntry);
        }
      });
    });
    console.log("cek", result);

    setTableData(result);
    setIsLoading(false);
  };

  const getReport = async (date: string) => {
    let tempVal: any = {};
    const endpoint = "/api/report?listing_date=" + date;
    const options = {
      method: "GET",
    };

    let condition = true;
    while (condition) {
      const data = await fetch(endpoint, options).then((response) =>
        response.json()
      );
      if (!data.error && !tempVal[date]) {
        tempVal = { [date]: data.data };
        condition = false;
      }
    }

    return tempVal;
  };

  const getRange = async () => {
    setIsLoading(true);
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Menghitung jarak hari antara startDate dan endDate
    const timeDifference = Math.abs(end.getTime() - start.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    let tempValue: any = [];

    // Melakukan looping sebanyak jarak hari dan mencetak setiap tanggal
    for (let i = 0; i <= daysDifference; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      // Format tanggal ke dalam bentuk yyyy-mm-dd
      const formattedDate = currentDate.toISOString().split("T")[0];

      const data = await getReport(formattedDate);
      tempValue.push(data);
    }

    createTableData(tempValue);
  };

  const getRangeDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <main className="min-h-screen p-7">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl text-white font-semibold mb-2">
          Analytics Report
        </h1>
        <LogoutButton />
      </div>
      <div className="grid lg:grid-cols-3 gap-2 lg:gap-10">
        <div className="flex gap-3 items-center text-white">
          <span>Filter </span>
          <div className="w-full border border-white text-white rounded-md">
            <DateRangeInput
              getRangeDate={getRangeDate}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
        {/* <div>
          <input
            type="text"
            placeholder="button title"
            className="border border-white min-h-[40px] text-white rounded-md bg-transparent h-full px-2 w-full"
          />
        </div> */}
      </div>
      <Table data={tableData} />
    </main>
  );
}
