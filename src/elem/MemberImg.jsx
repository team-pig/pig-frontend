import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Text } from "./index";

const MemberImg = ({ memberStatus, members, children, ...rest }) => {
  const [showAllMember, setShowAllMember] = useState(false);

  useEffect(() => {
    console.log(memberStatus[0].nickname.charAt(0).toUpperCase());
    if (members.length > 4) {
      setShowAllMember(false);
    } else {
      setShowAllMember(true);
    }
  }, []);
  return (
    <>
      {/* <ProfileImg src={memberImg} />
      <ProfileImg {...rest}>{children}</ProfileImg> */}

      <MemberImgBox>
        {/* members배열 나중에 membersImg로 바꿔주기 */}
        {showAllMember
          ? memberStatus.map((member, idx) => {
              return (
                <ProfileImg
                  style={{
                    position: "relative",
                    left: (members.length - 1 - idx) * 7,
                  }}
                  key={idx}
                  {...member}
                ><Nickname>{member.nickname.charAt(0).toUpperCase()}</Nickname></ProfileImg>
              );
            })
          : memberStatus.slice(0, 3).map((member, idx) => {
              return (
                <ProfileImg
                  style={{
                    position: "relative",
                    left: -idx * 7,
                  }}
                  key={idx}
                  {...member}
                  />
              );
            })}
        {!showAllMember && (
          <MemberCount>
            <Text type="body_3">+{memberStatus.length - 3}</Text>
          </MemberCount>
        )}
      </MemberImgBox>
    </>
  );
};

const ProfileImg = styled.div`
  position: relative;
  display: flex;
  flex-shrink: 0;

  right: 20px;
  width: 30px;
  height: 30px;
  margin: 0;

  /* background-image: url("${(props) => props.src}"); */
  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
`;

const Nickname = styled.span`
margin: 0 auto;
color: var(--black);
font-size: 18px;
font-weight: 700;
line-height: 30px;
vertical-align: middle;
`;

const MemberImgBox = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 105px;
  height: 30px;
  margin-right: 5px;
`;

const MemberCount = styled.div`
  position: relative;
  left: -7px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 30px;
  height: 30px;
`;
export default MemberImg;
