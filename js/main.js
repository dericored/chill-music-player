const loadingPage = document.querySelector("#loading-page");
const mainPage = document.querySelector("#main-page");
const infoPage = document.querySelector("#info-page");
const spotifyBtn = document.querySelector("#spotify-btn");
const spotify = document.querySelector("#spotify");
const clock = document.querySelector("#time");
const clockHour = document.querySelector("#hour");
const clockMin = document.querySelector("#minutes");
const infoBtn = document.querySelector("#info-btn");
const musicContainer = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const audioPlayed = document.querySelector("#audio-played");
const audioLength = document.querySelector("#audio-length");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const cover = document.querySelector("#cover");
const backToMainBtn = document.querySelector("#back-to-main");
const apodPhoto = document.querySelector("#apod-photo");
const apodDate = document.querySelector("#apod-date");
const apodTitle = document.querySelector("#apod-title");
const apodText = document.querySelector("#apod-text");
const apodUploader = document.querySelector("#apod-uploader");
const apodEditor = document.querySelector("#apod-editor");

// APOD Info Section
infoBtn.addEventListener("click", () => {
  mainPage.classList.add("hidden");
  infoPage.classList.remove("hidden");
});

backToMainBtn.addEventListener("click", () => {
  mainPage.classList.remove("hidden");
  infoPage.classList.add("hidden");
});

// Spotify
let spotifyIsOpen = false;

// Songs
const songs = [
  "Calm River - Lesfm",
  "Lofi Beat Chill - WATRFALLKERO",
  "Lofi Chill x2 - CeeaDidIt",
  "Lost Ambient Lofi - Lesfm",
];

let songIndex = 0;

let isPlaying = false;

loadSong(songs[songIndex]);

//Functions
function toggleSpotify() {
  if (spotifyIsOpen) {
    spotify.classList.add("hidden");
    spotify.classList.remove("block");
  } else {
    spotify.classList.remove("hidden");
    spotify.classList.add("block");
  }
  spotifyIsOpen = !spotifyIsOpen;
}

// slices long texts
function nameSlice(name) {
  if (name.length > 16) {
    return name.slice(0, 17) + "...";
  } else {
    return name;
  }
}

function loadSong(song) {
  trackInfo = song.split("-");
  title.innerText = nameSlice(trackInfo[0]);
  artist.innerText =
    trackInfo[1] === undefined ? "Unknown Artist" : nameSlice(trackInfo[1]);
  audio.src = `songs/${song}.mp3`;
  try {
    cover.src = `covers/${song}.jpg`;
  } catch {
    cover.src = `covers/disc.svg`;
  }
  audio.onloadedmetadata = () =>
    (audioLength.innerText = convertSecMin(audio.duration));
}

function playPauseIcon() {
  if (isPlaying) {
    playBtn.querySelector("#play-icon").classList.add("hidden");
    playBtn.querySelector("#pause-icon").classList.remove("hidden");
  } else {
    playBtn.querySelector("#pause-icon").classList.add("hidden");
    playBtn.querySelector("#play-icon").classList.remove("hidden");
  }
}

function playSong() {
  isPlaying = true;

  audio.play();
  cover.classList.add("play");
}

function pauseSong() {
  isPlaying = false;

  audio.pause();
  cover.classList.remove("play");
}

function prevSong() {
  isPlaying = false;
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
  playPauseIcon();
}

function nextSong() {
  isPlaying = false;
  songIndex++;

  if (songIndex === songs.length) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
  playPauseIcon();
}

// properly shows time with HH:MM format
function checkTime(i) {
  if (i < 10) return "0" + i;
  else return i;
}

function convertSecMin(sec) {
  let m = parseInt(sec / 60);
  let s = parseInt(sec % 60);
  m = checkTime(m);
  s = checkTime(s);
  return `${m}:${s}`;
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  audioPlayed.innerText = convertSecMin(currentTime);
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  m = checkTime(m);
  clockHour.innerText = h;
  clockMin.innerText = m;
  setTimeout(startTime, 1000);
}

function displayResult() {
  loadingPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
}

// Fetch NASA
const fetchNASA = async () => {
  const res = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=uz3FzwyByvmgLdyqnciEweSdvG5fOk2RhybhbpJ4"
  );
  const data = await res.json();
  const { copyright, date, explanation, title, hdurl, url } = data;

  document.body.style.backgroundImage = `url(${hdurl})`;
  apodPhoto.src = url;
  apodDate.innerText = date;
  apodTitle.innerText = title;
  apodText.innerText = explanation;
  apodUploader.innerText = copyright ? copyright : "NASA";

  displayResult();
};

// Event Listeners and Dynamic Components
fetchNASA();
startTime();

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
  playPauseIcon();
});

spotifyBtn.addEventListener("click", toggleSpotify);

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
