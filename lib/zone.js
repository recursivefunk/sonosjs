
'use strict';

var events = require( 'events' );
var Device = require( './device' );

var Zone = function( raw ) {
  var self = this;
  events.EventEmitter.call( this );
  this._rawZone = raw;
  this._uuid = raw.uuid;
  this._devices = raw.members.map(function(member){
    return new Device( member, self );
  });
};

Zone.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = Zone;