import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import CardModal from "../board/CardModal";
import CalendarModal from "./CalendarModal";

// redux
import { loadDaySchedules, setCurrentId } from "../../redux/modules/calendar";

const Date = ({ list, children }) => {
  const dispatch = useDispatch();

  const currentContent = useSelector((state) =>
    state.calendar.scheduleList.find(
      (item) => item.cardId === state.calendar.currentScheduleId
    )
  );

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => setModalContent(currentContent), [currentContent]);

  const clickDate = (idAry) => {
    dispatch(loadDaySchedules(idAry));
  };

  const clickSchedule = (cardId) => {
    setShowModal((pre) => !pre);
    dispatch(setCurrentId(cardId));
  };

  return (
    <>
      <DateBox
        onClick={(e) => {
          e.stopPropagation();
          const idAry = list.map((item) => item.cardId);
          clickDate(idAry);
        }}
      >
        <DateNum>{children}</DateNum>
        {list.map((item) => {
          const { cardId, cardTitle } = item;
          // 누르면 모달 보이도록 기능 추가 필요
          return (
            <button
              key={cardId}
              onClick={(e) => {
                e.stopPropagation();
                clickSchedule(cardId);
              }}
            >
              {cardTitle}
            </button>
          );
        })}
      </DateBox>
      {showModal && modalContent && (
        <CardModal showModal={showModal} setShowModal={setShowModal}>
          <CalendarModal content={modalContent} setContent={setModalContent} />
        </CardModal>
      )}
    </>
  );
};

const DateBox = styled.div``;

const DateNum = styled.div``;

export default Date;
