import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import RoomCard from "./RoomCard";
import InfinityScroll from "../../components/InfinityScroll";

import { __getRoomList } from "../../redux/modules/room";

// 기본 RoomList, 기본적으로 보이는 RoomList(방 검색을 하지 않았을 경우)
const DefaultRoomList = () => {
  const dispatch = useDispatch();
  const { room, markedList, isLoading, paging } = useSelector(
    (state) => state.room
  );

  return (
    <>
    {/* 무한 스크롤 사용, 서버에 요청해 next 페이지를 받아온다
    isNext는 다음 페이지가 있는 지 체크, 
    isLoading은 로딩 중인지 체크, 만약 이미 로딩 중이라면 더 요청 X */}
      <InfinityScroll
        callNext={() => {
          dispatch(__getRoomList(paging.next));
        }}
        isNext={paging.next ? true : false}
        isLoading={isLoading}
      >
        <RoomContainer>
          <RoomBox>
            {/* 즐겨찾기 리스트에 있는 방 index를 찾는다 */}
            {room.map((room, idx) => {
              const markedIdx = markedList.findIndex(
                (markedRoom) => markedRoom.roomId === room.roomId
              );

              return (
                // 찾은 index로 즐겨찾기 된 방을 체크한다
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
