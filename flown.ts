import { setupApp } from './flownservices.ts';
import { app } from './app.ts'

setupApp(() => {
    return {
        name: 'Keeweb',
        subtitle: 'Password manager',
        description: 'Keeweb is a password manager',
        icon: './icon.png',
        backend: app.fetch,
        root: './dist',
        runNpmBuild: true,
        services: {
            backend: true,
            database: true,
            storage: true,
            networking: {
                allowedOrigins: ['google.com']
            }
        }
    }
});
