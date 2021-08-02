import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// redux
import { __addSchedule, __loadSchedules } from "../redux/modules/calendar";

// component
import CalendarBody from "../components/Calendar/CalendarBody";
import CalendarHeader from "../components/Calendar/CalendarHeader";
import CardModal from "../feature/board/CardModal";
import Todos from "../feature/board/Todos";

// elem
import { Button, Input, Text } from "../elem";
import Textarea from "../elem/Textarea";

const Calendar = (props) => {
  const { roomId } = useParams();

  const dispatch = useDispatch();
  const current = useSelector((state) => state.calendar.current);
  const currentContent = useSelector((state) =>
    state.calendar.scheduleList.find(
      (item) => item.scheduleId === state.calendar.currentScheduleId
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
    dispatch(__addSchedule());
    setShowModal((pre) => !pre);
  };

  return (
    <CalendarBox>
      <Button _onClick={clickCreateBtn}>일정 추가</Button>
      <CalendarHeader />
      <CalendarBody />
      {showModal && modalContent && (
        <CardModal showModal={showModal} setShowModal={setShowModal}>
          <Text>
            {modalContent.scheduleTitle ? modalContent.scheduleTitle : ""}
          </Text>
          <Input
            type="date"
            _onChange={(e) =>
              setModalContent({
                ...modalContent,
                startDate: (e) => e.target.value,
              })
            }
            value={modalContent.startDate}
          />
          <Input type="date" value={modalContent.endDate} />
          <Textarea />
          <Todos todos={[]} />
          <Button _onClick={() => {}}>취소</Button>
          <Button _onClick={() => {}}>확인</Button>
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
