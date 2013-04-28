define () =>
	return class gameServer
		constructor: (@glabCore, @settings) ->
			#@glabCore.log 'gameserver created'
		init: (callback) =>
			callback()