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
  </section>
</template>