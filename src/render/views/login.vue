<template>
  <div class="content login-page">
    <div class="form-box">
      <div class="form-item">
        <i class="icon i-host"></i>
        <input type="text" class="input" v-model="formData.host" placeholder="主机" />
      </div>
      <div class="form-item">
        <i class="icon i-port"></i>
        <input type="text" class="input" v-model="formData.port" placeholder="端口" />
      </div>
      <div class="form-item">
        <i class="icon i-user"></i>
        <input type="text" class="input" v-model="formData.user" placeholder="用户名" />
      </div>
      <div class="form-item">
        <i class="icon i-password"></i>
        <input type="password" class="input" v-model="formData.password" placeholder="密码" />
      </div>
      <div class="form-btn">
        <a class="btn" @click="onLogin" :class="{'loading-btn':loading}">登录</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./login.scss"></style>
<script src="./login.js"></script>