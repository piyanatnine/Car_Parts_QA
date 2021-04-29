<template>
  <section>
    <nav class="navbar is-dark py-3 pr-5 is-fixed-top">
      <div class="navbar-brand ml-5">
        <a href="/">
          <div class="navbar-item pl-4">
            <img class="image is-32x32" src="../assets/img/icon.png" />
            <span class="px-4 textIcon"> This is Icon</span>
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
    </aside>

    <!-- main content -->
    <section class="section main-content">
      <div class="mb-5">
        <!--choose list to show -->
        <div class="buttons has-addons is-centered are-medium">
          <button
            class="button"
            :class="listItem ? 'is-success' : ''"
            style="width: 15vw"
            @click="listItem = true"
          >
            Projects
          </button>
          <button
            class="button"
            :class="listItem ? '' : 'is-success'"
            style="width: 15vw"
            @click="listItem = false"
          >
            Parts
          </button>
        </div>
      </div>
      <div class="container">
        <div class="columns">
          <template v-if="listItem">
            <div class="column is-9 is-offset-2">
              <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                  <div class="level-item">
                    <span class="title">Project List</span>
                  </div>
                </div>
                <!-- Right side -->
                <div class="level-right">
                  <div class="level-item">
                    <div class="field has-addons">
                      <p class="control">
                        <input
                          class="input"
                          type="text"
                          placeholder="Find Project"
                        />
                      </p>
                      <p class="control">
                        <button class="button">
                          <span class="icon">
                            <i class="fas fa-search"></i>
                          </span>
                        </button>
                      </p>
                    </div>
                  </div>
                  <div class="level-item ml-2">
                    <span class="icon">
                      <i
                        class="fa fa-sort-amount-desc fa-2x"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </nav>
              <table class="homepage table is-fullwidth">
                <thead>
                  <tr>
                    <th style="width: 60%">Name</th>
                    <th>Status</th>
                    <th>Complete %</th>
                    <th style="width: 5"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if= "projects != null">
                  <template v-for= "project in projects.slice(page * 5 - 5, page * 5)">
                    <tr
                      :class= "more[0] ? '' : 'delBorder'"
                      :key= "`${project.project_id}-${project.project_name}`"
                    >
                      <td class="is-size-4 has-text-weight-bold" @click= "loaderPage(`/${project.project_id}`)"> 
                          {{ project.project_name}}
                      </td>
                      <td class="has-text-info is-uppercase pt-5 has-text-weight-bold">
                        {{  project.completeness != "100" ? 'inprogress' : 'complete' }}
                      </td>
                      <td>
                        <div :class= "'p' + integer(project.completeness)" class="c100 small">
                          <span>{{ integer(project.completeness) + "%" }}</span>
                          <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                          </div>
                        </div>
                      </td>
                      <td class="has-text-centered pt-3"
                          @click= "loaderPage(`/${project.project_id}`)">
                        <span class="icon pt-5">
                          <i
                            class="fas fa-3x <i fas fa-caret-right">
                          </i>
                        </span>
                      </td>
                    </tr>
                  </template>
                  </template>
                </tbody>
              </table>
              <div>
                <div class="buttons has-addons is-centered are-medium">
                  <button
                    class="button"
                    @click="page--"
                    :class="page <= 1 ? 'is-static' : ''"
                  >
                    ◄
                  </button>
                  <button class="button is-static">
                    {{ page }}
                  </button>
                  <button
                    class="button"
                    @click="page++"
                    :class="page >= pageCount('project') ? 'is-static' : ''"
                  >
                    ►
                  </button>
                </div>
              </div>
            </div>
          </template>
          <template v-if="!listItem">
            <div class="column is-9 is-offset-2">
              <nav class="level">
                <!-- Left side -->
                <div class="level-left">
                  <div class="level-item">
                    <span class="title">Parts List</span>
                  </div>
                </div>
                <!-- Right side -->
                <div class="level-right">
                  <div class="level-item">
                    <div class="field has-addons">
                      <p class="control">
                        <input
                          class="input"
                          type="text"
                          placeholder="Find Part"
                        />
                      </p>
                      <p class="control">
                        <button class="button">
                          <span class="icon">
                            <i class="fas fa-search"></i>
                          </span>
                        </button>
                      </p>
                    </div>
                  </div>
                  <div class="level-item ml-2">
                    <span class="icon">
                      <i
                        class="fa fa-sort-amount-desc fa-2x"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </nav>
              <table class="table is-fullwidth">
                <thead>
                  <tr>
                    <th>Part Number</th>
                    <th>Name</th>
                    <th>Project ID</th>
                    <th style="width: 5"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if= "parts != null">
                  <template
                    v-for="part in parts.slice(page * 10 - 10, page * 10)"
                  >
                    <tr :key="`${part.part_number}`" class="has-text-weight-semibold">
                      <td>{{ zeroPad(part.part_number) }}</td>
                      <td>{{ part.part_name }}</td>
                      <td>{{ zeroPad(part.project_id) }}</td>
                      <td>
                        <button class="button is-link is-outlined" 
                        @click= "loaderPage(`/${part.project_id}/${part.part_number}`)">
                          readmore
                        </button>
                      </td>
                    </tr>
                  </template>
                  </template>
                </tbody>
              </table>
              <div>
                <div class="buttons has-addons is-centered are-medium">
                  <button
                    class="button"
                    @click="page--"
                    :class="page <= 1 ? 'is-static' : ''"
                  >
                    ◄
                  </button>
                  <button class="button is-static">
                    {{ page }}
                  </button>
                  <button
                    class="button"
                    @click="page++"
                    :class="page >= pageCount('parts') ? 'is-static' : ''"
                  >
                    ►
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
    <div :class="pageloader" class="pageloader is-bottom-to-top is-dark">
      <span class="title">Pageloader</span>
    </div>
  </section>
