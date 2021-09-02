import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Icon from "../../components/Icon";
import IconBtn from "../../elem/IconBtn";

import { pop } from "../../redux/modules/alert";

// 초대코드 복사 링크 아이콘
const LinkIcon = ({ inviteCode }) => {
  const dispatch = useDispatch();
  // 초대코드가 들어가 있는 TextArea 지정, Box를 넘어가는 범위에 있어 hidden 처리
  const copyCodeRef = useRef();

  // 초대코드 복사 기능
  const copyCode = (e) => {
    e.stopPropagation();

    if (!document.queryCommandSupported("copy")) {
      return alert("복사기능 지원되지 않는 브라우저입니다.");
    }
    // TextArea 선택 후 복사
    copyCodeRef.current.select(); 
    document.execCommand("copy");
    e.target.focus();
    dispatch(pop({ msg: "✔ 초대코드 복사완료", value: true, option: true }));
  // 초대코드 복사완료 Alert 모달 띄움
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
