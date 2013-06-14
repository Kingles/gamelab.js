define () ->
	# Setup
	return class Canvas
		constructor: (@scene, @settings) ->
			# Canvas constructor.
		boilerplate: () =>
			@screen_width = window.innerWidth
			@screen_height = window.innerHeight
			# Scene + camera
			if Physijs?
				@scene.scene = new Physijs.Scene
			else
				@scene.scene = new THREE.Scene()
			@scene.camera = new THREE.PerspectiveCamera( 45, @screen_width / @screen_height, 1, 10000 )
			@scene.camera.position.z = 300
			@scene.scene.add @scene.camera

			# Renderer
			@scene.renderer = new THREE.WebGLRenderer { antialias: true }
			@scene.renderer.domElement.style.position = "relative"
			@scene.renderer.autoClear = false
			$('body').append @scene.renderer.domElement
			@scene.renderer.setSize(@screen_width, @screen_height)

			# Renderer resize
			$(window).resize () =>
				@screen_width = window.innerWidth
				@screen_height = window.innerHeight
				@scene.renderer.setSize @screen_width, @screen_height
				@scene.camera.aspect = (@screen_width / @screen_height)
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
					@scene.scene.simulate( undefined, 1 ) if @scene.scene.simulate?
					@scene.renderer.render @scene.scene, @scene.camera
			window.requestAnimationFrame @.render
		unload: () =>
			$(window).unbind('resize')
			$('body').html('')
		tick: () =>
			tock() for tock in @scene.tickCalls
