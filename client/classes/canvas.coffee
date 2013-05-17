define () ->
	# Setup
	return class Canvas
		constructor: (@scene, @settings) ->
			# Canvas constructor.
		boilerplate: () =>
			SCREEN_WIDTH = window.innerWidth
			SCREEN_HEIGHT = window.innerHeight
			# Scene + camera
			@scene.scene = new THREE.Scene()
			@scene.camera = new THREE.PerspectiveCamera( 45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 )
			@scene.camera.position.z = 300
			@scene.scene.add @scene.camera

			# Renderer
			@scene.renderer = new THREE.WebGLRenderer { antialias: true }
			@scene.renderer.domElement.style.position = "relative"
			@scene.renderer.autoClear = false
			$('body').append @scene.renderer.domElement
			@scene.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)

			# Renderer resize
			$(window).resize () =>
				SCREEN_WIDTH = window.innerWidth
				SCREEN_HEIGHT = window.innerHeight
				@scene.renderer.setSize SCREEN_WIDTH, SCREEN_HEIGHT
				@scene.camera.aspect = (SCREEN_WIDTH / SCREEN_HEIGHT)
				@scene.camera.updateProjectionMatrix();

			return @
		# Starts the renderer, a scene will call this. (Typically, the default scene would start the renderer when it is ready)
		initRender: () =>
			@clock = new Date
			@fpsFilter = 4
			@frames = 0
			@.render()
			if @scene.tickCalls?
				interval = 30
				setInterval(@.tick, 1000/interval)
		# Render loop - using requestAnimationFrame API.
		render: () =>
			# TODO: Update this to use a scene-defined renderer, scene and camera
			thisLoop = (thisTime = new Date) - @clock
			@frames+=(thisLoop - @frames) / @fpsFilter
			@clock = thisTime
			if @scene.scene and @scene.camera
				unless @scene.paused
					@scene.renderer.render @scene.scene, @scene.camera
			window.requestAnimationFrame @.render
		unload: () =>
			$(window).unbind('resize')
			$('body').html('')
		tick: () =>
			tock() for tock in @scene.tickCalls