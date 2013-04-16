define () =>
	return class settings
		constructor: () ->
			debug = 1
			@db = {
				'type': 'mongodb'
			}
			@www = {
				'debug': debug
				'port': 8080
				'docRoot': '../client/'
			}
			@sockServer = {
				'port': 8081
			}