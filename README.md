MultiPartser.js
===============

Not done, doesn't parse headers, and handling of cases where the divider is between chunks will likely break since it's not tested.

Example (filesystem)
--------------------
```
var fs = require('fs');
var MultiPartse = require('MultiPartser');

var file = fs.createReadStream('./test.multipart');

var parser = MultiPartse(file, '----WebKitFormBoundaryBOzU7xxKl5A7aVI9');

parser.on('part', function (part) {
	console.log('=== Part ===');
	part.on('data', function (data) {
		console.log(data.toString('utf8'));
	});
	part.on('end', function () {
		console.log('=== /Part ===');
	});
});
```

License
-------
I don't care what you do with this, just don't get pissed at me if it breaks horribly.

If it breaks, fix it and send me a pull request, or just report it as an issue.