import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// redux
import { __addSchedule, __loadSchedules } from "../redux/modules/calendar";

// component
import CalendarHeader from "../feature/timeline/CalendarHeader";
import CalendarBody from "../feature/timeline/CalendarBody";
import CardModal from "../feature/board/CardModal";

// elem
import { Button } from "../elem";
import CalendarModal from "../feature/timeline/CalendarModal";

const Calendar = (props) => {
  const { roomId } = useParams();

  const dispatch = useDispatch();
  const current = useSelector((state) => state.calendar.current);
  const currentContent = useSelector((state) =>
    state.calendar.scheduleList.find(
      (item) => item.cardId === state.calendar.currentScheduleId
    )
  );

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // 월이 바뀔 때마다 모든 일정을 가져오도록 설정
  useEffect(() => {
    if (current) {
      dispatch(__loadSchedules(roomId, current.clone().format("YYYYMM")));
    }
  }, [current, roomId]);

  useEffect(() => setModalContent(currentContent), [currentContent]);

  const clickCreateBtn = () => {
    setShowModal((pre) => !pre);
    dispatch(__addSchedule());
  };

  return (
    <CalendarBox>
      <Button _onClick={clickCreateBtn}>일정 추가</Button>
      <CalendarHeader />
      <CalendarBody />
      {showModal && modalContent && (
        <CardModal showModal={showModal} setShowModal={setShowModal}>
          <CalendarModal content={modalContent} setContent={setModalContent} />
        </CardModal>
      )}
    </CalendarBox>
  );
};

const CalendarBox = styled.section`
  // 임시 스타일
  position: relative;
  z-index: 99;
`;

export default Calendar;
