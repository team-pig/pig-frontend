import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// redux
import {
  resetTimeline,
  __loadBuckets,
  __loadSchedules,
} from "../redux/modules/calendar";
import { resetTodos } from "../redux/modules/todos";

// component
import CalendarHeader from "../feature/timeline/CalendarHeader";
import CalendarBody from "../feature/timeline/CalendarBody";
import CalendarInfo from "../feature/timeline/CalendarInfo";
import CardModal from "../feature/card/CardModal";
import Todos from "../feature/card/Todos";

// etc
import flex from "../themes/flex";
import { Button, Text } from "../elem";
import ModalForms from "../feature/card/ModalForms";

const Calendar = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const current = useSelector((state) => state.date.current);
  const modalId = useSelector((state) => state.calendar.modalId);

  const currentContent = useSelector((state) =>
    state.calendar.scheduleList.find(
      (item) => item.cardId === state.calendar.modalId
    )
  );

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(resetTimeline());
      dispatch(resetTodos());
    };
  }, [dispatch]);

  useEffect(() => dispatch(__loadBuckets(roomId)), [dispatch, roomId]);

  useEffect(() => {
    setModalContent(currentContent);
    return () => {
      setModalContent(null);
    };
  }, [currentContent]);

  // 월이 바뀔 때마다 모든 일정을 가져오도록 설정
  useEffect(() => {
    if (current) {
      dispatch(__loadSchedules(roomId, current.clone().format("YYYYMM")));
    }
  }, [dispatch, current, roomId]);

  return (
    <CalendarBox>
      <Left>
        <CalendarInfo setShowModal={setShowModal} />
      </Left>
      <Right>
        <CalendarHeader />
        <CalendarBody />
      </Right>

      {showModal && modalContent && (
        <CardModal showModal={showModal} setShowModal={setShowModal}>
          <ModalForms content={modalContent} source="calendar" />
          <TodosHeader type="sub_2" color="black">
            할 일
          </TodosHeader>
          <Todos cardId={modalId} />
          <BtnBox>
            <Button
              type="button"
              shape="green-fill"
              size="300"
              _onClick={() => setShowModal(false)}
            >
              닫기
            </Button>
          </BtnBox>
        </CardModal>
      )}
    </CalendarBox>
  );
};

const CalendarBox = styled.section`
  --header: 48px;

  ${flex("start", "start")}
  width: 100%;
  height: calc(100vh - var(--header));
  overflow-y: auto;
`;

const Left = styled.section`
  height: 100%;
`;

const Right = styled.section`
  width: calc(100% - 260px);
  height: 100%;
`;

const TodosHeader = styled(Text)`
  padding: 0 40px;
  margin-bottom: 21px;
`;

const BtnBox = styled.div`
  ${flex()};
  width: 100%;
  margin-top: -10px;
  margin-bottom: 40px;
`;
export default Calendar;
