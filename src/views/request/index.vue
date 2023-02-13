<template>
  <div class="pg-reqeust">
    <ul>
      <li>
        <button @click="onGetTruckList">
          获取列表
        </button>
      </li>
      <li>
        <button @click="getServerError">
          500错误
        </button>
      </li>
      <li>
        <button @click="getClientError">
          400错误
        </button>
      </li>
      <li>
        <button @click="getCustomError">
          自定义错误
        </button>
      </li>
      <li>
        <button @click="postMockData">
          Post
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { getTruckList, getServerError, getClientError, getCustomError, postMockData } from '@/api/mock'

function onGetTruckList () {
  const { data, isFetching } = getTruckList()

  console.log(data)
}

</script>
<style scoped lang="scss">
.pg-request {

}

</style>
