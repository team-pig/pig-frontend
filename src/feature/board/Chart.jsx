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
  __loadBucket,
  __loadCard,
} from "../../redux/modules/board";
import { useEffect } from "react";

const Chart = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const [bucketName, setBucketName] = useState("");
  const { cards, columnOrder, columns } = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(__loadBucket(roomId));
    dispatch(__loadCard(roomId));
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
    const sourceBucket = columns[source.droppableId];
    const destinationBucket = columns[destination.droppableId];

    // 버킷위치수정
    if (type === "column") {
      const newColumnOrder = Array.from(columnOrder); // 새로운 컬럼오더 배열을 만들고,
      newColumnOrder.splice(source.index, 1); // dnd된 컬럼을 제외하고,
      newColumnOrder.splice(destination.index, 0, draggableId); // drop된 위치(index)에 다시 넣는다.

      dispatch(__updateBucket(roomId, null, null, newColumnOrder));
      return;
    }

    // 같은 버킷으로 Todo를 옮겼을 때
    if (sourceBucket === destinationBucket) {
      const sourceBucketOrder = Array.from(sourceBucket.cardOrder);
      const destinationBucketOrder = Array.from(sourceBucket.cardOrder);
      destinationBucketOrder.splice(source.index, 1);
      destinationBucketOrder.splice(destination.index, 0, draggableId);
      const newBucketInfo = {
        sourceBucketId: destinationBucket.bucketId,
        destinationBucketId: destinationBucket.bucketId,
        destinationBucketOrder,
        sourceBucketOrder,
      };

      dispatch(__updateCardLocate(roomId, draggableId, newBucketInfo));
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

      dispatch(
        __updateCardLocateOtherBucket(roomId, draggableId, newBucketInfo)
      );
      return;
    }
  };

  // 버킷생성
  const createBucket = () => {
    dispatch(__createBucket(roomId, bucketName));
  };

  if (columnOrder === null || columns === null) {
    return <></>;
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {cards &&
                columnOrder.map((bucketId, index) => {
                  const column = columns[bucketId];
                  const bucketCards = column.cardOrder.map(
                    (cardId) => cards[cardId]
                  );
                  return (
                    <Bucket
                      bucketCards={bucketCards} //required
                      bucket={column} // required
                      key={column.bucketId} // required
                      index={index} // required
                      roomId={roomId} // required
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
  gap: 34px;
  padding: 0 40px;
`;

const AddBucketZone = styled.div`
  /* padding: 100px 0 0 100px;
  display: flex; */
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
