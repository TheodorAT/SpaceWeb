import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// System variables:
const sunPosition = new THREE.Vector3(-200, 0, 0);
const cameraOrigin = new THREE.Vector3(sunPosition.x, 0, 300);
const sunRadius = 25;
const planetSpacing = 50;
const planetSpacingScaling = 1.1;

// Creating a scene:
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

// Setting up the renderer and camera:
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(cameraOrigin.x, cameraOrigin.y, cameraOrigin.z);
renderer.render(scene, camera);

// Adding a torus:
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({
//   color: 0xff6347,
// });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// Adding lights: We will add a point light for each celestial body
const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(18, 0, 0);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Adding helpers:
const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// Adding stars:
const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});

function addStar() {
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(1000).fill().forEach(addStar);

// Adding a background:
const spaceTexture = new THREE.TextureLoader().load("images/space.jpeg");
scene.background = spaceTexture;

// Adding the planets:

// Function for calculating the spacing between planets:
function getPlanetXCoord(index) {
  return (
    sunPosition.x +
    sunRadius +
    planetSpacing * (index + 1) * Math.pow(planetSpacingScaling, index)
  );
}

// Adding the sun:
const sunTexture = new THREE.TextureLoader().load("images/sun.jpg");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(sunRadius, 32, 32),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
  })
);
sun.position.set(sunPosition.x, sunPosition.y, sunPosition.z);
scene.add(sun);

// Mercury:
const mercuryTexture = new THREE.TextureLoader().load("images/mercury.jpg");
const mercuryNormalTexture = new THREE.TextureLoader().load(
  "images/mercury_normal_map.jpg"
);
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
    normalMap: mercuryNormalTexture,
  })
);
mercury.position.set(getPlanetXCoord(0), 0, 0);
scene.add(mercury);

// Venus:
const venusTexture = new THREE.TextureLoader().load("images/venus.jpg");
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
venus.position.set(getPlanetXCoord(1), 0, 0);
scene.add(venus);

// Adding the earth:
const earthTexture = new THREE.TextureLoader().load("images/earth.jpg");
const earthNormalTexture = new THREE.TextureLoader().load(
  "images/earth_normal_map.tif"
);
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earth.position.set(getPlanetXCoord(2), 0, 0);
scene.add(earth);

// Adding the moon:
const moonTexture = new THREE.TextureLoader().load("images/moon.jpg");
const moonNormalTexture = new THREE.TextureLoader().load(
  "images/moon_normal_map.jpg"
);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalTexture,
  })
);
moon.position.set(earth.position.x + 10, 10, 0);
scene.add(moon);

// Mars:
const marsTexture = new THREE.TextureLoader().load("images/mars.jpg");
const marsNormalTexture = new THREE.TextureLoader().load(
  "images/mars_normal_map.jpg"
);
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: marsNormalTexture,
  })
);
mars.position.set(getPlanetXCoord(3), 0, 0);
scene.add(mars);

// Jupiter:
const jupiterTexture = new THREE.TextureLoader().load("images/jupiter.jpg");
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(getPlanetXCoord(4), 0, 0);
scene.add(jupiter);

// Saturn:
const saturnTexture = new THREE.TextureLoader().load("images/saturn.jpg");
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);
saturn.position.set(getPlanetXCoord(5), 0, 0);
scene.add(saturn);

// Adding the rings of Saturn:
const ringTexture = new THREE.TextureLoader().load("images/saturn_ring.png");
const ring = new THREE.Mesh(
  new THREE.RingGeometry(12, 20, 32),
  new THREE.MeshStandardMaterial({
    map: ringTexture,
    side: THREE.DoubleSide,
  })
);
ring.rotation.x = Math.PI / 2;
ring.position.set(saturn.position.x, saturn.position.y, saturn.position.z);
scene.add(ring);

// Uranus:
const uranusTexture = new THREE.TextureLoader().load("images/uranus.jpg");
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);
uranus.position.set(getPlanetXCoord(6), 0, 0);
scene.add(uranus);

// Neptune:
const neptuneTexture = new THREE.TextureLoader().load("images/neptune.jpg");
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);
neptune.position.set(getPlanetXCoord(7), 0, 0);
scene.add(neptune);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  var cameraPivot = new THREE.Vector3(0, 0, 0);
  document.getElementById("value").innerText =
    "\n CameraPosition.x: " +
    camera.position.x +
    "\n CameraPivot.x: " +
    cameraPivot.x;

  const pivotLimit = -17000;
  const pivotX = cameraOrigin.x + pivotLimit * 0.004;
  const pivotZ = cameraOrigin.z + pivotLimit * 0.02;
  if (t > pivotLimit) {
    camera.position.x = cameraOrigin.x + t * 0.004;
    camera.position.z = cameraOrigin.z + t * 0.02;
    camera.lookAt(0, 0, 0);
    controls.update();
  } else {
    camera.position.x = pivotX - (t - pivotLimit) * 0.03;
    camera.position.z = pivotZ - (t - pivotLimit) * 0.005;
    camera.lookAt(1000, 0, 0);
    controls.update();
  }
}

document.body.onscroll = moveCamera;

// Animating the scene:
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
