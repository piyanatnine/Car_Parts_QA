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
              <div class="dropdown is-right" :class= "dropdown ? 'is-active' : ''">
                <div class="dropdown-trigger">
                  <button style= "background-color: Transparent;outline:none;border: none;overflow: hidden;">
                    <span class="icon" style="color: white;" @click= "dropdown = !dropdown">
                      <i class="fas fa-angle-down is-2x" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu">
                  <div class="dropdown-content">
                    <a class="dropdown-item" @click="loaderPage('/user/'+user.employee_id+'/userpage')"> UserProfile </a>
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
            <template v-if="projects != null">
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
                            v-model="searching[0]"
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
                      <div class="dropdown is-hoverable">
                        <div class="dropdown-trigger">
                          <button
                            class="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu4"
                          >
                            <span class="icon">
                              <i
                                class="fa fa-sort-amount-desc fa-2x"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </button>
                        </div>
                        <div
                          class="dropdown-menu"
                          id="dropdown-menu4"
                          role="menu"
                        >
                          <div class="dropdown-content">
                            <div class="dropdown-item">
                              <label class="radio">
                                <input
                                  type="radio"
                                  value="name"
                                  v-model="sort_function.sort_project"
                                />
                                Name
                              </label>
                              <br />
                              <label class="radio">
                                <input
                                  type="radio"
                                  value="id"
                                  v-model="sort_function.sort_project"
                                />
                                ID
                              </label>
                              <br />
                              <label class="radio">
                                <input
                                  type="radio"
                                  value="status"
                                  v-model="sort_function.sort_project"
                                />
                                Status
                              </label>
                              <br />
                              <label class="radio">
                                <input
                                  type="radio"
                                  value="complete"
                                  v-model="sort_function.sort_project"
                                />
                                Complete
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nav>
                <table class="homepage table is-fullwidth">
                  <thead>
                    <tr>
                      <th style="width: 40%">Name</th>
                      <th style="width: 20%">ID</th>
                      <th>Status</th>
                      <th>Complete %</th>
                      <th style="width: 5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <template
                      v-for="project in projectResult.slice(
                        page * 5 - 5,
                        page * 5
                      )"
                    >
                      <tr
                        :class="more[0] ? '' : 'delBorder'"
                        :key="`${project.project_id}-${project.project_name}`"
                      >
                        <td
                          class="is-size-4 has-text-weight-bold"
                          @click="loaderPage(`/${project.project_id}`)"
                        >
                          {{ project.project_name }}
                        </td>
                        <td
                          class="is-size-5 has-text-weight-semibold pt-4"
                          @click="loaderPage(`/${project.project_id}`)"
                        >
                          {{ zeroPad(project.project_id) }}
                        </td>
                        <td
                          class="has-text-info is-uppercase pt-5 has-text-weight-bold"
                        >
                          {{
                            project.completeness != "100.000000000"
                              ? "inprogress"
                              : "complete"
                          }}
                        </td>
                        <td>
                          <div
                            :class="'p' + integer(project.completeness)"
                            class="c100 small"
                          >
                            <span>{{
                              integer(project.completeness) + "%"
                            }}</span>
                            <div class="slice">
                              <div class="bar"></div>
                              <div class="fill"></div>
                            </div>
                          </div>
                        </td>
                        <td
                          class="has-text-centered pt-3"
                          @click="loaderPage(`/${project.project_id}`)"
                        >
                          <span class="icon pt-5">
                            <i class="fas fa-3x <i fas fa-caret-right"> </i>
                          </span>
                        </td>
                      </tr>
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
          </template>
          <template v-if="!listItem">
            <template v-if="parts != null">
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
                            v-model="searching[1]"
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
                      <div class="dropdown is-hoverable">
                        <div class="dropdown-trigger">
                          <button
                            class="button"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu4"
                          >
                            <span class="icon">
                              <i
                                class="fa fa-sort-amount-desc fa-2x"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </button>
                        </div>
                        <div
                          class="dropdown-menu"
                          id="dropdown-menu4"
                          role="menu"
                        >
                          <div class="dropdown-content">
                            <div class="dropdown-item">
                              <label class="radio">
                                <input
                                  type="radio"
                                  value="number"
                                  v-model="sort_function.sort_part"
                                />
                                Number
                              </label>
                              <br />
                              <label class="radio">
                                <input
                                  type="radio"
                                  value="name"
                                  v-model="sort_function.sort_part"
                                />
                                Name
                              </label>
                              <br />
                              <label class="radio">
                                <input
                                  type="radio"
                                  value="id"
                                  v-model="sort_function.sort_part"
                                />
                                Project ID
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
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
                    <template
                      v-for="part in partResult.slice(
                        page * 10 - 10,
                        page * 10
                      )"
                    >
                      <tr
                        :key="`${part.part_number}`"
                        class="has-text-weight-semibold"
                      >
                        <td>{{ zeroPad(part.part_number) }}</td>
                        <td>{{ part.part_name }}</td>
                        <td>{{ zeroPad(part.project_id) }}</td>
                        <td>
                          <button
                            class="button is-link is-outlined"
                            @click="
                              loaderPage(
                                `/${part.project_id}/${part.part_number}`
                              )
                            "
                          >
                            readmore
                          </button>
                        </td>
                      </tr>
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
import axios from "axios";
import router from "../router/index.js";
/* eslint-disable */

