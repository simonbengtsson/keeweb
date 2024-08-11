import { Application, Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts';

const app = new Application();

app.use(async (ctx, next) => {
    try {
        await ctx.send({
            root: `${Deno.cwd()}/dist`,
            index: 'index.html'
        });
    } catch {
        next();
    }
});

const router = new Router();

router.get('/api/time', (ctx) => {
    ctx.response.body = { time: new Date().toISOString() };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });

// eslint-disable-next-line no-console
console.log('Server is running on port http://localhost:8000');