</template>

<script>
console.clear()
import axios from "axios";
import router from "../router/index.js";
/* eslint-disable */
export default {
  data() {
    return {
      loginStatus: false, //loginStatus
      pageloader: "is-active",
      sidebar: true,
      listItem: true,
      more: [false, false],
      page: 1,
      projects: null,
      parts: null
    };
  },
  methods: {
    async loaderPage(pathname) {
      let loader = new Promise(function (myResolve, myReject) {
        return myResolve("is-active");
      });
      let afterloader = new Promise(function (myResolve, myReject) {
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
    pageCount(listVal) {
      let val = 0
      if (listVal == 'parts') {
        val = Math.ceil(this.parts.length / 10);
      }
      else if(listVal == 'project') {
        val = Math.ceil(this.projects.length / 5);
        console.log('page: '+ val)
      }
      
      return val;
    },
    zeroPad(num) {
      return num.toString().padStart(8, "0");
    },
    integer(val){
      return parseInt(val)
    }
  },
  watch: {
    listItem: function (val) {
        this.page = 1 
    }
  },
  created: async function () {
   await axios.get("http://localhost:3000/")
        .then((response) => {
          this.projects = response.data.projects;
          this.parts = response.data.parts;
          this.projects.map( value => {
              var a = {
                more: false
              } 
              value.status_page = a;
          });
        })
        .catch((err) => {
          console.log(err);
    });

    let afterloader = new Promise(function (myResolve) {
      setTimeout(() => {
        return myResolve("");
      }, 1000);
    });
    this.pageloader = await afterloader;

  }
};
</script>

<style>
section {
  height: 100%;
  margin: auto;
  width: auto;
  overflow: hidden;
}

section .main-content {
  margin-top: 10.5vh;
}

.delBorder td {
  border-bottom: 0px solid black !important;
}

.dropdownInfo {
  animation: slideDisplay 0.5s ease;
}

.homepage tr:hover td{
  background-color:hsl(0, 0%, 86%);
}

@keyframes slideDisplay {
  0% {
    opacity: 0;
    transform: translateY(-50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
