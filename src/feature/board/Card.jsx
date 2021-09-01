import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

// elem & compo
import { Button, Text } from "../../elem";
import Todos from "../task/Todos";
import CardModal from "../task/CardModal";
import ModalForms from "../task/ModalForms";
import Icon from "../../components/Icon";
import flex from "../../themes/flex";
import JoyrideContainer from "../../feature/tutorial/JoyrideContainer";
import { modalSteps } from "../../feature/tutorial/tutorialSteps";

// function
import setDday from "../../functions/setDday";

// redux & api
import { useSelector, useDispatch } from "react-redux";
import { __loadCardById, __deleteCard } from "../../redux/modules/board";

const Card = ({ card, index, bucketId }) => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  //task
  const currentContent = useSelector((state) => state.board.card);
  const tutorial = useSelector((state) => state.user.tutorial);
  const [modalContent, setModalContent] = useState({});

  // modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setModalContent(currentContent);
  }, [currentContent]);

  const limitText = (text, limit) => {
    if (text) {
      return text.length <= limit ? text : text.substr(0, limit);
    }
    return;
  };

  // Joyride(튜토리얼)
  const [isShowTutorial, setIsShowTutorial] = useState(false);

  useEffect(() => {
    if (
      showModal &&
      tutorial &&
      tutorial["modal"] === true &&
      isShowTutorial === false
    ) {
      setIsShowTutorial(true);
    }
  }, [tutorial]);

  return (
    <>
      <JoyrideContainer
        run={isShowTutorial}
        setRun={setIsShowTutorial}
        steps={modalSteps}
        page="modal"
      />
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
                    size="20px"
                    color="var(--grey)"
                    onClick={(e) => {
                      e.stopPropagation();
                      const answer = window.confirm(
                        "카드를 삭제하면 포함된 모든 할일도 삭제됩니다. 카드를 삭제 하시겠습니까?"
                      );
                      if (answer)
                        dispatch(__deleteCard(bucketId, card.cardId, roomId));
                    }}
                  />
                </CardDeleteBtn>
              </CardHeader>
              <CardBody>
                <Text type="body_3">{limitText(card.desc, 80)}</Text>
              </CardBody>
              <CardFooter>
                <EndDate>
                  <Text type="body_4" color="grey">
                    {card.endDate}
                  </Text>
                  <Text type="body_4" color="notice">
                    {setDday(card.endDate)}
                  </Text>
                </EndDate>
                <CardStat>
                  {/* <StatCnt>
                    <Icon icon="checkbox" size="20px" />
                    <Text color="grey" type="body_4">
                      7
                    </Text>
                  </StatCnt> */}
                  {/* <StatCnt>
                    <Icon icon="my" size="20px" color="var(--grey)" />
                    <Text color="grey" type="body_4">
                      {card.memberCount}
                    </Text>
                  </StatCnt> */}
                </CardStat>
              </CardFooter>
            </Container>
          );
        }}
      </Draggable>
      {Object.keys(modalContent).length !== 0 && (
        <CardModal showModal={showModal} setShowModal={setShowModal}>
          <ModalForms content={modalContent} source="board" />
          <Todos cardId={card.cardId} />
          <BtnBox>
            <Button
              type="button"
              shape="green-fill"
              size="200"
              _onClick={() => setShowModal(false)}
            >
              닫기
            </Button>
          </BtnBox>
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
    border: ${(props) => `1px solid ${props.theme.colors[props.bgColor]}`};
  }
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
    transform: scale(1.1);
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

const BtnBox = styled.div`
  ${flex()};
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export default Card;
