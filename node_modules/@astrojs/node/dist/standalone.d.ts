/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { NodeApp } from 'astro/app/node';
import https from 'https';
import type { Options } from './types.js';
export declare function getResolvedHostForHttpServer(host: string | boolean): string | undefined;
export default function startServer(app: NodeApp, options: Options): {
    server: {
        host: string | undefined;
        port: number;
        closed(): Promise<void>;
        server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse> | https.Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
        stop: () => Promise<void>;
    };
    done: Promise<void>;
};
