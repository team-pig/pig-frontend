import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Icon from "../components/Icon";
import { IconBtn, Input, Text } from "../elem";
import {
  __loadMyTodos,
  __removeMyTodo,
  __switchTodoStat,
} from "../redux/modules/todos";

import flex from "../themes/flex";
import { hiddenScroll } from "../themes/hiddenScroll";
import { body_2 } from "../themes/textStyle";

const MytodosM = () => {
  const dispatch = useDispatch();
  const [offsetHeight, setOffsetHeight] = useState();

  const history = useHistory();
  const { roomId } = useParams();

  const { isMobile } = useSelector((state) => state.resize);
  const { checkedTodo, notCheckedTodo } = useSelector((state) => state.todos);
  const myId = useSelector((state) => state.user.user.userId);

  useEffect(() => {
    dispatch(__loadMyTodos(roomId));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setOffsetHeight(document.body.offsetHeight)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setOffsetHeight(document.body.offsetHeight)
      );
  }, []);

  useEffect(() => {
    if (!isMobile) history.replace(`/workspace/${roomId}`);
  }, [isMobile, roomId, history]);

  const myList = useRef();
  let myListHeight;
  if (myList.current && offsetHeight) {
    myListHeight = offsetHeight - myList.current.offsetTop;
  }

  return (
    <>
      <MyTodoList>
        <TodoBox>
          <TodosTitle>아직 못한 일</TodosTitle>
          <List ref={myList} height={myListHeight}>
            {notCheckedTodo &&
              notCheckedTodo.map((item) => {
                return (
                  <Item key={item.todoId}>
                    <Grid>
                      <>
                        <Input
                          none
                          type="checkbox"
                          name="isChecked"
                          id={item.todoId}
                          checked={item.isChecked}
                          _onChange={({ target }) => {
                            dispatch(
                              __switchTodoStat(
                                roomId,
                                item.todoId,
                                target.checked,
                                item.todoTitle
                              )
                            );
                          }}
                        />
                        <Label htmlFor={item.todoId}>
                          {item.isChecked ? (
                            <Icon icon="checkbox-filled" size="20px" />
                          ) : (
                            <Icon icon="checkbox" size="20px" />
                          )}
                        </Label>
                      </>
                      <Text type="sub_2">{item.todoTitle}</Text>
                    </Grid>
                    <RemoveGrid>
                      <IconBtn
                        _onClick={() => {
                          dispatch(
                            __removeMyTodo(
                              roomId,
                              item.todoId,
                              myId,
                              item.isChecked
                            )
                          );
                        }}
                      >
                        <RemoveIcon icon="remove" size="20px" />
                      </IconBtn>
                    </RemoveGrid>
                  </Item>
                );
              })}
          </List>
        </TodoBox>
        <TodoBox>
          <TodosTitle>완료한 일</TodosTitle>
          <List height={myListHeight}>
            {checkedTodo &&
              checkedTodo.map((item) => (
                <Item key={item.todoId}>
                  <Grid>
                    <>
                      <Input
                        none
                        type="checkbox"
                        name="isChecked"
                        id={item.todoId}
                        checked={item.isChecked}
                        _onChange={({ target }) => {
                          dispatch(
                            __switchTodoStat(
                              roomId,
                              item.todoId,
                              target.checked,
                              item.todoTitle
                            )
                          );
                        }}
                      />
                      <Label htmlFor={item.todoId}>
                        {item.isChecked ? (
                          <Icon icon="checkbox-filled" size="20px" />
                        ) : (
                          <Icon icon="checkbox" size="20px" />
                        )}
                      </Label>
                    </>
                    <Text type="sub_2">{item.todoTitle}</Text>
                  </Grid>
                  <RemoveGrid>
                    <IconBtn
                      _onClick={() => {
                        dispatch(
                          __removeMyTodo(
                            roomId,
                            item.todoId,
                            myId,
                            item.isChecked
                          )
                        );
                      }}
                    >
                      <RemoveIcon icon="remove" size="20px" />
                    </IconBtn>
                  </RemoveGrid>
                </Item>
              ))}
          </List>
        </TodoBox>
      </MyTodoList>
    </>
  );
};

const MyTodoList = styled.div`
  width: 100%;
  border: 1px so;
`;

const TodoBox = styled.div`
  padding-bottom: 20px;
`;

const List = styled.ul`
  ${hiddenScroll};
  ${flex("start", "start", false)}
  width: 100%;
  min-height: 200px;
  overflow-y: auto;
`;

const Grid = styled.div`
  ${flex("start", "center")};
  gap: 18px;
`;

const RemoveIcon = styled(Icon)`
  color: var(--grey);
  transition: color 100ms ease-in-out;
`;

const RemoveGrid = styled(Grid)`
  visibility: hidden;
  &:hover {
    ${RemoveIcon} {
      color: var(--notice);
    }
  }
`;

const Item = styled.li`
  ${flex("between", "center")};
  width: 100%;
  min-height: 40px;
  padding: 5px 20px;
  margin: 0;
  &:hover {
    background-color: var(--line);
    ${RemoveGrid} {
      visibility: initial;
    }
  }
`;

const TodosTitle = styled.div`
  ${body_2}
  padding: 20px;
`;

const Label = styled.label`
  cursor: pointer;
`;

export default MytodosM;
