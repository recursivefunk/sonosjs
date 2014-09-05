
/* global describe:false, it:false */

'use strict';

var should    = require( 'should' );
var logger    = require( 'luvely' );
var SonosJS   = require( '../index' );

describe('SonosJS', function(){

  var sonosjs;

  it('Discovers Zones', function(done){

    sonosjs =

      new SonosJS()

      .on('sync', function(zones){
         zones.should.be.ok;
         zones.length.should.be.above( 0 );
         done();
      })

      // there are probably no zones on the network
      .on('error', function(err){
        err.type.should.equal( 'sync' );
        logger.error( err.msg );
        done();
      });

  });

});