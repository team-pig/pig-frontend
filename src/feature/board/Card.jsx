import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

// elem & compo
import { Button } from "../../elem";
import Todos from "./Todos";
import CardModal from "./CardModal";
import ModalForms from "./ModalForms";

const Card = ({ card, index, deleteCardHandler }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Draggable draggableId={card.cardId} index={index}>
        {(provided, snapshot) => (
          <Flex>
            <Container
              onClick={() => {
                setShowModal((pre) => !pre);
              }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <div>{card.cardTitle}</div>
              {card.cardId}
            </Container>
          </Flex>
        )}
      </Draggable>

      <CardModal showModal={showModal} setShowModal={setShowModal}>
        <ModalForms cardId={card.cardId} />
        <Todos cardId={card.cardId} />
        <Button
          _onClick={() => {
            deleteCardHandler(card.cardId, setShowModal);
            setShowModal((pre) => !pre);
          }}
        >
          삭제
        </Button>
      </CardModal>
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

const Flex = styled.div`
  display: flex;
`;

export default Card;
