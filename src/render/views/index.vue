<template>
  <div class="content home-page">
    <loading :show="loading" class="main"></loading>
    <template v-if="!loading">
      <div class="main">
        <div class="database-columm" v-resize>
          <div class="column-title">
            <i class="icon i-host"></i>
            <span>{{ host }}</span>
          </div>
          <div class="columm-view">
            <div class="column-item" :class="{'column-active':item.name===currentDatabase}"
              v-for="(item, index) in databaseList" :key="index" @click="onSelectDatabase(item.name)">
              <i class="icon i-data"></i>
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="footer">
            <a @click="onLogout">退出</a>
          </div>
        </div>
        <div class="tree-columm">
          <loading :show="treeLoading" class="columm-view"></loading>
          <div v-show="!treeLoading&&treeList.length" class="columm-view">
            <tree ref="treeRef" :data="treeList" checkbox>
              <template slot-scope="node">
                <i v-if="node.level===1" class="icon i-table"></i>
                <span>{{ node.name }}</span>
                <em v-if="node.remark">({{ node.remark }})</em>
              </template>
            </tree>
          </div>
          <div v-if="currentDatabase" class="footer">
            <a class="btn" @click="onCreate">创建项目</a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="scss" src="./index.scss"></style>
<script src="./index.js"></script>