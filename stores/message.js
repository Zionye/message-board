import { defineStore } from "pinia";

const getData = () => {
  return new Promise((resolve) => {
    let { data } = useFetch(`/api/message`);
    // resolve(data._rawValue);
    resolve(data._value);
  });
};

export const useMessageStore = defineStore("message", {
  actions: {
    getMessageData() {
      // const result = await getData();
      // console.log("result: ", result);
      // this.megList = result || [];

      return new Promise(async (resolve) => {
        let { data } = await useFetch(`/api/message`);
        console.log("result: ", data);
        this.megList = data._value || [];
        resolve(data._value);
      });
    },
  },
});
