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
import { Input, Text } from "../../elem";
import Icon from "../../components/Icon";

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
      dispatch(__createTodo(roomId, cardId, todo.todoTitle));
    },
  });

  return (
    <Container>
      <TodoList>
        {todos.length !== 0 ? (
          todos.map((todo) => (
            <Todo key={todo.todoId} todo={todo} roomId={roomId} />
          ))
        ) : (
          <Text type="body_4" color="grey">
            할일이 없어요!
          </Text>
        )}
      </TodoList>
      <TodoForm onSubmit={formik.handleSubmit}>
        <StIcon icon="plus-lg" size="24px" color="#b7b7b7" />
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
          placeholder="새로운 할 일을 추가 해주세요 :)"
        />
      </TodoForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  width: 480px;
  margin: 0 auto;
`;

const TodoForm = styled.form`
  width: 446px;
  position: relative;
`;

const StIcon = styled(Icon)`
  position: absolute;
  left: -40px;
  top: 12px;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: none; //firefox
  ::-webkit-scrollbar {
    // chrome, safari, opera
    display: none;
  }
`;

export default Todos;
