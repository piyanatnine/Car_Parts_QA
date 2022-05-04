<template>
  <section>
    <nav class="navbar is-dark py-3 pr-5 is-fixed-top">
      <div class="navbar-brand ml-5" @click="loaderPage('/')">
        <div class="navbar-item pl-4">
          <span class="icon has-text-primary">
            <i class="fas fa-cog fa-spin fa-3x"></i>
          </span>
          <span class="pl-5 textIcon"> CarPart QA</span>
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
    <template v-if="part != null">
      <section class="section main-content">
        <div class="container is-fluid">
          <nav
            class="breadcrumb is-centered is-medium"
            aria-label="breadcrumbs"
          >
            <ul>
              <li @click="loaderPage('/')"><a> HOMEPAGE </a></li>
              <li @click="loaderPage(`/${part.project_id}`)">
                <a>{{ zeroPad(part.project_id) }} </a>
              </li>
              <li class="is-active" aria-current="page">
                <a>{{ zeroPad(part.part_number) }}</a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="container is-fluid my-5">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <p class="title has-text-weight-bold" style="font-size: 5vw">
                  {{ part.part_name }}
                </p>
              </div>
              <div class="level-item mx-5 pt-3">
                <p
                  class="subtitle has-text-weight-medium"
                  style="font-size: 2vw"
                >
                  Part Number: {{ zeroPad(part.part_number) }}
                </p>
              </div>
            </div>
            <div class="level-right mr-5">
              <div class="level-item" v-if="user.position == 'Admin'">
                <div class="button is-danger" @click="editPageOpen()">
                  <span class="icon">
                    <i class="fas fa-pen"></i>
                  </span>
                  <span> Edit Part</span>
                </div>
              </div>
            </div>
          </div>
          <div class="container pl-5">
            <div class="mx-2">
              <span class="is-size-4">
                Project ID: {{ zeroPad(part.project_id) }}
              </span>
            </div>
            <div class="mx-2 my-1">
              <span class="is-size-4"> Last Update: {{ lastupdate }} </span>
            </div>
            <div class="mx-2 my-5">
              <span class="is-size-4">
                Drawing of Part:
                <a :href="path(part.part_drawing)" target="_blank" download>
                  <i class="fas fa-link ml-2"></i>
                  Download PDF File
                </a>
              </span>
            </div>
          </div>
          <div class="container" style="margin-top: 12vh">
            <table class="table is-fullwidth">
              <thead class="is-size-4 has-text-centered">
                <th>Document</th>
                <th>Last File Upload</th>
                <th>History</th>
                <th>Status</th>
                <th></th>
                <th style="width: 5"></th>
              </thead>
              <tbody>
                <tr
                  class="is-size-5 has-text-centered"
                  style="line-height: 10vh"
                >
                  <td>Work_Inst</td>
                  <td>
                    <span>
                      <a
                        :href= "Work_Inst == null ? '' : path(Work_Inst.Document_URL)"
                        target="_blank"
                        download
                      >
                        <span class="textname">
                          <i class="fas fa-link mx-2"></i>
                          {{
                            Work_Inst == null
                              ? "Document_URL"
                              : Work_Inst.file_name
                          }}
                        </span>
                      </a>
                    </span>
                  </td>
                  <td>
                    <span
                      class="icon mt-2"
                      @click="Work_Inst != null ? logHistory(Work_Inst.document_type): ''"
                    >
                      <i class="fas fa-clock fa-2x"></i>
                    </span>
                  </td>
                  <td>
                    <div class="select is-primary mt-3">
                      <template v-if="Work_Inst != null">
                        <select
                          v-model="Work_Inst.status"
                          @change="changeStatus('Work_Inst')"
                          :disabled="Work_Inst.status == 'Approved'"
                        >
                          <option value="NULL" selected disabled hidden>
                            No Document
                          </option>
                          <option value="Temporary">Temporary</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </template>
                      <template v-else>
                        <select disabled>
                          <option value="NULL" selected disabled hidden>
                            No Document
                          </option>
                          <option value="Temporary">Temporary</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </template>
                    </div>
                  </td>
                  <td class="pt-4">
                    <div class="icon-text mt-4">
                      <span
                        class="icon"
                        :class="
                          Work_Inst == null
                            ? 'has-text-grey'
                            : colorIcon(Work_Inst.status)
                        "
                      >
                        <i class="fas fa-circle fa-3x"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="button is-link is-fullwidth mt-4"
                      @click="upload('Work_Inst')"
                    >
                      <span class="icon">
                        <i class="fas fa-pen"></i>
                      </span>
                      <span> Upload </span>
                    </div>
                  </td>
                </tr>
                <tr
                  class="is-size-5 has-text-centered"
                  style="line-height: 10vh"
                >
                  <td>Inspection</td>
                  <td>
                    <span>
                      <a
                        :href="Inspection == null ? '':path(Inspection.Document_URL)"
                        target="_blank"
                        download
                      >
                        <span class="textname">
                          <i class="fas fa-link mx-2"></i>
                          {{
                            Inspection == null
                              ? "Document_URL"
                              : Inspection.file_name
                          }}
                        </span>
                      </a>
                    </span>
                  </td>
                  <td>
                    <span
                      class="icon mt-2"
                      @click="Inspection != null ? logHistory(Inspection.document_type) : ''"
                    >
                      <i class="fas fa-clock fa-2x"></i>
                    </span>
                  </td>
                  <td>
                    <div class="select is-primary mt-3">
                      <template v-if="Inspection != null">
                        <select
                          v-model="Inspection.status"
                          @change="changeStatus('Inspection')"
                          :disabled="Inspection.status == 'Approved'"
                        >
                          <option value="NULL" selected disabled hidden>
                            No Document
                          </option>
                          <option value="Temporary">Temporary</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </template>
                      <template v-else>
                        <select disabled>
                          <option value="NULL" selected disabled hidden>
                            No Document
                          </option>
                          <option value="Temporary">Temporary</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </template>
                    </div>
                  </td>
                  <td class="pt-4">
                    <div class="icon-text mt-4">
                      <span
                        class="icon"
                        :class="
                          Inspection == null
                            ? 'has-text-grey'
                            : colorIcon(Inspection.status)
                        "
                      >
                        <i class="fas fa-circle fa-3x"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="button is-link is-fullwidth mt-4"
                      @click="upload('Inspection')"
                    >
                      <span class="icon">
                        <i class="fas fa-pen"></i>
                      </span>
                      <span> Upload </span>
                    </div>
                  </td>
                </tr>
                <tr
                  class="is-size-5 has-text-centered"
                  style="line-height: 10vh"
                >
                  <td>Q-Point</td>
                  <td>
                    <span>
                      <a
                        :href=" Q_Point == null ? '' : path(Q_Point.Document_URL)"
                        target="_blank"
                        download
                      >
                        <span class="textname">
                          <i class="fas fa-link mx-2"></i>
                          {{
                            Q_Point == null ? "Document_URL" : Q_Point.file_name
                          }}
                        </span>
                      </a>
                    </span>
                  </td>
                  <td>
                    <span class="icon mt-2" @click="Q_Point != null ? logHistory(Q_Point.document_type):''">
                      <i class="fas fa-clock fa-2x"></i>
                    </span>
                  </td>
                  <td>
                    <div class="select is-primary mt-3">
                      <template v-if="Q_Point != null">
                        <select
                          v-model="Q_Point.status"
                          @change="changeStatus('Q_Point')"
                          :disabled="Q_Point.status == 'Approved'"
                        >
                          <option value="NULL" selected disabled hidden>
                            No Document
                          </option>
                          <option value="Temporary">Temporary</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </template>
                      <template v-else>
                        <select disabled>
                          <option value="NULL" selected disabled hidden>
                            No Document
                          </option>
                          <option value="Temporary">Temporary</option>
                          <option value="Approved">Approved</option>
                        </select>
                      </template>
                    </div>
                  </td>
                  <td class="pt-4">
                    <div class="icon-text mt-4">
                      <span
                        class="icon"
                        :class="
                          Q_Point == null
                            ? 'has-text-grey'
                            : colorIcon(Q_Point.status)
                        "
                      >
                        <i class="fas fa-circle fa-3x"></i>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div
                      class="button is-link is-fullwidth mt-4"
                      @click="upload('Q_Point')"
                    >
                      <span class="icon">
                        <i class="fas fa-pen"></i>
                      </span>
                      <span> Upload </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <!-- Upload Document -->
      <div class="modal" :class="{ 'is-active': upload_page }">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">UPLOAD DOCUMENT {{ type }}</p>
            <button
              class="delete"
              aria-label="close"
              @click="upload_page = false"
            ></button>
          </header>
          <section class="modal-card-body">
            <!-- Content -->
            <div class="form">
              <div class="file has-name is-fullwidth">
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
                </label>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <nav class="level">
              <button
                class="level-item has-text-centered button"
                @click="upload_page = false"
              >
                Cancel
              </button>
              <button
                class="level-item button is-success"
                @click="upload_summit"
              >
                Submit
              </button>
            </nav>
          </footer>
        </div>
      </div>

      <!-- Edit -->
      <div class="modal" :class="{ 'is-active': editpage }">
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit Part</p>
            <button
              class="delete"
              aria-label="close"
              @click="editpage = false"
            ></button>
          </header>
          <section class="modal-card-body has-background-white-bis">
            <!-- Content ... -->
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
                      v-model="partname"
                    />
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
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
            <nav class="level">
              <button
                class="level-item has-text-centered button"
                @click="editpage = false"
              >
                Cancel
              </button>
              <button class="level-item button is-success" @click="editConfirm">
                Submit
              </button>
            </nav>
          </footer>
        </div>
      </div>
      <!-- confirm ChangeStatus -->
      <div class="modal" :class="{ 'is-active': confirmPage }">
        <div class="modal-card" style="border: grey 1px solid">
          <header class="modal-card-head">
            <p class="modal-card-title has-text-weight-semibold">
              ChangeStatus
            </p>
            <template v-if="!comfirmComplete">
            <button
              class="delete"
              aria-label="close"
              @click="comfirmStatusComplete(false)"
            ></button>
            </template>
            <template v-else>
            <button
              class="delete"
              aria-label="close"
              @click="confirmPage = false"
              v-if="comfirmComplete"
            ></button>
            </template>
          </header>
          <section class="modal-card-body has-background-white-bis">
            <!-- Content ... -->
            <div class="has-text-centered" v-if="!comfirmComplete">
              <span class="title"> Are you sure change Status?</span>
            </div>
            <div class="has-text-centered" v-if="comfirmComplete">
              <span class="title"> Change Status Complete!</span>
            </div>
          </section>
          <footer class="modal-card-foot">
            <nav class="level">
              <button
                class="level-item has-text-centered button"
                @click="comfirmStatusComplete(false)"
                v-if="!comfirmComplete"
              >
                Cancel
              </button>
              <button class="level-item button is-success" @click="comfirmStatusComplete(true)" v-if="!comfirmComplete">
                OK
              </button>
              <button class="level-item button is-success" @click="confirmPage = false" v-if="comfirmComplete">
                OK
              </button>
            </nav>
          </footer>
        </div>
      </div>
      <!-- Log History -->
      <div class="modal" :class="{ 'is-active': logOpen }" style="weight: 80%">
        <div
          class="modal-message"
          style="width: 60%; overflow: hidden"
        >
          <article class="message is-link">
            <div class="message-header">
              <p>Log History</p>
              <button
                class="delete"
                aria-label="delete"
                @click="logOpen = false"
              ></button>
            </div>
            <div class="message-body">
              <div id="table-wrapper">
                <div id="table-scroll">
                  <table class="table is-fullwidth">
                    <thead>
                      <tr>
                        <th style="width: 25%">Upload No.</th>
                        <th style="width: 25%">File Name</th>
                        <th style="width: 25%">Upload Time</th>
                        <th style="width: 15%">Upload By</th>
                        <th style="width: 10%">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if= "log_history != null">
                        <template v-for= "(log, index) in log_history">
                            <tr :key="`${log.upload_no}-${index}`">
                              <td> {{ log.upload_no }} </td>
                              <td> {{ log.file_name }} </td>
                              <td> {{ log.upload_datetime.slice(0, 10) }} </td>
                              <td> {{ log.uploader }} </td>
                              <td> {{ log.status }} </td>
                            </tr>
                        </template>
                      </template>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </template>
    <div :class="pageloader" class="pageloader is-bottom-to-top is-dark">
      <span class="title">Pageloader</span>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import router from "../router/index.js";
