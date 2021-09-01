import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// redux
import { setCurrent } from "../../redux/modules/date";
import { __loadBucket } from "../../redux/modules/board";
import { __addSchedule } from "../../redux/modules/calendar";

// elem
import { Button, IconBtn, Text } from "../../elem";
import flex from "../../themes/flex";
import Icon from "../../components/Icon";
import { body_2 } from "../../themes/textStyle";
import { useParams } from "react-router-dom";
import CardModal from "../task/CardModal";
import ModalForms from "../task/ModalForms";
import Todos from "../task/Todos";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const current = useSelector((state) => state.date.current);
  const modalId = useSelector((state) => state.calendar.modalId);
  const buckets = useSelector((state) => state.board.columns);
  const { scheduleList } = useSelector((state) => state.calendar);

  // 카드 생성 즉시, ModalForms 의 내용을 변경했을 때 Update되는 리덕스 store 값
  const currentContent = scheduleList[scheduleList.length - 1] ?? {};

  const showLastMonth = () => {
    dispatch(setCurrent(current.clone().subtract(1, "month")));
  };

  const showNextMonth = () => {
    dispatch(setCurrent(current.clone().add(1, "month")));
  };

  useEffect(() => {
    dispatch(__loadBucket(roomId));
  }, [dispatch, roomId]);

  const clickCreateBtn = useCallback(() => {
    const bucketId = Object.keys(buckets)[0];
    setShowModal((pre) => !pre);
    dispatch(__addSchedule(roomId, bucketId));
  }, [buckets, dispatch, roomId, setShowModal]);

  return (
    <>
      <Header>
        <Nav>
          <CurrentMonth>
            <CurrentText type="sub_1">
              {current.format("YYYY년 MM월")}
            </CurrentText>
          </CurrentMonth>
          <NavIcons>
            <IconBtn _onClick={showLastMonth} padding="5px">
              <Icon icon="arrow-left" size="14px" color="var(--darkgrey)" />
            </IconBtn>
            <IconBtn _onClick={showNextMonth} padding="5px">
              <Icon icon="arrow-right" size="14px" color="var(--darkgrey)" />
            </IconBtn>
          </NavIcons>
        </Nav>
        <>
          <AddBtn
            _onClick={clickCreateBtn}
            padding="5px"
            className="add-schedule"
          >
            <Icon icon="plus-lg" size="24px" color="var(--darkgrey)" />
          </AddBtn>
        </>
      </Header>

      <CardModal showModal={showModal} setShowModal={setShowModal}>
        {Object.keys(currentContent).length !== 0 && (
          <ModalForms content={currentContent} source="calendar" />
        )}
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
    </>
  );
};

const Header = styled.div`
  ${flex("between")};
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: var(--white);

  ${({ theme }) => theme.device.mobile} {
    height: 50px;
  }
`;

const CurrentMonth = styled.h2`
  margin-right: 12px;

  ${({ theme }) => theme.device.mobile} {
    margin-right: 9px;
  }
`;

const Nav = styled.nav`
  ${flex()};
`;

const CurrentText = styled(Text)`
  ${({ theme }) => theme.device.mobile} {
    ${body_2};
  }
`;

const NavIcons = styled.div`
  ${flex()};
  gap: 8px;
`;

const BtnBox = styled.div`
  ${flex()};
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  ${({ theme }) => theme.device.mobile} {
    margin-bottom: 0;
  }
`;

const AddBtn = styled(IconBtn)`
  ${({ theme }) => theme.device.mobile} {
    /* 디자인 상 여기에서 숨겨지고 CalendarHeader에서 보여줘야 함. 결정 필요 */
    /* visibility: hidden; */
  }
`;

export default CalendarHeader;
