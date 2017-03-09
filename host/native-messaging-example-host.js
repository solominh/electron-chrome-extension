
var messenger = require('messenger');
var client = messenger.createSpeaker(6789);


process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    client.shout('SELECT_TEXT', { data: chunk });
  }

});

process.stdin.on('end', () => {
  console.log('end')
});



