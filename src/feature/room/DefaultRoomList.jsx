// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";

// import RoomCard from "./RoomCard";
// import InfinityScroll from "../../components/InfinityScroll";

// import { __getRoomList } from "../../redux/modules/room";

// const DefaultRoomList = () => {
//   const dispatch = useDispatch();
//   const { room, markedList, isLoading, paging } = useSelector(
//     (state) => state.room
//   );

//   return (
//     <>
//       <InfinityScroll
//         callNext={() => {
//           dispatch(__getRoomList(paging.next));
//         }}
//         isNext={paging.next ? true : false}
//         isLoading={isLoading}
//       >
//         <RoomContainer>
//           <RoomBox>
//             {room.map((room, idx) => {
//               const markedIdx = markedList.findIndex(
//                 (markedRoom) => markedRoom.roomId === room.roomId
//               );

//               return (
//                 <RoomCard
//                   isCheck={markedIdx === -1 ? false : true}
//                   key={room.roomId}
//                   {...room}
//                 />
//               );
//             })}
//           </RoomBox>
//         </RoomContainer>
//       </InfinityScroll>
//     </>
//   );
// };

// const RoomContainer = styled.div`
//   display: flex;
// `;

// const RoomBox = styled.div`
//   display: grid;
//   grid-gap: 25px;
//   grid-template-columns: repeat(4, 1fr);
//   margin: 0 auto;

//   /* ${({ theme }) => theme.device.tablet} {
//     grid-template-columns: repeat(3, 1fr);
//     grid-gap: 10px;
//   } */
//   @media screen and (max-width: 1280px){
//     grid-template-columns: repeat(3, 1fr);
//     grid-gap: 10px;
//   }

//   @media screen and (max-width: 925px){
//     grid-template-columns: repeat(2, 1fr);
//     grid-gap: 10px;
//   }
//   ${({ theme }) => theme.device.mobile} {
//     grid-template-columns: repeat(1, 1fr);
//   }

// `;

// export default DefaultRoomList;


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

// const RoomBox = styled.div`
//   display: grid;
//   grid-gap: 2.5rem;
//   grid-template-columns: repeat(4, 1fr);
//   margin: 0 auto;
//  ${({ theme }) => theme.device.tablet} {
//     grid-template-columns: repeat(3, 1fr);
//     grid-gap: 1rem;
//   } 
//    @media screen and (max-width: 1280px){
//     grid-template-columns: repeat(3, 1fr);
//     grid-gap: 1rem;
//   }

//   @media screen and (max-width: 925px){
//     grid-template-columns: repeat(2, 1fr);
//     grid-gap: 1rem;
//   }
//   ${({ theme }) => theme.device.mobile} {
//     grid-template-columns: repeat(1, 1fr);
//   } 

// `;

const RoomBox = styled.div`
  display: grid;
  margin: 0 auto;
  padding: 0 25px;
  /* width: 80vw; */
  width: 129rem;
  grid-template-columns: repeat(auto-fill, minmax(274px, 1fr));
  grid-gap: 2.5rem;

  ${({ theme }) => theme.device.tablet} {
    padding: 0 45px;
  }

   ${({ theme }) => theme.device.mobile} {
     grid-template-columns: repeat(1, 1fr);
     padding: 0;
     grid-gap: 1rem;
   } 
 

`;

export default DefaultRoomList;
