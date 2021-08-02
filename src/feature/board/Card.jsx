import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Input, Text, Button } from "../../elem";
import Todos from "./Todos";
import TaskDetail from "./TaskDetail";
import Textarea from "../../elem/Textarea";

const Card = ({ card, index }) => {
  console.log(card);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Draggable draggableId={card.cardId} index={index}>
        {(provided, snapshot) => (
          <Container
            onClick={() => {
              setShowModal((pre) => !pre);
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {card.cardTitle}
          </Container>
        )}
      </Draggable>
      <TaskDetail showModal={showModal} setShowModal={setShowModal}>
        <Text>{card.cardTitle}</Text>
        <Input type="date" />
        <Input type="date" />
        <Textarea />
        <Todos todos={card.todos} />
        <Button _onClick={() => {}}>취소</Button>
        <Button _onClick={() => {}}>확인</Button>
      </TaskDetail>
    </>
  );
};

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 12px;
  margin-bottom: 8px;
  height: 40px;
  font-size: 1.8rem;
  cursor: pointer !important;
`;

const Content = styled.div``;

export default Card;
