<template>
  <div class="tree">
    <template v-if="data&&data.length">
      <tree-node v-for="(item, i) in data" :key="i" :node="item" :indent="indent" :checkbox="checkbox"></tree-node>
    </template>
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>