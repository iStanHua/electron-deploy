<template>
  <div class="tree-node" :class="{'is-expanded':node.children&&node.children.length&&isOpen}"
    @click.prevent.stop="onToggle(node)">
    <div class="tree-node_label" :style="{'padding-left':(level-1)*currentIndent+'px'}">
      <i v-if="node.children&&node.children.length" class="icon"
        :class="[isOpen?'i-triangle-down':'i-triangle-right']"></i>
      <checkbox v-if="checkbox" v-model="node.checked" @change="onChange"></checkbox>
      <!-- <span class="tree-node_name">{{ node.name }}<slot name="label"></slot></span> -->
      <node-label :node="node"></node-label>
    </div>
    <div v-if="node.children&&node.children.length" class="tree-node_child">
      <tree-node v-for="(child, i) in node.children" :key="i" :node="child" :indent="currentIndent"
        :level="currentLevel+1" :checkbox="checkbox">
      </tree-node>
    </div>
  </div>
</template>
<script src="./node.js"></script>