import React from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

const CalendarBody = () => {
  const { current } = useSelector((state) => state.calendar);

  const firstDay = current.clone().startOf("month");
  const startDate = firstDay.clone().subtract("day", firstDay.day());

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const renderDate = () => {
    return (
      <>
        {[...Array(42)].map((n, idx) => {
          let target = startDate.clone().add(idx, "d");
          return <CalendarDate key={idx}>{target.format("D")}</CalendarDate>;
        })}
      </>
    );
  };

  return (
    <>
      <CalendarDays>
        {days.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </CalendarDays>
      <CalendarDate>{renderDate()}</CalendarDate>
    </>
  );
};

const CalendarGrid = css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarDays = styled.div`
  ${CalendarGrid};
  grid-template-rows: 30px;
`;

const CalendarDate = styled.div`
  ${CalendarGrid};
  grid-template-rows: repeat(6, minmax(70px, 150px));
`;

export default CalendarBody;
