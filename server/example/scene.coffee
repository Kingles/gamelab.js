define () ->
	class ExampleScene
		constructor: (@gameLab, @metadata) ->
			console.log 'example scene started with metadata', @metadata