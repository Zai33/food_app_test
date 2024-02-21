export const alertSuccess = (message) => {
  return {
    type: "SET_SUCCESS",
    alert: { type: "success", message: message },
  };
};

export const alertWarining = (message) => {
  return {
    type: "SET_WARNGING",
    alert: { type: "warning", message: message },
  };
};

export const alertDanger = (message) => {
  return {
    type: "SET_DANGER",
    alert: { type: "danger", message: message },
  };
};

export const alertInfo = (message) => {
  return {
    type: "SET_INFO",
    alert: { type: "info", message: message },
  };
};

export const alertNull = (message) => {
  return {
    type: "SET_NULL",
    alert: null,
  };
};
