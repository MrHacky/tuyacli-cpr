const mqtt = require('mqtt')
const child_process = require('child_process');

var host = process.argv[2];
var username = process.argv[3];
var password = process.argv[4];

console.log('Connecting');
const client  = mqtt.connect(`mqtt://${host}`, { username, password });

client.on('error', function(err) {
    console.log("Error", err);
});

client.on('connect', function () {
  console.log('Connected');
  client.subscribe('tuyacli-cpr', function (err) {
    if (!err) {
        console.log('Subscribed');
        client.publish('tuyacli-cpr', 'Test Message')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  try {
      var m = JSON.parse(message.toString());
      if (m.command == "revive" && m.id && m.key) {
          console.log("Executing 'revive' command");
          // node_modules\.bin\tuya-cli get --id 6608316710521cc7224b --key ca22cf0b5fea30b6
          var cp = child_process.spawn(
              'node_modules/.bin/tuya-cli',
              [
                'get',
                '--id', m.id,
                '--key', m.key,
              ],
              {
                  stdio: 'inherit',
              }
          );
          setTimeout(() => cp.kill(), 60*1000);
      }
  } catch (e) {
      console.log("Exception", e);
  }
});