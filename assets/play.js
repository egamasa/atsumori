

// Count button click
let $count = 0;

function countUp() {
  document.getElementById('clickCount').innerHTML = ++$count;
}

function countReset() {
  $count = 0;
  document.getElementById('clickCount').innerHTML = $count;
}

// Initialize
window.AudioContext = window.AudioContext || window.webkitAudioContext;
let context = new AudioContext();
let source;

// Load sound file
let getAudioBuffer = function(url, fn) {
  let req = new XMLHttpRequest();
  req.responseType = 'arraybuffer';

  req.addEventListener('loadend', function() {
    if (req.status === 200) {
      context.decodeAudioData(req.response, function(buffer) {
        fn(buffer);
      });
    }
  });

  req.open('GET', url, true);
  req.send('');
};

let playSound = function(buffer) {
  source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};

// Regist click event
window.onload = function() {

  getAudioBuffer('./assets/sound/test1.wav', function(buffer) {
    let btn1 = document.getElementById('btn1');
    btn1.onclick = function() {
      playSound(buffer);
      countUp();
    }
  })
  getAudioBuffer('./assets/sound/test2.wav', function(buffer) {
    let btn2 = document.getElementById('btn2');
    btn2.onclick = function() {
      playSound(buffer);
      countUp();
    }
  })
  getAudioBuffer('./assets/sound/test3.wav', function(buffer) {
    let btn3 = document.getElementById('btn3');
    btn3.onclick = function() {
      playSound(buffer);
      countUp();
    }
  })
  getAudioBuffer('./assets/sound/test4.wav', function(buffer) {
    let btn4 = document.getElementById('btn4');
    btn4.onclick = function() {
      playSound(buffer);
      countUp();
    }
  })
  getAudioBuffer('./assets/sound/test0.wav', function(buffer) {
    let btn0 = document.getElementById('btn0');
    btn0.onclick = function() {
      source.stop();
      playSound(buffer);
      countReset();
    }
  })
}
