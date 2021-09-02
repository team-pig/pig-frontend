import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Text } from "../../elem/index.js";

import RoomCard from "./RoomCard";

// 즐겨찾기 된 리스트, RoomList Page 상단에 띄움
// isCheck 기준으로 즐겨찾기 표시
const BookmarkList = () => {
  const { markedList, userId } = useSelector((state) => state.room);

  return (
    <>
      {markedList && markedList.length > 0 && (
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
      )}
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
  width: 100%;
  max-width: 1440px;
  min-width: 300px;
  padding: 0 100px;
  margin: 0 auto;
  ${({ theme }) => theme.device.mobile} {
    display: flex;
    justify-content: center;
    padding: 0;
  }
`;

const BookmarkBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(274px, 1fr));
  grid-gap: 25px;
  width: 70vw;
  margin: 0 auto;
  border-bottom: 1px solid var(--line);
  padding: 0 25px 25px 25px;

  /* 즐겨찾기 스크롤 */
  /* overflow-y: auto;
-ms-overflow-style: none;
height: 299px; */
  /* ::-webkit-scrollbar {
  display: none;
} */

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

export default BookmarkList;
