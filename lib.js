/*
instruments = {
    'snare': {
        'audio': [AUDIO_ELEMENT_1, AUDIO_ELEMENT_2, ...],
        'index': CURRENT_AUDIO_ELEMENT_INDEX
    }
}
*/
var instruments = new Object();

const AUDIO_BUFFER = 10;

var elem = document.documentElement;


function initAudio(instrument_id) {
  let audio = [];
  for (let i = 0; i < AUDIO_BUFFER; i++) {
    let el = document.createElement('audio');
    el.id = 'audio_' + instrument_id + '_' + i;
    el.src = 'audio/snd_' + instrument_id + '.mp3';
    audio[i] = el;
  }
  instruments[instrument_id] = {'audio': audio, 'index': 0};
}

function initImage(instrument_id) {
  let img = document.createElement('img');
  img.id = 'image_' + instrument_id;
  img.src = 'image/img_' + instrument_id + '.png';
  img.addEventListener('touchstart', handleTouch);
  img.addEventListener('mousedown', handleTouch);
  let div = document.createElement('div');
  div.className = 'grid-item';
  div.appendChild(img);
  document.getElementById('container').appendChild(div);
}

function initInstrument(instrument_id) {
  initAudio(instrument_id);
  initImage(instrument_id);
}

function openFullscreen() {
 if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function initController() {
  let home = document.createElement('img');
  home.src = '../image/home.png';
  home.addEventListener('click',
      function() { location.replace('../index.html'); });
  let full = document.createElement('img');
  full.src = '../image/win_full.png';
  full.addEventListener('click', openFullscreen);
  let normal = document.createElement('img');
  normal.src = '../image/win_normal.png';
  normal.addEventListener('click', closeFullscreen);
  let controller = document.getElementById('controller');
  controller.appendChild(home);
  controller.appendChild(full);
  controller.appendChild(normal);
}

function init() {
  document.body.style.backgroundImage = 'url("background.png")';
  document.body.style.backgroundSize = '100% 100%';
  initController();
  for (let i = 0; i < INSTRUMENT_IDS.length; i++) {
    initInstrument(INSTRUMENT_IDS[i]);
  }
}

init();


function play(instrument_id) {
  let instrument = instruments[instrument_id];
  try {
    instrument['audio'][instrument['index']].stop();
  } catch (e) {}
  if (instrument['index'] < AUDIO_BUFFER - 1) {
    instrument['index'] += 1;
  } else {
    instrument['index'] = 0;
  }
  instrument['audio'][instrument['index']].play();
}

function transitioned(e) {  
  e.target.style.transform = 'scale(1.0)';
}

function handleTouch(e) {
  e.target.style.transform = 'scale(1.2)';
  setTimeout(transitioned, 100, e);
  let instrument_id = e.srcElement.id.split('_')[1];
  play(instrument_id);
  e.preventDefault();
}