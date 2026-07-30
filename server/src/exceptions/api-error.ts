export class ApiError extends Error {
  public status: number;

  constructor({ message, status }: { message: string; status: number }) {
    super(message);

    this.status = status;

    Object.setPrototypeOf(this, ApiError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string) {
    return new ApiError({ message, status: 400 });
  }

  static unauthorized(message: string) {
    return new ApiError({ message, status: 401 });
  }

  static forbidden(message: string) {
    return new ApiError({ message, status: 403 });
  }

  static notFound(message: string) {
    return new ApiError({ message, status: 404 });
  }
}