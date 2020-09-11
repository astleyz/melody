export default (song) => `
  <div class="player">
    <audio src="${song.mp3}"></audio>
    <button class="player-control player-control--play"></button>
    <div class="player-track">
      <span class="player-status"></span>
    </div>
  </div>`;
