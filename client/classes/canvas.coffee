define () ->
	# Setup
	return class Canvas
		constructor: (@gameLab) ->
			@renderer = new THREE.WebGLRenderer @gameLab.settings.renderSettings
			document.body.appendChild @renderer.domElement
			windowSize = @.windowSize()
			@renderer.setSize(windowSize.w, windowSize.h)
			#$(window).resize () =>
			#	windowSize = @windowSize()
			#	if @e13.scene
			#		@e13.scene.camera.aspect = windowSize.a
			#	@renderer.setSize(windowSize.w, windowSize.h)
		windowSize: () =>
			@h = window.innerHeight
			@w = window.innerWidth
			return {
				h: @h
				w: @w
				a: @w/@h
			}
