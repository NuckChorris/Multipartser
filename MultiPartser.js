var EventEmitter = require('events').EventEmitter;
var Stream = require('stream').Stream;
require('buffertools');

var MultiPartse = function (stream, boundary) {
	var divider = new Buffer('\r\n--' + boundary + "\r\n");
	var ender = new Buffer('\r\n--' + boundary + '--');
	var Events = new EventEmitter();
	var nextPartCheck = new Buffer('');
	var part; // The Stream of the current part

	stream.on('data', function (data) {
		var toBeParsed = data;
		var index = toBeParsed.indexOf(divider);
		if (index !== -1) {
			// OKAY! We know there's at least one divider in this chunk, great!

			// Loop until there's no more parts in this chunk.
			while (index !== -1) {
				if (toBeParsed.indexOf(ender) === index) {
					break;
				}
				// Okay, we got a new part, now reset the stream...
				part = new Stream();
				// And fire the event...
				Events.emit('part', part);

				toBeParsed = toBeParsed.slice(index + divider.length);
				index = toBeParsed.indexOf(divider);

				// And finally write to the new stream.
				part.emit('data', toBeParsed.slice(0, index));
			}
		}

		// Now handle edge cases, I think.  Not sure if this'll work.
		var startingPoint = data.length - divider.length;
		for (var i = 0, l = divider.length; i < l; ++i) {
			if (divider.indexOf(data.slice(startingPoint + i)) === 0) {
				nextPartCheck = divider.slice(0, divider.length - i);
				break;
			}
		}
	});
	return Events;
}

module.exports = MultiPartse;