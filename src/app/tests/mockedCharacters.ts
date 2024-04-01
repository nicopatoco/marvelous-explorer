import { Character } from '../types/character'

export const MOCKED_CHARACTERS: Character[] = [
  {
    id: 1011334,
    name: '3-D Man',
    description: '',
    modified: '2014-04-29T14:18:17-0400',
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
      extension: 'jpg',
    },
    resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
    comics: {
      available: 12,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/comics',
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/comics/21366',
          name: 'Avengers: The Initiative (2007) #14',
        },
        // Include other comics as needed
      ],
      returned: 12,
    },
    series: {
      available: 3,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/series/1945',
          name: 'Avengers: The Initiative (2007 - 2010)',
        },
        // Include other series as needed
      ],
      returned: 3,
    },
    stories: {
      available: 21,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/stories',
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/stories/19947',
          name: 'Cover #19947',
          type: 'cover',
        },
        // Include other stories as needed
      ],
      returned: 21,
    },
    events: {
      available: 1,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/events',
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/events/269',
          name: 'Secret Invasion',
        },
      ],
      returned: 1,
    },
    urls: [
      {
        type: 'detail',
        url: 'http://marvel.com/characters/74/3-d_man?utm_campaign=apiRef&utm_source=2ad125e3a2b216caa5250d05d5edc9e0',
      },
      // Include other urls as needed
    ],
  },
  {
    id: 1017100,
    name: 'A-Bomb (HAS)',
    description:
      "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
    modified: '2013-09-18T15:54:04-0400',
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16',
      extension: 'jpg',
    },
    resourceURI: 'http://gateway.marvel.com/v1/public/characters/1017100',
    comics: {
      available: 4,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/comics',
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/comics/47176',
          name: 'FREE COMIC BOOK DAY 2013 1 (2013) #1',
        },
        // Include other comics as needed
      ],
      returned: 4,
    },
    series: {
      available: 2,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/series',
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/series/17765',
          name: 'FREE COMIC BOOK DAY 2013 1 (2013)',
        },
        // Include other series as needed
      ],
      returned: 2,
    },
    stories: {
      available: 7,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/stories',
      items: [
        {
          resourceURI: 'http://gateway.marvel.com/v1/public/stories/92078',
          name: 'Hulk (2008) #55',
          type: 'cover',
        },
        // Include other stories as needed
      ],
      returned: 7,
    },
    events: {
      available: 0,
      collectionURI: 'http://gateway.marvel.com/v1/public/characters/1017100/events',
      items: [],
      returned: 0,
    },
    urls: [
      {
        type: 'detail',
        url: 'http://marvel.com/characters/76/a-bomb?utm_campaign=apiRef&utm_source=2ad125e3a2b216caa5250d05d5edc9e0',
      },
      // Include other urls as needed
    ],
  },
]
