import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Input, Text } from "../../elem";
import Filled from "../../assets/icons/checkbox-filled.svg";
import { useSelector } from "react-redux";
import BoardDrop from "./BoardDrop";

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
import { body_3, body_4, button } from "../../themes/textStyle";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const allMembers = useSelector((state) => state.member.allMembers);
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
            <CheckedIcon src={Filled} alt="체크됨" />
          ) : (
            <NotCheckboxIcon icon="checkbox" size="20px" />
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
          />
        </TodoInputToggle>
        <TodoMembers>
          <BoardDrop.Container direction="right" type="default" shadow>
            {allMembers &&
              allMembers.map((member, idx) => (
                <BoardDrop.Item
                  key={idx}
                  _onClick={() => {
                    dispatch(
                      __memberHandler(roomId, todo.todoId, member.memberName)
                    );
                  }}
                >
                  <Member>
                    <Avatar />
                    {member.memberName}
                  </Member>
                </BoardDrop.Item>
              ))}
          </BoardDrop.Container>
          <TodoMembersCnt> + {todo.members.length}</TodoMembersCnt>
        </TodoMembers>
        <RemoveTodoIcon>
          {itemClicked ? (
            <Icon
              icon="remove"
              size="14px"
              color="var(--grey)"
              onClick={deleteTodoHandler}
            />
          ) : (
            ""
          )}
        </RemoveTodoIcon>
      </TodoItem>
    </Container>
  );
};

const Container = styled.div`
  ${flex("between", "center")}
  width: 478px;
  margin: 0 auto;
`;

const TodoItem = styled.div`
  ${flex("between", "center")};
  width: 446px;
  min-height: 46px;
  padding: 0 12px;
  border: 1px solid var(--line);
  cursor: pointer;

  ${(props) =>
    props.itemClicked
      ? css`
          border: 1px solid var(--main);
        `
      : ""}
`;

const TodoMembers = styled.div`
  ${flex("between", "center")}
  width: 60px;
  gap: 5px;
`;

const TodoMembersCnt = styled.div`
  ${body_4}
  color: var(--grey);
  width: 20px;
`;

const TodoInputToggle = styled.div`
  ${body_3}
  width: 300px;
`;

const NotCheckboxIcon = styled(Icon)`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;

const RemoveTodoIcon = styled.div`
  ${flex("center", "cetner")}
  width: 20px;
  height: 20px;
`;

const CheckedIcon = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
const Member = styled.div`
  width: 100px;
  ${flex("start", "cetner")}
  ${button}
  color: var(--darkgrey)
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid var(--line);
  border-radius: 50% !important;
  margin-right: 10px;
`;

export default Todo;
