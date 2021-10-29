<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
  body {
    height: auto;
    width: auto;
    font-family: 'Varela Round', sans-serif;
  }

  /*Hide Scrollbar*/
  body::-webkit-scrollbar {
    display: none;
    /*Chrome, Safari and Opera*/
  }

  /* navbar, sidebar*/ 
  .navbar-item .textIcon {
    color: rgb(119, 195, 176) !important;
  }
  
  #sidebar {
    overflow: hidden;
    position: fixed !important;
    top: 10.5vh;
    width: 18vw;
    z-index: 100;
    height: 89.5vh;
    transition: all 0.5s ease;
  }
  
  .vl {
    border-bottom: 4px solid gray;
    border-radius: 200vw;
    width: 100%;
  }

  .unselect {
    -webkit-user-select: none; /* Safari */
    user-select: none;
  }
</style>