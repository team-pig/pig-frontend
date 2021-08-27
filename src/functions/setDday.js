import moment from "moment";

// targetDate부터 지금까지의 디데이를 계산해주는 함수
const setDday = (targetDate) => {
  const diff = parseInt(
    moment(targetDate).diff(moment().format("YYYY-MM-DD"), "days")
  );

  switch (true) {
    case diff > 0:
      return `D-${diff}`;
    case diff === 0:
      return `D-DAY`;
    case diff < 0:
      return `D+${Math.abs(diff)}`;
    default:
      return;
  }
};

export default setDday;
