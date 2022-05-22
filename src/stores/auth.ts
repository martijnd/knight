import axios from "@/composables/axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.token ?? null as string | null,
    user: null as any,
  }),
  getters: {
    //
  },
  actions: {
    async fetchUser() {
      const { data } = await axios.get("user", {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });
      this.user = data;
    },
    async registerUser(username: string) {
      const response = await axios.post('tokens/create', {
        username,
      });

      const json = await response.data;

      if (response.status !== 200) {
        throw json;
      }
      this.token = response.data.token;
      localStorage.token = response.data.token;
      this.user = response.data.user;
    },
    async fetchEnemies() {
      const res = await axios.get('enemies', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });

      return res.data.data;
    }
  },
});
