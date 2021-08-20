import moment from "moment";

const getModifiedTime = (current) => {
  let target;

  if (current.modifiedAt) {
    target = moment.utc(current.modifiedAt); // 한국시간으로 바꿔줌
  } else if (current.createAt) {
    target = moment.utc(current.modifiedAt);
  }

  const now = moment();

  const diff = {
    day: moment.duration(now.diff(target)).days(),
    hours: moment.duration(now.diff(target)).hours(),
    minute: moment.duration(now.diff(target)).minutes(),
    second: moment.duration(now.diff(target)).seconds(),
  };

  const getText = () => {
    switch (true) {
      case diff.day > 0:
        return `${diff.day}일 전`;
      case diff.hours > 0:
        return `${diff.hours}시간 전`;
      case diff.minute > 0:
        return `${diff.minute}분 전`;
      case diff.second >= 0:
        return `${diff.second}초 전`;
      default:
        return;
    }
  };

  const text = getText();
  return text;
};

export default getModifiedTime;
