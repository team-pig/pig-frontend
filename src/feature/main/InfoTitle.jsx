import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import Icon from "../../components/Icon";

import { head_3, sub_1 } from "../../themes/textStyle";
import { Text, IconBtn } from "../../elem";
import flex from "../../themes/flex";

const InfoTitle = ({
  editMode,
  setEditMode,
  editedInfo,
  handleChange,
  clickSave,
  detailpage,
}) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const isMobile = useSelector((state) => state.resize.isMobile);
  const my = useSelector((state) => state.user.user.userId);
  const room = useSelector((state) => state.room.roomInfos);
  const { roomName, master } = room;

  if (editMode) {
    return (
      <TitleBox>
        <TitleInput
          type="text"
          placeholder="제목을 입력하세요"
          value={editedInfo.roomName}
          onChange={(e) => handleChange("roomName", e.target.value)}
          maxLength="10"
        />
        {!isMobile && (
          <TextBtn onClick={clickSave}>
            <Text type="button" color="darkgrey">
              완료
            </Text>
          </TextBtn>
        )}
      </TitleBox>
    );
  }

  return (
    <TitleBox>
      <TitleText type="head_3" color="black">
        {roomName}
      </TitleText>
      {isMobile && !detailpage && (
        <button
          type="button"
          onClick={() => history.push(`${url}/main/information`)}
        >
          <MoreText type="body_4" color="grey">
            더보기 <Icon icon="arrow-right" size="14px" />
          </MoreText>
        </button>
      )}
      {!isMobile && my === master && (
        <IconBtn
          _onClick={() => {
            setEditMode((pre) => !pre);
          }}
        >
          <Icon icon="edit" color="#757575" size="24px" />
        </IconBtn>
      )}
    </TitleBox>
  );
};

const TitleBox = styled.div`
  ${flex("between")}
  width: 100%;
  height: 52px;
  margin-bottom: 20px;

  ${({ theme }) => theme.device.mobile} {
    height: 26px;
    margin-bottom: 8px;
  }
`;

const TitleText = styled(Text)`
  ${({ theme }) => theme.device.mobile} {
    ${sub_1}
    font-weight: 700;
  }
`;

const TitleInput = styled.input`
  ${head_3};
  width: 100%;
  height: 52px;
  color: var(--black);

  ${({ theme }) => theme.device.mobile} {
    ${sub_1}
    height: 26px;
    margin-top: 10px;
    font-weight: 700;
  }
`;

const TextBtn = styled.button`
  width: 78px;
  height: 42px;
`;

const MoreText = styled(Text)`
  ${flex("start", "center")}
  cursor: pointer;
`;

export default InfoTitle;
