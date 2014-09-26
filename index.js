
'use strict';

// native modules
var util             = require( 'util' );
var EventEmitter     = require( 'events' ).EventEmitter;
// third party modules
var logger           = require( 'luvely' );
var SonosDiscovery   = require( 'sonos-discovery' );
// app modules
var Environment      = require( './lib/environment' );

var SonosJS = function() {
  var self = this;

  this._discovery = new SonosDiscovery();
  this._environment = new Environment( this._discovery );
  this._hasSynced = false;
  this.syncEnvironment();

  return this;
};

util.inherits( SonosJS, EventEmitter );

SonosJS.prototype.syncEnvironment = function() {
  var self = this;

  this._environment

    .discover()

      .on('zones', function(){
        self.emit( 'sync' );
        self._hasSynced = true;
      })

      .on('error', function(err){
        self._raiseError( 'sync', err );
      });

  return this;
};

SonosJS.prototype.hasSynced = function() {
  return this._hasSynced;
};

SonosJS.prototype.getEnvironment = function() {
  return this._environment;
};

SonosJS.prototype._raiseError = function( type, errMsg ) {
  var error = {
    type: type || 'error',
    msg: errMsg
  };
  this.emit( 'error', error );
};

module.exports = SonosJS;
