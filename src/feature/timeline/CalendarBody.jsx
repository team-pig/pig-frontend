import React from "react";
import styled, { css } from "styled-components";

// component
import Dates from "./Dates";

const CalendarBody = () => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <>
      <CalendarDays>
        {days.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </CalendarDays>
      <CalendarDate>
        <Dates />
      </CalendarDate>
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
