// ONLY FOR DEV. WILL BE REPLACED WITH npm/jsr module later

let configResolver: any;

let state: {
    user: any,
    instance: any,
};

export type AppConfig = {
    // name: string;
    // description?: string;
    // icon?: string;
    // backend?: (req: any) => any;
    // runNpmBuild: boolean,
    root?: string;
    permissions?: {
        database?: boolean;
    };
};

type SetupFunction = () => AppConfig;

export async function setupApp(func: SetupFunction) {
    configResolver = Promise.withResolvers();
    const config = await func();
    configResolver.resolve(config);
}

export function getInstance() {
    if (!state) {
        throw new Error('App not initialized');
    }
    return state.instance;
}

export async function getDatabase() {
    if (!state) {
        throw new Error('App not initialized');
    }
    return await Deno.openKv();
}

export function getUser(): { id: string } {
    if (!state) {
        throw new Error('App not initialized');
    }
    return state.user;
}

export async function __app() {
    if (!configResolver) {
        throw new Error('App not initialized');
    }
    return await configResolver.promise;
}

export function initialize(envState: any) {
    state = envState;
}