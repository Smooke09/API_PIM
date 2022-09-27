export class Error {
  message: string;
  code: number;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

  public static badRequest(message: string): Error {
    return {
      code: 400,
      message,
    };
  }

  public static notFound(message: string): Error {
    return {
      code: 404,
      message,
    };
  }

  public static internal(message: string): Error {
    return {
      code: 500,
      message,
    };
  }

  public static unauthorized(message: string): Error {
    return {
      code: 401,
      message,
    };
  }
}
