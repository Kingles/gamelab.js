define ["/shared/core.js"], (sharedGlabCore) ->
	class glabClient extends sharedGlabCore
		constructor: (@settings) ->
			super
		init: () =>
			###
			modulesToLoad =
				'threejs': '/libs/Three.js'
			@.loadModules modulesToLoad, () =>
				console.log @modules
			###