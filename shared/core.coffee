# shared game lab core
# by Seandon Mooy
# Keep in mind, -everything here- needs to be interpretable by both Node
# and EVERY MODERN BROWSER. One does not simply 'add code' to shared core.
# expected global: requireJS
define () ->
	return class sharedGlabCore
		# System wide globals.
		constructor: () ->
			@modules = {}
			@moduleFilesLoaded = {}
			@events  = {}
		# Logger functionality
		log: () =>
			Function.apply.call console.log, console, arguments
		# Provided a list of modules, loads and calls back
		# { Name: filePath }
		# loadModules({name: path}, callback)
		loadModules: (moduleList, callback) =>
			# Load modules and callback when complete
			fileList = []
			for moduleName, modulePath of moduleList
				# Don't load twice.
				#unless @moduleFilesLoaded[modulePath]?
				#	@moduleFilesLoaded[modulePath] = true
				fileList.push modulePath 
			try
				# If a module actually needs to be loaded
				if fileList.length > 0
					for module in fileList
						require.undef module
					require fileList, () =>
						for klass in arguments
							@modules[klass.name] = klass
						callback()
				# If not, probably bad coding - TODO: log error quietly that we're double loading.
				# otherwise, callback anyways.
				else
					callback()
			catch error
				@.log "loadModules error"
				throw error
		loadModule: (moduleName, modulePath, callback) =>
			return false if @modules[moduleName]?
			require.undef modulePath
			require [ modulePath ], (thisModule) =>
				@modules[moduleName] = thisModule
				callback()
		# Adds an event to @events
		addRoute: (route, callback) =>
			# Complex route
			if route.substr(0, 1) == '/'
				parts = route.split '/'
				parts.shift()
				eventName = parts.shift()
				if parts.length > 0
					@events[eventName] = { map: parts, callback: callback }
				else
					@events[eventName] = { callback: callback }
			# Simple route
			else
				@events[route] = { callback: callback }
		# Finds existing events based on provided route and runs them
		findRoute: (route, metadata) =>
			metadata = false unless metadata?
			if @events[route]?
				@.runRoute route, metadata
			else
				style = route.substr(0, 1)
				if style == '/'
					parts = route.split '/'
					parts.shift()
					routeName = parts.shift()
					@.runRoute routeName, metadata, parts
				else
					@.log 'Unknown route style', style
		runRoute: (route, metadata, data) =>
			return false unless @events[route]?
			#data = false if !data?
			#if data? and @events[route].map?
			#	# map options to option name
			#else
			@events[route].callback(metadata, data)
		delRoute: (route) =>
			return true unless @events[route]?
			@events[route] = null
			delete @events[route]