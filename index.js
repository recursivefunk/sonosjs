
'use strict';

// native modules
var events           = require( 'events' );

// third party modules
var SonosDiscovery   = require( 'sonos-discovery' );

// app modules
var devicesUtils     = require( './lib/devices' );

var SonosJS = function() {
  var self = this;
  events.EventEmitter.call( this );

  this._maxDiscoveryAttempts = 20;
  this._discovery = new SonosDiscovery();

  devicesUtils
    .discoverDevices( this._discovery )
    .on('zones', function(zones){
      self._zones = zones;
      self.emit( 'ready', self._zones );
    });

  return this;
};

SonosJS.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = SonosJS;
