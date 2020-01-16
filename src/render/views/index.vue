<template>
  <div class="content home-page">
    <div v-if="hostList.length" class="nav-column">
      <div class="nav-list">
        <div class="nav-item" v-for="(item, i) in hostList" :key="i" :class="{'nav-active':currentIndex===i}">
          <i class="icon i-host"></i>
          <span>{{ item }}</span>
        </div>
      </div>
      <a class="nav-item" @click="onCreate">新建会话</a>
    </div>
    <div class="main">
      <div v-if="hostList.length===0" class="empty-item">
        <a @click="onCreate">新建会话</a>
      </div>
      <div class="shell-panel">
        <div class="path">$</div>
        <div class="input"></div>
        <div class="cursor"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>