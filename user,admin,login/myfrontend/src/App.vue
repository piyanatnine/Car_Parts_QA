<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
  .textIcon {
    color: rgb(119, 195, 176);
  }
  #sidebar {
      overflow: hidden;
      position: fixed !important;
      top: 12.1vh;
      width: 18vw;
      z-index: 100;
      height: 89.5vh;
      transition: all 0.5s ease;
  }
</style>