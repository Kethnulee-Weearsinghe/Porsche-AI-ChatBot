const video = document.getElementById('bg-video');
const btn = document.getElementById('toggle-sound');

btn.addEventListener('click', () => {
  if(video.muted) {
    video.muted = false;
    btn.textContent = 'Mute';
  } else {
    video.muted = true;
    btn.textContent = 'Unmute';
  }
});
