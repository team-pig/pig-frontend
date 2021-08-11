import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CardModal from "../board/CardModal";
import CalendarModal from "./CalendarModal";
import Icon from "../../components/Icon";

import { IconBtn, Text } from "../../elem";
import flex from "../../themes/flex";

// redux
import {
  setCurrentId,
  setModalId,
  __getTodoBySchedule,
} from "../../redux/modules/calendar.js";

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

  const {
    currentList: currentSchedules,
    currentTodos,
    currentScheduleId: currentId,
  } = useSelector((state) => state.calendar);
  const { selectedDate } = useSelector((state) => state.date) || {
    selectedDate: today,
  };

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState(currentTodos);

  // currentId(상세 내용 보여줄 대상)가 바뀔 때마다 title바꿔주고 todo 불러옴
  useEffect(() => {
    if (currentSchedules.length === 0) {
      setTitle("");
      setTodos([]);
    }
    if (currentSchedules.length !== 0) {
      dispatch(__getTodoBySchedule(roomId, currentId));
      console.log(currentSchedules.find((item) => item.cardId === currentId));
      setTitle(
        currentSchedules.find((item) => item.cardId === currentId).cardTitle
      );
    }
  }, [roomId, currentId]);

  useEffect(() => {
    setTodos(currentTodos);
  }, [roomId, currentTodos]);

  const clickSchedule = (cardId, title) => {
    setTitle(title);
    dispatch(setCurrentId(cardId));
    dispatch(__getTodoBySchedule(roomId, cardId));
  };

  const clickDetailBtn = (cardId) => {
    setShowModal((pre) => !pre);
    dispatch(setModalId(currentId));
  };

  useEffect(() => {
    setTodos(currentTodos);
  }, [roomId, currentTodos]);

  const toggleTodo = (todoId) => {
    const idx = todos.findIndex((todo) => todo.todoId === todoId);
    const newAry = todos.slice();
    newAry[idx] = { ...newAry[idx], isChecked: !newAry[idx].isChecked };
    setTodos(newAry);
  };

  const deleteTodo = (todoId) => {
    const newAry = todos.slice().filter((todo) => todo.todoId !== todoId);
    setTodos(newAry);
  };

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
              <Text type="body_4" onClick={clickDetailBtn}>
                상세정보
              </Text>
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
              </CurrentSchedule>
            ))}
        </Left>
        <Right cardIsZero={cardIsZero}>
          <TitleBox>
            <Text type="body_1">{title}</Text>
          </TitleBox>
          {todos.length === 0 && (
            <Info>
              <Text type="sub_2" color="grey">
                이 카드에 할 일이 없습니다.
              </Text>
            </Info>
          )}

          {todos.length !== 0 &&
            todos.map((todo) => (
              <Item key={todo.todoId}>
                <Grid>
                  <IconBtn _onClick={() => toggleTodo(todo.todoId)}>
                    {!todo.isChecked ? (
                      <Icon icon="checkbox" size="20px" />
                    ) : (
                      <CheckBtn
                        icon="checkbox-filled"
                        size="20px"
                        color="var(--main)"
                      />
                    )}
                  </IconBtn>
                  <Text type="sub_2">{todo.todoTitle}</Text>
                </Grid>
                <BtnBox>
                  <IconBtn _onClick={() => {}} padding="5px">
                    <Icon icon="member-plus" size="20px" color="var(--grey)" />
                  </IconBtn>
                  <RemoveGrid>
                    <IconBtn
                      _onClick={() => deleteTodo(todo.todoId)}
                      padding="5px"
                    >
                      <RemoveIcon icon="remove" size="20px" />
                    </IconBtn>
                  </RemoveGrid>
                </BtnBox>
              </Item>
            ))}
        </Right>
      </Container>
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

const CurrentSchedule = styled.div`
  ${flex("start")};
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
  min-height: 40px;
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
  padding: 5px;
  margin-right: -10px;
`;

const CheckBtn = styled(Icon)`
  color: var(--main);
`;

export default CalendarInfo;
