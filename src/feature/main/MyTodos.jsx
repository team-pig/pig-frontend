import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __switchTodoStat, __removeMyTodo } from "../../redux/modules/todos";
import Icon from "../../components/Icon";

import { IconBtn, Text, Input } from "../../elem";
import { body_2, sub_1 } from "../../themes/textStyle";
import { hiddenScroll } from "../../themes/hiddenScroll";
import flex from "../../themes/flex";
import { mobileHidden } from "../../themes/responsive";

const MyTodos = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { roomId } = useParams();

  const myId = useSelector((state) => state.user.user.userId);
  const { checkedTodo, notCheckedTodo } = useSelector((state) => state.todos);
  const { isMobile } = useSelector((state) => state.resize);

  const [offsetHeight, setOffsetHeight] = useState();

  useEffect(() => {
    window.addEventListener("resize", () =>
      setOffsetHeight(document.body.offsetHeight)
    );
    return () =>
      window.removeEventListener("resize", () =>
        setOffsetHeight(document.body.offsetHeight)
      );
  }, []);

  const myList = useRef();
  let myListHeight;
  if (myList.current && offsetHeight) {
    myListHeight = offsetHeight - myList.current.offsetTop;
  }

  return (
    <Container className="mytodos">
      <TitleBox>
        <TitleText type="body_1" color="black">
          나의 할 일 목록
          {isMobile && (
            <button
              type="button"
              onClick={() => history.push(`${url}/main/mytodos`)}
            >
              <MoreText type="body_4" color="grey">
                더보기 <Icon icon="arrow-right" size="14px" />
              </MoreText>
            </button>
          )}
        </TitleText>
        {isMobile && (
          <Text type="body_4" color="grey">
            총 {notCheckedTodo.length}개의 할 일이 있어요!
          </Text>
        )}
      </TitleBox>
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
    </Container>
  );
};

const Container = styled.section`
  flex-grow: 1;
  width: 100%;
  background-color: var(--white);

  ${({ theme }) => theme.device.mobile} {
    padding: 20px;
  }
`;

const TitleBox = styled.div`
  padding: 20px 20px 30px 20px;

  ${({ theme }) => theme.device.mobile} {
    padding: 0;
  }
`;

const TitleText = styled(Text)`
  ${({ theme }) => theme.device.mobile} {
    ${flex("between", "center")}
    ${sub_1}
    width: 100%;
    margin-bottom: 10px;
  }
`;

const MyTodoList = styled.div`
  ${flex("between", "start")}
  ${mobileHidden}
  width: 100%;
`;

const TodoBox = styled.div`
  width: 50%;
  padding-bottom: 20px;
`;

const List = styled.ul`
  ${hiddenScroll};
  ${flex("start", "start", false)}

  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px;` : "400px")};
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
  padding: 0 30px;
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
  padding: 10px 20px;
`;

const Label = styled.label`
  cursor: pointer;
`;

const MoreText = styled(Text)`
  ${flex("start", "center")}
  cursor: pointer;
`;

export default MyTodos;
