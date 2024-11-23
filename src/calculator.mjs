import http from "node:http";
import Handler from "./service/Handler.mjs";
import CalculatorService from "./service/CalculatorService.mjs";
import { operations } from "./config/operations.mjs";
import { SERVER_CONFIG } from "./config/constants.mjs";
import CalculatorView from "./view/CalculatorView.mjs";

const server = http.createServer();
const view = new CalculatorView();
const handler = new Handler(server, view);
const { PORT, EVENT_REQUEST } = SERVER_CONFIG;

server.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}`)
);

new CalculatorService(server, operations, view);

server.on(EVENT_REQUEST, (req, res) => handler.handleRequest(req, res));