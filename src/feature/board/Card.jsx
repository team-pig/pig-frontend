import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

// elem & compo
import { Text } from "../../elem";
import Todos from "./Todos";
import CardModal from "./CardModal";
import ModalForms from "./ModalForms";
import Icon from "../../components/Icon";

// redux & api
import { useSelector, useDispatch } from "react-redux";
import { __loadCardById, __deleteCard } from "../../redux/modules/board";

const Card = ({ card, index, bucketId }) => {
  const dispatch = useDispatch();
  const currentContent = useSelector((state) => state.board.card);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // 전역변수
  const { roomId } = useParams();

  useEffect(() => {
    setModalContent(currentContent);
  }, [currentContent]);

  return (
    <>
      <Draggable draggableId={card.cardId} index={index}>
        {(provided, snapshot) => (
          <Container
            onClick={() => {
              setShowModal(true);
              dispatch(__loadCardById(roomId, card.cardId));
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Flex jc="flex-start" mg="0 0 10px 0">
              <Dot bg="red" />
              <Text type="body_2">{card.cardTitle}</Text>
              <Icon
                icon="remove"
                size="14px"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(__deleteCard(bucketId, card.cardId, roomId));
                }}
              />
            </Flex>
            <Text type="body_3">{card.desc}</Text>
          </Container>
        )}
      </Draggable>
      {Object.keys(modalContent).length !== 0 && (
        <CardModal showModal={showModal} setShowModal={setShowModal}>
          <ModalForms content={modalContent} setContent={setModalContent} />
          <TodosHeader type="sub_2" color="black">
            할 일
          </TodosHeader>
          <Todos cardId={card.cardId} />
        </CardModal>
      )}
    </>
  );
};

const Container = styled.div`
  border: 1px solid var(--line);
  padding: 14px;
  background-color: var(--white);
  word-break: break-all;
  width: 280px;
  min-height: 170px;
  font-size: 1.8rem;
  cursor: pointer !important;
`;

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => (props.jc ? props.jc : "center")};
  align-items: ${(props) => (props.ai ? props.ai : "center")};
  ${(props) =>
    props.border &&
    css`
      border: 1px solid red;
    `}
  padding: ${(props) => props.pd};
  margin: ${(props) => props.mg};
`;

const TodosHeader = styled(Text)`
  padding: 0 40px;
  margin-bottom: 21px;
`;

const Dot = styled.div`
  background-color: red;
  margin-right: 10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export default Card;
