import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import Icon from "../../components/Icon";
import IconBtn from "../../elem/IconBtn";
import { Text } from "../../elem";
import flex from "../../themes/flex";

const InfoHeader = ({ editMode, setEditMode, clickSave, url }) => {
  const history = useHistory();
  const { roomId } = useParams();

  return (
    <Btns>
      <IconBtn _onClick={() => history.push(`/workspace/${roomId}`)}>
        <Icon icon="arrow-left" size="24px" color="var(--darkgrey)" />
      </IconBtn>
      {!editMode && (
        <IconBtn
          _onClick={() => {
            setEditMode((pre) => !pre);
          }}
        >
          <Icon icon="edit" size="24px" color="var(--darkgrey)" />
        </IconBtn>
      )}
      {editMode && (
        <TextBtn onClick={clickSave}>
          <Text type="button" color="darkgrey">
            완료
          </Text>
        </TextBtn>
      )}
    </Btns>
  );
};

const Btns = styled.div`
  ${flex("between", "center")}
  width: 100%;
  height: 54px;
  padding: 0 10px;
`;

const TextBtn = styled.button`
  padding: 10px;
`;

export default InfoHeader;
