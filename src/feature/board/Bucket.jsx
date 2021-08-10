import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router";

// compo & elem
import Card from "./Card";
import { Text } from "../../elem";

// redux & api
import { useDispatch } from "react-redux";
import {
  __createCard,
  __updateBucketTitle,
  __deleteBucket,
} from "../../redux/modules/board";

const Bucket = ({ bucket, index, bucketCards }) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState("");
  const [editTitleMode, setEditTitleMode] = useState(false);
  const [newBucketName, setNewBucketName] = useState("");

  // 전역변수
  const { roomId } = useParams();
  const bucketId = bucket.bucketId;

  // 버켓이름수정 handler
  const updateBucketTitleHandler = () => {
    dispatch(__updateBucketTitle(roomId, bucketId, newBucketName));
  };

  // 카드생성 handler
  const addTask = () => {
    dispatch(__createCard(roomId, bucketId, cardTitle));
  };

  return (
    <div>
      <Draggable draggableId={bucketId} index={index}>
        {(provided, snap) => {
          return (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snap.isDragging}
            >
              {editTitleMode ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateBucketTitleHandler(newBucketName);
                    setEditTitleMode(false);
                  }}
                >
                  <EditInput
                    type="text"
                    {...provided.dragHandleProps}
                    onChange={(e) => {
                      setNewBucketName(e.target.value);
                    }}
                  />
                </form>
              ) : (
                <>
                  <Flex
                    jc="space-between"
                    pd="18px 20px"
                    {...provided.dragHandleProps}
                  >
                    <Text
                      type="body_1"
                      onClick={() => {
                        setEditTitleMode(true);
                      }}
                    >
                      {bucket.bucketName}
                    </Text>
                    <Wrap
                      onClick={() => {
                        dispatch(__deleteBucket(roomId, bucketId));
                      }}
                    >
                      X
                    </Wrap>
                  </Flex>
                </>
              )}

              <Droppable droppableId={bucketId} type="card">
                {(provided, snapshot) => {
                  return (
                    <>
                      <AddCardForm
                        onSubmit={(e) => {
                          e.preventDefault();
                          addTask();
                        }}
                      >
                        <AddCardInput
                          value={cardTitle}
                          onChange={({ target: { value } }) => {
                            setCardTitle(value);
                          }}
                        />
                      </AddCardForm>
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
    </div>
  );
};

const Container = styled.div`
  gap: 20px;
  background-color: #f5f5f5;
  height: 900px;
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: ${(props) => props.isDragging && "1px solid #7BA7FD"};
`;

const AddCardForm = styled.form`
  display: flex;
  justify-content: center;
`;

const EditInput = styled.input`
  margin: 0 auto;
  cursor: text !important;
  border: none;
  font-size: 24px;
  border-radius: 10px;
  outline: none;
  height: 60px;
  width: 90%;
  text-align: center;
`;

const AddCardInput = styled.input`
  border: 1px solid #eee;
  outline: none;
  height: 40px;
  width: 280px;
`;

const BucketList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  outline: none;
  /* position: relative; */
  /* border: ${(props) => props.isDraggingOver && "1px solid #ff6b81"}; */
  /* transition: background-color 0.2s ease; */
  /* background-color: ${(props) => props.isDraggingOver && "#fbfbfb"}; */
  flex-grow: 1;
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

const Wrap = styled.div`
  padding: ${(props) => props.pd};
  margin: ${(props) => props.mg};
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
