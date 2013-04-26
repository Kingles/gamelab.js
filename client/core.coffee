define ["/shared/core.js"], (sharedGlabCore) ->
	class glabClient extends sharedGlabCore
		constructor: (@settings) ->
			super
		init: () =>
			console.log @settings