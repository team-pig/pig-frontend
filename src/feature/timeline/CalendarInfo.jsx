import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const CalendarInfo = () => {
  const dispatch = useDispatch();

  const { currentList } = useSelector((state) => state.calendar) || [];

  const clickSchedule = (e) => {
    e.stopPropagation();
    // todo 불러오는 함수
    //dispatch()
  };

  return (
    <Container>
      <Left>
        {currentList &&
          currentList.map((item) => (
            <CurrentSchedule onClick={clickSchedule}>
              {item.cardTitle}
            </CurrentSchedule>
          ))}
      </Left>
      <Right></Right>
    </Container>
  );
};

// 임시 구획 확인용
const Container = styled.section`
  height: 200px;
  background-color: gray;
  border: 2px solid gray;
`;

const Left = styled.div``;

const Right = styled.div``;

const CurrentSchedule = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

export default CalendarInfo;
