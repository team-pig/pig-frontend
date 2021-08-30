import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text } from "./index";

const MemberImg = ({ memberStatus }) => {
  const [showAllMember, setShowAllMember] = useState(false);

  useEffect(() => {
    if (memberStatus.length > 3) {
      setShowAllMember(false);
    } else {
      setShowAllMember(true);
    }
  }, [memberStatus.length]);

  return (
    <>
      <MemberImgBox>
        {memberStatus.length !== 0 && showAllMember
          ? memberStatus.map((member, idx) => {
              return (
                <ProfileImg
                  style={{
                    left: (memberStatus.length - 1 - idx) * 6,
                  }}
                  key={member.userId}
                  src={member.avatar}
                  bgColor={member.avatar === "" ? member.color : ""}
                  border={memberStatus.length > 1 ? "--white" : ""}
                >
                  {member.avatar === "" && (
                    <Nickname>{member.memberName[0].toLowerCase()}</Nickname>
                  )}
                </ProfileImg>
              );
            })
          : memberStatus.slice(0, 3).map((member, idx) => {
              return (
                <ProfileImg
                  style={{
                    left: -idx * 6,
                  }}
                  idx={idx}
                  key={member.userId}
                  src={member.avatar}
                  bgColor={member.avatar === "" ? member.color : ""}
                  border={"--white"}
                >
                  {member.avatar === "" && (
                    <Nickname>{member.memberName[0].toLowerCase()}</Nickname>
                  )}
                </ProfileImg>
              );
            })}
        {memberStatus.length !== 0 && !showAllMember && (
          <MemberCount>
            <Text type="body_3" color="grey">
              +{memberStatus.length - 3}
            </Text>
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
  box-sizing: content-box;
  background-size: cover;
  background-position: center center;
  ${(props) =>
    props.bgColor && `background-color: ${props.theme.colors[props.bgColor]};`}
  background-image: url("${(props) => props.src}");
  border: 1px solid var(${(props) => props.border});
  border-radius: 50%;
`;

const Nickname = styled.span`
  margin: 0 auto;
  color: var(--white);
  font-size: 17px;
  font-weight: 800;
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
