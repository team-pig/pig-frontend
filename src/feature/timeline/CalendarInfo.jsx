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
import { __loadCardById } from "../../redux/modules/board";
import { body_2, body_3, sub_2 } from "../../themes/textStyle";
import { hiddenScroll } from "../../themes/hiddenScroll";

const CalendarInfo = () => {
  const dispatch = useDispatch();
  const modalId = useSelector((state) => state.calendar.modalId);
  const currentContent = useSelector((state) => state.calendar.card);
  const { selectedDate } = useSelector((state) => state.date);
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
      <Container className="calendar-info">
        <TitleBox>
          <ClickedDate type="body_1" color="black">
            {selectedDate.clone().format("M월 D일")}
          </ClickedDate>
        </TitleBox>
        {cardIsZero && (
          <Info>
            <InfoText type="sub_2" color="grey">
              일정이 없습니다.
            </InfoText>
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
            <Todos cardId={modalId} />
            <BtnBox>
              <Button
                type="button"
                shape="green-fill"
                size="200"
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
  --header: 48px;

  ${hiddenScroll};
  ${flex("start", "start", false)}
  width: 260px;
  height: calc(100vh - var(--header));
  background-color: var(--white);
  border-right: 1px solid var(--line);
  overflow-y: auto;

  ${({ theme }) => theme.device.tablet} {
    --nav: 60px;
    width: 100%;
    height: calc(100% - var(--nav));
    border-right: 0;
    overflow-y: auto;
  }
`;

const TitleBox = styled.div`
  ${flex("between")};
  flex-shrink: 0;
  width: 100%;
  height: 65px;
  padding: 0 20px;

  ${({ theme }) => theme.device.mobile} {
    height: 40px;
  }
`;

const ClickedDate = styled(Text)`
  ${({ theme }) => theme.device.mobile} {
    ${sub_2};
  }
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
  flex-shrink: 0;
  width: 100%;
  height: 42px;
  background-color: var(--white);
  padding: 0 20px;
  cursor: pointer;
  margin-right: 0;

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

  ${({ theme }) => theme.device.mobile} {
    ${body_2};
  }
`;

const BtnBox = styled.div`
  ${flex()};
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const InfoText = styled(Text)`
  ${({ theme }) => theme.device.mobile} {
    ${body_3}
  }
`;

export default CalendarInfo;
