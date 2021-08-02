import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Bucket from "./Bucket";
import { useState } from "react";
import "@atlaskit/css-reset";

import { useSelector, useDispatch } from "react-redux";
import {
  setBoard,
  updateBucket,
  __createBucket,
  __updateCardLocate,
} from "../../redux/modules/board";

let nextId = 3;
const Chart = () => {
  const dispatch = useDispatch();
  const [bucketName, setBucketName] = useState("");
  const boardData = useSelector((state) => state.board);

  // 아이템을 떨어뜨렸을 때 실행할 작업들
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    // 지정한 곳에 떨어뜨리지 않으면 실행멈춤
    if (!destination) {
      return;
    }

    // 처음과 같은 곳에 떨어뜨리면 실행멈춤
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // 버킷리스트를 옮겼을 때 실행됨
    if (type === "column") {
      const newColumnOrder = Array.from(boardData.columnOrder); // 새로운 컬럼오더 배열을 만들고,
      newColumnOrder.splice(source.index, 1); // dnd된 컬럼을 제외하고,
      newColumnOrder.splice(destination.index, 0, draggableId); // drop된 위치(index)에 다시 넣는다.

      dispatch(__createBucket(newColumnOrder));
      return;
    }

    // 같은 버킷리스트에서 Todo을 옮겼을 때
    const sourceBucket = boardData.columns[source.droppableId];
    const destinationBucket = boardData.columns[destination.droppableId];

    if (sourceBucket === destinationBucket) {
      const sourceBucketOrder = sourceBucket.cardIds;
      const destinationBucketOrder = Array.from(sourceBucket.cardIds);
      destinationBucketOrder.splice(source.index, 1);
      destinationBucketOrder.splice(destination.index, 0, draggableId);

      const newBucket = {
        sourceBucketId: sourceBucket.id,
        destinationBucketId: destinationBucket.id,
        sourceBucketOrder,
        destinationBucketOrder,
      };

      dispatch(__updateCardLocate(newBucket));
      return;
    }

    // Todo를 다른 버킷으로 옮겼을 때
    const homecardIds = Array.from(sourceBucket.cardIds);
    homecardIds.splice(source.index, 1);
    const newHome = {
      ...sourceBucket,
      cardIds: homecardIds,
    };

    const foreigncardIds = Array.from(destinationBucket.cardIds);
    foreigncardIds.splice(destination.index, 0, draggableId);

    const newForeign = {
      ...destinationBucket,
      cardIds: foreigncardIds,
    };

    const newState = {
      ...boardData,
      columns: {
        ...boardData.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    dispatch(setBoard(newState));
    console.log(3);
  };

  // 새로운 버킷리스트 만들기 (onClick Event Handler)
  const addbucketList = () => {
    const newColumn = {
      id: `column-${nextId}`,
      title: bucketName,
      cardIds: [],
    };

    const newColumnOrder = boardData.columnOrder.concat(`column-${nextId}`);

    const newBucketList = {
      ...boardData,
      columnOrder: newColumnOrder,
      columns: { ...boardData.columns, [`column-${nextId}`]: newColumn },
    };

    dispatch(setBoard(newBucketList));
    console.log(4);
    nextId++;
  };

  return (
    <>
      <AddBucketZone>
        <Input
          placeholder="버킷 이름을 적어주세요."
          type="text"
          value={bucketName}
          onChange={({ target: { value } }) => {
            setBucketName(value);
          }}
        />
        <Button onClick={addbucketList}>버킷 추가하기</Button>
      </AddBucketZone>
      {/* Dnd의 컴포넌트의 최상위는 무조건 DragDropContext */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {boardData.columnOrder.map((columnId, index) => {
                const column = boardData.columns[columnId];
                const cards = column.cardIds.map(
                  (todoId) => boardData.cards[todoId]
                );
                return (
                  <Bucket
                    column={column}
                    key={column.id}
                    index={index}
                    cards={cards}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

const Container = styled.div`
  display: flex;
  padding: 100px;
`;

const AddBucketZone = styled.div`
  padding: 100px 0 0 100px;
  display: flex;
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

export default Chart;
