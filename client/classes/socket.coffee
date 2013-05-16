define () ->
	return class Socket
		constructor: (@gameLab) ->
			@refresh = true
			window.WEB_SOCKET_SWF_LOCATION = '/libs/WebSocketMain.swf'
			if @gameLab.settings.uri?
				uri = 'ws://'+@gameLab.settings.uri+':'+@gameLab.settings.game.port
			else
				uri = 'ws://'+window.location.hostname+':'+@gameLab.settings.game.port
			console.log 'connecting to', uri if @gameLab.settings.debug > 2
			@socket = io.connect(uri)
			@socket.on 'connect', () =>
				@socket.on 'message', (message) =>
					console.log 'Getting ', message if @gameLab.settings.debug > 2
					@gameLab.findRoute message
				@socket.on 'disconnect', () =>
					@.socketEnd() if @refresh
		socketEnd: () =>
			console.log 'Server down' if @gameLab.settings.debug > 2
			timer = false
			restart = () =>
				clearInterval(timer)
				window.location = @gameLab.getURI()
			timer = setInterval(restart, 500)
		send: (line) =>
			console.log 'Sending ', line if @gameLab.settings.debug > 2
			@socket.send line
		unload: (callback) =>
			window.location = @gameLab.getURI()
			#@refresh = false
			#@socket.disconnect()
			#callback()