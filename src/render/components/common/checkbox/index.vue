<template>
  <div class="checkbox" :class="{'checkbox-checked':isChecked,'checkbox-disabled':disabled}" @click.stop="onChange">
    <div class="mark"></div>
    <div v-if="label" class="text">{{ label }}</div>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>