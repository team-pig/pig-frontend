import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CardModal from "../board/CardModal";
import CalendarModal from "./CalendarModal";
import Icon from "../../components/Icon";

import { IconBtn, Text, Input } from "../../elem";
import flex from "../../themes/flex";

// redux
import {
  setCurrentId,
  setModalId,
  __deleteSchedule,
} from "../../redux/modules/calendar.js";
import { __checkedTodo, __loadTodos } from "../../redux/modules/todos";

const CalendarInfo = ({
  modalContent,
  setModalContent,
  showModal,
  setShowModal,
}) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const { current } = useSelector((state) => state.date);
  const today = current && current.clone().format("M월 D일");

  const { currentList: currentSchedules, currentScheduleId: currentId } =
    useSelector((state) => state.calendar);
  const { selectedDate } = useSelector((state) => state.date) || {
    selectedDate: today,
  };
  const loadedTodos = useSelector((state) => state.todos.todos);

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (currentSchedules.length === 0) {
      setTitle("");
    }

    if (currentSchedules.length !== 0) {
      console.log(currentSchedules.find((item) => item.cardId === currentId));
      setTitle(
        currentSchedules.find((item) => item.cardId === currentId).cardTitle
      );
    }
  }, [roomId, currentId]);

  const clickSchedule = (cardId, title) => {
    setTitle(title);
    dispatch(setCurrentId(cardId));
    dispatch(__loadTodos(roomId, cardId)); // 8.13 : todos module에서 todos 불러오기 [예상기]
  };

  const clickDetailBtn = (cardId) => {
    setShowModal((pre) => !pre);
    dispatch(setModalId(currentId));
  };

  const deleteSchedule = (cardId) => {
    dispatch(__deleteSchedule(roomId, cardId));
  };

  // const deleteTodo = (todoId) => {
  //   const newAry = todos.slice().filter((todo) => todo.todoId !== todoId);
  //   setTodos(newAry);
  // };

  // cardIsZero : 현재 스케줄(카드)이 없으면 true
  const cardIsZero = currentSchedules.length === 0;

  return (
    <>
      <Container>
        <Left cardIsZero={cardIsZero}>
          <TitleBox>
            <Text type="body_1" color="black">
              {selectedDate}
            </Text>
            <TextBtn>
              {!cardIsZero && (
                <Text type="body_4" onClick={clickDetailBtn}>
                  상세정보
                </Text>
              )}
            </TextBtn>
          </TitleBox>
          {cardIsZero && (
            <Info>
              <Text type="sub_2" color="grey">
                일정이 없습니다.
              </Text>
            </Info>
          )}
          {currentSchedules &&
            currentSchedules.map((item, idx) => (
              <CurrentSchedule
                key={idx}
                color={item.color}
                focus={item.cardId === currentId}
                onClick={() => clickSchedule(item.cardId, item.cardTitle)}
              >
                <ScheduleText type="sub_2">{item.cardTitle}</ScheduleText>
                <RemoveBtn _onClick={() => deleteSchedule(item.cardId)}>
                  <Icon icon="remove" size="20px" color="var(--grey)" />
                </RemoveBtn>
              </CurrentSchedule>
            ))}
        </Left>
        <Right cardIsZero={cardIsZero}>
          <TitleBox>
            <Text type="body_1">{title}</Text>
          </TitleBox>
          {loadedTodos.length === 0 && (
            <Info>
              <Text type="sub_2" color="grey">
                이 카드에 할 일이 없습니다.
              </Text>
            </Info>
          )}
          {/* 8.13 calendar 모듈에서 todos 모듈로 todos 변경 [예상기] */}
          {loadedTodos.length !== 0 &&
            loadedTodos.map((todo) => {
              return (
                <Item key={todo.todoId}>
                  <Grid>
                    <Input
                      none
                      type="checkbox"
                      name="isChecked"
                      id={todo.todoId}
                      checked={todo.isChecked}
                      _onChange={({ target }) => {
                        dispatch(
                          __checkedTodo(roomId, todo.todoId, target.checked)
                        );
                      }}
                    />
                    <label htmlFor={todo.todoId}>
                      {todo.isChecked ? (
                        <Icon icon="checkbox-filled" size="20px" />
                      ) : (
                        <Icon icon="checkbox" size="20px" />
                      )}
                    </label>
                    <Text type="sub_2">{todo.todoTitle}</Text>
                  </Grid>
                  <BtnBox>
                    <IconBtn _onClick={() => {}} padding="5px">
                      <Icon
                        icon="member-plus"
                        size="20px"
                        color="var(--grey)"
                      />
                    </IconBtn>
                    <RemoveGrid>
                      <IconBtn _onClick={() => {}} padding="5px">
                        <RemoveIcon icon="remove" size="20px" />
                      </IconBtn>
                    </RemoveGrid>
                  </BtnBox>
                </Item>
              );
            })}
        </Right>
      </Container>
    </>
  );
};

const Container = styled.section`
  ${flex()}
  height: 200px;
  background-color: var(--white);
`;

const Left = styled.div`
  width: ${(props) => (props.cardIsZero ? "100%" : `calc(100% * (1 / 2.7));`)};
  flex-shrink: 0;
  height: 100%;
`;

const Right = styled.div`
  display: ${(props) => props.cardIsZero && "none;"};
  width: calc(100% * (1.7 / 2.7));
  flex-shrink: 0;
  height: 100%;
  border-left: 1px solid var(--line);
`;

const TitleBox = styled.div`
  ${flex("between")};
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
  height: 42px;
  background-color: ${(props) =>
    props.focus ? `var(--line);` : "var(--white);"};
  padding: 0 20px;
  cursor: pointer;

  &::before {
    content: "";
    width: 5px;
    height: 24px;
    margin-right: 20px;
    background-color: ${(props) => props.theme.colors[props.color]};
    border-radius: 5px;
  }

  &:hover {
    ${RemoveBtn} {
      visibility: visible;
    }
  }
`;

const ScheduleText = styled(Text)`
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

const Grid = styled.div`
  ${flex("start", "center")};
  gap: 18px;
`;

const RemoveIcon = styled(Icon)`
  color: var(--grey);
  transition: color 100ms ease-in-out;
`;

const BtnBox = styled.div`
  ${flex()};
  gap: 5px;
  visibility: hidden;
`;

const RemoveGrid = styled(Grid)``;

const Item = styled.li`
  ${flex("between", "center")};
  width: 100%;
  height: 42px;
  padding: 0 20px;
  margin: 0;

  &:hover {
    background-color: var(--line);

    ${BtnBox} {
      visibility: initial;
    }
  }
`;

const TextBtn = styled.button`
  padding: 10px;
  margin-right: -10px;
`;

export default CalendarInfo;
