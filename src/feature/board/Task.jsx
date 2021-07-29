import React from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Task = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging} //
        >
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;
export default Task;
