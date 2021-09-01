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
          {/* userIdList room.bookmarkedMembers 안에 딕셔너리로 userId 들어가있어서 
          북마크 여부 확인하기 위해 userId를 뽑아내서 확인함 */}
          {searchedRoom &&
            searchedRoom.map((room, idx) => {
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
