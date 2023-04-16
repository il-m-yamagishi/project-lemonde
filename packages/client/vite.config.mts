import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const dir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    server: {
        https: {
            cert: readFileSync(`${dir}/../../localhost.pem`),
            key: readFileSync(`${dir}/../../localhost-key.pem`),
        },
    },
});
