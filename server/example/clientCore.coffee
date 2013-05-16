define ["gamelabClient/core.js"], (clientGlabCore) ->
	class glabClient extends clientGlabCore
		constructor: (@settings) ->
			super
		init: () =>
			# Call super(callback) to init base classes. callback() is a function that
			# in run when all modules are loaded.
			super () =>
				
				# How to load modules using @.loadModules():
				#	modulesToLoad =
				#		'canvas': '/gamelabClient/classes/canvas.js'
				#	@.loadModules modulesToLoad, () =>
				#		#canvas = new @modules['Canvas'] @
				# Canvas, as well as a few others (Input and Socket) are provided. (Reloading them is a waste!)
				# Rendering and gamecode "ticking" pause
				@paused = no
				# Functions attached to the "ticking"
				@tickCalls = []
				# Build our canvas
				@canvas = new @modules['Canvas'] @
				@canvas.boilerplate().initRender()
				# We now have @camera, @scene and @renderer
				@.changeScene 'example', { some: 'options here' }