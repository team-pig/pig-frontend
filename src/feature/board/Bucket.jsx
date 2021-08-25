import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router";
import moment from "moment";
import ReactTooltip from "react-tooltip";

// compo & elem
import Card from "./Card";
import { Text } from "../../elem";
import flex from "../../themes/flex";
import InputToggle from "../../components/InputToggle";

// redux & api
import { useDispatch } from "react-redux";
import {
  __createCard,
  __updateBucketTitle,
  __deleteBucket,
  __createBucket,
} from "../../redux/modules/board";
import Icon from "../../components/Icon";

const Bucket = ({ bucket, index, bucketCards, BucketCnt }) => {
  const dispatch = useDispatch();
  const bucketName = "제목 없음";
  const cardTitle = "눌러서 제목 수정";
  const initDate = moment().format("YYYY-MM-DD");
  const initColor = "blue";

  // 전역변수
  const { roomId } = useParams();
  const bucketId = bucket.bucketId;

  // 카드생성 handler
  const addCard = () => {
    dispatch(__createCard(roomId, bucketId, cardTitle, initDate, initColor));
  };

  // 버킷생성
  const addBucket = () => {
    dispatch(__createBucket(roomId, bucketName));
  };

  const editFunc = (key, value) => {
    dispatch(__updateBucketTitle(roomId, { bucketId, [key]: value }));
  };

  return (
    <>
      <Draggable draggableId={bucketId} index={index}>
        {(provided, snap) => {
          return (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snap.isDragging}
            >
              <BucketHeader {...provided.dragHandleProps}>
                <BucketTitle>
                  <Text type="body_1">
                    <InputToggle
                      shape="text"
                      name="bucketName"
                      saveFunc={editFunc}
                      value={
                        bucket.bucketName === null
                          ? "제목 없음"
                          : bucket.bucketName
                      }
                      maxLength={10}
                    />
                  </Text>
                </BucketTitle>
                <BucketHeadBtns>
                  {BucketCnt === 1 ? (
                    <>
                      <IconButton data-tip data-for="delete">
                        <Icon
                          icon="minus"
                          size="24px"
                          color="var(--darkgrey)"
                        />
                      </IconButton>
                      <ReactTooltip
                        id="delete"
                        place="top"
                        type="light"
                        backgroundColor="var(--white)"
                        borderColor="var(--line)"
                        border={true}
                      >
                        <span>마지막 버킷은 삭제 할 수 없어요!</span>
                      </ReactTooltip>
                    </>
                  ) : (
                    <IconButton
                      onClick={() => {
                        const answer = window.confirm(
                          "버킷을 삭제하면 모든 카드와 할일이 삭제됩니다. 버킷을 삭제 하시겠습니까?"
                        );
                        if (answer) {
                          dispatch(__deleteBucket(roomId, bucketId));
                        }
                      }}
                    >
                      <Icon icon="minus" size="24px" color="var(--darkgrey)" />
                    </IconButton>
                  )}

                  <IconButton onClick={addBucket}>
                    <Icon icon="plus-lg" size="24px" color="var(--darkgrey)" />
                  </IconButton>
                </BucketHeadBtns>
              </BucketHeader>
              <BucketHeaderBar />

              <Droppable droppableId={bucketId} type="card">
                {(provided, snapshot) => {
                  return (
                    <>
                      <AddCardBtn>
                        <Icon
                          icon="plus-circle"
                          size="20px"
                          onClick={addCard}
                        />
                      </AddCardBtn>
                      <BucketList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        {bucketCards.map(
                          (card, index) =>
                            card && (
                              <Card
                                bucketId={bucketId}
                                key={card.cardId}
                                card={card}
                                index={index}
                              />
                            )
                        )}
                        {provided.placeholder}
                      </BucketList>
                    </>
                  );
                }}
              </Droppable>
            </Container>
          );
        }}
      </Draggable>
    </>
  );
};

const Container = styled.div`
  flex-shrink: 0;
  width: 300px;
  min-height: 900px;
  background-color: #f5f5f5;
  border-radius: 4px;
  border: 1px solid var(--line);
  border: ${(props) => props.isDragging && "1px solid #7BA7FD"};
`;

const BucketList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  outline: none;
  min-height: 900px;
  /* position: relative; */
  /* border: ${(props) => props.isDraggingOver && "1px solid #ff6b81"}; */
  /* transition: background-color 0.2s ease; */
  /* background-color: ${(props) => props.isDraggingOver && "#fbfbfb"}; */
  flex-grow: 1;
`;
const IconButton = styled.div`
  text-align: center;
  svg {
    cursor: pointer;
    transition: 200ms transform ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
  }
`;

const AddCardBtn = styled.div`
  /* ${IconButton}; */
  text-align: center;
  height: 20px;
  svg {
    cursor: pointer;
    transition: 200ms transform ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
  }
  margin-bottom: 24px;
`;

const BucketHeader = styled.div`
  ${flex("between", "center")};
  padding: 18px 20px 0 20px !important;
  margin-bottom: 18px;
`;

const BucketHeaderBar = styled.div`
  width: 260px;
  height: 4px;
  background-color: ${(props) => props.theme.colors["mint"]};
  margin: 0 auto;
  border-radius: 0px 4px 4px 0px;
  margin-bottom: 14px;
`;

const BucketTitle = styled.div`
  flex-grow: 1;
`;

const BucketHeadBtns = styled.div`
  ${flex("center", "center")};
  gap: 10px;
`;

export default Bucket;

// 👇 최적화 - 지금당장은 필요없음
// class InnerList extends React.Component {
//   shouldComponentUpdate(nextProps) {
//     if (nextProps.cards === this.props.cards) {
//       return false;
//     }
//     return true;
//   }

//   render() {
//     return this.props.cards.map((card, index) => (
//       <Task key={card.id} card={card} index={index} />
//     ));
//   }
// }
