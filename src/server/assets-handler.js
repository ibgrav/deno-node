import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

/** @type {import('./types.js').GetURL} */
function getURL(req) {
  return new URL(`http://${req.headers.host}${req.url || "/"}`);
}

/** @type {Record<string, string>} */
const mimeTypes = {
  css: "text/css",
  js: "text/javascript",
  json: "application/json"
};

function findMimeType(filename = "") {
  const key = Object.keys(mimeTypes).find((key) => filename.endsWith(`.${key}`));
  if (key) return mimeTypes[key];
}

/** @type {import('./types.js').AssetsHandler} */
export async function assetsHandler(req, res, callback) {
  const url = getURL(req);

  if (url.pathname.startsWith("/assets")) {
    const name = url.pathname.replace("/assets/", "");
    const path = resolve(process.cwd(), "src/client", name);

    try {
      const type = findMimeType(name);
      const { size } = await stat(path);

      if (type && size) {
        res.writeHead(200, {
          "content-type": type,
          "content-length": size
        });

        createReadStream(path).pipe(res);
      }
    } catch (e) {
      res.statusCode = 404;
      res.end();
    }

    return;
  }

  callback(req, res);
}
