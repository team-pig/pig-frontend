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
import Icon from "../../components/Icon";
import { body_3 } from "../../themes/textStyle";
import flex from "../../themes/flex";
import CountText from "../../components/CountText";
import { Text } from "../../elem";

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
      dispatch(__createTodo(roomId, { cardId, todoTitle: todo.todoTitle }));
    },
  });

  return (
    <Container>
      <TodoList>
        {todos.length === 0 && (
          <TextBox>
            <Text type="body_3" color="grey">
              이 카드에서 추가된 할 일이 없습니다.
            </Text>
          </TextBox>
        )}
        {todos.map((todo) => (
          <Todo key={todo.todoId} todo={todo} roomId={roomId} />
        ))}
      </TodoList>
      <TodoForm onSubmit={formik.handleSubmit}>
        <Icon icon="plus-lg" size="20px" />
        <TodoBox>
          <TodoInput
            autoComplete="off"
            type="text"
            name="todoTitle"
            value={formik.values.todoTitle}
            onChange={formik.handleChange}
            placeholder="새로운 할 일을 추가하고 Enter ✨"
            maxLength={20}
          />
          {CountText(20, formik.values.todoTitle.length)}
        </TodoBox>
      </TodoForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: auto;
  margin: 0 auto;
  padding-bottom: 40px;
`;

const TodoInput = styled.input`
  ${body_3}
  width: 446px;
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
  width: 478px;
  margin: 10px auto;
`;

const TodoList = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const TextBox = styled.div`
  ${flex()};
  width: 100%;
  height: 100%;
`;

const TodoBox = styled.div`
  position: relative;
`;

export default Todos;
