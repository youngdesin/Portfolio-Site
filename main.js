    /* Three.JS script */
    var container,
            renderer,
        scene,
        camera,
        mesh,
        start = Date.now(),
        fov = 30;
        
    window.addEventListener( 'load', function() {
    //grab the container from the DOM
    container = document.getElementById('container');
    
    //create a scene
    scene = new THREE.Scene();
    
    //create a camera the size of the browser window
    //place it 100 units away, looking towards the center of the scene
    camera = new THREE.PerspectiveCamera(
        fov,
      container.clientWidth / container.clientHeight,
      1,
      10000
      );
    camera.position.z=100;
    
    //create wireframe material
    material = new THREE.ShaderMaterial({
        uniforms: {
            tExplosion: {
                type:'t',
                value: THREE.TextureLoader('')
            },
            time: {
                type: 'f',
                value: 0.0
            }
        },
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentShader' ).textContent
      } );
      
    //create a sphere and assign the material
    mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(20, 4),
      material
      );
    scene.add( mesh );
    
    //create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    container.appendChild(renderer.domElement);
    
    render();
    } );
    
    function render() {
        material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start);
        renderer.render( scene, camera );
      requestAnimationFrame ( render );
    }