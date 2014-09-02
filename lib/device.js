
'use strict';

var util         = require( 'util' );
var EventEmitter = require( 'events' ).EventEmitter;

var Device = function( raw, zone ) {
  this._rawDevice = raw;
  this._zone = zone;
};

util.inherits( Device, EventEmitter );

module.exports = Device;