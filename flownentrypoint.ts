import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';
import { __app } from './flownservices.ts';

import './flown.ts';

__app().then((config) => {
    const app = new Hono();
    app.use(async (ctx, next) => {
        const appId = ctx.req.header('x-flown-app-id');
        if (!appId) {
            console.log('Disallowed non proxy request');
            return Response.redirect('https://flown.io');
        }
        await next();
    });
    app.use('*', serveStatic({ root: './dist' }));
    app.mount('/', config.backend);

    Deno.serve(app.fetch);
});
