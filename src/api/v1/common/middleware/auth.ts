import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { JWT_SECRET } from "@/constants/env";

export const authMiddleware = createMiddleware(async (c, next) => {
  const secret = JWT_SECRET || "segredo_super_secreto";
  let token: string | undefined;

  const authHeader = c.req.header("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    token = getCookie(c, "auth_token");
  }

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const payload = await verify(token, secret);
    c.set("user", payload);
    await next();
  } catch {
    return c.json({ error: "Invalid Token" }, 401);
  }
});
