
'use strict';

var events = require( 'events' );

var Device = function( raw, zone ) {
  events.EventEmitter.call( this );
  this._rawDevice = raw;
  this._zone = zone;
};

Device.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = Device;