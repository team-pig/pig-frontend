import React from "react";
import styled, { css } from "styled-components";

// component
import Dates from "./Dates";

// theme & elem
import flex from "../../themes/flex";
import { Text } from "../../elem";

const CalendarBody = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <Container>
      <CalendarDays>
        {days.map((day, idx) => (
          <Day key={idx}>
            <Text type="body_2" color="darkgrey">
              {day}
            </Text>
          </Day>
        ))}
      </CalendarDays>
      <CalendarDate>
        <Dates />
      </CalendarDate>
    </Container>
  );
};

const Container = styled.section`
  --calendarHeader: 60px;

  width: 100%;
  height: calc(100% - var(--calendarHeader));
  padding: 0 20px;
`;

const CalendarGrid = css`
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
`;

const CalendarDays = styled.div`
  ${CalendarGrid};
  grid-template-rows: 30px;
`;

const CalendarDate = styled.div`
  ${CalendarGrid};
  height: calc(100% - 30px);
  grid-template-rows: repeat(6, calc(100% / 6));
  border-top: 1px solid var(--grey);
  border-bottom: 1px solid var(--grey);
`;

const Day = styled.div`
  ${flex("end", "center")};
  padding: 0 8px;
`;

export default CalendarBody;
