import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// redux
import { setCurrent } from "../../redux/modules/date";

// elem
import { Button } from "../../elem";

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.date.current);

  const showLastMonth = () => {
    dispatch(setCurrent(current.clone().subtract(1, "month")));
  };

  const showNextMonth = () => {
    dispatch(setCurrent(current.clone().add(1, "month")));
  };

  return (
    <Header>
      <Button _onClick={showLastMonth}>지난 달로 가기</Button>
      <CurrentMonth>{current.format("YYYY년 MM월")}</CurrentMonth>
      <Button _onClick={showNextMonth}>다음 달로 가기</Button>
    </Header>
  );
};

// 모두 임시스타일입니다.
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #f39c12;
`;

const CurrentMonth = styled.h2`
  font-size: 24px;
`;

export default CalendarHeader;
