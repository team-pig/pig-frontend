import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { debounce } from "lodash";

import { mobileHidden, mobileOnly } from "../../themes/responsive";
import Icon from "../../components/Icon";
import { Button } from "../../elem/index";
import { head_2 } from "../../themes/textStyle";
import RoomInput from "./RoomInput";

import { __searchRoom } from "../../redux/modules/room";

const SearchBar = ({ joinModal, addModal }) => {
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState("");
  const [isShowSearch, setIsShowSearch] = useState(false);
  const { searchedRoom } = useSelector((state) => state.room);
  const searchRef = useRef();

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


  const openJoinModal = (e) => {
    if (searchContent.length > 0) {
      dispatch(__searchRoom(""));
    }
    joinModal();
  };
  const openAddModal = (e) => {
    if (searchContent.length > 0) {
      dispatch(__searchRoom(""));
    }
    addModal();
  };

  const changeSearchContent = (keyword) => {
    dispatch(__searchRoom(keyword));
    setSearchContent(keyword);
  };

  const delay = debounce(changeSearchContent, 500);

  const _onKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(__searchRoom(searchContent));
    }
  };

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
              <Btn>
                <BtnContent>
                  <Icon icon="plus-lg" size="24px" />
                  <Span>방 만들기</Span>
                </BtnContent>
              </Btn>
            </Button>
            <BtnBox>
              <Button shape="green-outline" size="150" onClick={openJoinModal}>
                <Btn>
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
`;

const IconSet = styled.div`
  display: flex;
  justify-content: flex-end;
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
  padding: 0 80px;
  margin: 15px auto 0 auto;
  @media (max-width: 1440px) {
    justify-content: center;
    padding: 0 10px;
  }
`;

const InputBox = styled.div`
  position: relative;
  flex: 1;
  height: 50px;
  margin: 0 auto;
  ${({ theme }) => theme.device.mobile} {
    width: 320px;
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
  /* margin-left: -1px; */
  margin-left: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  width: 330px;
  height: 50px;
  margin-left: 40px;
  /* ${({ theme }) => theme.device.mobile} {
  } */
`;

export default SearchBar;
