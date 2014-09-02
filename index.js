
'use strict';

// native modules
var util             = require('util');
var EventEmitter     = require( 'events' ).EventEmitter;;
// third party modules
var SonosDiscovery   = require( 'sonos-discovery' );
// app modules
var environment      = require( './lib/environment' );

var SonosJS = function() {
  var self = this;

  this._maxDiscoveryAttempts = 20;
  this._discovery = new SonosDiscovery();
  this.syncEnvironment();

  return this;
};

util.inherits( SonosJS, EventEmitter );

SonosJS.prototype.syncEnvironment = function() {
  var self = this;

  environment
    .discover( this._discovery )
    .on('zones', function(zones){
      self._zones = zones;
      self.emit( 'sync', self._zones );
    });

  return this;
};

module.exports = SonosJS;
