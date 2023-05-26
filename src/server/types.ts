import type { IncomingMessage, ServerResponse } from "http";

export type Req = IncomingMessage;
export type Res = ServerResponse;

export type Handler = (req: Req, res: Res) => void | Promise<void>;

export type AssetsHandler = (req: Req, res: Res, handler: Handler) => Promise<void>;

export type GetURL = (req: Req) => URL;
