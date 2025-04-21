// Select elements
const video = document.querySelector('.player__video');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackRate"]');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle volume and speed changes
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Allow user to scrub video by clicking on progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
volumeSlider.addEventListener('input', handleRangeUpdate);
speedSlider.addEventListener('input', handleRangeUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
