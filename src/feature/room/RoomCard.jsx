import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//components
import ModifyRoomModal from "./ModifyRoomModal";
import DropDown from "./DropDown";
//elements
import { mobileHidden, mobileOnly } from "../../themes/responsive";
import { Text } from "../../elem/index";
import { body_3 } from "../../themes/textStyle";
import MemberImg from "../../elem/MemberImg";
import BookMark from "./BookMark";
import RoomTags from "./RoomTags";
import LinkIcon from "./LinkIcon";
import More from "./More";

//redux
import {
  __deleteRoom,
  __exitRoom,
  __toggleBookmark,
} from "../../redux/modules/room";

//roomList map의 list에서 받아오는 값
const RoomCard = ({
  roomId,
  roomImage,
  roomName,
  master,
  subtitle,
  members,
  memberStatus,
  createdAt,
  tag,
  isCheck,
  inviteCode,
}) => {
  const dispatch = useDispatch();
  const [showModModal, setShowModModal] = useState(false);
  const [isDisplayDrop, setIsDisplayDrop] = useState(false);
  const [isMarked, setIsMarked] = useState(false);
  const userId = useSelector((state) => state.room.userId);
  const history = useHistory();
  const [convertedMember, setConvertedMember] = useState([]);

  useEffect(() => {
    const coverted = memberStatus.map((member) => {
      return { ...member, memberName: member.nickname };
    });

    setConvertedMember(coverted);
  }, [memberStatus]);

  useEffect(() => {
    setIsCheck();
    return () => setIsCheck(false);
  }, [isCheck]);

  const setIsCheck = () => {
    if (isCheck) {
      setIsMarked(true);
    } else {
      setIsMarked(false);
    }
  };

  const clickBookmark = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(__toggleBookmark(roomId, isMarked));
    if (isMarked) {
      setIsMarked(false);
    } else {
      setIsMarked(true);
    }
  };

  const exitRoom = (e) => {
    e.stopPropagation();
    setIsDisplayDrop(false);

    if (userId !== master) {
      const exitCheck = window.confirm("👋 정말 이 방을 나가시겠어요?");
      exitCheck && dispatch(__exitRoom(roomId));
    }
  };

  const deleteRoom = (e) => {
    e.stopPropagation();
    setIsDisplayDrop(false);

    if (userId === master) {
      const deleteCheck = window.confirm("🗑 정말 이 방을 삭제할까요?");
      deleteCheck && dispatch(__deleteRoom(roomId));
    }
  };

  const openModModal = (e) => {
    e.stopPropagation();
    setIsDisplayDrop(false);
    if (userId === master) {
      setShowModModal(true);
    }
  };

  const closeModModal = () => {
    setShowModModal(false);
  };

  const dropDownModal = (e) => {
    e.stopPropagation();
    setIsDisplayDrop((pre) => !pre);
  };

  const createDate = createdAt.slice(0, 10).split("-");

  return (
    <>
      <ModifyRoomModal
        roomId={roomId}
        showModModal={showModModal}
        closeModModal={closeModModal}
      />

      <Container
        onClick={() => {
          history.push(`/workspace/${roomId}`);
        }}
      >
        <DropDown
          roomId={roomId}
          userId={userId}
          master={master}
          isDisplayDrop={isDisplayDrop}
          setIsDisplayDrop={setIsDisplayDrop}
          exitRoom={exitRoom}
          deleteRoom={deleteRoom}
          openModModal={openModModal}
        ></DropDown>
        <IconMobileBox>
          <LinkIcon inviteCode={inviteCode} />
          <BookMark isMarked={isMarked} clickBookmark={clickBookmark} />
          <More dropDownModal={dropDownModal} />
        </IconMobileBox>
        <IconBox>
          <LinkIcon inviteCode={inviteCode} />
          <BookMark isMarked={isMarked} clickBookmark={clickBookmark} />
        </IconBox>
        <CardSection>
          <CardProfile>
            <RoundImg url={roomImage} />
            <TextBox>
              <RoomNameBox>
                <Text type="sub_1">{roomName}</Text>
              </RoomNameBox>
              <TagBox>
                <RoomTags tag={tag} />
              </TagBox>
            </TextBox>
          </CardProfile>
          <SubTitleBox>{subtitle}</SubTitleBox>
        </CardSection>
        <CardFooter>
          <FooterItem>
            <Text type="body_4" color="grey">
              {createDate[0] + ". " + createDate[1] + ". " + createDate[2]}
            </Text>
          </FooterItem>
          <FooterItem>
            <MemberImg members={members} memberStatus={convertedMember} />
            <More dropDownModal={dropDownModal} />
          </FooterItem>
        </CardFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 302px;
  height: 274px;
  border: 1.2px solid var(--grey);
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 960px) {
    margin-bottom: 15px;
  }
  ${({ theme }) => theme.device.mobile} {
    width: 320px;
    height: 154px;
  }
`;

const CardSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 302px;
  height: 202px;
  padding: 20px 20px 15px 20px;
`;

const IconMobileBox = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const IconBox = styled.div`
  ${mobileHidden};
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
`;

const CardProfile = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RoundImg = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 15px;
  border-radius: 50%;
  background-image: url("${(props) => props.url}");
  background-size: cover;
  background-position: center center;
  ${({ theme }) => theme.device.mobile} {
    width: 60px;
    height: 60px;
  }
`;

const TextBox = styled.div`
  position: absolute;
  top: 40px;
  left: 110px;
  overflow: hidden;
  width: 138px;
  height: 100px;
  ${({ theme }) => theme.device.mobile} {
    left: 70px;
    width: 206px;
  }
`;
const RoomNameBox = styled.div`
  display: -webkit-box;
  overflow: hidden;
  width: 138px;
  max-height: 52px;
  line-height: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  ${({ theme }) => theme.device.mobile} {
    width: 206px;
    -webkit-line-clamp: 1;
  }
`;
const TagBox = styled.div`
  ${mobileHidden};
  display: -webkit-box;
  overflow: hidden;
  width: 138px;
  max-height: 44px;
  margin-top: 3px;
  margin-bottom: 20px;
  color: var(--darkgrey);
  line-height: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const SubTitleBox = styled.div`
  ${body_3};
  overflow: hidden;
  width: 262px;
  max-height: 44px;
  margin-top: auto;
  color: var(--darkgrey);
  line-height: 140%;
  text-overflow: ellipsis;

  @media screen and (min-width: 768px) {
    white-space: nowrap;
  }

  ${({ theme }) => theme.device.mobile} {
    display: -webkit-box;
    margin-top: 15px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const CardFooter = styled.div`
  ${mobileHidden};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding: 20px;
  color: var(--grey);
  border-top: 1px solid var(--line);
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
`;

export default RoomCard;
