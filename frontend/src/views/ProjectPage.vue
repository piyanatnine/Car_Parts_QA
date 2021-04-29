<template>
  <section>
    <nav class="navbar is-dark py-3 pr-5 is-fixed-top">
      <div class="navbar-brand ml-5" @click="loaderPage('/')">
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
    <aside
      id="sidebar"
      class="menu has-background-grey-darker has-text-link-light px-5 pb-4"
      :style="{ left: sidebar ? 0 : -50 + 'vw' }"
    >
      <div class="vl"></div>
    </aside>
    <template v-if= "project != null">
    <section class="section main-content">
      <div class="container is-fluid">
        <nav class="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
          <ul>
            <li @click="loaderPage('/')"><a> HOMEPAGE </a></li>
            <li class="is-active" aria-current="page">
              <a>{{ zeroPad(project[0].project_id) }} </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="level mt-5">
        <div class="level-left">
          <div class="level-item">
            <p class="title has-text-weight-bold" style="font-size: 5vw">
              {{ "Project " + project[0].project_name }}
            </p>
          </div>
          <div class="level-item mx-5 pt-3">
            <p class="subtitle has-text-weight-medium" style="font-size: 2vw">
              {{ `project ID:` + zeroPad(project[0].project_id) }}
            </p>
          </div>
        </div>
        <div class="level-right mr-5">
          <div class="level-item" v-if="user.position == 'Admin'">
            <div class="button is-danger" @click= "editPageOpen()">
              <span class="icon">
                <i class="fas fa-pen"></i>
              </span>
              <span> Edit Project</span>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="container">
          <span class="title"> Parts of Project </span>
          <div class="table-container mt-5">
            <table class="part_table table is-fullwidth">
              <thead class="is-size-5 has-text-centered">
                <th>Part Number</th>
                <th>Name</th>
                <th>Work_Inst</th>
                <th>Inspection</th>
                <th>Q-Point</th>
              </thead>
              <tbody>
                <template v-for="part in project">
                  <tr
                    class="is-size-5 has-text-centered"
                    @click = "loaderPage(`/${part.project_id}/${part.part_number}`)"
                    :key="`${part.project_id}-${part.part_number}`"
                  >
                    <td>{{ zeroPad(part.part_number) }}</td>
                    <td>{{ part.part_name }}</td>
                    <td>
                      <span class="icon mt-2" :class= "colorStatus(part.wi_status)">
                        <i class="fas fa-circle fa-2x"></i>
                      </span>
                    </td>
                    <td>
                      <span class="icon mt-2" :class= "colorStatus(part.inspection_status)">
                        <i class="fas fa-circle fa-2x"></i>
                      </span>
                    </td>
                    <td>
                      <span class="icon mt-2" :class= "colorStatus(part.qpoint_status)">
                        <i class="fas fa-circle fa-2x"></i>
                      </span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="level mt-5">
        <div class="level-left mr-5"></div>
        <div class="level-right mr-5">
          <div class="level-item" v-if="user.position == 'Admin'">
            <div class="button is-danger" @click="resetPageOpen()">
              <span class="icon">
                <i class="fas fa-pen"></i>
              </span>
              <span> Reset Project</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Edit -->
    <div class="modal" :class="{ 'is-active': editproject }">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-weight-semibold">Edit Project</p>
          <button
            class="delete"
            aria-label="close"
            @click= "editproject = false"
          ></button>
        </header>
        <section class="modal-card-body has-background-white-bis">
          <!-- Content ... -->
          <div class="has-text-centered">
            <span class="is-size-4 has-text-weight-semibold"> 
              {{ 'Project ID: ' + zeroPad(project[0].project_id) }}
            </span>
              <div class="field is-horizontal my-5">
              <div class="field-label is-normal">
                <label class="label">Project Name :</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                    <input
                      class="input"
                      type="name"
                      placeholder="Project name"
                      v-model="projectname"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <nav class="level">
            <button
              class="level-item has-text-centered button"
              @click= "editproject = false"
            >
              Cancel
            </button>
            <button class="level-item button is-success" @click= "editConfirm()">
              Submit
            </button>
          </nav>
        </footer>
      </div>
    </div>
    <!-- reset project -->
    <div class="modal" :class="{ 'is-active': resetproject }">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-weight-semibold">Reset Project</p>
          <button
            class="delete"
            aria-label="close"
            @click= "resetproject = false"
          ></button>
        </header>
        <section class="modal-card-body has-background-white-bis">
          <!-- Content ... -->
          <div class="has-text-centered">
            <span class="is-size-3 has-text-weight-semibold"> 
              {{ 'Project ID: ' + zeroPad(project[0].project_id) }}
            </span>
            <div>
              <span class="has-text-danger is-size-4 has-text-weight-semibold">
                If you reset project. All document in project <br> will be change status to 'Temporary'!!.
              </span>
            </div>
            <div class="mt-5">
              <div class="control">
                <span class="is-size-5 has-text-weight-semibold">
                  Please enter you password for Confirm
                </span>
                <p class="control has-icons-right mt-3">
                    <input class="input" type="password" placeholder="********" v-model= "password">
                    <span class="icon is-small is-right">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <nav class="level">
            <button
              class="level-item has-text-centered button"
              @click= "resetproject = false"
            >
              Cancel
            </button>
            <button class="level-item button is-success" @click= "resetConfirm()">
              Submit
            </button>
          </nav>
        </footer>
      </div>
    </div>
    </template>
    <div :class="pageloader" class="pageloader is-bottom-to-top is-dark">
      <span class="title">Pageloader</span>
    </div>
  </section>
</template>

<style>
  .part_table tr:hover {
    background-color:hsl(0, 0%, 95%);
    cursor: pointer;
  }
</style>

<script>
import axios from "axios";
import router from "../router/index.js";
export default {
  data() {
    return {
      loginStatus: true,
      pageloader: "is-active",
      sidebar: false,
      editproject : false,
      resetproject: false,
      password: null, 
      user: {
        employee_id: "AM-102",
        first_name: "Jame",
        last_name: "smite",
        position: "Admin",
      },
      project: null,
      //projectEdit
      projectname: null,
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
    zeroPad(val) {
      return val.toString().padStart(8, "0");
    },
    colorStatus(val) {
      if (val == null) {
        return "has-text-grey";
      } else if (val == "Temporary") {
        return "has-text-danger";
      } else if (val == "Approved") {
        return "has-text-success";
      } else {
        return "";
      }
    },
    editPageOpen() {
      this.editproject = true;
      this.projectname = this.project.project_name;
    },
    editConfirm() {
      this.editproject = false;
    },
    resetPageOpen() {
      this.resetproject = true;
    },
    resetConfirm() {
      this.password = null;
      this.resetproject = false;
    }
  },
  created: async function () {
      await axios.get(`http://localhost:3000/${this.$route.params.project_id}`)
        .then((response) => {
          this.project = response.data;
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
  },
};
</script>