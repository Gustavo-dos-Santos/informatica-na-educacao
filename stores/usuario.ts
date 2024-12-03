import { defineStore } from 'pinia';

export interface User {
  email: string,
  firstName: string,
  idUser: string,
  lastName: string,
  password: string,
  role: string,
  username: string,
}

export const useUsuarioStore = defineStore("usuario", {
  state: () => ({
    email: "" as string,
    firstName: "" as string,
    idUser: "" as string,
    lastName: "" as string,
    password: "" as string,
    role: "" as string,
    username: "" as string,
  }),
  getters: {
    getEmail(state): string {
      return state.email;
    },
    getFirstName(state): string {
      return state.firstName;
    },
    getIdUser(state): string {
      return state.idUser;
    },
    getLastName(state): string {
      return state.lastName;
    },
    getPassword(state): string {
      return state.password;
    },
    getRole(state): string {
      return state.role;
    },
    getUsername(state): string {
      return state.username;
    },
  },
  actions: {
    setEmail(email: string) {
      this.email = email;
    },
    setFirstName(firstName: string) {
      this.firstName = firstName;
    },
    setIdUser(idUser: string) {
      this.idUser = idUser;
    },
    setLastName(lastName: string) {
      this.lastName = lastName;
    },
    setPassword(password: string) {
      this.password = password;
    },
    setRole(role: string) {
      this.role = role;
    },
    setUsername(username: string) {
      this.username = username;
    },
    setUser(user: User) {
      this.username = user.username;
      this.email = user.email;
      this.firstName = user.firstName;
      this.idUser = user.idUser;
      this.lastName = user.lastName;
      this.password = user.password;
      this.role = user.role;
      this.username = user.username;
    }
  },
});
