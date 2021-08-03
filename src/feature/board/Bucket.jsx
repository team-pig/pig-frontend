import React, { useState } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { __createCard, __deleteCard } from "../../redux/modules/board";
import { useDispatch } from "react-redux";

// content
import Card from "./Card";

const Bucket = ({ column, index, cards, deleteBucket }) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState("");
  const [editTitleMone, setEditTitleMone] = useState(false);

  // 새로운 card 만들기 (onClick Event Handler)
  const addTask = (provided) => {
    // const bucketId = provided.droppableProps["data-rbd-droppable-id"];
    const bucketId = column.id;
    const newCardInfo = { bucketId, cardTitle };
    dispatch(__createCard(newCardInfo));
  };

  const updateBucketTitle = () => {
    setEditTitleMone(true);
  };

  const deleteCardHandler = (cardId) => {
    const bucketId = column.id;
    dispatch(__deleteCard(bucketId, cardId));
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            {editTitleMone ? (
              <EditInput type="text" {...provided.dragHandleProps} />
            ) : (
              <Flex verti="space-between" {...provided.dragHandleProps}>
                <Title onClick={updateBucketTitle}>{column.title}</Title>
                <div
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => deleteBucket(column)}
                >
                  X
                </div>
              </Flex>
            )}

            <Droppable droppableId={column.id} type="card">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {cards.map((card, index) => (
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

const Title = styled.h3`
  padding: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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
