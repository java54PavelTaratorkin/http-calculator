import { readFileSync } from "fs";
import { resolve } from "path";
import { VIEW_JSON_CONFIG } from "../config/constants.mjs";

const { VIEW_JSON_PATH, FILE_ENCODING } = VIEW_JSON_CONFIG;
const viewConfig = JSON.parse(readFileSync(resolve(VIEW_JSON_PATH), FILE_ENCODING));

export default class CalculatorView {
  toKebabCase(str) {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }

  convertStylesToString(styles) {
    return Object.entries(styles)
      .map(([key, value]) => `${this.toKebabCase(key)}: ${value};`)
      .join(" ");
  }

  generateStyles(isError) {
    const labelConfig = viewConfig.label;
    return {
      fontSize: labelConfig.fontSize,
      display: labelConfig.display,
      textAlign: labelConfig.textAlign,
      color: isError ? labelConfig.colorError : labelConfig.colorSuccess,
    };
  }

  getHtml(message, isError) {
    const styles = this.generateStyles(isError);
    const styleString = this.convertStylesToString(styles);
    return `<label style="${styleString}">${message}</label>`;
  }
}
