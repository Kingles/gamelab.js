define () =>
	return class www
		constructor: (@sharedGlabCore, @settings, @clientSettings) ->
			fs = require 'fs'
			http = require 'http'
			path = require 'path'
			debug = @settings.debug
			@server = http.createServer (request, response) =>
				# Prevent directory traversal
				request.url = request.url.replace '..', ''
				# Remove URL arguments, if there are any
				urlArgs = request.url.split '?'
				request.url = urlArgs[0] if urlArgs.length > 1
				# Index file
				if request.url == '/'
					file = @settings.docRoot+'/client/index.html'
				# Direct shared resources correctly.
				else if request.url.substr(0, 8) == '/shared/'
					parts = request.url.split '/'
					parts.shift()
					parts.shift()
					file = @settings.docRoot+'/shared/'+parts.join('/')
				# Append docRoot/client/ to all other requests
				else
					file = @settings.docRoot+'/client/'+request.url
				# Find extension name and get MIMETYPE from settings
				extension = path.extname(file)
				if @settings.mimes[extension]?
					mime = @settings.mimes[extension]
				else
					file = '404.htm'
					mime = @settings.mimes['.htm']
				# Check if file exists
				fs.exists file, (ok) =>
					if ok
						console.log '200 OK', file if debug > 3
						fs.readFile file, (error, data) =>
							if error
								@e13.log '500: ', '"'+file+'"', error
								response.writeHead 500
								response.end()
							else
								response.writeHead 200, { 'Content-Type': mime }
								response.end @.process(file, data), @settings.encoding
					else
						# TODO: look for 404.htm file and read that, if it exists.
						console.log '404 Not Found', file if debug > 1
						response.writeHead 404, { 'Content-Type': 'text/html' }
						response.end '404', 'utf-8'
		# Start the server
		init: (callback) =>
			@server.listen @settings.port
			callback()
		process: (fileName, fileData) =>
			if fileName.substr(-10) == 'index.html'
				fileData = String(fileData).replace('{{SETTINGS}}', @clientSettings)
			return fileData