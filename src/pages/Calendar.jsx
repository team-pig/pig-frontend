import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// redux
import { __loadSchedules } from "../redux/modules/calendar";

// component
import CalendarHeader from "../feature/timeline/CalendarHeader";
import CalendarBody from "../feature/timeline/CalendarBody";
import CalendarInfo from "../feature/timeline/CalendarInfo";

const Calendar = (props) => {
  const { roomId } = useParams();

  const dispatch = useDispatch();
  const current = useSelector((state) => state.date.current);

  // 월이 바뀔 때마다 모든 일정을 가져오도록 설정
  useEffect(() => {
    if (current) {
      dispatch(__loadSchedules(roomId, current.clone().format("YYYYMM")));
    }
  }, [current, roomId]);

  return (
    <CalendarBox>
      <CalendarHeader />
      <CalendarBody />
      <CalendarInfo />
    </CalendarBox>
  );
};

const CalendarBox = styled.section`
  width: 100%;
`;

export default Calendar;
