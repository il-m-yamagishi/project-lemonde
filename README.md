# Project LeMonde

OSS-based node.js metaverse

## Feature

- **WebSocket** based realtime connection
    - It will be replaced to **WebTransport(with QUIC)** after node.js or deno supports it
- Rendering using **babylon.js**

## Prerequisites

- node.js 18
- [mkcert](https://github.com/FiloSottile/mkcert)

```bash
# in host(browser) environment(e.g. PowerShell, cmd, Terminal)
$ mkcert -install
$ mkcert "localhost"
$ cp ./*.pem (to project-lemonde/)
```
