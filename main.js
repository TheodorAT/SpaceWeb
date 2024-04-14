import "./style.css";
import * as THREE from "three";

// System variables:
const planetSpacing = 70;
const sunPosition = new THREE.Vector3(-200, 0, 0);
const cameraOrigin = new THREE.Vector3(
  sunPosition.x + 3 * planetSpacing,
  0,
  300
);
const sunRadius = 25;

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
const spaceTexture = new THREE.TextureLoader().load("images/milky_way.jpg");
scene.background = spaceTexture;

// Adding the planets:

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
mercury.position.set(sunPosition.x + sunRadius + planetSpacing - 10, 0, 13);
scene.add(mercury);

// Venus:
const venusTexture = new THREE.TextureLoader().load("images/venus.jpg");
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  })
);
venus.position.set(mercury.position.x + planetSpacing + 15, 0, 0);
scene.add(venus);

// Adding the earth:
const earthTexture = new THREE.TextureLoader().load("images/earth2.jpg");
const earthNormalTexture = new THREE.TextureLoader().load(
  "images/earth_normal_map.tif"
);
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);
earth.position.set(venus.position.x + planetSpacing + 1, 0, 4);
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
const moonOrbitRadius = 13;
moon.position.set(earth.position.x + moonOrbitRadius, earth.position.y, 0);
scene.add(moon);

// Mars:
const marsTexture = new THREE.TextureLoader().load("images/mars.jpg");
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);
mars.position.set(earth.position.x + planetSpacing, 0, 3);
scene.add(mars);

// Jupiter:
const jupiterTexture = new THREE.TextureLoader().load("images/jupiter.jpg");
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.set(mars.position.x + planetSpacing + 5, 0, 0);
scene.add(jupiter);

// Saturn:
const saturnTexture = new THREE.TextureLoader().load("images/saturn.jpg");
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(8, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);
saturn.position.set(jupiter.position.x + planetSpacing + 50, 0, 15);
scene.add(saturn);

// Adding the rings of Saturn:
const ringTexture = new THREE.TextureLoader().load("images/saturn_ring.jpg");
const ring = new THREE.Mesh(
  new THREE.CylinderGeometry(12, 20, 0, 64, 1, true),
  new THREE.MeshBasicMaterial({
    map: ringTexture,
    side: THREE.DoubleSide,
  })
);
ring.rotation.x = Math.PI / 6;
ring.rotation.y = -Math.PI / 4;
ring.rotation.z = Math.PI / 6;
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
uranus.position.set(saturn.position.x + planetSpacing - 10, 0, 5);
scene.add(uranus);

// Neptune:
const neptuneTexture = new THREE.TextureLoader().load("images/neptune.jpg");
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);
neptune.position.set(uranus.position.x + planetSpacing + 7, 0, -5);
scene.add(neptune);

// Adding lights for all of the planets:
function addLight(planet, lightStrength, lightDistance) {
  const light = new THREE.DirectionalLight(0xffffff, lightStrength);
  light.position.set(
    planet.position.x - lightDistance,
    planet.position.y,
    planet.position.z
  );
  light.target = planet;
  scene.add(light);
}

const lightStrength = 0.8;
const lightDistance = 30;
addLight(mercury, lightStrength + 0.2, lightDistance);
addLight(earth, lightStrength, lightDistance);

camera.lookAt(venus.position.x + 40, 0, 0);
const maxScroll = -13000;
const pivotX = sun.position.x - 80;
const pivotZ = 0;

const zSpeedInitial = 0.2;
const pivotLimit = (pivotZ - cameraOrigin.z) / zSpeedInitial;
const xSpeedInitial = (pivotX - cameraOrigin.x) / pivotLimit;
const xSpeed = 0.06;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  if (t > pivotLimit) {
    camera.position.x = cameraOrigin.x + t * xSpeedInitial;
    camera.position.z = cameraOrigin.z + t * zSpeedInitial;
  } else {
    camera.position.x = pivotX - (t - pivotLimit) * xSpeed;
    const interPolationFactor = THREE.MathUtils.clamp(
      Math.pow((camera.position.x - pivotX) / 180, 0.4),
      0,
      1
    );
    const zRoundTheSun = THREE.MathUtils.lerp(
      (t - pivotLimit) * 0.08,
      0,
      interPolationFactor
    );
    const zOscillation = THREE.MathUtils.lerp(
      0,
      +25 * Math.sin((t - pivotLimit) * 0.0014),
      interPolationFactor
    );

    camera.position.z = pivotZ + zRoundTheSun + zOscillation;
  }
  var lookAtX = THREE.MathUtils.lerp(
    venus.position.x,
    neptune.position.x + 40,
    THREE.MathUtils.clamp(t / maxScroll, 0, 1)
  );
  camera.lookAt(lookAtX + 40, 0, 0);
  console.log("Camera position: ", camera.position);
  console.log("Looking at: ", lookAtX + 40, 0, 0);
}

document.body.onscroll = moveCamera;

const earthRotation = 0.0025;
function rotatePlanets() {
  sun.rotation.y += earthRotation;
  mercury.rotation.y += earthRotation - 0.0007;
  venus.rotation.y += earthRotation - 0.0005;
  earth.rotation.y += earthRotation;
  moon.rotation.y += earthRotation - 0.0005;
  moon.position.set(
    earth.position.x +
      moonOrbitRadius * Math.cos(moon.rotation.y * 2 * Math.PI),
    earth.position.y + 4 * Math.sin(moon.rotation.y * 2 * Math.PI),
    earth.position.z + moonOrbitRadius * Math.sin(moon.rotation.y * 2 * Math.PI)
  );

  mars.rotation.y += earthRotation;
  jupiter.rotation.y += earthRotation * 2;
  saturn.rotation.y += earthRotation * 2;
  uranus.rotation.x += earthRotation * 1.5;
  neptune.rotation.y += earthRotation * 1.5;
}

console.log("Camera position: ", camera.position);
console.log("Looking at: ", earth.position);

// Animating the scene:
function animate() {
  requestAnimationFrame(animate);
  rotatePlanets();

  renderer.render(scene, camera);
}
animate();
