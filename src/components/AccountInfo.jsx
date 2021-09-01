import React from "react";
import styled from "styled-components";

import { button } from "../themes/textStyle";

const AccountInfo = ({ text, btnText, _onClick }) => {
  return (
    <RegistInfo>
      {text}
      <MoveBtn onClick={_onClick}>{btnText}</MoveBtn>
    </RegistInfo>
  );
};

const RegistInfo = styled.div`
  ${button};
  margin: 10px 0;
  text-align: center;
`;

const MoveBtn = styled.strong`
  margin-left: 6px;
  color: var(--main);
  cursor: pointer;
`;

export default AccountInfo;
