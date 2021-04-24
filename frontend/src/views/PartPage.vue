<template>
  <section>
    <nav class="navbar is-dark py-3 pr-5 is-fixed-top">
      <div class="navbar-brand ml-5" @click= "loaderPage('/')">
          <div class="navbar-item pl-4">
            <img class="image is-32x32" src="../assets/img/icon.png" />
            <span class="px-4 textIcon"> This is Icon</span>
          </div>
      </div>
      <div class="navbar-start pl-5">
        <span class="navbar-item icon-text" @click="sidebar = !sidebar">
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
              @click= "loaderPage('/logIn')"
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
    <!-- sidebar -->
    <aside
      id="sidebar"
      class="menu has-background-grey-darker has-text-link-light px-5 pb-4"
      :style="{ left: sidebar ? 0 : -50 + 'vw' }"
    >
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
    <section class="section main-content">
      <div class="container is-fluid">
        <div class="columns is-centered">
          <div class="column"></div>
          <div class="column has-text-centered unselect">
            <p class="is-size-6"> 
              <strong @click= "loaderPage('/')">HOMEPAGE</strong>  / 
              <strong @click= "loaderPage(`/${part.project_id}`)">{{ zeroPad(part.project_id) }}</strong> /
              {{ zeroPad(part.part_number) }}
            </p>
          </div>
          <div class="column"></div>
        </div>
      </div>
    </section>
    <div :class="pageloader" class="pageloader is-bottom-to-top is-dark">
      <span class="title">Pageloader</span>
    </div>
  </section>
</template>

<script>
import router from "../router/index.js";
export default {
  data() {
    return {
      loginStatus: true,
      pageloader: "is-active",
      sidebar: false,
      part: {
          part_number: 1,
          part_name: "partTestA1",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 1,
      }
    };
  },
  methods: {
    async loaderPage(pathname) {
      let loader = new Promise(function (myResolve) {
        return myResolve("is-active");
      });
      let afterloader = new Promise(function (myResolve) {
        setTimeout(() => {
          return myResolve("");
        }, 3000);
      });

      this.pageloader = await loader;
      try {
        await setTimeout(() => {
          router.push({ path: pathname });
        }, 1000);
      } catch (err) {
        this.pageloader = await afterloader;
        console.log(err);
      }
    },
    zeroPad(num) {
      return num.toString().padStart(8, "0");
    }
  },
  created: async function () {
    //loader Page
    let afterloader = new Promise(function (myResolve) {
      setTimeout(() => {
        return myResolve("");
      }, 1000);
    });
    this.pageloader = await afterloader;
    //axios data

  },
};
</script>

<style>
section .main-content {
  margin-top: 6vh;
}
</style>