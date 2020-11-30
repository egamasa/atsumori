

let context;
let bufferLoader;
let source;
let $count = 0;

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  var loader = this;
  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }
  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }
  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

let playSound = function(buffer) {
  source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};

function countUp() {
  document.getElementById('clickCount').innerHTML = ++$count;
}
function countReset() {
  $count = 0;
  document.getElementById('clickCount').innerHTML = $count;
}

function soundLoaded(bufferList) {
  for (let i = 1; i < bufferList.length; i++) {
    document.getElementById(`btn${i}`).onclick = function() {
      playSound(bufferList[i]);
      countUp();
    }
  }

  document.getElementById('btn0').onclick = function() {
    if (source) {
      source.stop();
    }
    playSound(bufferList[0]);
    countReset();
  }
}

window.onload = function() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      './assets/sound/apologize.wav',
      './assets/sound/atsumori_std.wav',
      './assets/sound/atsumori_long.wav',
      './assets/sound/atsumori_party.wav',
      './assets/sound/atsumori_rev.wav'
    ],
    soundLoaded
  );

  bufferLoader.load();
}
