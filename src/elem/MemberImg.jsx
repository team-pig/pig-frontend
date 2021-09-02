import React, { useState, useEffect } from "react";
import styled from "styled-components";
import flex from "../themes/flex";
import { Text } from "./index";

const MemberImg = ({ memberStatus }) => {
  const [showAllMember, setShowAllMember] = useState(false);

  useEffect(() => {
      // member 수가 3보다 클 때 잘라서 화면에 표기
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
                   {/* 멤버의 아바타 이미지 없으면 닉네임으로 표시 */}
                  {member.avatar === "" && (
                    <Nickname>{member.memberName[0].toLowerCase()}</Nickname>
                  )}
                </ProfileImg>
              );
            })
          : memberStatus.slice(0, 3).map((member, idx) => {
            // 모든 멤버 표시 x => 3명만 표시
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
                  {/* 멤버의 아바타 이미지 없으면 닉네임으로 표시 */}
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
  ${flex()}
  position: relative;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  box-sizing: content-box;
  background-size: cover;
  background-position: center center;
  ${(props) =>
    props.bgColor && `background-color: ${props.theme.colors[props.bgColor]};`}
  background-image: url(${(props) => props.src});
  border: 1px solid var(--white);
  border-radius: 50%;
  ${({ theme }) => theme.device.mobile} {
    width: 20px;
    height: 20px;
    font-size: 1rem;
  }
`;

const Nickname = styled.div`
  color: var(--white);
  font-size: 1.4rem;
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

const MemberCount = styled.div``;
export default MemberImg;
