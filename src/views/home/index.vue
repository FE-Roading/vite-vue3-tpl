<script lang='ts' setup>
import { useUserStore } from '@/store'
const store = useUserStore()
const handleClick = () => {
  store.saveName('小强')
}
</script>

<template>
  首页
  <h3>姓名：{{ store.name }}</h3>
  <h3>年龄：{{ store.age }}</h3>
  <h3>姓名+年龄：{{ store.getNameAndAge }}</h3>
  <button @click="handleClick">
    修改名字
  </button>
</template>

<style scoped>
</style>
