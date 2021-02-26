module.exports = function Request_Handler (req, res) {
		res.setHeader("content-type", "text/plain");
		var interval = setInterval(() => {
			res.write("1");
		}, 1000);
		req.on("close", () => clearInterval(interval));
}


module.exports.connect = function BetterPinger_Client (opt) {
  var http = require("http");

  if (typeof(opt) !== "object") {
	throw new TypeError("Must be type of object. Received "+typeof(opt));
	return;
  }

  if (!opt.hostname) {
	throw new TypeError("`hostname` parameter is required");
	return;
  }

  if (opt.protocol === "https") {
	http = require("https");
  } else if (opt.protocol !== "https"||opt.protocol !== "http") {
	throw new TypeError("Invalid Protocol: "+opt.protocol);
	return false;
  }

  http.request({
	  hostname: opt.hostname,
	  port: opt.port||80,
	  path: opt.path||'/',
	  method: 'GET',
	  headers: opt.headers||{
	    'user-agent': `Betterpinger - https://npmjs.com/packages/betterpinger [${Math.random().toString(36).slice(2)}]`
	  }
  }, res => {

	res.on("end", () => module.exports.connect(hostname));

  }).on("error", () => module.exports.connect(hostname));

}
