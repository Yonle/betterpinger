var events = require("events");

module.exports = function Request_Handler (req, res) {
        if (!req.headers["user-agent"].startsWith("Betterpinger - https://npmjs.com/package/betterpinger")) return res.end("This page is not intended to be displayed in a normal browser.");
        res.write(``);
        var interval = setInterval(() => {
                res.write(``);
        }, 1000);
        req.on("close", () => clearInterval(interval));
}

module.exports.connect = function BetterPinger_Client (opt) {
  var http = require("http");
  var status = new events();
  var hr;var ended;var timeout;

  if (typeof(opt) !== "object") {
        throw new TypeError("Must be type of object. Received "+typeof(opt));
        return;
  }

  if (!opt.hostname) {
        throw new TypeError("`hostname` parameter is required");
        return;
  }

  if (opt.protocol) {
          if (opt.protocol === "https") {
                http = require("https");
          } else if (opt.protocol !== "https"||opt.protocol !== "http") {
                throw new TypeError("Invalid Protocol: "+opt.protocol);
                return false;
          }
  }
                                                                        function request() {
        if (ended) return;
        hr = http.get({

                  hostname: opt.hostname,
                  port: opt.port||80,
                  path: opt.path||"/",
                  headers: opt.headers||{
                    'user-agent': `Betterpinger - https://npmjs.com/package/betterpinger [${Math.random().toString(36).slice(2)}]`
                  }
        }, res => {

                status.emit("connect", res);
                status.connected = true;

                res.on("end", (e) => {

                        request();
                        status.connected = false;
                        status.emit("disconnect", e);
                        if (timeout) clearTimeout(timeout);

                });

                res.on("data", ping);

                res.on("close", (e) => {
                        request();
                        status.connected = false;
                        status.emit("disconnect", e);
                        if (timeout) clearTimeout(timeout);
                });

        }).on("error", (e) => {
                        if (status.connected) {
                                status.connected = false;
                                status.emit("disconnect", e);
                        }
                        if (timeout) clearTimeout(timeout)
                        request();
        });

  }

  status.end = function EndConnection () {

        ended = true;

        return hr.end();

  }

  function ping () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
                status.emit("disconnect", { error: "Socket Timed out", code: "SOCKET_TIMED_OUT" });
                status.connected = false;
                request();
        }, 10000);
  }

  request();
  return status;

}
