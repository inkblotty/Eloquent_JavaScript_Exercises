/* Eloquent JavaScript
	Chpt. 20: Node.js
	exercises
*/

// CONTENT NEGOTATION, AGAIN

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
		path = path.replace(/\.\./, '');
		return '.' + decodeURIComponent(path);
	}
	else { return '.' + decodeURIComponent(path); }
}

console.log(urlToPath('/index.html'));
console.log(urlToPath('../secret_stuff'));