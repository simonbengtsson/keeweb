let configResolver: any;

type AppConfig = {
    name: string;
    description?: string;
    icon?: string;
    backend?: (req: any) => any;
    root?: string;
    permissions?: {
        database?: boolean;
    };
};

type SetupFunction = () => AppConfig | Promise<AppConfig>;

export async function setupApp(func: SetupFunction) {
    configResolver = Promise.withResolvers();
    const config = await func();
    configResolver.resolve(config);
}

export function getInstance() {
    return {
        id: 'abc'
    };
}

export async function getDatabase() {
    return await Deno.openKv();
}

export function getUser(): { id: string } {
    return {
        id: 'abc'
    };
}

export async function __app() {
    if (!configResolver) {
        throw new Error('App not initialized');
    }
    return await configResolver.promise;
}
