import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';
import { __app } from './flownservices.ts';

import './index.ts'; // App entry point

__app().then((config) => {
    const app = new Hono();
    app.use(async (c, next) => {
        console.log('Do auth and services setup');
        await next();
    });
    app.use('*', serveStatic({ root: './dist' }));
    app.mount('/', config.backend);

    Deno.serve({ port: 3100, hostname: 'localhost' }, app.fetch);
});
