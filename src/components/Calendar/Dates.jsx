import React from "react";
import { useSelector } from "react-redux";

// component
import Date from "./Date";

const Dates = () => {
  const { current } = useSelector((state) => state.calendar);

  const firstDay = current.clone().startOf("month");
  const startDate = firstDay.clone().subtract("day", firstDay.day());

  return (
    <>
      {[...Array(42)].map((n, idx) => {
        let target = startDate.clone().add(idx, "d");
        return <Date key={idx}>{target.format("D")}</Date>;
      })}
    </>
  );
};

export default Dates;
