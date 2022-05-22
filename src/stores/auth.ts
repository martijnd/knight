import { createUser } from "@/composables/fetch";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null as string|null,
    user: null as any,
  }),
  getters: {
    //
  },
  actions: {
    async registerUser(username: string) {
      const res = await createUser(username);
      this.token = res.token;
      this.user = res.user;
    },
  },
});
