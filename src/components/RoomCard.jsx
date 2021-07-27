import React from "react";
import styled from "styled-components";

const RoomCard = ({ roomImage, roomName, subtitle, master, tag }) => {
  return (
    <>
      <div>
        <img src={roomImage} />
        <div>
          <div>{roomName}</div>
          <div>{subtitle}</div>
          <div>{master}</div>
          <div>{tag}</div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
