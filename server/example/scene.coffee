define () ->
	class ExampleScene
		constructor: (@gameLab, @metadata) ->
			sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000, wireframe: yes })
			@sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 16, 16), sphereMaterial)
			@gameLab.scene.add @sphere

			@pointLight = new THREE.PointLight(0xFFFFFF)
			@pointLight.position.x = 10
			@pointLight.position.y = 50
			@pointLight.position.z = 130
			@gameLab.scene.add(@pointLight)

			@gameLab.tickCalls.push () =>
				@sphere.rotation.y -= 0.1
				@sphere.rotation.x -= 0.1
		# If you're using the quick-reload, make sure to clean up your scenes!
		# This is good practice anyways!
		unload: () =>
			@gameLab.scene.remove( @pointLight )
			@gameLab.scene.remove( @sphere )
			@tickCalls = []