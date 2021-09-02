import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { debounce } from "lodash";

import { mobileHidden, mobileOnly } from "../../themes/responsive";
import Icon from "../../components/Icon";
import { Button } from "../../elem/index";
import { head_2 } from "../../themes/textStyle";
import RoomInput from "./RoomInput";

import { __searchRoom, __getInviteCodeRoom } from "../../redux/modules/room";

// 검색창
const SearchBar = ({ joinModal, addModal }) => {
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState("");
  const [isShowSearch, setIsShowSearch] = useState(false);
  const { searchedRoom } = useSelector((state) => state.room);
  const searchRef = useRef();

  // 모바일에서 검색창 바깥 클릭 시 검색창 안보이도록 함
  const handleClickOutside = (e) => {
    e.stopPropagation();
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  // 방 입장하기 버튼 클릭 시 JoinModal 열기
  const openJoinModal = (e) => {
    // 검색 키워드 있는 상태에서 JoinModal 열면, 
    // 검색 화면 사라지도록 함
    if (searchContent.length > 0) {
      dispatch(__searchRoom(""));
    }
    // 방 정보 초기화하고 모달 열기
    dispatch(__getInviteCodeRoom(""));
    joinModal();
  };

  // 방 만들기 버튼 클릭 시 AddModal 열기
  const openAddModal = (e) => {
    if (searchContent.length > 0) {
      dispatch(__searchRoom(""));
    }
    addModal();
  };

  // 검색키워드 저장
  const changeSearchContent = (keyword) => {
    dispatch(__searchRoom(keyword));
    setSearchContent(keyword);
  };

  // onKeyUp과 debounce를 사용하여 서버 요청을 줄임
  const delay = debounce(changeSearchContent, 500);

  // onKeyPress 사용하여 enter 사용 시 검색
  const _onKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(__searchRoom(searchContent));
    }
  };

  // 모바일 화면에서 검색창 display 기능
  const openMobileSearch = () => {
    setIsShowSearch((pre) => !pre);
  };

  return (
    <>
      <Wrapper>
        <WrapperMobileItem>
          {isShowSearch && (
            <InputBox ref={searchRef}>
              <SearchIconBox onClick={openMobileSearch}>
                <Icon icon="search" size="24px" />
              </SearchIconBox>

              <RoomInput
                _onKeyUp={(e) => {
                  delay(e.target.value);
                }}
                _onKeyPress={_onKeyPress}
                type="text"
                name="keyword"
                placeholder="내가 참여한 방 이름을 검색하세요"
                height="50px"
                padding="0 0 0 50px"
                borderRadius="5px"
              />
            </InputBox>
          )}
          {!isShowSearch && (
            <IconSet>
              <IconBox>
                <Icon icon="search" size="24px" onClick={openMobileSearch} />
              </IconBox>
              <IconBox>
                <Icon icon="enter" size="24px" onClick={joinModal} />
              </IconBox>
              <IconBox>
                <Icon icon="plus-lg" size="24px" onClick={addModal} />
              </IconBox>
            </IconSet>
          )}
        </WrapperMobileItem>
        <WrapperItem>
          <InputBox>
            <SearchIconBox>
              <Icon icon="search" size="24px" />
            </SearchIconBox>

            <RoomInput
              _onKeyUp={(e) => {
                delay(e.target.value);
              }}
              _onKeyPress={_onKeyPress}
              type="text"
              name="keyword"
              placeholder="내가 참여한 방 이름을 검색하세요"
              height="50px"
              padding="0 0 0 50px"
            />
          </InputBox>
          <BtnContainer>
            <Button size="150" onClick={openAddModal}>
              <Btn className="make-room">
                <BtnContent>
                  <Icon icon="plus-lg" size="24px" />
                  <Span>방 만들기</Span>
                </BtnContent>
              </Btn>
            </Button>
            <BtnBox>
              <Button shape="green-outline" size="150" onClick={openJoinModal}>
                <Btn className="enter-room">
                  <BtnContent>
                    <Icon icon="enter" size="24px" /> <Span>방 입장</Span>
                  </BtnContent>
                </Btn>
              </Button>
            </BtnBox>
          </BtnContainer>
        </WrapperItem>
      </Wrapper>
      {searchContent && searchedRoom && searchedRoom.length === 0 && (
        <TextBox>
          <Text>찾으시는 방이 없네요</Text>
        </TextBox>
      )}
    </>
  );
};

const TextBox = styled.div`
  display: flex;
  align-items: center;
  height: 500px;
`;

const Text = styled.div`
  ${head_2}
  margin: 0 auto;
  color: var(--grey);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 150px;
  ${({ theme }) => theme.device.mobile} {
    height: 50px;
  }
`;

const WrapperMobileItem = styled.div`
  ${mobileOnly};
  width: 100%;
  margin-bottom: 25px;
`;

const IconSet = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 300px;
`;

const IconBox = styled.div`
  ${mobileOnly}
  width : 24px;
  height: 24px;
  margin-right: 24px;
  color: var(--main);
  cursor: pointer;
`;

const WrapperItem = styled.div`
  ${mobileHidden};
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  padding: 0 70px;
  margin: 15px auto 0 auto;
`;

const InputBox = styled.div`
  position: relative;
  flex: 1;
  height: 50px;
  margin: 0 auto;
  ${({ theme }) => theme.device.mobile} {
    width: 90%;
  }
`;

const SearchIconBox = styled.div`
  position: absolute;
  z-index: 28;
  top: 25%;
  left: 18px;
  color: var(--darkgrey);
  ${({ theme }) => theme.device.mobile} {
    cursor: pointer;
  }
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
  margin-left: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  width: 330px;
  height: 50px;
  margin-left: 40px;
`;

export default SearchBar;
