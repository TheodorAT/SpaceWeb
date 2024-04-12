import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

const cameraOrigin = new THREE.Vector3(0, 0, 100);

// Setting up the renderer and camera:
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(cameraOrigin.x, cameraOrigin.y, cameraOrigin.z);
renderer.render(scene, camera);

// Adding a torus:
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Adding lights:
const pointLight = new THREE.PointLight(0xffffff, 500);
pointLight.position.set(40, -10, 20);
scene.add(pointLight);

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
    .map(() => THREE.MathUtils.randFloatSpread(300));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(400).fill().forEach(addStar);

// Adding a background:
const spaceTexture = new THREE.TextureLoader().load("images/space.jpeg");
scene.background = spaceTexture;

// Adding avatar box:
const profileTexture = new THREE.TextureLoader().load("images/profile.jpg");
const profile = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: profileTexture })
);
scene.add(profile);

// Adding a moon:
const moonTexture = new THREE.TextureLoader().load("images/moon.jpg");
const moonNormalTexture = new THREE.TextureLoader().load(
  "images/moon_normal_map.jpg"
);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormalTexture,
  })
);
moon.position.set(-10, 0, 20);
scene.add(moon);

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
earth.position.set(10, 0, 20);
scene.add(earth);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  profile.rotation.y += 0.01;
  profile.rotation.z += 0.01;

  document.getElementById("value").innerText = t;

  camera.position.x = cameraOrigin.x + t * 0.002;
  camera.position.y = cameraOrigin.y + t * 0.002;
  camera.position.z = cameraOrigin.z + t * 0.01;
}

document.body.onscroll = moveCamera;

// Animating the scene:
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
animate();
