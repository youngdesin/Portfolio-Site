var container, 
    renderer, 
    scene, 
    camera, 
    mesh, 
    start = Date.now(),
    fov = 30;

window.addEventListener( 'load', function() {

    // grab the container from the DOM
    container = document.getElementById( "container" );
    
    // create a scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xff0000 );
    // create a camera the size of the browser window
    // and place it 100 units away, looking towards the center of the scene
    camera = new THREE.PerspectiveCamera( 
        fov, 
        window.innerWidth / window.innerHeight, 
        1, 
        10000 );
    camera.position.z = 200;
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene.add( camera );

material = new THREE.ShaderMaterial( {
      uniforms: { 
        time: { // float initialized to 0
            type: "f", 
            value: 0.0 
        }
    },
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
} );
    
    // create a sphere and assign the material
    mesh = new THREE.Mesh( 
        new THREE.IcosahedronGeometry( 20, 4 ), 
        material 
    );
    scene.add( mesh );
    
    // create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    container.appendChild( renderer.domElement );

    render();

} );

function render() {
    // uniform update
    material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
    // let there be light
    renderer.render( scene, camera );
    requestAnimationFrame( render );
    
}