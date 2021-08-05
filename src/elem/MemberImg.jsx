import React from "react";
import styled from "styled-components";

const MemberImg = ({ children, ...rest }) => {
  return (
    <>
      {/* <ProfileImg src={memberImg} /> */}
      <ProfileImg {...rest}>{children}</ProfileImg>
    </>
  );
};

// const ProfileImg = styled.img`
//   width: 30px;
//   height: 30px;

//   border: 1px solid black;
//   border-radius: 50%;
// `;

const ProfileImg = styled.div`
  position: relative;
  right: 20px;
  width: 30px;
  height: 30px;

  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
`;

export default MemberImg;
