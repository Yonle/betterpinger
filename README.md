# betterpinger
A better solution for uptime by doing polling for server & client.

### Table of Content
- [Installation](#installation)
- [Docs](#docs)
  - [`core`](#core)
  - [`core.connect`](#coreconnect)
- [Example](#example)

## Installation
```bash
npm install betterpinger --save
```

## Docs

### `core`
A function that loaded via `require("betterpinger")`. To use this function, Put at request handler. Example:
```js
server.on("request", core);
```

### `core.connect`
A function that connects to a server & communicate with `betterpinger` server. In this function, You need to provide some parameters so it works perfectly. They are:
  - `hostname` [Required] for requesting to the provided hostname.
  - `port` for requesting to the different port of hostname.
  - `path` for requesting to the provided path.
  - `headers` for setting this client headers.
  - `protocol` for requesting in different protocol.

## Example
Server Example
```js
const http = require("http");
const betterpinger = require("betterpinger");
http.createServer(betterpinger).listen(3000);
``` 
Client Example
```js
const { connect } = require("betterpinger");

connect({
	hostname: "localhost",
	port: 3000,	
});
```
# WARNING
Using `core.connect` to non-betterping configured server, can lead you to some FATAL Result!!!
## Community
[Discord](https://discord.gg/9S3ZCDR)
