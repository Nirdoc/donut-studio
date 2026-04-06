import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

function extractToken(req: NextRequest): string {
  const header = req.headers.get("Authorization");
  if (!header?.startsWith("Bearer ")) throw new Error("Unauthorized");
  return header.slice(7);
}

export function verifyAuth(req: NextRequest): JWTPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Server misconfigured");
  const token = extractToken(req);
  try {
    return jwt.verify(token, secret) as JWTPayload;
  } catch {
    throw new Error("Unauthorized");
  }
}

export function requireAdmin(req: NextRequest): JWTPayload {
  const payload = verifyAuth(req);
  if (payload.role !== "ADMIN") throw new Error("Forbidden");
  return payload;
}
