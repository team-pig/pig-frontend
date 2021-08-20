import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import RoomCard from "./RoomCard";

const BookmarkList = () => {
  const { searchedRoom, markedList, userId } = useSelector(
    (state) => state.room
  );

  return (
    <>
      {(searchedRoom && searchedRoom.length > 0) || markedList.length === 0 ? (
        ""
      ) : (
        <BookmarkContainer>
          <BookmarkBox>
            {markedList.map((room, idx) => {
              const isCheck = true;

              return (
                <RoomCard
                  isCheck={isCheck}
                  userId={userId}
                  key={room.roomId}
                  {...room}
                />
              );
            })}
          </BookmarkBox>
        </BookmarkContainer>
      )}
    </>
  );
};

const BookmarkContainer = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const BookmarkBox = styled.div`
  display: grid;
  /* overflow-y: auto;
  -ms-overflow-style: none;
  height: 299px; */
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--line);
  /* ::-webkit-scrollbar {
    display: none;
  } */
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default BookmarkList;
