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
				'docRoot': '/home/eru/projects/gamelab.js/'
				'encoding': 'utf-8'
				'mimes': {
					# Note: Do not add MIMEs for files you don't want read!
					# If a file's MIME is not listed here, it will return 404.
					'.js': 'text/javascript'
					'.css': 'text/css'
					'.png': 'image/png'
					'.ico': 'image/vnd.microsoft.icon'
					'.swf': 'application/x-shockwave-flash'
					'.html': 'text/html'
					'.htm': 'text/html'
				}
			}
			@sockServer = {
				'port': 8081
			}