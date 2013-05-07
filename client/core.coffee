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
		bindFileUpdates: () =>
			@.addRoute '/update/', (metadata) =>
				#metadata.route.shift()
				#metadata.route.shift()
				#metadata.route.shift()
				path = metadata.route.pop()
				file = path.replace('.coffee', '')
				module = file.charAt(0).toUpperCase() + file.slice(1);
				if @modules[module]? and @moduleList[module]? and @[file]?
					if @[file].unload?
						@[file].unload () =>
							newModuleList = {}
							newModuleList[module] = @moduleList[module]
							@[file] = null
							delete @[file]
							@.loadModules newModuleList, () =>
								console.log 'module', module, 'reloaded'
								@[file] = new @modules[module] @
						return false
				if @settings.uri?
					uri = 'http://'+@settings.uri+':'+@settings.www.port
				else
					uri = 'http://'+window.location.hostname+':'+@settings.www.port
				window.location = uri
		changeScene: (scene, metadata) => # Load and run named scene
			@currentScene.unload()
			if @loadedScenes[scene]?
				@currentScene = new @loadedScenes[scene] @, metadata
			else
				require [ 'scenes/'+scene ], (sceneClass) =>
					@loadedScenes[scene] = sceneClass
					@currentScene = new @loadedScenes[scene] @, metadata
		init: (callback) => # EZ start (init common classes)
			@.bindFileUpdates()
			@moduleList =
				'Socket': '/gamelabClient/classes/socket.js'
				'Input': '/gamelabClient/classes/input.js'
				'Canvas': '/gamelabClient/classes/canvas.js'
			@.loadModules @moduleList, () =>
				@socket = new @modules['Socket'] @
				@input = new @modules['Input'] @
				#@canvas = new @modules['Canvas'] @
				callback()