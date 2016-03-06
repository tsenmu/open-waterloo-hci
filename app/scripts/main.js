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

function onYouTubeIframeAPIReady() {
    const rowNumber = 3;
    const colNumber = 3;
    let rootElement = document.getElementById('demo');


    for (let i = 0; i < rowNumber; ++i) {
        let rowDivElement = document.createElement('div');
        rowDivElement.className = 'row';
        rootElement.appendChild(rowDivElement);
        for (let j = 0; j < colNumber; ++j) {
            let colDivElement = document.createElement('div');
            colDivElement.className = 'col-md-4';
            let playerElement = document.createElement('div');
            playerElement.id = 'player' + i + j;
            playerElement.className = 'player';

            colDivElement.appendChild(playerElement);
            rowDivElement.appendChild(colDivElement);

            let player = new YT.Player('player' + i + j, {
              height: 390,
              width: 480,
              videoId: videos[videoIndex++],
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });
        }
    }
}

function onPlayerReady(event) {
    event.target.mute();
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    console.log(event.data);
    if (event.data === YT.PlayerState.ENDED) {
        if (videoIndex >= videos.length) {
            videoIndex = 0;
        }
        event.target.loadVideoById(videos[videoIndex++]);
        event.target.playVideo();
    }
}
