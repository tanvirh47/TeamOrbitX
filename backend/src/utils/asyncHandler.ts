import type { RequestHandler } from "express";

export function asyncHandler<TRequestHandler extends RequestHandler>(
  handler: TRequestHandler,
): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
