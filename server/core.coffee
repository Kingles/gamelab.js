define ["../shared/core.js"], (sharedGlabCore) =>
	class glabServer extends sharedGlabCore
		constructor: (@settings) ->
			@db = @www = @sockServer = {}
			super
		init: (callback) =>
			modulesToLoad =
				#'settings': 'classes/settings.js'
				'www': @settings.root+'/gamelab.js/server/classes/www.js'
				'db': @settings.root+'/gamelab.js/server/classes/db.js'
				'sockServer': @settings.root+'/gamelab.js/server/classes/sockServer.js'
				'gameServer': @settings.root+'/gamelab.js/server/classes/gameServer.js'
			@.loadModules modulesToLoad, () =>
				#@settings = new @modules['settings']
				@db = new @modules['db'] @settings.db
				@db.init () =>
					# DB test
				@sockServer = new @modules['sockServer'] @, @settings.sockServer
				@sockServer.init () =>
				@www = new @modules['www'] @, @settings.www, @settings.clientSettings
				@www.init () =>
					# WWW test
				@gameServer = new @modules['gameServer'] @, @settings.gameSettings
				@gameServer.init () =>
					# Gameserver test
					callback()
	###
	server = new glabServer()
	server.init()
	###