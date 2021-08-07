import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Input, Text } from "../../elem";
import { __editCardInfos, __loadCardById } from "../../redux/modules/board";

const ModalForms = ({ cardId }) => {
  const [cardInfos, setCardInfos] = useState({});
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const loadedCard = useSelector((state) => state.board.card);

  const infosHandler = ({ target: { value, name } }) => {
    setCardInfos({ ...cardInfos, [name]: value });
  };

  useEffect(() => {
    dispatch(__loadCardById(roomId, cardId));

    return () => {
      // loadCardById({});
      console.log("카드 삭제");
    };
  }, []);

  if (Object.keys(loadedCard).length === 0) {
    return <></>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(__editCardInfos(roomId, loadedCard.cardId, cardInfos));
      }}
    >
      <Text type="head_4">{loadedCard.cardTitle}</Text>
      <Input type="text" name="cardTitle" _onChange={infosHandler} />
      <Text type="head_6">{loadedCard.startDate}</Text>
      <Input type="date" name="startDate" _onChange={infosHandler} />
      <Text type="head_6">{loadedCard.endDate}</Text>
      <Input type="date" name="endDate" _onChange={infosHandler} />
      <div>
        <select name="color" onChange={infosHandler}>
          <option defaultValue>red</option>
          <option>blue</option>
          <option>green</option>
        </select>
      </div>
      <div>
        <textarea name="desc" onChange={infosHandler}></textarea>
      </div>
      <Button type="submit">저장</Button>
    </form>
  );
};

export default ModalForms;
