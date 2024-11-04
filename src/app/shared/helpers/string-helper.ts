export class StringHelper {
  static isNullOrWhitespace(str?: string) {
    return str === null || str?.match(/^\s*$/) !== null;
  }
}
