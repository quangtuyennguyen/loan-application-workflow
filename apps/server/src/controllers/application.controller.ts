import type { Request, Response } from "express";

import { createApplicationSchema } from "@/validation/application.schema";
import { createApplication, getApplicationById } from "@/services/application.service";
import type { CreateApplicationResponse, ValidationErrorResponse } from "@/types/application";

export function create(req: Request, res: Response) {
  const parsed = createApplicationSchema.safeParse(req.body);

  if (!parsed.success) {
    const error: ValidationErrorResponse = {
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
    return res.status(400).json(error);
  }

  const application = createApplication(parsed.data);

  const response: CreateApplicationResponse = {
    id: application.id,
    status: application.status,
  };

  return res.status(201).json(response);
}

export function getById(req: Request, res: Response) {
  const application = getApplicationById(req.params["id"] as string);

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  return res.status(200).json(application);
}
