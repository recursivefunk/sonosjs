
'use strict';

var util            = require( 'util' );
var EventEmitter    = require( 'events' ).EventEmitter;;

var Zone    = require( './zone' );
var logger  = require( 'luvely' );
var MAX_ZONE_DISCOVERY_ATTEMPTS = 10;

var Environment = function( discovery ) {
  this._discovery = discovery;
  return this;
};

util.inherits( Environment, EventEmitter );

Environment.prototype.discover = function( maxAttempts ) {
  var self = this;
  var interval;
  var discoverAttempts = 1;
  maxAttempts = maxAttempts || MAX_ZONE_DISCOVERY_ATTEMPTS;

  interval = setInterval(function(){
    var zonesData = self._discovery.getZones();
    var zones = [];

    if ( zonesData.length > 0 ) {
      for ( var i = 0; i < zonesData.length; i++ ) {
        self._zones.push( new Zone( zonesData[ i ] ) );
      }
      self.emit( 'zones', self._zones );
      clearInterval( interval );
    } else {
      logger.debug( 'Scanning network for zones attempt ', discoverAttempts );
      if ( discoverAttempts === maxAttempts ) {
        self.emit( 'error', 'No zones found' );
        clearInterval( interval );
      } else {
        discoverAttempts += 1;
      }
    }
  }, 100)

  return this;
};

module.exports = Environment;