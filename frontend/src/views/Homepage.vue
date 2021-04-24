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
      <p class="menu-label">Tatayabaga</p>
      <ul class="menu-list">
        <li><a>ukaukauka</a></li>
        <li><a>Tatatatatata</a></li>
        <li><a>Bababububebe</a></li>
      </ul>
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
              <table class="table is-fullwidth">
                <thead>
                  <tr>
                    <th style="width: 60%">Name</th>
                    <th>Status</th>
                    <th>Complete %</th>
                    <th style="width: 5"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(project, index) in projects">
                    <tr
                      :class= "project.readmore ? '' : 'delBorder'"
                      :key= "`${project.project_id}-${project.project_name}`"
                    >
                      <td @click= "loaderPage(`/${project.project_id}`)"> 
                          {{ project.project_name}}
                      </td>
                      <td class="has-text-info is-uppercase pt-5">
                        inprogress
                      </td>
                      <td>
                        <div :class="'p' + percents[index]" class="c100 small">
                          <span>{{ percents[index] + "%" }}</span>
                          <div class="slice">
                            <div class="bar"></div>
                            <div class="fill"></div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          class="icon pt-5"
                          @click="project.statusPage.readmore = !project.statusPage.readmore"
                        >
                          <i
                            class="fas fa-2x"
                            :class="
                              project.statusPage.readmore ? 'fa-caret-up' : 'fa-caret-down'
                            "
                          ></i>
                        </span>
                      </td>
                    </tr>
                    <div
                      :style="{ display: project.statusPage.readmore ? '' : 'none' }"
                      class="dropdownInfo"
                      :key="`${project.project_id}-${project.statusPage.readmore}`"
                    >
                      <tr>
                        <td colspan="4">Part of Project</td>
                      </tr>
                      <div class="content">
                      <ul class="px-5 pb-3">
                      <template v-for="part in parts">
                            <li class="mb-3" v-if= "part.project_id == project.project_id" :key= "`${part.project_id}-${part.part_number}`"> 
                                <strong>Part Number:</strong>{{ " "+zeroPad(part.part_number)}}<strong>  Part Name:</strong> {{ " "+part.part_name }}
                            </li>
                      </template>
                      </ul>
                      </div>
                    </div>
                  </template>
                </tbody>
              </table>
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
                  <template
                    v-for="part in parts.slice(page * 10 - 10, page * 10)"
                  >
                    <tr :key="`${part.part_number}`">
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
                    :class="page >= pageCount(parts.lenght) ? 'is-static' : ''"
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
import router from "../router/index.js";
/* eslint-disable */
export default {
  data() {
    return {
      loginStatus: false, //loginStatus
      pageloader: "is-active",
      sidebar: true,
      listItem: true,
      page: 1,
      percents: [60, 100],
      projects: [
        {
          project_name: "TestA",
          project_id: 1,
          customer_id: 1,
          statusPage: { 
            readmore: false
          }
        },
        {
          project_name: "TestB",
          project_id: 2,
          customer_id: 2,
          statusPage: { 
            readmore: false
          }
        },
      ],
      parts: [
        {
          part_number: 1,
          part_name: "partTestA1",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 1,
        },
        {
          part_number: 2,
          part_name: "partTestB1",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 2,
        },
        {
          part_number: 3,
          part_name: "partTestB2",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 2,
        },
        {
          part_number: 4,
          part_name: "partTestA2",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 1,
        },
        {
          part_number: 5,
          part_name: "partTestA3",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 1,
        },
        {
          part_number: 6,
          part_name: "partTestA1",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 1,
        },
        {
          part_number: 7,
          part_name: "partTestB1",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 2,
        },
        {
          part_number: 8,
          part_name: "partTestB2",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 2,
        },
        {
          part_number: 9,
          part_name: "partTestA2",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 1,
        },
        {
          part_number: 10,
          part_name: "partTestA3",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 1,
        },
        {
          part_number: 11,
          part_name: "partTestA3",
          part_drawing: require(`../assets/img/part_img.png`),
          project_id: 1,
        },
      ],
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
    pageCount() {
      let val = Math.ceil(this.parts.length / 10);
      return val;
    },
    zeroPad(num) {
      return num.toString().padStart(8, "0");
    }
  },
  watch: {
    listItem: function (val) {
        this.page = 1 
    }
  },
  created: async function () {
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

table tr:hover td{
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
