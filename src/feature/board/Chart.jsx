import { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Bucket from "./Bucket";
import "@atlaskit/css-reset";
import { useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
  __updateBucket,
  __updateCardLocateOtherBucket,
  __updateCardLocate,
  __loadBucket,
  __loadCard,
} from "../../redux/modules/board";

const Chart = () => {
  const dispatch = useDispatch();
  const { cards, columnOrder, columns } = useSelector((state) => state.board);
  const { roomId } = useParams();

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
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

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

  if (columnOrder.length === 0 || columns === null) {
    return <></>;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => {
            return (
              <Container {...provided.droppableProps} ref={provided.innerRef}>
                {cards &&
                  columnOrder.map((bucketId, index) => {
                    const BucketCnt = columnOrder.length;
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
                        roomId={roomId}
                        BucketCnt={BucketCnt}
                      />
                    );
                  })}
                {provided.placeholder}
              </Container>
            );
          }}
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

export default Chart;
