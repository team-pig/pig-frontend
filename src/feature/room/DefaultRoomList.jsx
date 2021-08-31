import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import RoomCard from "./RoomCard";
import InfinityScroll from "../../components/InfinityScroll";

import { __getRoomList } from "../../redux/modules/room";

const DefaultRoomList = () => {
  const dispatch = useDispatch();
  const { room, markedList, isLoading, paging } = useSelector(
    (state) => state.room
  );

  return (
    <>
      <InfinityScroll
        callNext={() => {
          dispatch(__getRoomList(paging.next));
        }}
        isNext={paging.next ? true : false}
        isLoading={isLoading}
      >
        <RoomContainer>
          <RoomBox>
            {room.map((room, idx) => {
              const markedIdx = markedList.findIndex(
                (markedRoom) => markedRoom.roomId === room.roomId
              );

              return (
                <RoomCard
                  isCheck={markedIdx === -1 ? false : true}
                  key={room.roomId}
                  {...room}
                />
              );
            })}
          </RoomBox>
        </RoomContainer>
      </InfinityScroll>
    </>
  );
};

const RoomContainer = styled.div`
  display: flex;
`;

const RoomBox = styled.div`

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(274px, 1fr));
  grid-gap: 25px;
  width: 70vw;
  margin: 0 auto;
  padding: 0 25px;
  ${({ theme }) => theme.device.tablet} {
    padding: 0 45px;
  }
   ${({ theme }) => theme.device.mobile} {
     grid-template-columns: repeat(1, 1fr);
     width: 100%;
     min-width: 302px;
     padding: 0;
   } 
 

`;

export default DefaultRoomList;
