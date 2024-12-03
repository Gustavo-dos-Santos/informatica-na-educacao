import { defineStore } from 'pinia';
import type { User } from './usuario';

export interface Create {
  name: string,
  words: string,
  teacherId: string,
}

export interface myGames {
  id: string,
  teacher: User,
  grid: string,
  words: Array<string>,
  createdAt: string,
  name: string,
}

export const useWordSearchStore = defineStore("wordsearch", {
  state: () => ({
    create: {} as Create,
    myGames: [] as Array<myGames>,
    game: {} as myGames,

  }),
  getters: {
    getCreate(state): Create {
      return state.create;
    },
    getMyGames(state): Array<myGames> {
      return state.myGames;
    },
    getGame(state): myGames {
      return state.game;
    },
  },
  actions: {

    setCreate(create: Create) {
      this.create = create
    },
    setMyGames(myGames: Array<myGames>) {
      this.myGames = myGames
    },
    setGames(games: myGames) {
      this.game = games
    }
  },
});
