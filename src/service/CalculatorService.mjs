export default class CalculatorService {
  constructor(emitter, operations, view) {
    this.view = view;
    operations.forEach((operationFn, operationName) => {
      emitter.addListener(operationName, (operands, response) => {
        const result = operationFn(operands[0], operands[1]);
        response.end(view.getHtml(result, false));
      });
    });
  }
}