import React from "react";
import styled from "styled-components";
import { Input, Text } from "../../elem";

const Todos = () => {
  return (
    <Container>
      {/* {todos.map((todo, idx) => (
        <Todo>
          <Input type="checkbox"></Input>
          <Flex>
            <Text>{todo.todoTitle}</Text>
            <Flex>
              <div onClick={() => {}}>(X)</div>
              <div onClick={() => {}}>(+)</div>
            </Flex>
          </Flex>
        </Todo>
      ))} */}
      <form onSubmit={() => {}}>
        <Input></Input>
      </form>
    </Container>
  );
};

const Container = styled.div``;
const Todo = styled.div`
  display: flex;
  border: 1px solid var(--grey);
`;

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.hori};
  align-items: ${(props) => props.verti};
`;
export default Todos;
