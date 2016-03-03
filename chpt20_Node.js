/* Eloquent JavaScript
	Chpt. 20: Node.js
	exercises
*/

// CONTENT NEGOTATION, AGAIN
var http = require('http');

var request = http.request({
	host: 'eloquentjavascript.net',
	method: 'GET',
	path: '/author',
	headers: {
		'Accept': 'application/json',
		'Accept': 'text/html',
		'Accept': 'text/plain'
	}
}, function(response) {
	response.on("error", function(error) {
		console.log("Error: " + error);
	});
	response.on("data", function(chunk) {
		process.stdout.write(chunk.toString());
	});
});
request.end('Hello server');

// FIXING A LEAK
/*
_root
	-- public_html
		* stuff.js
		* index.html
		-- styles
			* main.css
*/

function urlToPath(url) {
	var path = require('url').parse(url).pathname;
	if (path.match(/\.\.\//)) {
		path = path.replace(/\.\./g, '');
		return '.' + decodeURIComponent(path);
	}
	else { return '.' + decodeURIComponent(path); }
}
/*
console.log(urlToPath('/index.html'));
console.log(urlToPath('../../../secret_stuff'));
*/