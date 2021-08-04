import React, { useState } from "react";
import styled from "styled-components";
import { Text, Input, Button } from "../../elem";
import {
  __createTodo,
  __deleteTodo,
  __editToto,
} from "../../redux/modules/todos";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const formik = useFormik({
    initialValues: {
      newTodoTitle: "",
    },

    validationSchema: Yup.object({
      newTodoTitle: Yup.string().required("수정할 내용을 반드시 입력해주세요!"),
    }),

    onSubmit: (values, { resetForm }) => {
      dispatch(__editToto(todo.todoId, values.newTodoTitle));
      resetForm();
      setEditMode((pre) => !pre);
    },
  });

  const deleteTodoHandler = () => {
    dispatch(__deleteTodo(todo.todoId));
  };

  return (
    <Container>
      {editMode ? (
        <>
          <form onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              name="newTodoTitle"
              value={formik.values.newTodoTitle}
              isError={
                formik.touched.newTodoTitle &&
                Boolean(formik.errors.newTodoTitle)
              }
              useHelper={formik}
              _onChange={formik.handleChange}
            />
          </form>
          <Button
            _onClick={() => {
              setEditMode((pre) => !pre);
            }}
          >
            취소
          </Button>
        </>
      ) : (
        <>
          <Input
            type="checkbox"
            value={isChecked}
            _onChange={({ target }) => {
              setIsChecked(target.checked);
            }}
          />
          <Flex hori="space-between" width="90%">
            <div
              onClick={() => {
                setEditMode((pre) => !pre);
                formik.setFieldValue("newTodoTitle", "");
              }}
            >
              {todo.todoTitle}
            </div>

            <Flex>
              <div style={{ margin: "0 10px" }}>담당지정버튼</div>
              <div onClick={deleteTodoHandler}>삭제버튼</div>
            </Flex>
          </Flex>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 40px;
  border: 1px solid var(--grey);
`;

const Flex = styled.div`
  display: flex;
  width: ${(props) => props.width};
  justify-content: ${(props) => props.hori};
  align-items: ${(props) => props.verti};
`;
export default Todo;
