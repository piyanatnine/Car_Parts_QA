<template>
  <section>
    <nav class="navbar is-dark py-3 pr-5">
      <div class="navbar-brand ml-5">
        <a href="/">
        <div class="navbar-item pl-4">
        
          <img class="image is-32x32" src="../assets/icon.png" />
          <span class="px-4 textIcon"> This is Icon</span>
        
        </div>
        </a>
      </div>
      <div class="navbar-start pl-5">
        <span class="navbar-item icon-text" @click=" sidebar = !sidebar">
          <span class="icon">
            <i class="fas fa-bars fa-2x"></i>
          </span>
        </span>
      </div>
      <div class="navbar-end">
        <span class="navbar-item icon-text">
          <span class="icon">
            <i class="fas fa-envelope"></i>
          </span>
        </span>
        <span class="navbar-item icon-text">
          <span class="icon">
            <i class="fas fa-question-circle"></i>
          </span>
        </span>
        <span class="navbar-item icon-text">
          <span class="icon">
            <i class="fas fa-cogs"></i>
          </span>
        </span>
        <template v-if="!loginStatus">
          <!-- ปุ่ม login -->
          <div class="navbar-item">
            <button
              class="login button is-rounded is-small"
              @click="loaderpage()"
            >
              <span class="has-text-weight-bold">Login</span>
            </button>
          </div>
        </template>
        <template v-if="loginStatus">
          <!-- เเสดงรูปพนักงาน+ชื่อ  -->
          <div class="navbar-item">
            <span class="icon-text">
              <span class="icon pt-1">
                <i class="fas fa-user-circle"></i>
              </span>
              <span> UserName </span>
              <span class="icon pt-1">
                <i class="fas fa-angle-down"></i>
              </span>
            </span>
          </div>
        </template>
      </div>
    </nav>
    <aside id="sidebar" class="menu has-background-grey-darker has-text-link-light px-5 pb-4"
    :style= "{ left: sidebar?0:-50 + 'vw' }">
      <div class="vl"></div>
      <p class="menu-label">Banana</p>
      <ul class="menu-list">
        <li><a>Banana</a></li>
        <li><a>Bakaka</a></li>
      </ul>
      <p class="menu-label">BaBaBaBaBaa</p>
      <ul class="menu-list">
        <li><a>BabuBabu</a></li>
        <li>
          <a class="is-active">UkaUkakaaaaa</a>
          <ul>
            <li><a>yabe</a></li>
            <li><a>yahooo</a></li>
            <li><a>yaruneeee</a></li>
          </ul>
        </li>
        <li><a>oraaa</a></li>
        <li><a>ogaaaaaaa</a></li>
        <li><a>lourara</a></li>
      </ul>
      <p class="menu-label">Transactions</p>
      <ul class="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
      </ul>
    </aside>
    <section class="main-content columns is-fullheight">
      <div class="column is-10"></div>
    </section>
    <div :class="pageloader01" class="pageloader is-bottom-to-top is-dark">
      <span class="title">Pageloader</span>
    </div>
  </section>
</template>

<script>
import router from "../router/index.js";
/* eslint-disable */
export default {
  data() {
    return {
      loginStatus: false, //loginStatus
      pageloader01: "",
      sidebar: false,
    };
  },
  methods: {
    async loaderpage() {
      let loader = new Promise(function (myResolve, myReject) {
        return myResolve("is-active");
      });
      let afterloader = new Promise(function (myResolve, myReject) {
        setTimeout(() => {
          return myResolve("");
        }, 3000);
      });

      this.pageloader01 = await loader;
      this.pageloader01 = await afterloader;
      await setTimeout(() => {
        router.push({ name: "LogIn" });
      }, 500);
    },
  },
};
</script>

<style>
section {
  height: 100%;
  margin: auto;
  width: auto;
  overflow: hidden;
}

.navbar-item .textIcon{
    color:rgb(119,195,176) !important;
}
#sidebar {
  overflow: hidden;
  position: absolute !important;
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

</style>
