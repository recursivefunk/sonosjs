
'use strict';

var events              = require( 'events' );
var _environmentEmitter = new events.EventEmitter();
var Zone                = require( './zone' );

exports.discoverZones = function( discovery ) {
  var interval;

  interval = setInterval(function(){
    var zonesData = discovery.getZones();
    var zones = [];
    if ( zonesData.length > 0 ) {
      for ( var i = 0; i < zonesData.length; i++ ) {
        zones.push( new Zone( zonesData[ i ] ) );
      }
      _environmentEmitter.emit( 'zones', zones );
      clearInterval( interval );
    }
  }, 100)

  return _environmentEmitter;
};