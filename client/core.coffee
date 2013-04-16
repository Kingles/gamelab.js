requireJS ["../shared/core.js"], (sharedGlabCore) =>
	class glabClient extends sharedGlabCore
		constructor: () ->
			console.log 'sdfsd client core start'
			super