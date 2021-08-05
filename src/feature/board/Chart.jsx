import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Bucket from "./Bucket";
import { useState } from "react";
import "@atlaskit/css-reset";
import { useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
  __updateBucket,
  __updateCardLocateOtherBucket,
  __createBucket,
  __updateCardLocate,
  __deleteBucket,
  __loadBucket,
  __updateBucketTitle,
} from "../../redux/modules/board";
import { useEffect } from "react";

const Chart = () => {
  const dispatch = useDispatch();
  const [bucketName, setBucketName] = useState("");
  const boardData = useSelector((state) => state.board);
  console.log(boardData);
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(__loadBucket(roomId));
  }, []);

  // 아이템을 떨어뜨렸을 때 실행할 작업들
  const onDragEnd = ({ destination, source, draggableId, type }) => {
    // 지정한 곳에 떨어뜨리지 않으면 실행
    if (!destination) {
      return;
    }

    // 처음과 같은 곳에 떨어뜨리면 실행
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // bucket ID 추출
    const sourceBucket = boardData.columns[source.droppableId];
    const destinationBucket = boardData.columns[destination.droppableId];

    // 버킷위치수정
    if (type === "column") {
      const newColumnOrder = Array.from(boardData.columnOrder); // 새로운 컬럼오더 배열을 만들고,
      newColumnOrder.splice(source.index, 1); // dnd된 컬럼을 제외하고,
      newColumnOrder.splice(destination.index, 0, draggableId); // drop된 위치(index)에 다시 넣는다.

      dispatch(__updateBucket(roomId, null, null, newColumnOrder));
      return;
    }

    // 같은 버킷으로 Todo를 옮겼을 때
    if (sourceBucket === destinationBucket) {
      const destinationBucketOrder = Array.from(sourceBucket.cardOrder);
      destinationBucketOrder.splice(source.index, 1);
      destinationBucketOrder.splice(destination.index, 0, draggableId);

      const newBucketInfo = {
        destinationBucketId: destinationBucket.bucketId,
        destinationBucketOrder,
      };

      dispatch(__updateCardLocate(newBucketInfo));
      return;
    }

    // 다른 버킷으로 Todo를 옮겼을 때
    if (sourceBucket !== destinationBucket) {
      const sourceBucketOrder = Array.from(sourceBucket.cardOrder);
      sourceBucketOrder.splice(source.index, 1);

      const destinationBucketOrder = Array.from(destinationBucket.cardOrder);
      destinationBucketOrder.splice(destination.index, 0, draggableId);

      const newBucketInfo = {
        sourceBucketId: sourceBucket.bucketId,
        destinationBucketId: destinationBucket.bucketId,
        sourceBucketOrder,
        destinationBucketOrder,
      };

      dispatch(__updateCardLocateOtherBucket(newBucketInfo));
      return;
    }
  };

  //버킷이름수정
  const editTitleBucket = (newBucketTitle, bucketId) => {
    dispatch(__updateBucketTitle(roomId, bucketId, newBucketTitle));
  };

  // 버킷생성
  const createBucket = () => {
    dispatch(__createBucket(roomId, bucketName));
  };

  // 버킷삭제
  const deleteBucket = (bucket) => {
    dispatch(__deleteBucket(roomId, bucket.bucketId));
  };

  if (boardData.columnOrder === null || boardData.columns === null) {
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
          <Button onClick={createBucket}>버킷 추가하기</Button>
        </AddBucketZone>
        <div></div>
      </>
    );
  }

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
        <Button onClick={createBucket}>버킷 추가하기</Button>
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
                if (column !== undefined) {
                  const cards = column.cardOrder.map(
                    (todoId) => boardData.cards[todoId]
                  );
                  return (
                    <Bucket
                      editTitleBucket={editTitleBucket}
                      deleteBucket={deleteBucket}
                      column={column}
                      key={column.bucketId}
                      index={index}
                      cards={cards}
                      roomId={roomId}
                    />
                  );
                }
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
