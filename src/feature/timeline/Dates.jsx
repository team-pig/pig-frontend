import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { selectDate } from "../../redux/modules/date";
import { loadDaySchedules } from "../../redux/modules/calendar";

// component
import Date from "./Date";

const Dates = () => {
  const { now, current } = useSelector((state) => state.date);
  const { scheduleList } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const firstDay = current.clone().startOf("month");
  const startDate = firstDay.clone().subtract("day", firstDay.day());
  const nowFormat = parseInt(now.clone().format("YYYYMMDD")); // 오늘 확인용으로 사용 코드

  const loadSchedules = async (date, idAry) => {
    dispatch(selectDate(date));
    dispatch(loadDaySchedules(idAry));
  };

  const clickDate = (target, targetList) => {
    const idAry = targetList.map((item) => item.cardId);
    const date = target.format("M월 D일");
    loadSchedules(date, idAry);
  };

  // 처음 타임라인으로 들어왔을 때 당일의 일정들을 보여줌
  useEffect(() => {
    let targetFormat = now.clone().format("YYYYMMDD");
    let targetList = scheduleList.filter(
      (schedule, idx) =>
        parseInt(schedule["startDate"].split("-").join("")) <= targetFormat &&
        parseInt(schedule["endDate"].split("-").join("")) >= targetFormat
    );
    clickDate(now, targetList);
  }, [now, scheduleList]);

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
          String(targetFormat).substr(0, 6) === String(nowFormat).substr(0, 6);

        return (
          <Date
            key={idx}
            idx={idx}
            list={targetList}
            today={today}
            thisMonth={checkThisMonth}
            _onClick={() => clickDate(target, targetList)}
          >
            {target.format("D")}
          </Date>
        );
      })}
    </>
  );
};

export default Dates;
