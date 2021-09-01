import { selectDate } from "../../redux/modules/date";
import { setCurrentId } from "../../redux/modules/calendar";

const clickDate = (clickedDate, targetList, dispatch) => {
  const idAry = targetList.map((item) => item.cardId);
  dispatch(selectDate(clickedDate));
  idAry.length !== 0 && dispatch(setCurrentId(idAry[0]));
};

export default clickDate;
