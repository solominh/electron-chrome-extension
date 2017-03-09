
const messenger = require('messenger');
const server = messenger.createListener(6789);

server.on('SELECT_TEXT', function (message, data) {
  console.log(data);
});

