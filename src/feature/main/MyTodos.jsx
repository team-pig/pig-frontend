import React, { useState } from "react";
import styled from "styled-components";

import Icon from "../../components/Icon";

import { IconBtn, Text } from "../../elem";
import flex from "../../themes/flex";

const MyTodos = () => {
  // 더미데이터
  const todos = [
    {
      todoId: "324sdf234",
      todoTitle: "프로젝트 하기",
      isChecked: true,
    },
    {
      todoId: "dsflkj23",
      todoTitle: "밥 먹기",
      isChecked: true,
    },
    { todoId: "dslk2sdfa", todoTitle: "CSS 끝내기", isChecked: false },
    {
      todoId: "sdf2dsfg",
      todoTitle: "리덕스 툴킷 공부하기",
      isChecked: false,
    },
    {
      todoId: "2kddf1dsa",
      todoTitle:
        "오늘 하루가 끝나기전에 반드시 꼭 무조건 벨로그에 Weekly I Learned를 쓰기 스스로 약속하기 꼭 쓴다",
      isChecked: false,
    },
  ];

  const [myTodos, setMyTodos] = useState(todos);

  const toggleTodo = (todoId) => {
    const idx = myTodos.findIndex((todo) => todo.todoId === todoId);
    const newAry = myTodos.slice();
    newAry[idx] = { ...newAry[idx], isChecked: !newAry[idx].isChecked };
    console.log(newAry);
    setMyTodos(newAry);
  };

  const deleteTodo = (todoId) => {
    const newAry = myTodos.slice().filter((todo) => todo.todoId !== todoId);
    setMyTodos(newAry);
  };

  return (
    <Container>
      <TitleBox>
        <Text type="body_1" color="black">
          나의 할 일 목록
        </Text>
      </TitleBox>
      <List>
        {myTodos.map((item) => (
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
