import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";

import Icon from "../../components/Icon";
import { Button } from "../../elem/index";
import { head_1 } from "../../themes/textStyle";

import { __searchRoom } from "../../redux/modules/room";

const SearchBar = ({ joinModal, addModal }) => {
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState("");
  const { searchedRoom } = useSelector((state) => state.room);

  const changeSearchContent = (keyword) => {
    dispatch(__searchRoom(keyword));
    setSearchContent(keyword);
  };

  const delay = _.debounce(changeSearchContent, 500);

  const _onKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(__searchRoom(searchContent));
    }
  };

  return (
    <>
      <Wrapper>
        <WrapperItem>
          <InputBox>
            <SearchIconBox>
              <Icon icon="search" size="24px" />
            </SearchIconBox>

            <SearchInput
              onKeyUp={(e) => {
                delay(e.target.value);
              }}
              onKeyPress={_onKeyPress}
              type="text"
              name="keyword"
              placeholder="  방 이름을 검색하세요"
            />
          </InputBox>
          <BtnContainer>
            <Button size="150" onClick={joinModal}>
              <Btn>
                <BtnContent>
                  <Icon icon="enter" size="24px" /> <Span>방 입장</Span>
                </BtnContent>
              </Btn>
            </Button>
            <BtnBox>
              <Button shape="green-outline" size="150" onClick={addModal}>
                <Btn>
                  <BtnContent>
                    <Icon icon="plus-lg" size="24px" />
                    <Span>방 만들기</Span>
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
  ${head_1}
  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 150px;
`;

const WrapperItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  padding: 0 80px;
  margin: 15px auto 0 auto;
  ${({ theme }) => theme.device.mobile} {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const InputBox = styled.div`
  position: relative;
  flex: 1;
  height: 50px;
  margin: auto 0;
  ${({ theme }) => theme.device.mobile} {
    order: 0 !important;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
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
  /* margin-left: -1px; */
  margin-left: 20px;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  width: 330px;
  height: 50px;
  margin-left: 40px;

  ${({ theme }) => theme.device.mobile} {
    order: 1 !important;
    width: 100%;
    margin: 10px 0 0 0;
  }
`;

export default SearchBar;
