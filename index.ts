import { Application, Router } from 'https://deno.land/x/oak@v10.2.0/mod.ts';

const app = new Application();

app.use(async (ctx, next) => {
    try {
        await ctx.send({
            root: `${Deno.cwd()}/dist`,
            index: 'index.html'
        });
    } catch {
        await next();
    }
});

const router = new Router();

router.get('/api/time', async (ctx) => {
    const kv = await Deno.openKv();
    await kv.set(['time'], new Date().toISOString());
    const res = await kv.get(['time']);
    ctx.response.body = { result: res.value || 'none' };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8000 });

// eslint-disable-next-line no-console
console.log('Server is running on port http://localhost:8000');
