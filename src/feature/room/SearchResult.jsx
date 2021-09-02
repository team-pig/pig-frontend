import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import RoomCard from "./RoomCard";

const SearchResult = () => {
  const { searchedRoom, markedList } = useSelector((state) => state.room);

  return (
    <>
      <RoomContainer>
        <RoomBox>
          {/* 즐겨찾기 표시를 위해 즐겨찾기된 리스트에 검색된 방 index가 있는 지 찾기 */}
          {searchedRoom &&
            searchedRoom.map((room, idx) => {
              const markedIdx = markedList.findIndex(
                (markedRoom) => markedRoom.roomId === room.roomId
              );

              return (
                <RoomCard
                // 찾은 index로 즐겨찾기 체크
                  isCheck={markedIdx === -1 ? false : true}
                  key={room.roomId}
                  {...room}
                />
              );
            })}
        </RoomBox>
      </RoomContainer>
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
  padding: 0 25px 25px 25px;
  ${({ theme }) => theme.device.tablet} {
    padding: 0 45px 25px 45px;
  }
  ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    min-width: 302px;
    padding: 0 0 25px 0;
  }
`;

export default SearchResult;
