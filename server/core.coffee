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
			@.loadModules modulesToLoad, () =>
				@settings = new @modules['settings']
				if @settings.db?
					@db = new @modules['db'] @settings.db
					@db.init()
				if @settings.www?
					@www = new @modules['www'] @settings.www, @settings.clientSettings
					@www.init()
				if @settings.sockServer?
					@sockServer = new @modules['sockServer'] @settings.sockServer
					@sockServer.init()
	server = new glabServer()
	server.init()