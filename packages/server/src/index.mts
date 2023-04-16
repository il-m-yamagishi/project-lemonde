/**
 * @author Masaru Yamagishi <yamagishi.iloop@gmail.com>
 * @license Apache-2.0
 * @copyright Masaru Yamagishi 2022
 */

import { readFile } from "fs/promises";
import { createServer } from "https";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

async function main() {
    const port = parseInt(process.env.PORT || "8080", 10);
    const dir = dirname(fileURLToPath(import.meta.url));
    const cert = await readFile(`${dir}/../../../localhost.pem`);
    const key = await readFile(`${dir}/../../../localhost-key.pem`);
    const server = createServer({
        cert,
        key,
    });
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('user connected.');
        ws.on('error', console.error);
        ws.on('message', (data) => {
            console.log(`received: ${data}`);
        });
        ws.on('close', (code, reason) => {
            console.log(`User disconnected code:${code} reason:${reason}`);
        });
    });

    await new Promise<void>((resolve, reject) => {
        server.listen({
            port,
        }, () => {
            server.off("error", reject);
            console.log(`server successfully started at https://localhost:${port}`);
            resolve();
        });
        server.on("error", reject);
    });
}

main();
