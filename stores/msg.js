import { defineStore } from "pinia";

export const useStore = defineStore("msg", {
  state: () => ({
    megList: [],
    itemInfo: null,
  }),
  persist: true,
});
