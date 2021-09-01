import React, { useEffect } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router";

// redux & api
import { useSelector, useDispatch } from "react-redux";
import { __createTodo, __loadTodos } from "../../redux/modules/todos";

// compo & elem
import Todo from "./Todo";
import { body_3, sub_2 } from "../../themes/textStyle";
import flex from "../../themes/flex";
import CountText from "../../components/CountText";

const Todos = ({ cardId }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(__loadTodos(roomId, cardId));
  }, [roomId, cardId, dispatch]);

  const formik = useFormik({
    initialValues: {
      todoTitle: "",
    },

    validationSchema: Yup.object({
      todoTitle: Yup.string().required("할일이 빠졌군요!"),
    }),

    onSubmit: (todo, { resetForm }) => {
      resetForm();
      if (todos.length === 10) {
        window.alert("할일은 10개까지 입력가능합니다.");
        return;
      }
      dispatch(__createTodo(roomId, { cardId, todoTitle: todo.todoTitle }));
    },
  });

  return (
    <Container>
      <Header>할 일</Header>
      <TodoList>
        {todos.length === 0 && <TextBox>이 카드의 할 일이 없습니다</TextBox>}
        {todos.map((todo) => (
          <Todo key={todo.todoId} todo={todo} roomId={roomId} />
        ))}
      </TodoList>
      <TodoForm onSubmit={formik.handleSubmit}>
        <TodoInput
          autoComplete="off"
          type="text"
          name="todoTitle"
          value={formik.values.todoTitle}
          onChange={formik.handleChange}
          placeholder="새로운 할 일을 추가하고 Enter"
          maxLength={20}
        />
        {CountText(20, formik.values.todoTitle.length)}
      </TodoForm>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
`;

const Header = styled.h1`
  ${sub_2};
  color: var(--black);
  padding: 20px;
`;

const TodoInput = styled.input`
  ${body_3}
  width: 100%;
  height: 46px;
  padding: 12px 14px;
  color: var(--black);
  border: ${(props) =>
    props.isError
      ? "1px solid var(--notice) !important"
      : "1px solid var(--line)"};
  outline: none;
  transition: border-color 150ms ease-in-out;

  ::placeholder {
    color: var(--grey);
  }

  &:focus {
    border: 1px solid var(--main);
  }
`;

const TodoForm = styled.form`
  ${flex("between", "center")}
  margin: 50px 20px 0 20px;
  position: relative;

  ${({ theme }) => theme.device.mobile} {
    margin: 30px 0 0 0;
    width: 100%;
  }
`;

const TodoList = styled.div`
  display: flex;
  height: auto;
  min-height: 150px;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const TextBox = styled.div`
  ${flex()};
  ${body_3}
  color: var(--grey);
  width: 100%;
  height: 100%;
  min-height: 150px;
`;

export default Todos;
