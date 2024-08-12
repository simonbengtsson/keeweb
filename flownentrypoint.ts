import { Hono } from "jsr:@hono/hono";
import { serveStatic } from "jsr:@hono/hono/deno";
import { __app } from "./flownservices.ts";

import "./flown.ts";

__app().then((config) => {
  const app = new Hono();
  app.use(async (_, next) => {
    console.log("Do auth and services setup");
    await next();
  });
  app.use("*", serveStatic({ root: "./dist" }));
  app.mount("/", config.backend);
  Deno.serve(app.fetch);
});
