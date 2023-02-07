import { defineStore } from 'pinia'
import store from "@/store"

interface UserStoreType  {
  name: string
  age: number
  sex: string
}

const useUserStore = defineStore('user', {
  state: (): UserStoreType => ({
    name: '昵称',
    age: 25,
    sex: "男"
  }),
  getters: {
    getAgeStr: (state) => {
      return `${state.age}岁`
    },
    getNameAndAge ():string {
      return `${this.name}-${this.getAgeStr}`
    }
  },
  actions: {
    saveName (name: string) {
      this.name = name
    }
  }
})

export default useUserStore

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}