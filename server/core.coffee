requireJS = require 'requirejs' unless requireJS?
requireJS ["../shared/core.js"], (sharedGlabCore) =>
	class glabServer extends sharedGlabCore
		constructor: () ->
			@db = @www = @sockServer = {}
			super
		init: () =>
			modulesToLoad =
				'settings': 'classes/settings.js'
				'www': 'classes/www.js'
				'db': 'classes/db.js'
				'sockServer': 'classes/sockServer.js'
				'gameServer': 'classes/gameServer.js'
			@.loadModules modulesToLoad, () =>
				@settings = new @modules['settings']
				@db = new @modules['db'] @settings.db
				@db.init () =>
					@sockServer = new @modules['sockServer'] @, @settings.sockServer
					@sockServer.init () =>
						@www = new @modules['www'] @, @settings.www, @settings.clientSettings
						@www.init () =>
							@gameServer = new @modules['gameServer'] @, @settings.gameSettings
							@gameServer.init () =>
								@.log 'boot complete'
					

	server = new glabServer()
	server.init()