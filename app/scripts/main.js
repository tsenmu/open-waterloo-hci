'use strict';

var videos = [
    'hrMkPq4uxJs',
    'lebeVS0oXtc',
    'U5jiD0d1gQg',
    '15wByThgX_U',
    'HDqT_oKM7j8',
    'YiRjyAi_HH0',
    '8N9qK_nbxvU',
    'kp2Zl4ONuik',
    'yMfR_alzPh4',
    'Ra4JX08y7L8',
    'DNgndfR4i10',
    'nq25m0vmhuM',
    '8Mfg8P9Fguk',
    '1ktkF4jyy8Y',
    'rc18Bhx1ZH8',
    'NCHzvQVIPEQ'
];

var videoIndex = 0;

var container;
var camera, scene, renderer, group, particle;
var mouseX = 0, mouseY = 0;
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function init() {
    var faceX = 0;
    var faceY = 0;
    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracking.track('#video', tracker, { camera: true });
    tracker.on('track', onFaceMove);

    container = document.getElementById('viewport');
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    var PI2 = Math.PI * 2;
    var program = function (context) {
        context.beginPath();
        context.arc(0, 0, 0.5, 0, PI2, true);
        context.fill();
    }
    group = new THREE.Object3D();
    scene.add(group);
    for (var i = 0; i < 1000; i++) {
        var material = new THREE.SpriteCanvasMaterial({
          color: Math.random() * 0x808008 + 0x808080,
          program: program
      });
        particle = new THREE.Sprite(material);
        particle.position.x = Math.random() * 2000 - 1000;
        particle.position.y = Math.random() * 2000 - 1000;
        particle.position.z = Math.random() * 2000 - 1000;
        particle.scale.x = particle.scale.y = Math.random() * 20 + 10;
        group.add(particle);
    }
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onFaceMove(event) {
  if (event.data.length === 0) {
    return;
  }
  var maxRect;
  var maxRectArea = 0;
  event.data.forEach(function(rect) {
    if (rect.width * rect.height > maxRectArea){
      maxRectArea = rect.width * rect.height;
      maxRect = rect;
    }
  });
  if (maxRectArea > 0) {
    var rectCenterX = maxRect.x + (maxRect.width/2);
    var rectCenterY = maxRect.y + (maxRect.height/2);
    mouseX = (rectCenterX - 160) * (window.innerWidth/320) * 10;
    mouseY = (rectCenterY - 120) * (window.innerHeight/240) * 10;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = maxRect.color;
    context.strokeRect(maxRect.x, maxRect.y, maxRect.width, maxRect.height);
    context.font = '11px Helvetica';
    context.fillStyle = "#fff";
    context.fillText('x: ' + maxRect.x + 'px', maxRect.x + maxRect.width + 5, maxRect.y + 11);
    context.fillText('y: ' + maxRect.y + 'px', maxRect.x + maxRect.width + 5, maxRect.y + 22);
  }
}
function animate() {
  window.requestAnimationFrame(animate);
  render();
}
function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (- mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}

window.onload = function() {
    init();
    animate();
}



// function onYouTubeIframeAPIReady() {
//     const rowNumber = 3;
//     const colNumber = 3;
//     let rootElement = document.getElementById('demo');


//     for (let i = 0; i < rowNumber; ++i) {
//         let rowDivElement = document.createElement('div');
//         rowDivElement.className = 'row';
//         rootElement.appendChild(rowDivElement);
//         for (let j = 0; j < colNumber; ++j) {
//             let colDivElement = document.createElement('div');
//             colDivElement.className = 'col-md-4';
//             let playerElement = document.createElement('div');
//             playerElement.id = 'player' + i + j;
//             playerElement.className = 'player';

//             colDivElement.appendChild(playerElement);
//             rowDivElement.appendChild(colDivElement);

//             let player = new YT.Player('player' + i + j, {
//               height: 390,
//               width: 480,
//               videoId: videos[videoIndex++],
//               events: {
//                 'onReady': onPlayerReady,
//                 'onStateChange': onPlayerStateChange
//               }
//             });
//         }
//     }
// }

// function onPlayerReady(event) {
//     event.target.mute();
//     event.target.playVideo();
// }

// function onPlayerStateChange(event) {
//     console.log(event.data);
//     if (event.data === YT.PlayerState.ENDED) {
//         if (videoIndex >= videos.length) {
//             videoIndex = 0;
//         }
//         event.target.loadVideoById(videos[videoIndex++]);
//         event.target.playVideo();
//     }
// }
