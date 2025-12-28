// --- ダークモード切替 ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
const html = document.documentElement;

function updateParticleColor() {
    if (html.hasAttribute('data-theme')) {
        // ダークモード
        particles.material.color.setHex(0xaaaaaa);
    } else {
        // ライトモード
        particles.material.color.setHex(0x555555);
    }
}

// OSの設定を優先しつつ、localStorageに保存された設定を読み込む
const currentTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (currentTheme === 'dark' || (!currentTheme && prefersDark)) {
    html.setAttribute('data-theme', 'dark');
}

darkModeToggle.addEventListener('click', () => {
    if (html.hasAttribute('data-theme')) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateParticleColor(); // 色を更新
});


// --- Three.js 背景アニメーション ---
let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

// 初期化処理
function init() {
    // シーン
    scene = new THREE.Scene();

    // カメラ
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // レンダラー
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('webgl-canvas').appendChild(renderer.domElement);

    // パーティクルの作成
    const particleCount = 5000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    updateParticleColor(); // 初期の色を設定

    // イベントリスナー
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    // アニメーション開始
    animate();
}

// ウィンドウリサイズ処理
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// マウス移動処理
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    // パーティクルをゆっくり回転させる
    particles.rotation.y += 0.0001;
    particles.rotation.x += 0.0001;

    // マウス位置に応じてカメラを少し動かす
    camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.05 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

init();



// --- スクロール連動アニメーション ---

const scrollElements = document.querySelectorAll('.scroll-reveal');



const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.1

});



scrollElements.forEach(el => {

    observer.observe(el);

});
