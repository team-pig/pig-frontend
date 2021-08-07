const flex = (jc = "center", ai = "center", row = true) => {
  const jcValue = () => {
    switch (jc) {
      case "center":
        return "center";
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "between":
        return "space-between";
      case "around":
        return "space-around";
      case "evenly":
        return "space-evenly";
      default:
        return "center";
    }
  };

  const aiValue = () => {
    switch (ai) {
      case "start":
        return "flex-start";
      case "end":
        return "flex-end";
      case "center":
        return "center";
      default:
        return "center";
    }
  };

  const direction = row ? "row" : "column";

  return `
  display: flex;
  flex-direction: ${direction};
  justify-content: ${jcValue()};
  align-items: ${aiValue()};
  `;
};

export default flex;
