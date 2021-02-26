# betterpinger
A better solution for uptime by doing polling for server & client.

### Table of Content
- [Installation](#installation)
- [Docs](#docs)
  - [`core`](#core)
  - [`core.connect`](#coreconnect)
  - [`core.connect` events](#coreconnectevemts)
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
A function that connects to a server & communicate with your `betterpinger` server. In this function, You need to provide some parameters so it works perfectly. They are:
  - `hostname` [Required] for requesting to the provided hostname.
  - `port` for requesting to the different port of hostname.
  - `path` for requesting to the provided path.
  - `headers` for setting this client headers.
  - `protocol` for requesting in different protocol.
## `core.connect` events
- `connect` event will emitted when BetterPinger connected to your BetterPinger server.
- `disconnect` event will emitted when BetterPinger disconnected from your BetterPinger Server.

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
## Community
[Discord](https://discord.gg/9S3ZCDR)
