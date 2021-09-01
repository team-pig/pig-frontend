import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Input, Text } from "../../elem";
import { useSelector } from "react-redux";
import BoardDrop from "../board/BoardDrop";

import {
  __memberHandler,
  __checkedTodo,
  __deleteTodo,
  __editTotoTitle,
} from "../../redux/modules/todos";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Icon from "../../components/Icon";
import InputToggle from "../../components/InputToggle";
import flex from "../../themes/flex";
import { body_3, button } from "../../themes/textStyle";
import Avatar from "../../elem/Avatar";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.todos.memberStatus);
  const my = useSelector((state) => state.todos.myStatus);
  const isCheckedList = todo.members; // 이 투두에 참여한 팀원
  const _all = team.concat(my); // 모든 팀원

  const [itemClicked, setItemClicked] = useState(false);
  const { roomId } = useParams();
  const ItemEl = useRef();

  const handleClickOutside = (e) => {
    e.stopPropagation();
    if (ItemEl.current && !ItemEl.current.contains(e.target)) {
      setItemClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ItemEl]);

  // handler
  const deleteTodoHandler = (e) => {
    e.stopPropagation();
    dispatch(__deleteTodo(roomId, todo.todoId));
  };

  const editFunc = (key, value) => {
    if (value === "") {
      dispatch(__editTotoTitle(roomId, todo.todoId, todo.todoTitle));
    } else {
      dispatch(__editTotoTitle(roomId, todo.todoId, value));
    }
  };

  return (
    <Container>
      <>
        <Input
          none
          type="checkbox"
          name="isChecked"
          id={todo.todoId}
          checked={todo.isChecked}
          _onChange={({ target }) => {
            dispatch(__checkedTodo(roomId, todo.todoId, target.checked));
          }}
        />
        <label htmlFor={todo.todoId}>
          {todo.isChecked ? (
            <CheckboxIcon icon="checkbox-filled" size="20px" />
          ) : (
            <CheckboxIcon icon="checkbox" size="20px" />
          )}
        </label>
      </>
      <TodoItem
        itemClicked={itemClicked}
        ref={ItemEl}
        onClick={() => {
          setItemClicked((pre) => !pre);
        }}
      >
        <TodoInputToggle>
          <InputToggle
            shape="text"
            name="todoTitle"
            saveFunc={editFunc}
            value={todo.todoTitle}
            padding
            limit={20}
          />
        </TodoInputToggle>
        <BoardDrop.Container
          direction="right"
          type="default"
          memberStatus={isCheckedList}
          shadow
        >
          {_all &&
            _all.map((member, idx) => {
              const target =
                isCheckedList.findIndex(
                  (seletedMember) => seletedMember.memberId === member.userId
                ) === -1
                  ? false
                  : true;
              return (
                <BoardDrop.Item
                  key={idx}
                  target={target}
                  _onClick={() => {
                    dispatch(
                      __memberHandler(
                        roomId,
                        todo.todoId,
                        member.userId,
                        member.color,
                        member.avatar,
                        member.nickname
                      )
                    );
                  }}
                >
                  <Member target={target}>
                    <Avatar target={member} size={24} />
                    <Nickname>{member.nickname}</Nickname>
                  </Member>
                </BoardDrop.Item>
              );
            })}
        </BoardDrop.Container>
        <RemoveTodoIcon>
          <Icon
            icon="remove"
            size="20px"
            color="var(--grey)"
            onClick={deleteTodoHandler}
          />
        </RemoveTodoIcon>
      </TodoItem>
    </Container>
  );
};

const Container = styled.div`
  ${flex("between", "center")}
  width: 100%;
  padding: 0 20px;
  gap: 10px;
`;

const RemoveTodoIcon = styled.div`
  ${flex("center", "cetner")}
  margin-left: 10px;
  cursor: pointer;
`;

const TodoItem = styled.div`
  ${flex("between", "center")};
  width: 100%;
  min-height: 46px;
  border: 1px solid var(--line);
  padding: 0 10px;
  cursor: pointer;
`;

const TodoInputToggle = styled.div`
  ${body_3};
  width: 70%;
`;

const CheckboxIcon = styled(Icon)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const Nickname = styled.div`
  ${body_3};
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
`;

const Member = styled.div`
  width: 100px;
  ${flex("start", "cetner")}
  ${button}
  ${Nickname} {
    margin-left: 10px;
    color: ${(props) => (props.target ? "var(--white)" : "var(--darkgrey)")};
  }
`;
export default Todo;
