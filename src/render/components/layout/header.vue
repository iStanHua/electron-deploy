<template>
  <div class="header" v-drag>
    <div class="title">{{ title }}</div>
    <i class="icon i-minimize" @click="onMinimize"></i>
    <i v-if="isMax" class="icon" :class="[isMaximize?'i-reduce':'i-maximize']" @click="onMaximize"></i>
    <i class="icon i-close" @click="onClose"></i>
  </div>
</template>
<style lang="scss" src="./header.scss"></style>
<script src="./header.js"></script>