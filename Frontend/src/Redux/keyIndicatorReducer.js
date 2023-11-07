const initialState = [
    { name: "Successful Cases", value: 100 },
    { name: "Active", value: 55 },
    { name: "Failed", value: 150 },
    { name: "New", value: 224 },
  ];
  
  const keyIndicatorsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "MOVE_TO_PENDING":
        return state.map((indicator) => {
          if (indicator.name === "Active") {
            return { ...indicator, value: indicator.value + 1 };
          }
          return indicator;
        });
      case "MOVE_TO_SOLVED":
        return state.map((indicator) => {
          if (indicator.name === "Successful Cases") {
            return { ...indicator, value: indicator.value + 1 };
          } else if (indicator.name === "Active") {
            return { ...indicator, value: indicator.value - 1 };
          }
          return indicator;
        });
      case "MOVE_TO_FAILED":
        return state.map((indicator) => {
          if (indicator.name === "Active") {
            return { ...indicator, value: indicator.value - 1 };
          } else if (indicator.name === "Failed") {
            return { ...indicator, value: indicator.value + 1 };
          }
          return indicator;
        });
      default:
        return state;
    }
  };
  
  export default keyIndicatorsReducer;
  