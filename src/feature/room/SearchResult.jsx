import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import RoomCard from "./RoomCard";

const SearchResult = () => {
  const { searchedRoom, userId } = useSelector(
    (state) => state.room
  );

  return (
    <>
      <RoomContainer>
        <RoomBox>
          {/* userIdList room.bookmarkedMembers 안에 딕셔너리로 userId 들어가있어서 
          북마크 여부 확인하기 위해 userId를 뽑아내서 확인함 */}
          {searchedRoom &&
            searchedRoom.map((room, idx) => {
              const userIdList = room.bookmarkedMembers.map((member, index) => {
                return member.userId;
              });
              const isCheck = userIdList.includes(userId);
              return (
                <RoomCard
                  isCheck={isCheck}
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
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default SearchResult;
