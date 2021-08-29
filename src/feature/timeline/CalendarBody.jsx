import React, { useRef } from "react";
import styled, { css } from "styled-components";

// component
import Dates from "./Dates";

// theme & elem
import flex from "../../themes/flex";
import { Text } from "../../elem";

const CalendarBody = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const ref = useRef();

  // console.log(ref);

  return (
    <Container ref={ref}>
      <CalendarDays>
        {days.map((day, idx) => (
          <Day key={idx}>
            <Text type="body_2" color={idx % 7 === 0 ? "notice" : "darkgrey"}>
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
`;

const CalendarGrid = css`
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
  width: 100%;
  padding: 0 20px;
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

  ${({ theme }) => theme.device.tablet} {
    grid-template-rows: repeat(6, minmax(40px, calc(50vh / 6)));
  }

  ${({ theme }) => theme.device.mobile} {
    grid-template-rows: repeat(6, minmax(40px, calc(45vh / 6)));
  }
`;

const Day = styled.div`
  ${flex("end", "center")};
  padding: 0 8px;

  ${({ theme }) => theme.device.tablet} {
    justify-content: center;
    padding: 6px;
  }
`;

export default CalendarBody;
