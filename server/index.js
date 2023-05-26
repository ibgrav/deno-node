import { createServer } from "node:http";
import { html } from "./html.js";
import { port } from "./constants.js";
import { assetsHandler } from "./assets-handler.js";

const server = createServer((req, res) => {
  assetsHandler(req, res, () => {
    res.end(
      html`<!DOCTYPE html>
        <html>
          <head>
            <title>Hello, World!</title>
            <link rel="stylesheet" href="/assets/styles.css" />
            <script type="module" src="/assets/index.js"></script>
          </head>
          <body>
            <h1>Hello, World!</h1>
          </body>
        </html>`
    );
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`http://localhost:${port}/`);
});
