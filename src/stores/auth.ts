import { createUser } from "@/composables/fetch";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null as string|null,
  }),
  getters: {
    //
  },
  actions: {
    async registerUser(username: string) {
      this.token = await createUser(username);
    },
  },
});
