import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __loadMyTodos } from "../../../redux/modules/todos";
import Icon from "../../../components/Icon";

import { IconBtn, Text } from "../../../elem";
import flex from "../../../themes/flex";

const MyTodos = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const loadedMyTodos = useSelector((state) => state.todos.myTodos);
  console.log(loadedMyTodos);

  useEffect(() => {
    dispatch(__loadMyTodos(roomId));
  }, []);

  // 더미데이터

  const toggleTodo = (todoId) => {
    // const idx = myTodos.findIndex((todo) => todo.todoId === todoId);
    // const newAry = myTodos.slice();
    // newAry[idx] = { ...newAry[idx], isChecked: !newAry[idx].isChecked };
    // console.log(newAry);
    // setMyTodos(newAry);
  };

  const deleteTodo = (todoId) => {
    // const newAry = myTodos.slice().filter((todo) => todo.todoId !== todoId);
    // setMyTodos(newAry);
  };

  if (!loadedMyTodos) return <></>;
  return (
    <Container>
      <TitleBox>
        <Text type="body_1" color="black">
          나의 할 일 목록
        </Text>
      </TitleBox>
      <List>
        {loadedMyTodos.map((item) => (
          <Item key={item.todoId}>
            <Grid>
              <IconBtn _onClick={() => toggleTodo(item.todoId)}>
                {!item.isChecked ? (
                  <Icon icon="checkbox" size="20px" />
                ) : (
                  <Icon icon="checkbox-filled" size="20px" />
                )}
              </IconBtn>
              <Text type="sub_2">{item.todoTitle}</Text>
            </Grid>
            <RemoveGrid>
              <IconBtn _onClick={() => deleteTodo(item.todoId)}>
                <RemoveIcon icon="remove" size="20px" />
              </IconBtn>
            </RemoveGrid>
          </Item>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
`;

const TitleBox = styled.div`
  padding: 20px 20px 30px 20px;
`;

const List = styled.ul`
  ${flex("start", "start", false)};
  width: 100%;
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
  padding: 0 30px;
  margin: 0;

  &:hover {
    background-color: var(--line);

    ${RemoveGrid} {
      visibility: initial;
    }
  }
`;

export default MyTodos;
