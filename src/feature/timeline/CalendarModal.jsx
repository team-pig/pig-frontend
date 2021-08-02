import React from "react";

// component
import Todos from "../../feature/board/Todos";
import InputToggle from "../../components/InputToggle";

//elem
import { Input } from "../../elem";

const CalendarModal = ({ content, setContent }) => {
  const handleChange = (key, value) => {
    setContent({ ...content, [key]: value });
  };

  return (
    <>
      <InputToggle value={content ? content.scheduleTitle : ""} />
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
      <InputToggle shape="textarea" value={content.desc} />
      <Todos todos={[]} />
    </>
  );
};

export default CalendarModal;
