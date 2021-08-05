import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Text } from "./index";

const MemberImg = ({ members, children, ...rest }) => {
  const [showAllMember, setShowAllMember] = useState(false);

  useEffect(() => {
    if (members.length > 4) {
      setShowAllMember(false);
    } else {
      setShowAllMember(true);
    }
  });
  return (
    <>
      {/* <ProfileImg src={memberImg} />
      <ProfileImg {...rest}>{children}</ProfileImg> */}

      <MemberImgBox>
        {/* members배열 나중에 membersImg로 바꿔주기 */}
        {showAllMember
          ? members.map((member, idx) => {
              return (
                <ProfileImg
                  style={{
                    position: "relative",
                    left: (members.length - 1 - idx) * 7,
                  }}
                  key={idx}
                  {...member}
                />
              );
            })
          : members.slice(0, 3).map((member, idx) => {
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
            <Text type="body_3">+{members.length - 3}</Text>
          </MemberCount>
        )}
      </MemberImgBox>
    </>
  );
};

const ProfileImg = styled.div`
  position: relative;
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
