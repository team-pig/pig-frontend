import React from "react";
import styled from "styled-components";

import Icon from "../../components/Icon";

import IconBtn from "../../elem/IconBtn";

const LinkIcon = ({inviteCode}) => {
  const copyCodeRef = React.useRef();

  const copyCode = (e) => {
    e.stopPropagation();

    if(!document.queryCommandSupported("copy")){
      return alert("복사기능 지원되지 않는 브라우저입니다.");
    }
    copyCodeRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    window.alert("✔초대코드 복사완료");
    console.log("복사완료");
  }
  return(
    <>
    <Box>
    <IconBtn padding="0px" _onClick={copyCode}>
      <Icon icon="link" size="24px"/>
    </IconBtn>
    <TextArea
      ref={copyCodeRef}
      value={inviteCode}
      readOnly
    />
    </Box>
    </>
  )
};

const TextArea = styled.textarea`
  
`;

const Box = styled.div`
position: relative;
z-index: 28;
overflow: hidden;
width: 24px;
height: 24px;
`;

export default LinkIcon;