import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Icon from "../../components/Icon";
import IconBtn from "../../elem/IconBtn";

import { pop } from "../../redux/modules/alert";

const LinkIcon = ({ inviteCode }) => {
  const dispatch = useDispatch();
  const copyCodeRef = useRef();

  const copyCode = (e) => {
    e.stopPropagation();

    if (!document.queryCommandSupported("copy")) {
      return alert("복사기능 지원되지 않는 브라우저입니다.");
    }
    copyCodeRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    dispatch(pop({ msg: "✔ 초대코드 복사완료", value: true, option: true }));
   
  };
  return (
    <>
      <Box>
        <IconBtn padding="0px" _onClick={copyCode}>
          <Icon icon="link" size="24px" />
        </IconBtn>
        <TextArea ref={copyCodeRef} value={inviteCode} readOnly />
      </Box>
    </>
  );
};

const TextArea = styled.textarea``;

const Box = styled.div`
  position: relative;
  z-index: 28;
  overflow: hidden;
  width: 24px;
  height: 24px;
`;

export default LinkIcon;