export default {
  data() {
    return {
      loginStatus: false,
      pageloader: "is-active",
      sidebar: false,
      part: null,
      lastupdate: null,
      dropdown: false,
      user: null,
      Work_Inst: null,
      Inspection: null,
      Q_Point: null,
      //uploadpage
      upload_page: false,
      type: null,
      file_PDF: null,
      pev_number: null,
      //editpage
      editpage: false,
      partname: null,
      file_name: null,
      //confirmpage
      confirmPage: false,
      upload_no: '',
      comfirmComplete: '',
      type_doc: '',
      //logHistory
      logOpen: false,
      log_history: null,
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
    async logHistory(type) {
      await axios.get(`${process.env.VUE_APP_APIS_TARGET}/${this.$route.params.project_id}/${this.$route.params.part_number}/history/${type}`)
        .then( (response) => {
          this.log_history = response.data
        })
        .catch((err) => {
          console.log(err);
        });
      this.logOpen = true;
    },
    async getPartData() {
      await axios
        .get(
          `${process.env.VUE_APP_APIS_TARGET}/${this.$route.params.project_id}/${this.$route.params.part_number}`
        )
        .then((response) => {
          this.part = response.data.part[0];
          this.Work_Inst = response.data.Work_Inst[0];
          this.Inspection = response.data.Inspection[0];
          this.Q_Point = response.data.Q_Point[0];
          this.lastupdate = response.data.lastupdate[0].latest_update
            .slice(0, 19)
            .replace("T", " ");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    zeroPad(num) {
      return num.toString().padStart(8, "0");
    },
    upload(type) {
      if (this.user.position == 'Admin' || this.user.position == 'QA'){
        this.file_name = null;
        this.upload_page = true;
        this.type = type;
        if (type == "Work_Inst" && this.Work_Inst != null) {
          this.pev_number = this.Work_Inst.upload_no;
        }
        if (type == "Inspection" && this.Inspection != null) {
          this.pev_number = this.Inspection.upload_no;
        }
        if (type == "Q_Point" && this.Q_Point != null) {
          this.pev_number = this.Q_Point.upload_no;
        }
      }
    },
    previewFiles(file) {
      this.file_PDF = file.target.files[0];
      this.file_name = file.target.files[0].name;
    },
    async upload_summit() {
      let formData = new FormData();
      formData.append("file", this.file_PDF);
      formData.append("document_type", this.type);
      formData.append("pev_doc", this.pev_number);
      formData.append("uploader", this.user.employee_id);

      await axios
        .post(
          `${process.env.VUE_APP_APIS_TARGET}/${this.$route.params.project_id}/${this.$route.params.part_number}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.pev_number = null;
      this.upload_page = false;
      await this.getPartData();
    },
    editPageOpen() {
      this.editpage = true;
      this.partname = this.part.part_name;
      this.file_name = null;
    },
    async editConfirm() {
      this.editpage = false;
      let formData = new FormData();
      formData.append("file", this.file_PDF);
      formData.append("name", this.partname);

      //axios
      await axios
        .put(
          `${process.env.VUE_APP_APIS_TARGET}/${this.$route.params.project_id}/${this.$route.params.part_number}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      await this.getPartData();
      this.file_name = null;
      this.file_PDF = null;
    },
    colorIcon(val) {
      if (val == "Temporary") {
        return "has-text-danger";
      } else if (val == "Approved") {
        return "has-text-success";
      } else {
        return "has-text-grey";
      }
    },
    changeStatus(doc) {
      if (this.user.position == 'Admin' || this.user.position == 'QA'){
      this.confirmPage = true;
      this.comfirmComplete = false;
      this.type_doc = doc;
      var upload_no = "";
      if (doc == "Work_Inst") {
        upload_no = this.Work_Inst.upload_no;
      }
      if (doc == "Inspection") {
        upload_no = this.Inspection.upload_no;
      }
      if (doc == "Q_Point") {
        upload_no = this.Q_Point.upload_no;
      }
      this.upload_no = upload_no;
      // console.log(upload_no);
      }
      else {
        alert (`User can't change status!`);
        if (doc == "Work_Inst") {
          this.Work_Inst.status = 'Temporary' ;
        }
        if (doc == "Inspection") {
          this.Inspection.status = 'Temporary' ;
        }
        if (doc == "Q_Point") {
          this.Q_Point.status = 'Temporary' ;
        }
      }
    },
    async comfirmStatusComplete(check){
      if (check){
        //axios
        await axios
        .put(
          `${process.env.VUE_APP_APIS_TARGET}/${this.$route.params.project_id}/${this.$route.params.part_number}/status`,
          { upload_no: this.upload_no, user_id: this.user.employee_id }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
        await this.getPartData();
        this.comfirmComplete = true
      }
      else if (!check){
        if (this.type_doc == "Work_Inst") {
          this.Work_Inst.status = 'Temporary' ;
        }
        if (this.type_doc == "Inspection") {
          this.Inspection.status = 'Temporary' ;
        }
        if (this.type_doc == "Q_Point") {
          this.Q_Point.status = 'Temporary' ;
        }
        this.confirmPage = false;
      }
    },
    path(txt) {
      if (txt) {
        return `${process.env.VUE_APP_APIS_TARGET}/` + txt;
      } else {
        return "";
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
    
    if(this.loginStatus){
      //axios data
      this.getPartData();
    }
    
    //loader Page
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
section .main-content {
  margin-top: 6vh;
}
.textname {
  display: inline-block;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>