"use client";

import React from "react";
import { TuiDateRangePicker } from "nextjs-tui-date-range-picker";

type DateRangeInputProps = {
  getRangeDate: (startDate: string, endDate: string) => void;
  startDate: string;
  endDate: string;
};

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  getRangeDate,
  startDate,
  endDate,
}) => {
  const options = {
    language: "en",
    usageStatistics: false,
    format: "dd-MM-YYYY",
  };

  return (
    <TuiDateRangePicker
      handleChange={(e) => {
        let formattedDates = e.map((dateString: Date, i: number) => {
          let date = new Date(dateString);
          return date.toISOString().split("T")[0];
        });

        getRangeDate(formattedDates[0], formattedDates[1]);
      }}
      options={options}
      inputWidth={80}
      containerWidth={200}
      startpickerDate={new Date(startDate)}
      endpickerDate={new Date(endDate)}
    />
  );
};

export default DateRangeInput;
