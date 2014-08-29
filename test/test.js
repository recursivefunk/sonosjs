
/*global describe:false, it:false*/

'use strict';

var should    = require( 'should' );
var SonosJS   = require( '../index' );

describe('SonosJS', function(){

  var sonosjs;

  it('Discovers Zones', function(done){
    sonosjs = new SonosJS().on( 'ready', function(zones){
       zones.should.be.ok;
       zones.length.should.be.above( 0 );
       done();
    })
  });

});