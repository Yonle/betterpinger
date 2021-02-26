var events = require("events");

module.exports = function Request_Handler (req, res) {
		res.setHeaders("BetterPinger", "Configured");
		res.setHeaders("x-powered-by", "BetterPinger");
		res.write(``);
}


module.exports.connect = function BetterPinger_Client (opt) {
  var http = require("http");
  var status = new events();
  var hr;var ended;

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
		    'user-agent': `Betterpinger - https://npmjs.com/packages/betterpinger [${Math.random().toString(36).slice(2)}]`
		  }
	}, res => {
		status.emit("connect", res);
		status.connected = true;
		res.on("end", (e) => {
			request();
			status.connected = false;
			status.emit("disconnect", e);
		});

		res.on("close", (e) => {
			request();
                        status.connected = false;
                        status.emit("disconnect", e);
		});

	}).on("error", (e) => {
			if (status.connected) {
				status.connected = false;
				status.emit("disconnect", e);
			}
                        request();
	});

  }

  status.end = function EndConnection () {

	ended = true;

	return hr.end();

  }

  request();
  return status;

}
