define () =>
	return class www
		constructor: (@settings) ->
			fs = require 'fs'
			http = require 'http'
			path = require 'path'
			debug = @settings.debug
			@server = http.createServer (request, response) =>
				request.url = request.url.replace '..', ''
				if request.url == '/'
					file = @settings.docRoot+'/client/index.html'
				else if request.url.substr(0, 8) == '/shared/'
					parts = request.url.split '/'
					parts.shift()
					parts.shift()
					file = @settings.docRoot+'/shared/'+parts.join('/')
				else
					file = @settings.docRoot+'/client/'+request.url
					parts= file.split '?'
					file = parts[0] if parts.length > 1
				switch path.extname(file)
					when '.js' then mime = 'text/javascript'
					when '.css' then mime = 'text/css'
					when '.png' then mime = 'image/png'
					when '.ico' then mime = 'image/vnd.microsoft.icon'
					when '.swf' then mime = 'application/x-shockwave-flash'
					when '.coffee' then file = '404'
					else mime = 'text/html'
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
								response.end data, 'utf-8'
					else
						console.log '404 Not Found', file if debug > 1
						response.writeHead 404, { 'Content-Type': 'text/html' }
						response.end '404', 'utf-8'
		init: () =>
			@server.listen @settings.port