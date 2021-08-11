import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// redux
import { setCurrent } from "../../redux/modules/date";

import CardModal from "../board/CardModal";
import CalendarModal from "./CalendarModal";

// redux
import { __addSchedule } from "../../redux/modules/calendar";

// elem
import { IconBtn, Text } from "../../elem";
import flex from "../../themes/flex";
import Icon from "../../components/Icon";

const CalendarHeader = ({
  modalContent,
  setModalContent,
  showModal,
  setShowModal,
}) => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.date.current);

  const showLastMonth = () => {
    dispatch(setCurrent(current.clone().subtract(1, "month")));
  };

  const showNextMonth = () => {
    dispatch(setCurrent(current.clone().add(1, "month")));
  };

  const clickCreateBtn = () => {
    setShowModal((pre) => !pre);
    dispatch(__addSchedule());
  };

  return (
    <>
      <Header>
        <Nav>
          <CurrentMonth>
            <Text type="sub_1">{current.format("YYYY년 MM월")}</Text>
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
        <BtnBox>
          <IconBtn _onClick={() => {}} padding="5px">
            <Icon icon="search" size="24px" color="var(--darkgrey)" />
          </IconBtn>
          <IconBtn _onClick={clickCreateBtn} padding="5px">
            <Icon icon="plus-lg" size="24px" color="var(--darkgrey)" />
          </IconBtn>
        </BtnBox>
      </Header>
      {showModal && modalContent && (
        <CardModal showModal={showModal} setShowModal={setShowModal}>
          <CalendarModal
            content={modalContent}
            setContent={setModalContent}
            setShowModal={setShowModal}
          />
        </CardModal>
      )}
    </>
  );
};

// 모두 임시스타일입니다.
const Header = styled.div`
  ${flex("between")};
  width: 100%;
  height: 60px;
  padding: 0 20px;
`;

const CurrentMonth = styled.h2`
  margin-right: 12px;
`;

const Nav = styled.nav`
  ${flex()};
`;

const NavIcons = styled.div`
  ${flex()};
  gap: 8px;
`;

const BtnBox = styled.div`
  ${flex()};
  gap: 5px;
  margin-right: -10px;
`;

export default CalendarHeader;
