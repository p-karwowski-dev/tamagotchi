export const gameConfig = {
  speed: 1000,
  animals: {
    dog: {
      feed: -0.25,
      noFeed: 1,
      play: 1,
      noPlay: -1.5,
      sleep: -0.5,
      noSleep: 0.5,
    },
    cat: {
      feed: -1.5,
      noFeed: 0.5,
      play: 2,
      noPlay: -1,
      sleep: -0.35,
      noSleep: 1.25,
    },
    bird: {
      feed: -0.5,
      noFeed: 1.5,
      play: 2,
      noPlay: -0.2,
      sleep: -2,
      noSleep: 1,
    },
  },
}
