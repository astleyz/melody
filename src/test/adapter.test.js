import {assert} from 'chai';
import gameAdapter from '../js/data/game-adapter';

const dataFromServer = [
  {
    "type": "artist",
    "question": "Кто исполняет эту песню?",
    "src": "/mp3/Travel_Light.mp3",
    "answers": [
      {
        "image": {
          "url": "https://www.mercurynews.com/wp-content/uploads/2016/08/20130604__epac0605castro1.jpg?w=289",
          "width": 300,
          "height": 300
        },
        "title": "Daniel Castro",
        "isCorrect": false
      },
      {
        "image": {
          "url": "https://pbs.twimg.com/profile_images/1218218061293146112/BI9lK1RC_200x200.png",
          "width": 300,
          "height": 300
        },
        "title": "Jingle Punks",
        "isCorrect": false
      },
      {
        "image": {
          "url": "https://i1.sndcdn.com/avatars-000216624513-pzfsjt-t500x500.jpg",
          "width": 300,
          "height": 300
        },
        "title": "Audionautix",
        "isCorrect": true
      }
    ]
  },
  {
    "type": "genre",
    "question": "Выберите музыку электро",
    "genre": "electronic",
    "answers": {
      "song1": {
        "src": "/mp3/Shopen.mp3",
        "genre": "classical"
      },
      "song2": {
        "src": "/mp3/The_Model.mp3",
        "genre": "electronic"
      },
      "song3": {
        "src": "/mp3/The_Real_Slim_Shady.mp3",
        "genre": "hip-hop"
      },
      "song4": {
        "src": "/mp3/Ricky_Martin.mp3",
        "genre": "pop"
      }
    }
  },
]

const expected = [
  {
    "type": "artist",
    "title": "Кто исполняет эту песню?",
    "trueSong": {
      "mp3": "/mp3/Travel_Light.mp3"
    },
    "answers": [
      {
        "artist": "Daniel Castro",
        "id": 1,
        "img": "https://www.mercurynews.com/wp-content/uploads/2016/08/20130604__epac0605castro1.jpg?w=289",
        "isCorrect": false,
        "value": 1,
      },
      {
        "artist": "Jingle Punks",
        "id": 2,
        "img": "https://pbs.twimg.com/profile_images/1218218061293146112/BI9lK1RC_200x200.png",
        "isCorrect": false,
        "value": 2,
      },
      {
        "artist": "Audionautix",
        "id": 3,
        "img": "https://i1.sndcdn.com/avatars-000216624513-pzfsjt-t500x500.jpg",
        "isCorrect": true,
        "value": 3,
      }
    ] 
  },
  {
    "type": "genre",
    "title": "Выберите музыку электро",
    "genre": "electronic",
    "answers": [
      {
        "genre": "classical",
        "id": 1,
        "mp3": "/mp3/Shopen.mp3",
        "value": 1,
      },
      {
        "genre": "electronic",
        "id": 2,
        "mp3": "/mp3/The_Model.mp3",
        "value": 2,
      },
      {
        "genre": "hip-hop",
        "id": 3,
        "mp3": "/mp3/The_Real_Slim_Shady.mp3",
        "value": 3,
      },
      {
        "genre": "pop",
        "id": 4,
        "mp3": "/mp3/Ricky_Martin.mp3",
        "value": 4,
      }
    ],
  }
]


describe(`Check DefaultAdapter class`, () => {
  it(`should correctly convert data from server`, () => {
    assert.deepStrictEqual(expected, gameAdapter.preprocess(dataFromServer));
  });
})