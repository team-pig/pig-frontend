import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

//components
import Template from "../components/Template";
import AddRoomModal from "../feature/room/AddRoomModal";
import JoinRoomModal from "../feature/room/JoinRoomModal";
import RoomCard from "../feature/room/RoomCard";
import InfinityScroll from "../components/InfinityScroll";
import Icon from "../components/Icon";

//elements
import { Button, Input } from "../elem/index";

//redux
import {
  __getRoomList,
  __searchRoom,
  __getMarkedList,
  __getUnMarkedList,
} from "../redux/modules/room";

const RoomList = ({ history }) => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.room) || [];
  const isLoading = useSelector((state) => state.room.isLoading);
  const paging = useSelector((state) => state.room.paging);
  const searchedRoom = useSelector((state) => state.room.searchedRoom);
  const userId = useSelector((state) => state.room.userId);
  const [showModal, setShowModal] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [searchContent, setSearchContent] = useState(null);
  const [timer, setTimer] = useState(0); //디바운싱 타이머

  useEffect(() => {
    // if (roomList.length === 0) {
    //   dispatch(__getRoomList());
    //   dispatch(__getMarkedList());
    //   dispatch(__getUnmarkedList());
    // }
    dispatch(__getRoomList());
    // dispatch(__getMarkedList());
    // dispatch(__getUnMarkedList());
  }, []);

  // const changeSearchContent = 
  // async (e) => {
  //   // const keyword = e.target.value;
  //   // await setSearchContent(keyword);
  //   // await console.log(keyword);
  //   // const keyword = e.target.value;
  //   // await setSearchContent(keyword);
  //   // console.log(keyword);

  //   // await debounceDelay(e.target);

  //   const keyword = e.target.value;
  //   setSearchContent(keyword);
  //   console.log(keyword);
  //   delay(searchContent);
  //   // dispatch(__searchRoom(searchContent));
  //   console.log("된건가");
  // };

  // const debounceDelay = _.debounce((target) => {
  //   if(timer){
  //     console.log("clear timer");
  //     clearTimeout(timer);
  //   }
  //   const newTimer = setTimeout(async() => {
  //     try{
  //       await setSearchContent(target.value);
  //     }catch(e){
  //       console.log(e);
  //     }
  //   })
    
  // }, 500);

const changeSearchContent = (keyword) => {
  dispatch(__searchRoom(keyword));
  setSearchContent(keyword);
}

const delay = _.debounce(changeSearchContent, 500);

  const _onKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(__searchRoom(searchContent));
    }
  };

  // const delayedCall = useRef(_.debounce((q) => dispatch(__searchRoom(q), 500))).current

  // const searchKeyword = _.debounce(setSearchContent, 1200);
  // const searchKeyword = _.debounce(changeSearchContent, 1200);

  const openJoinModal = () => {
    setShowModal(true);
    setIsJoin(true);
  };

  const openModal = () => {
    setShowModal(true);
    setIsJoin(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openDrop = () => {
    setIsShow(true);
  };

  const closeDrop = () => {
    setIsShow(false);
  };

  //enter
  const searchItem = searchedRoom
    .filter((item) => {
      if (item.roomName.includes(searchContent)) {
        console.log("서버에서 받아온 배열");
        return item;
      }
    })
    .map((room, idx) => {
      return (
        <RoomCard
          userId={userId}
          openDrop={openDrop}
          closeDrop={closeDrop}
          isShow={isShow}
          index={idx}
          key={idx}
          {...room}
          history={history}
        />
      );
    });

  // const notSearchItem = roomList
  const notSearchItem = roomList
    .filter((item) => {
      if (searchContent === null || searchContent === "") {
        console.log("roomlist");
        return item;
      }
      // else if(item.roomName.toLowerCase().includes(searchContent.toLowerCase())){
      //   return item}
    })
    .map((room, idx) => {
      // const markIdx = roomList.findIndex((item) =>
      // item.bookmarkedMembers.includes(userId));

      const isCheck = room.bookmarkedMembers.includes(userId);
      return (
        <RoomCard
          isMarked={isCheck ? true : false}
          userId={userId}
          openDrop={openDrop}
          closeDrop={closeDrop}
          isShow={isShow}
          index={idx}
          key={idx}
          {...room}
          history={history}
        />
      );
    });

  return (
    <Template>
      {!isJoin && (
        <AddRoomModal showModal={showModal} closeModal={closeModal} />
      )}
      {isJoin && (
        <JoinRoomModal showModal={showModal} closeModal={closeModal} />
      )}
      <InfinityScroll
        callNext={() => {
          console.log("next");
          dispatch(__getRoomList(paging.next));
        }}
        isNext={paging.next ? true : false}
        isLoading={isLoading}
      >
        <Wrapper>
          <WrapperItem>
            <InputBox>
              <SearchIconBox>
                <Icon icon="search" size="24px" />
              </SearchIconBox>
              {/* <Input
                type="text"
                placeholder="방 이름을 검색하세요"
                // _onChange={searchKeyword}
              /> */}
              <SearchInput
                // ref={inputRef}
                // onKeyUp={changeSearchContent}
                onKeyUp={(e) => {delay(e.target.value)}}
                // onChange={changeSearchContent}
                onKeyPress={_onKeyPress}
                type="text"
                name="keyword"
                placeholder="  방 이름을 검색하세요"
              />
              {/* <IconBox>
                  <Icon icon="search" size="24px" />
                </IconBox>
              </Input> */}
            </InputBox>
            <BtnContainer>
              <Button size="150" onClick={openJoinModal}>
                <Btn>
                  <BtnContent>
                    <Icon icon="enter" size="24px" /> <Span>방 입장</Span>
                  </BtnContent>
                </Btn>
              </Button>
              <BtnBox>
                <Button shape="green-outline" size="150" onClick={openModal}>
                  <Btn>
                    <BtnContent>
                      <Icon icon="plus-lg" size="24px" /> <Span>방 만들기</Span>
                    </BtnContent>
                  </Btn>
                </Button>
              </BtnBox>
            </BtnContainer>
          </WrapperItem>
        </Wrapper>

        <RoomContainer onClick={closeDrop}>
          <RoomBox>
            {searchContent === null || "" ? notSearchItem : searchItem}

            {/* {searchItem} */}
          </RoomBox>
        </RoomContainer>
      </InfinityScroll>
    </Template>
  );
};

const Wrapper = styled.div`
  display: flex;
  /* justify-content: space-between;
  align-items: center; */
  height: 155px;
`;

const WrapperItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1286px;
  margin: 5px auto 0 auto;
`;

const InputBox = styled.div`
  position: relative;
  max-width: 918px;
  width: 100%;
  height: 46px;
  margin: auto 0;
  /* padding: 0 20px 0 20px; */
`;

const SearchInput = styled.input`
width: 100%;
  height: 46px;
  padding-left: 45px;
  border: 1px solid var(--line);
`;

const SearchIconBox = styled.div`
  position: absolute;
  z-index: 28;
  top: 25%;
  left: 18px;
  color: var(--darkgrey);
`;

const Btn = styled.div`
  display: flex;
  align-items: center;
`;

const Span = styled.span`
  margin: 0 0 0 7px;
`;

const BtnContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const BtnBox = styled.div`
  position: relative;
  height: 50px;
  margin-left: -1px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 330px;
  height: 50px;
`;

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

export default RoomList;
