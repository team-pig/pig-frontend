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
import { body_3, body_4 } from "../../themes/textStyle";
import flex from "../../themes/flex";

const Todos = ({ cardId }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(__loadTodos(roomId, cardId));
  }, []);

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
        {todos.map((todo) => (
          <Todo key={todo.todoId} todo={todo} roomId={roomId} />
        ))}
      </TodoList>
      <TodoForm onSubmit={formik.handleSubmit}>
        <Icon icon="plus-lg" size="20px" />
        <TodoInput
          autoComplete="off"
          type="text"
          name="todoTitle"
          value={formik.values.todoTitle}
          onChange={formik.handleChange}
          onClick={() => {
            formik.setFieldValue("todoTitle", "");
          }}
          placeholder="새로운 할 일을 추가하고 Enter ✨"
        />
      </TodoForm>
      <TodoHelpMsg color="point">
        {formik.touched.todoTitle && formik.errors.todoTitle
          ? formik.errors.todoTitle
          : null}
      </TodoHelpMsg>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0 auto;
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
  margin: 0 auto;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  height: 250px;
  overflow-y: auto;
  scrollbar-width: none; //firefox
  ::-webkit-scrollbar {
    // chrome, safari, opera
    display: none;
  }
`;

const TodoHelpMsg = styled.div`
  ${body_4}
  color : var(--notice);
  text-align: right;
  padding-right: 40px;
`;

export default Todos;
