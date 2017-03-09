
var nativeMessage = require('chrome-native-messaging');
var messenger = require('messenger');
var client = messenger.createSpeaker(6789);


let inputStream = new nativeMessage.Input();
process.stdin.pipe(inputStream);
inputStream.on('data', (data) => {
  // process.stderr.write(JSON.stringify(data));
  client.shout('SELECT_TEXT', data);
})

