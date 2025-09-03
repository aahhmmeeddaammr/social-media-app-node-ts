import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { BadRequest } from "../utils/response/errors.response";
type SchemaKeys = keyof Request;
type Schema = Record<SchemaKeys, ZodSchema>;
export const validation = (schema: Partial<Schema>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: { path: string; message: string }[] = [];
    for (const [key, zodSchema] of Object.entries(schema)) {
      const result = zodSchema.safeParse(req[key as keyof Request]);
      if (!result.success) {
        errors.push(
          ...result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          }))
        );
      }
    }
    if (errors.length) {
      throw new BadRequest("in-valid input data", errors.flat());
    }
    next();
  };
};
