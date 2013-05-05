define () ->
	return class Input
		constructor: (@gameLab) ->
			@mouse =
				x: 0		# Xposition
				y: 0		# Yposition
				l: off		# Left button status
				r: off		# Right button status
				scroll:	0
				onGui: off	# Is cursor over gui object?
			@keyboard = KeyboardJS	# http://robertwhurst.github.com/KeyboardJS/
		bindMouse: () =>
			$(window).mousedown (e) =>
				@mouse.x = e.clientX
				@mouse.y = e.clientY
				console.log @mouse.x, @mouse.y
				if @mouse.onGui
					return false
				else
					e.preventDefault()
				
				switch e.which
					when 1
						@mouse.l = on
					when 3
						@mouse.r = on
				@e13.click e.which unless @e13.scene.paused
			$(window).mouseup (e) =>
				@mouse.l = off if e.which == 1
				@mouse.r = off if e.which == 3
		bindMouseWheel: () =>
			$(window).bind 'mousewheel', (e, delta, dX, dY) =>
				if delta < 0
					@mouse.scroll -= 1 unless @mouse.scroll < 1
				else
					@mouse.scroll += 1 unless @mouse.scroll >= 8
				#@e13.scene.zoom() if @e13.scene.zoom?