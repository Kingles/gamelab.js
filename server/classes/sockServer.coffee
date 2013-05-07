define () =>
	return class sockServer
		constructor: (@glabCore, @settings) ->
			# Libraries
			@socketio = require 'socket.io'
			@socket = {}
			@connections = []
		# Function extensions
		addRoute: (route, callback) =>
			@glabCore.addRoute route, callback
		findRoute: (route, metadata) =>
			@glabCore.findRoute route, metadata
		runRoute: (route, metadata) =>
			@glabCore.runRoute route, metadata
		# fileUpdate from ww
		fileUpdate: (file) =>
			#console.log 'socket file update', file
			@.broadcast '/update/'+file
		broadcast: (msg) =>
			for i, con of @connections
				con.send msg if con? and con.send?
		# sockSever start -> open port + bind events
		init: (callback) =>
			@socket = @socketio.listen @settings.port, { 'log level': 1 }
			@socket.sockets.on 'connection', (sock) =>
				@connections[sock.id] = sock
				sock.on 'message', (data) =>
					@.findRoute data, sock.id
				sock.on 'disconnect', () =>
					@connections[sock.id] = null
			callback()