import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Text } from "../../elem/index.js";

import RoomCard from "./RoomCard";

const BookmarkList = () => {
  const { markedList, userId } = useSelector(
    (state) => state.room
  );

  return (
    <>
        <BookmarkContainer>
          <TitleWrapper>
            <BookmarkTitle>
              <Text type="body_1">즐겨찾기 방 목록</Text>
            </BookmarkTitle>
          </TitleWrapper>
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
    </>
  );
};

const BookmarkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 25px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  ${({ theme }) => theme.device.mobile} {
    margin-top: 10px;
  }
`;

const BookmarkTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  padding: 0 80px;
  margin: 0 auto;
  ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
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
