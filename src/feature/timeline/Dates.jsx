import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDate } from "../../redux/modules/date";

import clickDate from "./clickDate";

// component
import Date from "./Date";

const Dates = () => {
  const { now, current } = useSelector((state) => state.date);
  const { scheduleList, currentScheduleId } = useSelector(
    (state) => state.calendar
  );

  const dispatch = useDispatch();

  const firstDay = current.clone().startOf("month");
  const startDate = firstDay.clone().subtract(firstDay.day(), "day");
  const nowFormat = parseInt(now.clone().format("YYYYMMDD")); // 오늘 확인용으로 사용 코드

  // 처음 타임라인으로 들어왔을 때 당일의 일정들을 보여줌
  useEffect(() => {
    let targetFormat = now.clone().format("YYYYMMDD");
    let targetList = scheduleList.filter(
      (schedule) =>
        parseInt(schedule["startDate"].split("-").join("")) <= targetFormat &&
        parseInt(schedule["endDate"].split("-").join("")) >= targetFormat
    );
    if (!currentScheduleId) {
      dispatch(selectDate(now));
      clickDate(now, targetList, dispatch);
    }
  }, [now, scheduleList, currentScheduleId, dispatch]);

  return (
    <>
      {[...Array(42)].map((n, idx) => {
        let target = startDate.clone().add(idx, "d");
        let targetFormat = parseInt(target.format("YYYYMMDD"));
        let today = parseInt(target.clone().format("YYYYMMDD")) === nowFormat; // 오늘 확인용

        let targetList = scheduleList.filter(
          (schedule, idx) =>
            parseInt(schedule["startDate"].split("-").join("")) <=
              targetFormat &&
            parseInt(schedule["endDate"].split("-").join("")) >= targetFormat
        );

        const checkThisMonth =
          String(targetFormat).substr(0, 6) ===
          current.clone().format("YYYYMMDD").substr(0, 6);

        return (
          <Date
            key={idx}
            idx={idx}
            list={targetList}
            today={today}
            thisMonth={checkThisMonth}
            _onClick={() => clickDate(target, targetList, dispatch)}
          >
            {target.format("D")}
          </Date>
        );
      })}
    </>
  );
};

export default Dates;
