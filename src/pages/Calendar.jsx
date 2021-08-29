import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// compo
import CalendarHeader from "../feature/timeline/CalendarHeader";
import CalendarBody from "../feature/timeline/CalendarBody";
import CalendarInfo from "../feature/timeline/CalendarInfo";

// utill
import flex from "../themes/flex";

// redux
import {
  resetTimeline,
  __loadBuckets,
  __loadSchedules,
} from "../redux/modules/calendar";

const Calendar = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const current = useSelector((state) => state.date.current);

  const rightRef = useRef();

  useEffect(() => {
    return () => dispatch(resetTimeline());
  }, [dispatch]);

  useEffect(() => dispatch(__loadBuckets(roomId)), [dispatch, roomId]);

  useEffect(() => {
    if (current) {
      dispatch(__loadSchedules(roomId, current.clone().format("YYYYMM")));
    }
  }, [dispatch, current, roomId]);

  console.log("right");
  console.log(rightRef.current);

  return (
    <CalendarBox>
      <Left>
        <CalendarInfo />
      </Left>
      <Right ref={rightRef}>
        <CalendarHeader />
        <CalendarBody />
      </Right>
    </CalendarBox>
  );
};

const CalendarBox = styled.section`
  --header: 48px;

  ${flex("start", "start")}
  width: 100%;
  height: calc(100vh - var(--header));

  ${({ theme }) => theme.device.tablet} {
    height: calc(100vh - var(--header));
    flex-direction: column-reverse;
    overflow: hidden;
  }
`;

const Left = styled.section`
  width: 260px;
  height: 100%;
  flex-grow: 0;

  ${({ theme }) => theme.device.tablet} {
    width: 100%;
    overflow: hidden;
  }
`;

const Right = styled.section`
  width: calc(100% - 260px);
  height: 100%;

  ${({ theme }) => theme.device.tablet} {
    width: 100%;
    height: 100%;
  }
`;

export default Calendar;
