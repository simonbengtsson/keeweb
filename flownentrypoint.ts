import { Hono } from 'jsr:@hono/hono';
import { __app } from './flownservices.ts';

import './flown.ts';

__app().then((config) => {
    const app = new Hono();
    app.use(async (ctx, next) => {
        const instanceId = ctx.req.header('x-flown-instance-id');
        if (!instanceId) {
            console.log('Disallowed non proxy request');
            return Response.redirect('https://topilo.app');
        }
        await next();
    });
    app.mount('/', config.backend);

    Deno.serve(app.fetch);
});
