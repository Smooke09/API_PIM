import { string } from "yup";

export class Error {
  message: string;
  code: number;

  constructor(code: number, msg: string) {
    this.message = msg;
    this.code = code;
  }

  // -- Error Message --
  static badRequest(msg: string) {
    return new Error(400, msg);
  }

  static notFound(msg: string) {
    return new Error(404, msg);
  }

  static forbidden(msg: string) {
    return new Error(403, msg);
  }

  static notAcceptable(msg: string) {
    return new Error(406, msg);
  }

  static unauthorize(msg: string) {
    return new Error(401, msg);
  }
}
