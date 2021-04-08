<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
  body {
    height: auto;
    width: auto;
  }

  /*Hide Scrollbar*/
  body::-webkit-scrollbar {
    display: none;
    /*Chrome, Safari and Opera*/
  }
</style>