export default {
  data() {
    return {
      sort_function: {
        sort_project: "id", //name,id,status,%
        sort_part: "number", //number,name,projectId
      },
      dropdown: false,
      searching: ["", ""],
      loginStatus: false, //loginStatus
      user: null,
      pageloader: "is-active",
      sidebar: true,
      listItem: true,
      more: [false, false],
      page: 1,
      projects: null,
      parts: null,
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
      let val = 0;
      if (listVal == "parts") {
        val = Math.ceil(this.partResult.length / 10);
      } else if (listVal == "project") {
        val = Math.ceil(this.projectResult.length / 5);
      }

      return val;
    },
    zeroPad(num) {
      return num.toString().padStart(8, "0");
    },
    integer(val) {
      return parseInt(val);
    },
    //sort_function
    sort_id(select) {
      function compare(a, b) {
        if (a.project_id < b.project_id) {
          return -1;
        } else if (a.project_id > b.project_id) {
          return 1;
        } else {
          return 0;
        }
      }

      if (select) {
        this.projects.sort(compare);
      } else {
        this.parts.sort(compare);
      }
    },
    sort_project_name() {
      function compare(a, b) {
        if ((a.project_name).toUpperCase() < b.project_name.toUpperCase()) {
          return -1;
        } else if (a.project_name.toUpperCase() > b.project_name.toUpperCase()) {
          return 1;
        } else {
          return 0;
        }
      }
      this.projects.sort(compare);
    },
    sort_part_name() {
      function compare(a, b) {
        if ((a.part_name).toUpperCase() < (b.part_name).toUpperCase()) {
          return -1;
        } else if ((a.part_name).toUpperCase() > (b.part_name).toUpperCase()) {
          return 1;
        } else {
          return 0;
        }
      }
      this.parts.sort(compare);
    },
    sort_complete() {
      function compare(a, b) {
        if (a.completeness < b.completeness) {
          return -1;
        } else if (a.completeness > b.completeness) {
          return 1;
        } else {
          return 0;
        }
      }
      this.projects.sort(compare);
    },
    sort_status() {
      function compare(a, b) {
        if (parseFloat(a.completeness) < parseFloat(b.completeness)) {
          return 1;
        } else if (parseFloat(a.completeness) > parseFloat(b.completeness)) {
          return -1;
        } else {
          return 0;
        }
      }
      this.projects.sort(compare);
    },
    sort_number() {
      function compare(a, b) {
        if (a.part_number < b.part_number) {
          return -1;
        } else if (a.part_number > b.part_number) {
          return 1;
        } else {
          return 0;
        }
      }
      this.parts.sort(compare);
    },
  },
  watch: {
    listItem: function (val) {
      this.page = 1;
    },
  },
  computed: {
    projectResult() {
      if (this.sort_function.sort_project == "name") {
        this.sort_project_name(true);
      }
      if (this.sort_function.sort_project == "id") {
        this.sort_id(true);
      }
      if (this.sort_function.sort_project == "status") {
        this.sort_status(true);
      }
      if (this.sort_function.sort_project == "complete") {
        this.sort_complete(true);
      }

      var result = this.projects;
      var txt = this.searching[0].toUpperCase();
      result = result.filter((val) => {
        if (
          val.project_name.toUpperCase().indexOf(txt) > -1 ||
          val.project_id.toString().indexOf(txt) > -1
        ) {
          return val;
        }
      });
      return result;
    },
    partResult() {
      if (this.sort_function.sort_part == "name") {
        this.sort_part_name();
      }
      if (this.sort_function.sort_part == "id") {
        this.sort_id(false);
      }
      if (this.sort_function.sort_part == "number") {
        this.sort_number();
      }

      var result = this.parts;
      var txt = this.searching[1].toUpperCase();
      result = result.filter((val) => {
        if (
          val.part_name.toUpperCase().indexOf(txt) > -1 ||
          val.part_number.toString().indexOf(txt) > -1
        ) {
          return val;
        }
      });
      return result;
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
      await axios
        .get("http://localhost:3000/")
        .then((response) => {
          this.projects = response.data.projects;
          this.parts = response.data.parts;
          this.projects.map((value) => {
            value.search_page = true;
          });
        })
        .catch((err) => {
          console.log(err);
        });
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

.homepage tr:hover td {
  background-color: hsl(0, 0%, 86%);
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
