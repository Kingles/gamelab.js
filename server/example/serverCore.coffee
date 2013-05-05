requireJS = require 'requirejs' unless requireJS?
requireJS ["settings.js", "../gamelab.js/server/core.js"], (settingsKlass, gameLabKlass) =>
	@settings = new settingsKlass()
	gameLab = new gameLabKlass(@settings)
	gameLab.init () =>
		# Server routes here