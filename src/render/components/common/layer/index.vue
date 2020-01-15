<template>
  <transition :name="animate" @after-enter="afterEnter" @after-leave="afterLeave">
    <div v-if="show" class="layer" @click.self="clickLayer" :class="{'layer-fullscreen':fullscreen}"
      :style="{'z-index':zIndex}">
      <div class="layer-box" :style="style">
        <div v-if="title" class="layer-header">
          <div class="layer-title">{{title}}</div>
          <i v-if="showClose" class="icon i-close" @click="closeLayer"></i>
        </div>
        <i v-else-if="showClose" class="icon i-close layer-close" @click="closeLayer"></i>
        <div class="layer-content">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="layer-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>