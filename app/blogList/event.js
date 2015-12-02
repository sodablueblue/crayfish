var events = require('events');
var emitter = new events.EventEmitter();

var GET_OUTLINE = 'GET_OUTLINE';

exports.emitter = emitter;
exports.GET_OUTLINE = GET_OUTLINE;