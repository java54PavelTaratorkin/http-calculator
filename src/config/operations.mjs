export const operations = new Map([
    ["add", (op1, op2) => op1 + op2],
    ["subtract", (op1, op2) => op1 - op2],
    ["multiply", (op1, op2) => op1 * op2],
    ["divide", (op1, op2) => op1 / op2],
    ["modulus", (op1, op2) => op1 % op2],
    ["power", (op1, op2) => Math.pow(op1, op2)]
]);