import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state () {
    return {
      name: '昵称',
      age: 25,
      sex: '男'
    }
  },
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
