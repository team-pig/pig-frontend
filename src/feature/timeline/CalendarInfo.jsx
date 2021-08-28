import React, { useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// compo & elem
import Icon from "../../components/Icon";
import CardModal from "../task/CardModal";
import ModalForms from "../task/ModalForms";
import Todos from "../task/Todos";
import { Button, IconBtn, Text } from "../../elem";

// utill
import flex from "../../themes/flex";

// redux
import { setModalId, __deleteSchedule } from "../../redux/modules/calendar.js";
import { __addSchedule } from "../../redux/modules/calendar";
import { __loadCardById } from "../../redux/modules/board";

const CalendarInfo = () => {
  const dispatch = useDispatch();
  const modalId = useSelector((state) => state.calendar.modalId);
  const currentContent = useSelector((state) => state.calendar.card);
  const { selectedDate } = useSelector((state) => state.date);
  const buckets = useSelector((state) => state.board.columns);
  const { scheduleList } = useSelector((state) => state.calendar);

  const [modalContent, setModalContent] = useState({});
  const [showModal, setShowModal] = useState(false);

  const { roomId } = useParams();
  const targetFormat = selectedDate.clone().format("YYYYMMDD");

  useEffect(() => {
    setModalContent(currentContent);
  }, [currentContent]);

  // handler
  const currentSchedules = useMemo(() => {
    const schedules = scheduleList.filter(
      (schedule, idx) =>
        parseInt(schedule["startDate"].split("-").join("")) <= targetFormat &&
        parseInt(schedule["endDate"].split("-").join("")) >= targetFormat
    );
    return schedules;
  }, [scheduleList, targetFormat]);

  const clickCreateBtn = useCallback(() => {
    const bucketId = Object.keys(buckets)[0];
    setShowModal((pre) => !pre);
    dispatch(__addSchedule(roomId, bucketId));
  }, [buckets, dispatch, roomId, setShowModal]);

  const clickSchedule = useCallback(
    (cardId) => {
      setShowModal((pre) => !pre);
      dispatch(setModalId(cardId));
      dispatch(__loadCardById(roomId, cardId));
    },
    [dispatch, setShowModal, roomId]
  );

  const deleteSchedule = useCallback(
    (cardId, cardTitle) => {
      if (
        !window.confirm(
          `정말 ${cardTitle} 일정을 삭제하시겠어요?\n일정을 삭제하면 보드에서도 삭제됩니다.`
        )
      )
        return;
      dispatch(__deleteSchedule(roomId, cardId));
    },
    [dispatch, roomId]
  );

  // cardIsZero : 현재 스케줄(카드)이 없으면 true
  const cardIsZero = currentSchedules.length === 0;

  return (
    <>
      <Container>
        <TitleBox>
          <Text type="body_1" color="black">
            {selectedDate.clone().format("M월 D일")}
          </Text>
          <IconBtn _onClick={clickCreateBtn} padding="5px">
            <Icon icon="plus-lg" size="24px" color="var(--darkgrey)" />
          </IconBtn>
        </TitleBox>
        {cardIsZero && (
          <Info>
            <Text type="sub_2" color="grey">
              일정이 없습니다.
            </Text>
          </Info>
        )}
        {currentSchedules &&
          currentSchedules.map((item) => (
            <CurrentSchedule
              key={item.cardId}
              color={item.color}
              onClick={(e) => {
                e.stopPropagation();
                clickSchedule(item.cardId);
              }}
            >
              <ScheduleText type="sub_2">{item.cardTitle}</ScheduleText>
              <RemoveBtn
                _onClick={(e) => {
                  e.stopPropagation();
                  deleteSchedule(item.cardId, item.cardTitle);
                }}
              >
                <Icon icon="remove" size="20px" color="var(--grey)" />
              </RemoveBtn>
            </CurrentSchedule>
          ))}

        {Object.keys(modalContent).length !== 0 && (
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
      </Container>
    </>
  );
};

const Container = styled.section`
  ${flex("start", "start", false)}
  width: 260px;
  height: 100%;
  background-color: var(--white);
  border-right: 1px solid var(--line);
  overflow-y: hidden;
`;

const TitleBox = styled.div`
  ${flex("between")};
  width: 100%;
  height: 65px;
  padding: 0 20px;
`;

const Info = styled.div`
  ${flex()};
  width: 100%;
  height: 100%;
  margin-top: -60px;
`;

const RemoveBtn = styled(IconBtn)`
  position: absolute;
  top: 1px;
  right: 10px;
  visibility: hidden;
`;

const CurrentSchedule = styled.div`
  ${flex("start")};
  position: relative;
  width: 100%;
  height: 42px;
  background-color: var(--white);
  padding: 0 20px;
  cursor: pointer;

  &::before {
    flex-shrink: 0;
    content: "";
    width: 5px;
    height: 24px;
    margin-right: 20px;
    background-color: ${(props) => props.theme.colors[props.color]};
    border-radius: 5px;
  }

  &:hover {
    background-color: var(--line);
    ${RemoveBtn} {
      visibility: visible;
    }
  }
`;

const ScheduleText = styled(Text)`
  margin-right: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
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

export default CalendarInfo;
