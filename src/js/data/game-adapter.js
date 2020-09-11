import {DefaultAdapter} from '../abstract';

export default new class extends DefaultAdapter {
  preprocess(data) {
    data.forEach((el) => {
      el.title = el.question; delete el.question;

      if (el.type === `artist`) {
        el.trueSong = {mp3: el.src}; delete el.src;
      }

      el.answers = Object.values(el.answers);
      el.answers.map((song, i) => {
        song.value = song.id = ++i;

        if (`genre` in song) { // genre answers
          song.mp3 = song.src; delete song.src;
        }

        if (`isCorrect` in song) { // artist answers
          song.artist = song.title;
          song.img = song.image;
          song.img = song.img.url;
          delete song.image; delete song.title;
        }
      });
    });
    return data;
  }

  toServer(data) {
    return JSON.stringify(data);
  }
}();
