import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __loadMyTodos, __switchTodoStat } from "../../../redux/modules/todos";
import Icon from "../../../components/Icon";

import { IconBtn, Text, Input } from "../../../elem";
import flex from "../../../themes/flex";
import { body_2 } from "../../../themes/textStyle";

const MyTodos = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const { checkedTodo, notCheckedTodo } = useSelector((state) => state.todos);
  console.log(checkedTodo);

  useEffect(() => {
    dispatch(__loadMyTodos(roomId));
  }, []);

  return (
    <Container>
      <TitleBox>
        <Text type="body_1" color="black">
          나의 할 일 목록
        </Text>
      </TitleBox>
      <MyTodoList>
        <List>
          <TodosTitle>아직 못한 일</TodosTitle>
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
                    <IconBtn _onClick={() => {}}>
                      <RemoveIcon icon="remove" size="20px" />
                    </IconBtn>
                  </RemoveGrid>
                </Item>
              );
            })}
        </List>
        <List>
          <TodosTitle>완료한 일</TodosTitle>
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
                  <IconBtn _onClick={() => {}}>
                    <RemoveIcon icon="remove" size="20px" />
                  </IconBtn>
                </RemoveGrid>
              </Item>
            ))}
        </List>
      </MyTodoList>
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
  min-height: 100px;
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

const MyTodoList = styled.div`
  ${flex("between", "start")}
  width: 1220px;
`;

const TodosTitle = styled.div`
  ${body_2}
  padding: 10px 20px;
`;

const Label = styled.label`
  cursor: pointer;
`;

export default MyTodos;
