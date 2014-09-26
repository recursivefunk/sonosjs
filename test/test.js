
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
      
        .on('sync', function(){
          var zones = this.getEnvironment().getZones();
          zones.should.be.ok;
          zones.length.should.be.above( 0 );
          logger.debug( 'Found ' + zones.length + ' zone(s)' );
          zones.forEach(function(zone){
            // verify the zone has a name
            zone.getName().should.be.ok;

            // verify the zone's state
            zone.getState().should.be.ok;

            // verify the zone has a coordinator
            zone.getZoneCoordinator().should.be.ok;
          });
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
