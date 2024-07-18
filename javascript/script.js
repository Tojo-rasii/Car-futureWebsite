const scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(18, 700 / 400, 0.1, 1000);

const colorInpt = document.getElementById('colorInpt');
const btnExplore = document.getElementById('btnExplore');
const closes = document.getElementById('close');
const values = document.getElementById('value');
const mouse = document.getElementById('mouse');


const inputs = document.querySelectorAll('input[type = "radio"]');
const inputAfter = document.querySelectorAll("input[type='radio']:after");
const iconBtn = document.querySelectorAll("footer section article:nth-child(2) i");



const headerContenu = document.querySelector('header section article:nth-child(2)');
const main = document.querySelector('main');
const article1 = document.querySelector('main section article:nth-child(1) ');
const article2 = document.querySelector('main section article:nth-child(3) ');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(700, 400);
const container = document.getElementById('container')
container.appendChild(renderer.domElement);

// Fond de la scène
scene.background = new THREE.Color('#0e0f10'); // Couleur de fond

// Lumières
const ambientLight = new THREE.AmbientLight(0x404040); // Lumière ambiante douce
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// Contrôles orbitaux
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0;
controls.screenSpacePanning = false;
controls.minDistance = 10;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

// Loader pour .glb
const loader = new THREE.GLTFLoader();
loader.load(
    'asset/2020_cavallo_bullet.glb',
    function (gltf) {
        const model = gltf.scene;

        // Accéder et modifier les matériaux de l'objet 3D
        // model.traverse((o) => {
        //     if (o.isMesh) {
        //         o.material.color.set('red'); // Change la couleur à rouge
        //     }
        // });

        scene.add(model);
        render();
    },
    undefined,
    function (error) {
        console.error('An error happened', error);
    }
);


camera.position.set(0, 1, 5);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

function render() {
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.scroll(0, 0)

window.addEventListener('scroll', scrollYs);

function scrollYs() {
    let value = scrollY;

    values.innerText = value;

    if (value === 0) {
        main.style.opacity = `1`;
        main.style.scale = 1;

    }
    if (value > 0) {
        value = 50;
        main.style.scale = `0.${value}`;

        if (value >= 50) {
            main.style.opacity = `0`;
        }

    }
}

let currentPagination = 0;

iconBtn.forEach(icon => {
    icon.addEventListener('click', () => {
        if (icon.previousElementSibling) {
            main.style.scale = `0.5`;
            alert('next')
        }
        if (icon.nextElementSibling) {
            main.style.scale = `1`;
            alert('prev')

        }
    })
})





const handleclick = () => {
    article1.style.opacity = '0';
    article2.style.opacity = '0';

    headerContenu.style.opacity = '0';
    headerContenu.style.marginRight = '3em';
    headerContenu.style.visibility = 'hidden';


    colorInpt.style.opacity = '1';
    colorInpt.style.marginRight = '5.1em';

    closes.style.opacity = '1';

    btnExplore.style.opacity = '0';
    btnExplore.style.marginTop = '3em';


    window.removeEventListener('scroll', scrollYs)

    controls.dampingFactor = 0.25;

    setTimeout(() => {

        camera.position.set(3, 3, 5);
        closes.style.display = 'block';
        colorInpt.style.display = 'block';
        mouse.style.opacity = '1';

    }, 500);

}


const handleclose = () => {
    article1.style.opacity = '1';
    article2.style.opacity = '1';

    headerContenu.style.opacity = '1';
    headerContenu.style.marginRight = '0';
    headerContenu.style.visibility = 'visible';


    colorInpt.style.opacity = '0';
    colorInpt.style.marginRight = '-3em';

    closes.style.opacity = '0';
    mouse.style.opacity = '0';

    btnExplore.style.opacity = '1';
    btnExplore.style.marginTop = '0';


    window.addEventListener('scroll', scrollYs);

    controls.dampingFactor = 0;



    setTimeout(() => {

        camera.position.set(0, 1, 5);
        headerContenu.style.display = 'block';
        colorInpt.style.display = 'none';
        closes.style.display = 'none';

    }, 300);

}


inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const checked = e.target.checked;
        const value = e.target.value;


    })
})