import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//components
import ModifyRoomModal from "../components/ModifyRoomModal";
import Icon from "./Icon";
import { ReactComponent as Star } from "../assets/icons/star.svg";
//elements
import { Button } from "../../elem";

//redux
import { __deleteRoom, __exitRoom } from "../../redux/modules/room";

//map의 list에서 받아오는 값
const RoomCard = ({
  _id,
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
        roomId={_id}
        showModModal={showModModal}
        closeModModal={closeModModal}
      />

      <Container
        onClick={() => {
          history.push(`/workspace/${_id}`);
        }}
      >
        <StarIcon>
          <Star />
        </StarIcon>
        <CardSection>
          <div>
            <CardProfile>
              <RoundImg src={roomImage} />
              <div>
                <div>{roomName}</div>
                <div>{tag}</div>
              </div>
            </CardProfile>
          </div>
          <div>{subtitle}</div>
        </CardSection>
        <CardFooter>
          <FooterItem>
            {createDate[0] + ". " + createDate[1] + ". " + createDate[2]}
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
              console.log(_id);
              dispatch(__deleteRoom(_id));
            }}
          >
            삭제하기
          </Button>
          <Button
            _onClick={(e) => {
              dispatch(__exitRoom(_id));
            }}
          >
            나가기
          </Button>
        </div> */}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  width: 302px;
  height: 274px;

  border: 1.2px solid var(--grey);
  border-radius: 5px;
`;

const CardSection = styled.div`
  position: relative;
  padding: 20px;
`;

const StarIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CardProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const RoundImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 15px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;
  margin-top: auto;
  border-top: 1px solid var(--line);
`;

const FooterItem = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default RoomCard;
