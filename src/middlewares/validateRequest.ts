import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors: Record<string, string> = {};

    errors.array().forEach((err: any) => {
      // express-validator v7 keeps param under err.path, not err.param
      const field = err.path || err.param || "unknown";
      formattedErrors[field] = err.msg || "Invalid input";
    });

    return res.status(400).json({ errors: formattedErrors });
  }

  next();
};
