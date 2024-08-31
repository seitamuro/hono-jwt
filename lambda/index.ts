import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { sign, verify } from "hono/jwt";

const app = new Hono();

const secret = "mySecretKey";

app.post("/signin", async (c) => {
  const body = await c.req.parseBody();
  const token = await sign(body, secret);
  console.log(JSON.stringify(token));
  return c.text(token);
});

app.post("/verify", async (c) => {
  const body = await c.req.parseBody();
  const token = body.token as string;
  const decoded = await verify(token, secret);
  return c.json(decoded);
});

export const handler = handle(app);
