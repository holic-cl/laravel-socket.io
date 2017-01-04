var server = require('http').Server()

var io = require('socket.io')(server)

var Redis = require('ioredis')
var redis = new Redis()

redis.subscribe('test-channel')

redis.on('message', function(channel, message){
	console.log(message, channel)
	message = JSON.parse(message)

	io.emit(channel + ':' + message.event, message.data.notification)
});

server.listen(3000)