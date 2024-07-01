import type { NodeApp } from 'astro/app/node';
import type { ErrorHandlerParams, Options, RequestHandlerParams } from './types.js';
export default function (app: NodeApp, mode: Options['mode']): (...args: RequestHandlerParams | ErrorHandlerParams) => Promise<void>;
