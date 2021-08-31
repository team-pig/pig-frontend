import React from "react";
import styled from "styled-components";

//component
import RoomBlankImg from "../../assets/img/room-blank-img.jpg";

const RoomBlank = () => {
  return (
    <>
      <ImgBox className="room-list">
        <BlankImg src={RoomBlankImg} />
      </ImgBox>
    </>
  );
};

const ImgBox = styled.div`
  display: flex;
  max-width: 550px;
  min-width: 250px;
  margin: 0 auto;
  padding-top: 50px;
`;

const BlankImg = styled.div`
  width: 100%;
  height: 0;
  padding-top: calc(100% * (514 / 684));
  background-image: ${(props) => `url(${props.src})`};
  background-size: cover;
`;

export default RoomBlank;
