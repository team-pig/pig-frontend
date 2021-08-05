import React, { useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { useFormik } from "formik";
import Todo from "./Todo";

// redux & api
import { useSelector, useDispatch } from "react-redux";
import { __createTodo } from "../../redux/modules/todos";

// compo & elem
import { Input } from "../../elem";

const Todos = ({ cardId }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const formik = useFormik({
    initialValues: {
      todoTitle: "",
    },

    validationSchema: Yup.object({
      todoTitle: Yup.string().required("할일이 빠졌군요!"),
    }),

    onSubmit: (todo, { resetForm }) => {
      resetForm();
      dispatch(__createTodo(cardId, todo.todoTitle));
    },
  });

  return (
    <Container>
      {todos.map((todo) => (
        <Todo key={todo.todoId} todo={todo} />
      ))}
      <TodoForm onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          name="todoTitle"
          value={formik.values.todoTitle}
          isError={formik.touched.todoTitle && Boolean(formik.errors.todoTitle)}
          useHelper={formik}
          _onChange={formik.handleChange}
          _onClick={() => {
            formik.setFieldValue("todoTitle", "");
          }}
          placeholder="이 카드에서 할 일은?"
        />
      </TodoForm>
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  border: 1px solid red;
  min-height: 400px;
  margin: 0 auto;
`;

const TodoForm = styled.form``;
export default Todos;
