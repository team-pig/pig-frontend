import React from "react";
import { useSelector } from "react-redux";

// component
import Date from "./Date";

const Dates = () => {
  const { now, current, scheduleList } = useSelector((state) => state.calendar);

  const firstDay = current.clone().startOf("month");
  const startDate = firstDay.clone().subtract("day", firstDay.day());
  // const nowFormat = parseInt(now.clone().format("YYYYMMDD")); // 오늘 확인용으로 사용 코드

  return (
    <>
      {[...Array(42)].map((n, idx) => {
        let target = startDate.clone().add(idx, "d");
        let targetFormat = parseInt(target.format("YYYYMMDD"));
        // let today = parseInt(target.clone().format("YYYYMMDD")) === nowFormat; // 오늘 확인용
        console.log(
          parseInt(scheduleList[0].startDate) <= targetFormat &&
            parseInt(scheduleList[0].endDate) >= targetFormat
        );
        let targetList = scheduleList.filter(
          (schedule, idx) =>
            parseInt(schedule.startDate) <= targetFormat &&
            parseInt(schedule.endDate) >= targetFormat
        );
        return (
          <Date key={idx} list={targetList}>
            {target.format("D")}
          </Date>
        );
      })}
    </>
  );
};

export default Dates;