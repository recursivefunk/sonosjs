
'use strict';

var events            = require( 'events' );
var _discoveryEmitter = new events.EventEmitter();
var zones             = [];

exports.discoverZones = function( discovery ) {
  var interval;

  interval = setInterval(function(){
    zones = discovery.getZones();
    if ( zones.length > 0 ) {
      _discoveryEmitter.emit( 'zones', zones );
      clearInterval( interval );
    }
  }, 100)

  return _discoveryEmitter;
};