import { operations } from "../config/operations.mjs";
import { SERVER_CONFIG, MESSAGES } from "../config/constants.mjs";

const { CONTENT_TYPE_HEADER, CONTENT_TYPE_HTML, TOKENS_SPLITTER } =
  SERVER_CONFIG;
const { unsupportedMethod, invalidOperands, incorrectAmoutOfOperands } =
  MESSAGES;

export default class Handler {
  constructor(server, view) {
    this.server = server;
    this.view = view;
  }
  validateRequest(urlTokens) {
    const errors = [];
    let operands;

    if (urlTokens.length !== 4) {
      errors.push(incorrectAmoutOfOperands);
    } else {
      if (!operations.has(urlTokens[1])) {
        errors.push(unsupportedMethod(urlTokens[1]));
      }

      operands = this.getOperands(urlTokens);

      if (!operands) {
        errors.push(invalidOperands);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      operands,
    };
  }

  getOperands(urlTokens) {
    const op1 = +urlTokens[2];
    const op2 = +urlTokens[3];
    
    return !isNaN(op1) && !isNaN(op2) ? [op1, op2] : null;
  }

  handleRequest(req, res) {
    res.setHeader(CONTENT_TYPE_HEADER, CONTENT_TYPE_HTML);
    const urlTokens = req.url.split(TOKENS_SPLITTER);
    const validation = this.validateRequest(urlTokens);

    !validation.valid
      ? this.handleInvalidRequest(validation.errors, res)
      : this.server.emit(urlTokens[1], validation.operands, res);
  }

  handleInvalidRequest(errors, res) {
    const errorMessage = errors.join("<br>");
    const html = this.view.getHtml(errorMessage, true);
    res.end(html);
  }
}
