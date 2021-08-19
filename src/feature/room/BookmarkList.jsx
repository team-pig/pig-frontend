import React from "react";
import styled from "styled-components";

import RoomCard from "./RoomCard";

const BookmarkList = ({markedList, userId, openDrop, closeDrop, isShow, history}) => {
  return(
    <>
      <BookmarkContainer>
              <BookmarkBox>
                {markedList &&
                  markedList.map((room, idx) => {
                    const userIdList = room.bookmarkedMembers.map(
                      (member, index) => {
                        return member.userId;
                      }
                    );

                    const isCheck = userIdList.includes(userId);

                    return (
                      <RoomCard
                        isCheck={isCheck}
                        userId={userId}
                        openDrop={openDrop}
                        closeDrop={closeDrop}
                        isShow={isShow}
                        key={room.roomId}
                        {...room}
                        history={history}
                      />
                    );
                  })}
              </BookmarkBox>
            </BookmarkContainer>
    </>
  );
}


const BookmarkContainer = styled.div`
  display: flex;
  overflow-y: auto;
  -ms-overflow-style: none;
  height: 299px;
  margin-bottom: 25px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BookmarkBox = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--line);

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default BookmarkList;