import { ContentfulStatusCode } from "hono/utils/http-status";

export class ApiError extends Error {
  public readonly statusCode: ContentfulStatusCode;

  constructor(message: string, statusCode: ContentfulStatusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}
