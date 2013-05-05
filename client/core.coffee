# Gamelab Client Core
define ["/gamelabShared/core.js"], (sharedGlabCore) ->
	class glabClient extends sharedGlabCore
		constructor: (@settings) ->
			@sceneTemplate = # Blank scene
				'name': 'template'
				'unload': () =>
					return false
			@currentScene = @sceneTemplate
			@loadedScenes = {}
			super # Run Gamelab share core constructor
		changeScene: (scene, metadata) => # Load and run named scene
			@currentScene.unload()
			if @loadedScenes[scene]?
				@currentScene = new @loadedScenes[scene] @, metadata
			else
				require [ 'scenes/'+scene ], (sceneClass) =>
					@loadedScenes[scene] = sceneClass
					@currentScene = new @loadedScenes[scene] @, metadata
		init: (callback) => # EZ start (init common classes)
			modulesToLoad =
				'socket': '/gamelabClient/classes/socket.js'
				'input': '/gamelabClient/classes/input.js'
				'canvas': '/gamelabClient/classes/canvas.js'
			@.loadModules modulesToLoad, () =>
				@socket = new @modules['Socket'] @
				@input = new @modules['Input'] @
				#@canvas = new @modules['Canvas'] @
				callback()