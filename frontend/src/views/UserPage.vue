<template>
  <section>
    <nav class="navbar is-dark py-3 pr-5 is-fixed-top">
      <div class="navbar-brand ml-5">
        <a href="/">
          <div class="navbar-item pl-4">
            <span class="icon has-text-primary">
              <i class="fas fa-cog fa-spin fa-3x"></i>
            </span>
            <span class="pl-5 textIcon"> CarPart QA</span>
          </div>
        </a>
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
              @click="loaderPage('/logIn')"
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
              <span> {{ user.first_name }}</span>
              <div
                class="dropdown is-right"
                :class="dropdown ? 'is-active' : ''"
              >
                <div class="dropdown-trigger">
                  <button
                    style="
                      background-color: Transparent;
                      outline: none;
                      border: none;
                      overflow: hidden;
                    "
                  >
                    <span
                      class="icon"
                      style="color: white"
                      @click="dropdown = !dropdown"
                    >
                      <i class="fas fa-angle-down is-2x" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu">
                  <div class="dropdown-content">
                    <a
                      class="dropdown-item"
                    >
                      UserProfile
                    </a>
                    <hr class="dropdown-divider" />
                    <a class="dropdown-item" @click="logout()"> Logout </a>
                  </div>
                </div>
              </div>
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
    </aside>
    <section class="section main-content" style="margin-top: 6vh">
      <div class="mb-5">
        <!-- Path select -->
        <div class="container is-fluid">
          <nav
            class="breadcrumb is-centered is-medium"
            aria-label="breadcrumbs"
          >
            <ul>
              <li @click="loaderPage('/')"><a> HOMEPAGE </a></li>
              <li class="is-active" aria-current="page">
                <a>{{ zeroPad(user.employee_id) }}</a>
              </li>
            </ul>
          </nav>
        </div>
        <nav class="level mt-5">
          <!-- Left side -->
          <div class="level-left">
            <div class="level-item">
                <div class="field ">
                <figure class="image">
                    <img src="../assets/img/user.png">
                </figure>
                <span class="title has-text-weight-bold"
                  style="font-size: 2.5vw;">
                  Position: {{ user.position }}
                </span>
                </div>
            </div>
            <div class="level-item">
              <div class="field">
                <span class="title has-text-weight-bold"
                  style="font-size: 2.5vw;">
                    Employee ID: {{ user.employee_id }}
                </span>
                <span class="title has-text-weight-bold"
                  style="font-size: 2.5vw;">
                    <br><br>Name: {{ user.first_name+"  "+user.last_name }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right side -->
          <div class="level-right mx-5">
            <div class="field">
                <div class="level-item" v-if="user.position == 'Admin'">
                  <div class="button is-danger" @click="loaderPage(`/user/${user.employee_id}/adminpanel`)"
                  style="width: 15vw; height: 10vh">
                    <span class="icon">
                      <i class="fas fa-user"></i>
                    </span>
                    <span> AdminPanel</span>
                  </div>
                </div>
              </div>
          </div>
        </nav>
        <div class="container" style="margin-top:10vh;border:gray 2px solid; height:200vh">
            <table class="m-5">
                <thead>
                    <th class="is-size-2 has-text-bold" style="text-decoration: underline;width: 100%">History Log</th>
                </thead>
                <tbody>
                    <template v-if= "log != null">
                        <template v-for="loglist in log">
                            <tr style="height: 30px" :key= "loglist.upload_datetime">
                                <td class="is-size-4 has-text-weight-bold pt-2 px-5">
                                    {{ '• UPLOAD | '+loglist.file_name+' to Part Number '+zeroPad(loglist.part_number)+' at '+loglist.upload_datetime.slice(0, 19).replace('T', ' ') }}
                                </td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </table>
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
import axios from "axios";
export default {
  data() {
    return {
      dropdown: false,
      loginStatus: false, //loginStatus
      user: null,
      log: null,
      pageloader: "is-active",
      sidebar: false,
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
        }, 1000);
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
    },
    async getData() {
      await axios
        .get(
          `${process.env.VUE_APP_APIS_TARGET}/user/${this.$route.params.employee_id}/userpage`
        )
        .then((response) => {
          this.log = response.data.logs;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      this.loginStatus = false
      localStorage.removeItem('user');
    }
  },
  created: async function () {
    if ("user" in localStorage) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.loginStatus = true;
    }

    if (this.loginStatus) {
      this.getData();
    }

    let afterloader = new Promise(function (myResolve) {
      setTimeout(() => {
        return myResolve("");
      }, 1000);
    });
    this.pageloader = await afterloader;
  },
};
</script>