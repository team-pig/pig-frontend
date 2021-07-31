import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// component
import CalendarBody from "../components/Calendar/CalendarBody";
import CalendarHeader from "../components/Calendar/CalendarHeader";

// elem
import { Button } from "../elem";
import { __loadSchedules } from "../redux/modules/calendar";

const Calendar = (props) => {
  const { roomId } = useParams();

  const dispatch = useDispatch();
  const current = useSelector((state) => state.calendar.current);

  // 월이 바뀔 때마다 모든 일정을 가져오도록 설정
  useEffect(() => {
    if (current) {
      dispatch(__loadSchedules(roomId, current.clone().format("YYYYMM")));
    }
  }, [current, roomId]);

  return (
    <CalendarBox>
      <Button>일정 추가</Button>
      <CalendarHeader />
      <CalendarBody />
    </CalendarBox>
  );
};

const CalendarBox = styled.section`
  // 임시 스타일
  position: relative;
  z-index: 99;
`;

export default Calendar;
