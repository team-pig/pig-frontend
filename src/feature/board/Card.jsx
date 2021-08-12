import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import moment from "moment";

// elem & compo
import { Text } from "../../elem";
import Todos from "./Todos";
import CardModal from "./CardModal";
import ModalForms from "./ModalForms";
import Icon from "../../components/Icon";
import flex from "../../themes/flex";

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
        {(provided, snapshot) => {
          return (
            <Container
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
                dispatch(__loadCardById(roomId, card.cardId));
              }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
              bgColor={card.color}
            >
              <CardHeader>
                <CardTitle>
                  <Dot bgColor={card.color} />
                  <Text type="body_2">{card.cardTitle}</Text>
                </CardTitle>
                <CardDeleteBtn>
                  <Icon
                    icon="remove"
                    size="14px"
                    color="var(--grey)"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(__deleteCard(bucketId, card.cardId, roomId));
                    }}
                  />
                </CardDeleteBtn>
              </CardHeader>
              <CardBody>
                <Text type="body_3">{card.desc}</Text>
              </CardBody>
              <CardFooter>
                <EndDate>
                  <Text type="body_4" color="grey">
                    {card.endDate}
                  </Text>
                  <Text type="body_4" color="notice">
                    D-{moment(moment(card.endDate) - Date.now()).format("DD")}
                  </Text>
                </EndDate>
                <CardStat>
                  <StatCnt>
                    <Icon icon="checkbox" size="20px" />
                    <Text color="grey" type="body_4">
                      7
                    </Text>
                  </StatCnt>
                  <StatCnt>
                    <Icon icon="my" size="20px" color="var(--grey)" />
                    <Text color="grey" type="body_4">
                      14
                    </Text>
                  </StatCnt>
                </CardStat>
              </CardFooter>
            </Container>
          );
        }}
      </Draggable>
      {Object.keys(modalContent).length !== 0 && (
        <CardModal showModal={showModal} setShowModal={setShowModal}>
          <ModalForms content={modalContent} />
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
  font-size: 1.8rem;
  cursor: pointer !important;
  border-radius: 4px;
  border: ${(props) => props.isDragging && `1px solid ${props.bgColor}`};
  &:hover {
    border-radius: 4px;
    border: ${(props) => `1px solid ${props.bgColor}`};
  }
`;

const TodosHeader = styled(Text)`
  padding: 0 40px;
  margin-bottom: 21px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors[props.bgColor]};
`;

const CardHeader = styled.div`
  ${flex("between", "center")};
  margin-bottom: 10px;
`;

const CardTitle = styled.div`
  ${flex("between", "center")};
  gap: 10px;
`;

const CardDeleteBtn = styled.div`
  ${flex("center", "center")};
  transition: 200ms transform ease-in-out;
  &:hover {
    transform: scale(1.3);
  }
`;
const CardBody = styled.div`
  width: 252px;
  margin-bottom: 20px;
`;
const CardFooter = styled.div`
  ${flex("between", "center")};
  height: 24px;
`;

const EndDate = styled.div`
  ${flex("between", "center")};
  gap: 10px;
`;

const CardStat = styled.div`
  ${flex("between", "center")};
  gap: 14px;
`;

const StatCnt = styled.div`
  ${flex("between", "center")};
  gap: 6px;
`;

export default Card;
