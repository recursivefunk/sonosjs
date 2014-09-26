
'use strict';

var util            = require( 'util' );
var EventEmitter    = require( 'events' ).EventEmitter;;

var Zone    = require( './zone' );
var logger  = require( 'luvely' );
var MAX_ZONE_DISCOVERY_ATTEMPTS = 10;

var Environment = function( discovery ) {
  this._discovery = discovery;
  this._zones = [];
};

util.inherits( Environment, EventEmitter );

// ping the network to discover a sonos environment
Environment.prototype.discover = function( maxAttempts ) {
  var self = this;
  var interval;
  var discoverAttempts = 1;
  maxAttempts = maxAttempts || MAX_ZONE_DISCOVERY_ATTEMPTS;

  interval = setInterval(function(){
    var zonesData = self._discovery.getZones();
    var zones = [];

    if ( zonesData.length > 0 ) {
      clearInterval( interval );
      for ( var i = 0; i < zonesData.length; i++ ) {
        self._zones.push( new Zone( zonesData[ i ] ) );
      }
      self.emit( 'zones', self._zones );
    } else {
      logger.debug( 'Scanning network for zones attempt ', discoverAttempts );
      if ( discoverAttempts === maxAttempts ) {
        clearInterval( interval );
        self.emit( 'error', 'No zones found' );
      } else {
        discoverAttempts += 1;
      }
    }
  }, 150)

  return this;
};

Environment.prototype.getZones = function() {
  return this._zones;
};

module.exports = Environment;
