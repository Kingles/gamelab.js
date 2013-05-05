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
				# A common canvas setup + binding place.
				# as with (hopefully) most of gamelab.js,
				# each tool is stand-alone and optional
				# @canvas = new @modules['Canvas'] @
				# For this game, we'll handle our canvas directly in the scene.
				@.changeScene 'example', { some: 'options here' }