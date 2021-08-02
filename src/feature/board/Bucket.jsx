import React, { useState } from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { setBoard } from "../../redux/modules/board";
import { useDispatch, useSelector } from "react-redux";

// content
import Card from "./Card";

let num = 2;
const Bucket = ({ column, index, cards }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [editTitleMone, setEditTitleMone] = useState(false);
  const boardData = useSelector((state) => state.board);

  // 새로운 card 만들기 (onClick Event Handler)
  const addTask = (provided) => {
    const columnId = provided.droppableProps["data-rbd-droppable-id"];
    const newTask = { cardId: `card-${num}`, cardTitle: taskName };
    const newTasks = { ...boardData.cards, [`card-${num}`]: newTask };
    const newTaskIds = [...boardData.columns[columnId].cardIds].concat(
      `card-${num}`
    );

    const newColumn = { ...boardData.columns[columnId], cardIds: newTaskIds };
    const newColumns = { ...boardData.columns, [columnId]: newColumn };
    const newState = { ...boardData, columns: newColumns, cards: newTasks };

    dispatch(setBoard(newState));
    num++;
  };

  const updateBucketTitle = () => {
    setEditTitleMone(true);
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            {editTitleMone ? (
              <EditInput type="text" {...provided.dragHandleProps} />
            ) : (
              <Title onClick={updateBucketTitle} {...provided.dragHandleProps}>
                {column.title}
              </Title>
            )}
            <Droppable droppableId={column.id} type="card">
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver} // dragging 상태 감지 (css 활용)
                >
                  {cards.map((card, index) => (
                    <Card key={card.cardId} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                  <AddTodoBtn>
                    <Input
                      value={taskName}
                      onChange={({ target: { value } }) => {
                        setTaskName(value);
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
  border: 1px solid lightgrey;
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
