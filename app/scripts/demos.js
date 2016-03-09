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

const rowNumber = 3;
const colNumber = 2; 

function initDemos() {
    let rootElement = document.getElementById('demo');
    for (let i = 0; i < rowNumber; ++i) {
        let rowDivElement = document.createElement('div');
        rowDivElement.className = 'row';
        rootElement.appendChild(rowDivElement);
        for (let j = 0; j < colNumber; ++j) {
            let colDivElement = document.createElement('div');
            colDivElement.className = 'col-md-6 demo-tile';
            let playerElement = document.createElement('div');
            playerElement.id = 'player' + i + j;
            playerElement.className = 'player';

            let mask_before = document.createElement('div');
            mask_before.className = 'player-mask-before player-mask';
            let mask_after = document.createElement('div');
            mask_after.className = 'player-mask-after player-mask';
            colDivElement.appendChild(mask_before);
            colDivElement.appendChild(playerElement);
            colDivElement.appendChild(mask_after);
            rowDivElement.appendChild(colDivElement);
            let player = new YT.Player('player' + i + j, {
              height: 480,
              width: 640,
              videoId: videos[videoIndex++],
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              },
              playerVars: { 'autoplay': 1, 'controls': 0, 'rel': 0, 'showinfo': 0, 'modestbranding': 1}
            });
        }
    } 
}

function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        if (videoIndex >= videos.length) {
            videoIndex = 0;
        }
        event.target.loadVideoById(videos[videoIndex++]);
        event.target.playVideo();
    } else if (event.data === YT.PlayerState.PLAYING) {
        let head = event.target.getIframe().contentWindow;
    }
}
