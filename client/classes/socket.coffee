define () ->
	return class Socket
		constructor: (@gameLab) ->
			window.WEB_SOCKET_SWF_LOCATION = '/libs/WebSocketMain.swf'
			if @gameLab.settings.uri?
				uri = 'ws://'+@gameLab.settings.uri+':'+@gameLab.settings.game.port
			else
				uri = 'ws://'+window.location.hostname+':'+@gameLab.settings.game.port
			console.log 'connecting to', uri if @gameLab.settings.debug > 2
			@socket = io.connect(uri)
			@socket.on 'connect', () =>
				@socket.on 'message', (message) =>
					@gameLab.findRoute message
				@socket.on 'disconnect', () =>
					@.socketEnd()
		socketEnd: () =>
			console.log 'Server down - restarting' if @gameLab.settings.debug > 1
			if @gameLab.settings.uri?
				uri = 'http://'+@gameLab.settings.uri+':'+@gameLab.settings.www.port
			else
				uri = 'http://'+window.location.hostname+':'+@gameLab.settings.www.port
			timer = false
			restart = () =>
				clearInterval(timer)
				window.location = uri
			timer = setInterval(restart, 1000)
		send: (line) =>
			console.log 'Sending ', line if @gameLab.settings.debug > 2
			@socket.send line