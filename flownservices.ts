// ONLY FOR DEV. WILL BE REPLACED WITH npm/jsr module later

let configResolver: any;

export type AppConfig = {
  name: string;
  description?: string;
  icon?: string;
  backend?: (req: any) => any;
  runNpmBuild: boolean;
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

export async function __app() {
  if (!configResolver) {
    throw new Error("App not initialized");
  }
  return await configResolver.promise;
}
