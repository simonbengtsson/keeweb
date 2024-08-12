// ONLY FOR DEV

import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';
import { __app, initialize } from './flownservices.ts';

import './flown.ts'; // App entry point

__app().then((config) => {
    // Should parse cookie and/or url here
    initialize({
        user: { id: 'abc', name: 'John Doe' },
        instance: { id: 'abc' },
    });
    const app = new Hono();
    app.use(async (_, next) => {
        console.log('Do auth and services setup');
        await next();
    });
    app.use('*', serveStatic({ root: './dist' }));
    app.mount('/', config.backend);

    Deno.serve({ port: 3100, hostname: 'localhost' }, app.fetch);
});
