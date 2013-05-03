define ["/gamelabShared/core.js"], (sharedGlabCore) ->
	class glabClient extends sharedGlabCore
		constructor: (@settings) ->
			super
		init: () =>
			modulesToLoad =
				'socket': '/gamelabClient/classes/socket.js'
			@.loadModules modulesToLoad, () =>
				@socket = new @modules['Socket'] @