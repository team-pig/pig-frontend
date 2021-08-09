import React from "react";
import styled, { css } from "styled-components";
import { Text } from "../../elem";
import flex from "../../themes/flex";

// component
import Dates from "./Dates";

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
  width: 100%;
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
  grid-template-rows: repeat(6, minmax(70px, 150px));
  border-top: 1px solid var(--grey);
  border-bottom: 1px solid var(--grey);
`;

const Day = styled.div`
  ${flex("end", "center")};
  padding: 0 7px;
`;

export default CalendarBody;
