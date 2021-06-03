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
                      @click="loaderPage('/user/'+user.employee_id+'/userpage')"
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
              <li @click="loaderPage('/user/'+user.employee_id+'/userpage')">
                <a>{{ zeroPad(user.employee_id) }} </a>
              </li>
              <li class="is-active" aria-current="page">
                <a>AdminPanel</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="container is-fluid my-5">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <p
                  class="title has-text-weight-bold"
                  style="font-size: 4vw; text-decoration: underline"
                >
                  Admin Panel
                </p>
              </div>
            </div>
          </div>
          <!--choose list to show -->
          <div class="buttons has-addons is-centered are-medium mt-5">
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
              Users
            </button>
          </div>
          <template v-if="listItem">
            <div
              class="container"
              style="margin-top: 6vh; border: black 3px solid;"
            >
              <div class="level">
                <div class="level-left">
                  <span
                    class="title has-text-semi-bold ml-5"
                    style="text-decoration: underline"
                  >
                    Project List
                  </span>
                </div>
                <div class="level-right mt-5 mx-5">
                  <div class="level-item">
                    <button
                      class="button is-success is-medium is-outlined"
                      @click="addproject()"
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              </div>
              <template v-if="projects != null">
                <div id="table-wrapper">
                  <div id="table-scroll">
                    <table class="table is-fullwidth">
                      <thead class="is-size-4 has-text-centered">
                        <th style="width: 20%">ID</th>
                        <th style="width: 15%">Name</th>
                        <th style="width: 20%">Customer_ID</th>
                        <th style="width: 20%">Part in Project</th>
                        <th style="width: 20%"></th>
                      </thead>
                      <tbody style="overflow: auto">
                        <template v-for="project in projects">
                          <tr
                            class="has-text-centered has-text-weight-bold"
                            :key="`${project.project_id}-${project.project_name}`"
                          >
                            <td>{{ zeroPad(project.project_id) }}</td>
                            <td>{{ project.project_name }}</td>
                            <td>{{ zeroPad(project.customer_id) }}</td>
                            <td>{{ project.Part + " Part" }}</td>
                            <td>
                              <button
                                class="button is-link is-outlined"
                                @click="addpart(project.project_id)"
                              >
                                Add part
                              </button>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </template>
            </div>
          </template>
          <template v-if="!listItem">
              <div
              class="container"
              style="margin-top: 6vh; border: black 3px solid;"
            >
              <div class="level">
                <div class="level-left">
                  <span
                    class="title has-text-semi-bold ml-5"
                    style="text-decoration: underline"
                  >
                    User List
                  </span>
                </div>
                <div class="level-right mt-5 mx-5">
                  <div class="level-item">
                    <button
                      class="button is-success is-medium is-outlined"
                      @click= "adduser()"
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </div>
              <template v-if="users != null">
                <div id="table-wrapper">
                  <div id="table-scroll">
                    <table class="table is-fullwidth">
                      <thead class="is-size-4 has-text-centered">
                        <th style="width: 20%">ID</th>
                        <th style="width: 20%">Name Surname</th>
                        <th style="width: 20%">Position</th>
                        <th style="width: 20%">Username</th>
                        <th style="width: 20%"></th>
                      </thead>
                      <tbody style="overflow: auto">
                        <template v-for="(select_user, index) in users">
                          <tr
                            class="has-text-centered has-text-weight-bold"
                            :key="`${select_user.employee_id}-${select_user.first_name}`"
                          >
                            <td>{{ zeroPad(select_user.employee_id) }}</td>
                            <td>{{ select_user.first_name+" "+select_user.last_name }}</td>
                            <td>{{ select_user.position }}</td>
                            <td>{{ select_user.Username }}</td>
                            <td>
                              <button
                                class="button is-link is-outlined"
                                @click= "edituser(index)"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </table>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </section>
    <!-- Add Part -->
    <div class="modal" :class="{ 'is-active': addpart_page }">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Part</p>
          <button
            class="delete"
            aria-label="close"
            @click="addpart_page = false"
          ></button>
        </header>
        <section class="modal-card-body has-background-white-bis">
          <!-- Content ... -->
          <div class="has-text-centered mb-5">
            <span class="title">Project ID: {{ zeroPad(project_id) }}</span>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Part Name :</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="name"
                    placeholder="Part name"
                    v-model="$v.part_name.$model"
                  />
                  <template v-if="$v.part_name.$error">
                      <p class="help is-danger" v-if="!$v.part_name.required">Part name can't be blank</p>
                  </template>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Drawing:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="file is-fullwidth">
                  <label class="file-label">
                    <input
                      class="file-input"
                      type="file"
                      name="resume"
                      accept=".pdf"
                      @change="previewFiles"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label"> Choose a file… </span>
                    </span>
                    <span class="file-name">
                      {{ file_name }}
                    </span>
                    <template v-if="$v.file_name.$error">
                      <p class="help is-danger" v-if="!$v.file_name.required">File can be blank</p>
                    </template>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="has-text-centered">
            <span class="is-size-5 has-text-info"
              >**Part Number will Auto Generate**</span
            >
          </div>
        </section>
        <footer class="modal-card-foot">
          <nav class="level">
            <button
              class="level-item has-text-centered button"
              @click="addpart_page = false"
            >
              Cancel
            </button>
            <button class="level-item button is-success" @click="addConfirm()">
              Submit
            </button>
          </nav>
        </footer>
      </div>
    </div>
    <!-- Add Project -->
    <div class="modal" :class="{ 'is-active': addprojectOpen }">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Project</p>
          <button
            class="delete"
            aria-label="close"
            @click="addprojectOpen = false"
          ></button>
        </header>
        <section class="modal-card-body has-background-white-bis">
          <!-- Content ... -->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Name :</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="name"
                    placeholder="Project name"
                    v-model="$v.project_name.$model"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Customer: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="select is-link">
                  <select v-model="$v.select_customer.$model">
                    <option value="" selected disabled hidden>Select Customer</option>
                    <template v-for="customer in customers">
                        <option :key="`${customer.customer_id}-${customer.customer_name}`"
                        :value="customer.customer_id">
                            {{ customer.customer_id+" "+customer.customer_name }}
                        </option>
                    </template>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="has-text-centered">
            <span class="is-size-5 has-text-info"
              >**Project ID will Auto Generate**</span
            >
          </div>
        </section>
        <footer class="modal-card-foot">
          <nav class="level">
            <button
              class="level-item has-text-centered button"
              @click="addprojectOpen = false"
            >
              Cancel
            </button>
            <button
              class="level-item button is-success"
              @click="addprojectConfirm()"
            >
              Submit
            </button>
          </nav>
        </footer>
      </div>
    </div>
    <!-- adduser -->
      <div class="modal" :class="{ 'is-active': adduserOpen }">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add User</p>
          <button
            class="delete"
            aria-label="close"
            @click="adduserOpen = false"
          ></button>
        </header>
        <section class="modal-card-body has-background-white-bis">
          <!-- Content ... -->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">ID :</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-rounded"
                    type="number"
                    onKeyPress= "if(this.value.length==8) return false;"
                    placeholder="employee ID"
                    v-model="$v.employee_id.$model"
                  />
                  <template v-if="$v.employee_id.$error">
                      <p class="help is-danger" v-if="!$v.employee_id.required">employee Id can't be blank</p>
                      <!-- <p class="help is-danger" v-if="$v.employee_id.username_already_use == false">employee Id is alreadyuse please try again</p> -->
                      <p class="help is-danger" v-if="$v.employee_id.minLength"> employee is required 8 number</p>
                  </template>
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Firstname :</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-rounded"
                    type="name"
                    placeholder="first name"
                    v-model="$v.firstname.$model"
                  />
                </p>
                <template v-if="$v.firstname.$error">
                      <p class="help is-danger" v-if="!$v.firstname.required">First Name can't be blank</p>
                      <p class="help is-danger" v-if="!$v.firstname.maxLength">First Name is maxLength = 20</p>
                      <p class="help is-danger" v-if="!$v.firstname.minLength">First Name is minLength = 4</p>
                </template>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Lastname :</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-rounded"
                    type="name"
                    placeholder="Last name"
                    v-model="$v.lastname.$model"
                  />
                </p>
                <template v-if="$v.lastname.$error">
                      <p class="help is-danger" v-if="!$v.lastname.required">Last Name can't be blank</p>
                      <p class="help is-danger" v-if="!$v.lastname.maxLength">Last Name is maxLength = 20</p>
                      <p class="help is-danger" v-if="!$v.lastname.minLength">Last Name is minLength = 4</p>
                </template>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Position: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="select is-link is-rounded">
                  <select v-model="$v.position.$model">
                    <option value="" selected disabled hidden>Select your position</option>
                    <option value="Admin">ADMIN</option>
                    <option value="QA">QA</option>
                    <option value="User">USER</option>
                  </select>
                  <template v-if="$v.position.$error">
                    <p class="help is-danger" v-if="!$v.position.required">please select your position</p>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Username :</label>
            </div>
            <div class="field-body mt-2">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-rounded"
                    type="name"
                    disabled
                    v-model= 'username_generate'
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Password : </label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control has-icons-left">
                    <input type="password" placeholder="Password" class="input" required v-model="$v.password.$model"> 
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    <template v-if="$v.password.$error">
                      <p class="help is-danger" v-if="!$v.password.required">
                        password can't be blank
                      </p>
                      <p class="help is-danger" v-if="!$v.password.minLength">
                        password is min lenght = 8
                      </p>
                    </template>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal has-text-centered">
              <label class="label">Confirm Password : </label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control has-icons-left">
                    <input type="password" placeholder="Password" class="input" v-model="$v.confirm_password.$model"> 
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    <template v-if="$v.confirm_password.$error">
                      <p class="help is-danger" v-if="!$v.confirm_password.sameAs">
                        password is not macth
                      </p>
                    </template>
                </div>
              </div>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <nav class="level">
            <button
              class="level-item has-text-centered button"
              @click="adduserOpen = false"
            >
              Cancel
            </button>
            <button
              class="level-item button is-success"
              @click="adduserSummit()"
            >
              Submit
            </button>
          </nav>
        </footer>
      </div>
    </div>
    <!-- useredit -->
    <div class="modal" :class="{ 'is-active': edituserOpen }">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit User</p>
          <button
            class="delete"
            aria-label="close"
            @click="edituserOpen = false"
          ></button>
        </header>
        <section class="modal-card-body has-background-white-bis">
          <!-- Content ... -->
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">ID :</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-rounded"
                    type="number"
                    onKeyPress= "if(this.value.length==8) return false;"
                    placeholder="employee ID"
                    v-model="employee_id"
                    disabled
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Firstname :</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-rounded"
                    type="name"
                    placeholder="first name"
                    v-model="firstname"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Lastname :</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input is-rounded"
                    type="name"
                    placeholder="Last name"
                    v-model="lastname"
                  />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Position: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="select is-link is-rounded">
                  <select v-model="position">
                    <option value="" selected disabled hidden>Select your position</option>
                    <option value="Admin">ADMIN</option>
                    <option value="QA">QA</option>
                    <option value="User">USER</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </section>
        <footer class="modal-card-foot">
          <nav class="level">
            <button
              class="level-item has-text-centered button"
              @click="edituserOpen = false"
            >
              Cancel
            </button>
            <button
              class="level-item button is-success"
              @click="edituserSummit()"
            >
              Submit
            </button>
          </nav>
        </footer>
      </div>
    </div>
    <div :class="pageloader" class="pageloader is-bottom-to-top is-dark">
      <span class="title">Pageloader</span>
    </div>
  </section>
