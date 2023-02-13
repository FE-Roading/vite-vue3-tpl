<template>
  <div class="pg-entry">
    <ul>
      <li>
        <router-link to="/">
          首页
        </router-link>
      </li>
      <li>
        <router-link to="/login">
          登录
        </router-link>
      </li>
      <li>
        <router-link to="/request">
          Request
        </router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>
<style scoped lang="scss">
.pg-entry {
  margin-top: 100px;
  margin-left: 60px;
}
</style>
