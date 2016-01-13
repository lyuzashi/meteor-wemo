WemoModule = Npm.require('wemo-client');


//WemoModule.prototype.discover = Meteor.wrapAsync(WemoModule.prototype.discover);

wemoConnect = new WemoModule();

Wemo = new Meteor.Collection('wemo', {
  transform: function(doc){
    return wemoConnect.client(doc);
  }
});

wemoConnect.discover(Meteor.bindEnvironment(function(deviceInfo) {
  //console.log('Wemo Device Found: %j', deviceInfo);
  //
  //// Get the client for the found device
  //var client = wemoConnect.client(deviceInfo);

  Wemo.upsert({UDN: deviceInfo.UDN}, deviceInfo);

}));


// Switches use wemo.setBinaryState(1)

// Sensors and switches use wemo.device.binaryState

// Watch all with wemo.on('binaryState', function(v){console.log(this, v)})

// Also 'statusChange' event and 'attributeList' event (for wemo maker only)