</template>

<script>
import { required, minLength, sameAs, maxLength} from 'vuelidate/lib/validators';
import router from "../router/index.js";
import axios from "axios";

// async function username_already_use (value) {
//     await axios.get(`http://localhost:3000/adminpanel/already_user/${value}`, {employee_id: value})
//     .then(()=>{return true})
//     .catch(()=>{return false})
// }
export default {
  data() {
    return {
      dropdown: false,
      loginStatus: false, //loginStatus
      user: null,
      users: [],
      pageloader: "is-active",
      sidebar: false,
      listItem: true,
      projects: [],
      customers: [],
      //add part
      addpart_page: false,
      project_id: 0,
      part_name: null,
      part_drawing: null,
      file_PDF: null,
      file_name: null,
      //add project
      addprojectOpen: false,
      project_name: '',
      select_customer: '',
      //add user
      adduserOpen: false,
      firstname: '',
      lastname: '',
      position: '',
      employee_id: '',
      password: '',
      confirm_password: '',
      //edit user
      edituserOpen: false

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
    addpart(id) {
      this.addpart_page = true;
      this.project_id = id;
      this.part_name = null;
      this.part_drawing = null;
      this.file_PDF = null;
      this.file_name = null;
    },
    previewFiles(file) {
      this.file_PDF = file.target.files[0];
      this.file_name = file.target.files[0].name;
    },
    async addConfirm() {
       this.$v.$touch();

       if (!(this.$v.part_name.$invalid || this.$v.file_name.$invalid)){
        let formData = new FormData();
        formData.append("partname", this.part_name);
        formData.append("file", this.file_PDF);
        formData.append("project_id", this.project_id);

      await axios
        .post(
          `http://localhost:3000/user/${this.$route.params.employee_id}/adminpanel/addpart`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
        this.addpart_page = false;
        this.getData();
      }
    },
    addproject() {
      this.addprojectOpen = true;
      this.project_name = "";
      this.select_customer = "";
      
    },
    async addprojectConfirm() {
      this.$v.$touch();

      if (!(this.$v.project_name.$invalid || this.$v.select_customer.$invalid)){
      await axios.post(`http://localhost:3000/user/${this.$route.params.employee_id}/adminpanel/addproject`, 
      {project_name: this.project_name, customer_id: this.select_customer})
       .then((response) => {
          console.log(response.data);
       })
       .catch((err) => {
          console.log(err);
       });

       this.addprojectOpen = false;
       this.getData();
      }
    },
    adduser(){
      this.adduserOpen = true;
      this.firstname = ''
      this.lastname = ''
      this.position = ''
      this.employee_id = ''
      this.password = ''
    },
    edituser(index){
      this.edituserOpen = true;
      // console.log(this.users[index])
      this.employee_id = this.users[index].employee_id
      this.firstname = this.users[index].first_name
      this.lastname = this.users[index].last_name
      this.position = this.users[index].position
    },
    async edituserSummit(){
      await axios.put(
        `http://localhost:3000/user/${this.$route.params.employee_id}/adminpanel/edituser`,
        { firstname: this.firstname, lastname: this.lastname, position: this.position,
        employee_id: this.employee_id }
      )
      .then((res)=>{
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })

      this.edituserOpen = false;
      this.getData();
    },
    async getData() {
      await axios
        .get(
          `http://localhost:3000/user/${this.$route.params.employee_id}/adminpanel`
        )
        .then((response) => {
          this.projects = response.data.projects;
          this.customers = response.data.customers;
          this.users = response.data.users;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async adduserSummit(){
      this.$v.$touch();
        if (!(this.$v.employee_id.$invalid  || this.$v.firstname.$invalid 
            || this.$v.lastname.$invalid || this.$v.position.$invalid
            || this.$v.password.$invalid || this.$v.confirm_password.$invalid)){
          await axios.post(`http://localhost:3000/user/${this.$route.params.employee_id}/adminpanel/adduser`,
          { employee_id: this.employee_id, 
            firstname: this.firstname, 
            lastname: this.lastname,
            position: this.position,
            password: this.password
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err)
          })
          this.adduserOpen = false;
          this.getData();
        }
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
  computed: {
    username_generate: function(){
      return this.position+this.employee_id;
    }
  },
  validations: {
    //add project
    project_name: {
       required: required
    },
    select_customer: {
       required: required
    },
    //add part
    part_name:{ required: required},
    file_name:{ required: required},
    //add user
    employee_id: {
      required: required,
      // username_already_use: username_already_use,
      minLength: minLength(8),
      maxLength: maxLength(8)
    },
    firstname: {
      required: required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    lastname: {
      required: required,
      minLength: minLength(4),
      maxLength: maxLength(20)
    },
    position: {
      required: required
    },
    password: {
      required: required,
      minLength: minLength(8)
    },
    confirm_password: {
      sameAs: sameAs('password')
    }
  }
};
</script>
