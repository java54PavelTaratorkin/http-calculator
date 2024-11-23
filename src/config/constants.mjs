export const MESSAGES = {
  unsupportedMethod: (method) => `method '${method}' unsupported`,
  invalidOperands: "wrong operands",
  incorrectAmoutOfOperands: "incorrect amount of parameters"
};

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3500,
  EVENT_REQUEST: "request",
  CONTENT_TYPE_HEADER: "content-type",
  CONTENT_TYPE_HTML: "text/html",
  TOKENS_SPLITTER: "/"
};

export const VIEW_JSON_CONFIG = {
  VIEW_JSON_PATH: "./src/config/view.json",
  FILE_ENCODING: "utf-8"
};
