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
			@tickCalls = []
			super # Run Gamelab share core constructor
		bindFileUpdates: () =>
			@.addRoute '/update/', (metadata, data) =>
				#console.log metadata, data
				path = data.pop()
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
				else if @loadedScenes[file]?
					if @currentScene instanceof @loadedScenes[file]
						#metadata = @currentScene.metadata if @currentScene.metadata?
						#console.log 'current scene has been updated'
						@loadedScenes[file] = null
						delete @loadedScenes[file]
						@.changeScene file
					else
						#console.log 'a loaded scene has been updated'
						@loadedScenes[file] = null
						delete @loadedScenes[file]
				else
					window.location = @.getURI()
		changeScene: (scene, metadata) => # Load and run named scene
			@currentScene.unload() if @currentScene.unload?
			#if @loadedScenes[scene]?
			#	@currentScene = new @loadedScenes[scene] @, metadata
			#else
			require.undef 'scenes/'+scene
			require [ 'scenes/'+scene ], (sceneClass) =>
				@loadedScenes[scene] = sceneClass
				@currentScene = new @loadedScenes[scene] @, metadata
		getURI: () =>
			if @settings.uri?
				uri = 'http://'+@settings.uri+':'+@settings.www.port
			else
				uri = 'http://'+window.location.hostname+':'+@settings.www.port
			return uri
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
		# Starts the renderer, a scene will call this. (Typically, the default scene would start the renderer when it is ready)
		initRender: () =>
			@clock = new Date
			@fpsFilter = 4
			@frames = 0
			@.render()
			if @settings.tickInterval?
				interval = @settings.tickInterval
			else
				interval = 30
			setInterval(@.tick, 1000/interval)
		# Render loop - using requestAnimationFrame API.
		render: () =>
			console.log 'DEPRECATED - PLEASE USE CLASSES/CANVAS'
			# TODO: Update this to use a scene-defined renderer, scene and camera
			thisLoop = (thisTime = new Date) - @clock
			@frames+=(thisLoop - @frames) / @fpsFilter
			@clock = thisTime
			if @currentScene
				if @currentScene.scene and @currentScene.camera
					unless @currentScene.paused
						@renderer.render @currentScene.scene, @currentScene.camera
			window.requestAnimationFrame @.render
		tick: () =>
			#for tock in @ticks
			tock() for tock in @tickCalls
			#for tock in @tickCalls
			#	#console.log tock
