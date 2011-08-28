var fs = require('fs');
var MultiPartse = require('./MultiPartser.js');

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