import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import {
  setCurrentId,
  __deleteSchedule,
  __editSchedule,
} from "../../redux/modules/calendar";

// component
import Todos from "../../feature/board/Todos";
import InputToggle from "../../components/InputToggle";

// elem
import { Button, Input } from "../../elem";

const CalendarModal = ({ content, setContent, setShowModal }) => {
  const { roomId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setCurrentId(null));
  }, []);

  const returnEditObj = (key, value) => {
    const editObj = { cardId: content.cardId };
    editObj[key] = value;
    return editObj;
  };

  const handleChange = (key, value) => {
    const editObj = returnEditObj(key, value);
    setContent({ ...content, [key]: value });
    dispatch(__editSchedule(roomId, editObj));
  };

  const editFunc = (key, value) => {
    const editObj = returnEditObj(key, value);
    dispatch(__editSchedule(roomId, editObj));
  };

  const deleteSchedule = (cardId) => {
    dispatch(__deleteSchedule(roomId, cardId));
    setShowModal((pre) => !pre);
  };

  return (
    <>
      <Button _onClick={() => deleteSchedule(content.cardId)}>삭제</Button>
      <InputToggle
        name="cardTitle"
        value={content.cardTitle}
        saveFunc={editFunc}
      />
      <Input
        type="date"
        _onChange={(e) => handleChange("startDate", e.target.value)}
        value={content.startDate}
      />
      <Input
        type="date"
        _onChange={(e) => handleChange("endDate", e.target.value)}
        value={content.endDate}
      />
      <InputToggle
        name="desc"
        shape="textarea"
        value={content.desc}
        saveFunc={editFunc}
      />
      {/* <Todos todos={[]} /> */}
    </>
  );
};

export default CalendarModal;
