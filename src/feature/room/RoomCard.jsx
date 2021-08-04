import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//components
import ModifyRoomModal from "./ModifyRoomModal";
import Icon from "../../components/Icon";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
//elements
import { Button, Text } from "../../elem/index";

//redux
import { __deleteRoom, __exitRoom } from "../../redux/modules/room";

//map의 list에서 받아오는 값
const RoomCard = ({
  roomId,
  roomImage,
  roomName,
  subtitle,
  members,
  createdAt,
  tag,
  history,
}) => {
  const dispatch = useDispatch();
  const [showModModal, setShowModModal] = useState(false);

  const openModModal = () => {
    setShowModModal(true);
  };

  const closeModModal = () => {
    setShowModModal(false);
  };

  let createDate = createdAt.slice(0, 10).split("-");

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
        <StarIcon>
          <Star />
        </StarIcon>
        <CardSection>
          <CardProfile>
            <RoundImg src={roomImage} />
            <TextBox>
              <Text type="sub_1">{roomName}</Text>
              <TagBox>
                <Text type="body_2">{tag}</Text>
              </TagBox>
            </TextBox>
          </CardProfile>
          <SubTitleBox>
            <Text type="body_3">{subtitle}</Text>
          </SubTitleBox>
        </CardSection>
        <CardFooter>
          <FooterItem>
            <Text type="body_4">
              {createDate[0] + ". " + createDate[1] + ". " + createDate[2]}
            </Text>
          </FooterItem>
          <FooterItem>
            <div>멤버사진</div>
            <Icon icon="more" size="24px" />
          </FooterItem>
        </CardFooter>
      </Container>
      {/* <div>
          <Button _onClick={openModModal}>수정하기</Button>
          <Button
            _onClick={(e) => {
              console.log(roomId);
              dispatch(__deleteRoom(roomId));
            }}
          >
            삭제하기
          </Button>
          <Button
            _onClick={(e) => {
              dispatch(__exitRoom(roomId));
            }}
          >
            나가기
          </Button>
        </div> */}
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
`;

const CardSection = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  width: 302px;
  height: 202px;

  padding: 20px 20px 15px 20px;
`;

const StarIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CardProfile = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RoundImg = styled.img`
  width: 100px;
  height: 100px;

  margin-right: 15px;

  border-radius: 50%;
`;

const TextBox = styled.div`
  width: 148px;
  height: 74px;
`;

const TagBox = styled.div`
  margin-top: 10px;
  margin-bottom: 18px;

  color: var(--darkgrey);
`;

const SubTitleBox = styled.div`
  display: block;

  overflow: hidden;

  width: 262px;
  margin-top: auto;

  border: 1px solid black;
  color: var(--darkgrey);

  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: auto;
  padding: 20px;

  border-top: 1px solid var(--line);
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: auto;
`;

export default RoomCard;
