import { Hono } from 'hono';

// eslint-disable-next-line no-restricted-syntax, import/no-default-export
export default async function handler(request, flownCtx) {
    const app = new Hono();

    app.use('*', async (ctx, next) => {
        const userId = ctx.req.header('x-flown-user-id');
        if (!userId) {
            console.log('No user id found');
            return new Response('Unauthorized', { status: 401 });
        }
        await next();
    });

    function getDummyFile() {
        const vaultBase64Demo =
            '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';
        const array = Uint8Array.from(globalThis.atob(vaultBase64Demo), (c) => c.charCodeAt(0));
        console.log('DUMMY FILE', array.length, array.byteLength);
        return array;
    }

    function getInstanceId(req) {
        const instanceId = req.header('x-flown-instance-id');
        if (!instanceId) {
            throw new Error('No instance id found');
        }
        return instanceId;
    }

    app.get('/api/read', async (ctx) => {
        console.log('/api/read request');
        const instanceId = getInstanceId(ctx.req);
        const kv = await flownCtx.kvStore();
        const item = await kv.getItem(`files_${instanceId}`);
        let bytes = null;
        if (item instanceof Uint8Array) {
            if (item.byteLength > 0) {
                bytes = item;
                console.log('Reading real file', bytes?.byteLength);
            } else {
                console.log('Skipped empty file');
            }
        }
        if (!bytes) {
            bytes = getDummyFile();
            console.log('Reading dummy file', bytes.byteLength);
        }
        console.log('/api/read response', bytes.byteLength, bytes.byteLength);
        return new Response(bytes.buffer);
    });

    app.post('/api/save', async (ctx) => {
        console.log('/api/save');
        const instanceId = getInstanceId(ctx.req);
        const bytes = await ctx.req.raw.bytes();
        if (bytes.length === 0) {
            throw new Error('Empty file');
        }
        console.log('/api/save bytes', bytes.byteLength);
        const kv = await flownCtx.kvStore();
        await kv.setItem(`files_${instanceId}`, bytes);
        return ctx.json({ success: true });
    });

    app.get('*', () => {
        return flownCtx.assetsResponse();
    });

    return app.fetch(request);
}
