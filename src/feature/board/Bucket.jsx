import React, { useState } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router";

// compo & elem
import Card from "./Card";
import { Text } from "../../elem";

// redux & api
import { useDispatch } from "react-redux";
import { __createCard, __deleteCard } from "../../redux/modules/board";

const Bucket = ({
  bucket,
  index,
  bucketCards,
  deleteBucket,
  editTitleBucket,
}) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState("");
  const [editTitleMone, setEditTitleMone] = useState(false);
  const [newBucketTitle, setNewBucketTitle] = useState("");
  const { roomId } = useParams();

  // 버킷이름 수정 handler
  const updateBucketTitle = () => {
    setEditTitleMone(true);
  };

  // 카드생성 handler
  const addTask = (provided) => {
    const bucketId = bucket.bucketId;
    dispatch(__createCard(roomId, bucketId, cardTitle));
  };

  // 카드삭제 handler
  const deleteCardHandler = (cardId) => {
    const bucketId = bucket.bucketId;
    dispatch(__deleteCard(bucketId, cardId, roomId));
  };

  return (
    <>
      <Draggable draggableId={bucket.bucketId} index={index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            {editTitleMone ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editTitleBucket(newBucketTitle, bucket.bucketId);
                  setEditTitleMone(false);
                }}
              >
                <EditInput
                  type="text"
                  {...provided.dragHandleProps}
                  onChange={(e) => {
                    setNewBucketTitle(e.target.value);
                  }}
                />
              </form>
            ) : (
              <>
                <Flex verti="space-between" {...provided.dragHandleProps}>
                  <Text type="head_5" onClick={updateBucketTitle}>
                    {bucket.bucketName}
                  </Text>
                  <div
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={() => deleteBucket(bucket)}
                  >
                    X
                  </div>
                </Flex>
                <Text type="head_6" onClick={updateBucketTitle}>
                  {bucket.bucketId}
                </Text>
              </>
            )}

            <Droppable droppableId={bucket.bucketId} type="card">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {bucketCards.map((card, index) => (
                    <Card
                      key={card.cardId}
                      card={card}
                      index={index}
                      deleteCardHandler={deleteCardHandler}
                    />
                  ))}
                  {provided.placeholder}
                  <AddTodoBtn>
                    <Input
                      value={cardTitle}
                      onChange={({ target: { value } }) => {
                        setCardTitle(value);
                      }}
                    />
                    <Button
                      onClick={() => {
                        addTask(provided);
                      }}
                    >
                      카드 추가
                    </Button>
                  </AddTodoBtn>
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    </>
  );
};

const AddTodoBtn = styled.div`
  position: absolute;
  display: flex;
  bottom: -50px;
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
const Input = styled.input`
  border: 1px solid #eee;
  outline: none;
  height: 40px;
  width: 250px;
`;
const Button = styled.button`
  border: 1px solid #eee;
`;

const Container = styled.div`
  margin: 8px;
  border: 1px solid red;
  background-color: white;
  border-radius: 2px;
  min-height: 500px;
  width: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const TaskList = styled.div`
  outline: none;
  position: relative;
  padding: 8px;
  border: ${(props) => props.isDraggingOver && "3px solid #ff6b81"};
  transition: background-color 0.2s ease;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#fbfbfb" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.verti};
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
