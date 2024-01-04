"use client";

import { useRouter } from "next/navigation";
import DateRangeInput from "../components/DateRangeInput";
import { useEffect, useState } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const router = useRouter();

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Menghitung jarak hari antara startDate dan endDate
    const timeDifference = Math.abs(end.getTime() - start.getTime());
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Melakukan looping sebanyak jarak hari dan mencetak setiap tanggal
    for (let i = 0; i <= daysDifference; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);

      // Format tanggal ke dalam bentuk yyyy-mm-dd
      const formattedDate = currentDate.toISOString().split("T")[0];

      // Mencetak tanggal ke console
      console.log(formattedDate + i);
    }
  }, [startDate, endDate]);

  const getRangeDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <main className="min-h-screen p-7">
      <h1
        className="text-2xl text-white font-semibold mb-2"
        onClick={() => console.log(startDate, endDate)}
      >
        Analytics Report
      </h1>
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
        <div>
          <input
            type="text"
            placeholder="button title"
            className="border border-white min-h-[40px] text-white rounded-md bg-transparent h-full px-2 w-full"
          />
        </div>
      </div>
    </main>
  );
}
