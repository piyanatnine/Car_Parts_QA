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
    <!-- sidebar -->
    <aside
      id="sidebar"
      class="menu has-background-grey-darker has-text-link-light px-5 pb-4"
      :style="{ left: sidebar ? 0 : -50 + 'vw' }"
    >
      <div class="vl"></div>
      <p class="menu-label">Banana</p>
    </aside>
    <template v-if="part != null">
    <section class="section main-content">
      <div class="container is-fluid">
        <nav class="breadcrumb is-centered is-medium" aria-label="breadcrumbs">
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
              <p class="subtitle has-text-weight-medium" style="font-size: 2vw">
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
            <span class="is-size-4"> Last Update: ------------- </span>
          </div>
          <div class="mx-2 my-5">
            <span class="is-size-4">
              Drawing of Part:
              <a :href="part.part_drawing" download>
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
              <tr class="is-size-5 has-text-centered" style="line-height: 10vh">
                <td>Work Instruction</td>
                <td>
                  <span>
                    <a download>
                      <i class="fas fa-link mx-2"></i>
                      Document_URL
                    </a>
                  </span>
                </td>
                <td>
                  <div class="mt-2">
                    <span class="icon">
                      <i class="fas fa-clock fa-2x"></i>
                    </span>
                  </div>
                </td>
                <td class="">
                  <div class="select is-primary mt-3">
                    <select v-model="document_part.status">
                      <option value="Temporary">Temporary</option>
                      <option value="Approve">Approve</option>
                    </select>
                  </div>
                </td>
                <td class="pt-4">
                  <div class="icon-text mt-4">
                    <span class="icon" :class="colorIcon">
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
              <tr class="is-size-5 has-text-centered" style="line-height: 10vh">
                <td>Inspection</td>
                <td>
                  <span>
                    <a download>
                      <i class="fas fa-link mx-2"></i>
                      Document_URL
                    </a>
                  </span>
                </td>
                <td>
                  <div class="mt-2">
                    <span class="icon">
                      <i class="fas fa-clock fa-2x"></i>
                    </span>
                  </div>
                </td>
                <td>
                  <div class="select is-primary mt-3">
                    <select v-model="document_part.status">
                      <option value="Temporary">Temporary</option>
                      <option value="Approve">Approve</option>
                    </select>
                  </div>
                </td>
                <td class="pt-4">
                  <div class="icon-text mt-4">
                    <span class="icon" :class="colorIcon">
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
              <tr class="is-size-5 has-text-centered" style="line-height: 10vh">
                <td>Q-Point</td>
                <td>
                  <span>
                    <a download>
                      <i class="fas fa-link mx-2"></i>
                      Document_URL
                    </a>
                  </span>
                </td>
                <td>
                  <span class="icon mt-2">
                    <i class="fas fa-clock fa-2x"></i>
                  </span>
                </td>
                <td>
                  <div class="select is-primary mt-3">
                    <select v-model="document_part.status">
                      <option value="Temporary">Temporary</option>
                      <option value="Approve">Approve</option>
                    </select>
                  </div>
                </td>
                <td class="pt-4">
                  <div class="icon-text mt-4">
                    <span class="icon" :class="colorIcon">
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
          <!-- Content ... -->
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
            <button class="level-item button is-success" @click="upload_summit">
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
    </template>
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
      part: null,
      user: {
        employee_id: "AM-102",
        first_name: "Jame",
        last_name: "smite",
        position: "Admin",
      },
      Work_Inst: null,
      Inspection: null,
      Q_Point: null,
      //uploadpage
      upload_page: false,
      type: null,
      file_name: null,
      file_PDF: null,
      pev_number: null,
      //editpage
      editpage: false,
      partname: null,
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
    },
    upload(type) {
      this.upload_page = true;
      this.type = type;
      this.pev_number = this.document_part.upload_no;
    },
    previewFiles(file) {
      this.file_PDF = file.target.files[0];
      console.info(this.file_PDF);
      this.file_name = file.target.files[0].name;
    },
    upload_summit() {
      var data = {
        File_Name: this.file_name,
        Document_URL: ".../a/a" + this.file_name,
        Document_Type: this.type,
        Status: "Temporary",
        Part_Number: this.part.part_number,
        Uploader: this.user.employee_id,
      };
      this.file_name = null
      this.file_PDF = null
      console.log(data);
      this.upload_page = false;
    },
    editPageOpen() {
      this.editpage = true;
      this.partname = this.part.part_name;
    },
    editConfirm() {
      //axios
      this.file_name = null
      this.file_PDF = null
      this.editpage = false;
    },
  },
  //เดะตื่นมาทำ เชื่อมbackend
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
  computed: {
    colorIcon: function () {
      if (this.document_part.status == null) {
        return "has-text-grey";
      } else if (this.document_part.status == "Temporary") {
        return "has-text-danger";
      } else if (this.document_part.status == "Approve") {
        return "has-text-success";
      } else {
        return "";
      }
    },
  },
};
</script>

<style>
section .main-content {
  margin-top: 6vh;
}
</style>
