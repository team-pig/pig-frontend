import React from "react";
import styled from "styled-components";

// component
import CalendarBody from "../components/Calendar/CalendarBody";
import CalendarHeader from "../components/Calendar/CalendarHeader";

// elem
import { Button } from "../elem";

const Calendar = (props) => {
  return (
    <CalendarBox>
      <CalendarHeader />
      <CalendarBody />
      <Button>일정 추가</Button>
    </CalendarBox>
  );
};

const CalendarBox = styled.section`
  // 임시 스타일
  position: relative;
  z-index: 99;
`;

export default Calendar;
