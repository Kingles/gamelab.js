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
					console.log message
					@gameLab.findRoute message
				@socket.on 'disconnect', () =>
					@.socketEnd() if @refresh
		socketEnd: () =>
			console.log 'Server down' if @gameLab.settings.debug > 1
			if @gameLab.settings.uri?
				uri = 'http://'+@gameLab.settings.uri+':'+@gameLab.settings.www.port
			else
				uri = 'http://'+window.location.hostname+':'+@gameLab.settings.www.port
			timer = false
			restart = () =>
				clearInterval(timer)
				window.location = uri
			timer = setInterval(restart, 100)
		send: (line) =>
			console.log 'Sending ', line if @gameLab.settings.debug > 2
			@socket.send line
		unload: (callback) =>
			if @gameLab.settings.uri?
				uri = 'http://'+@gameLab.settings.uri+':'+@gameLab.settings.www.port
			else
				uri = 'http://'+window.location.hostname+':'+@gameLab.settings.www.port
			window.location = uri
			#@refresh = false
			#@socket.disconnect()
			#callback()