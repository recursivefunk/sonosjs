
'use strict';

var util          = require( 'util' );
var EventEmitter  = require( 'events' ).EventEmitter;
var Device        = require( './device' );

var Zone = function( raw ) {
  var self = this;
  this._rawZone = raw;
  this._uuid = raw.uuid;
  this._devices = raw.members.map(function(member){
    return new Device( member, self );
  });
};

util.inherits( Zone, EventEmitter );

Zone.prototype.getDevices = function() {
  return this._devices;
};

Zone.prototype.getName = function() {
  return this._rawZone.coordinator.roomName;
};

Zone.prototype.getState = function() {
  return this._rawZone.coordinator.state.zoneState;
};

Zone.prototype.getZoneCoordinator = function() {
  return this._rawZone.coordinator.coordinator;
};

module.exports = Zone;
