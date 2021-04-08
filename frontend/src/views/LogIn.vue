<template>
  <section class="hero is-light is-fullheight">
    <div class="bg-img">
        <img src="../assets/BG_CarParts.jpg">
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-4">
            <form action="" class="box ">
              <div class="title has-text-centered">
                <label class="has-text-weight-bold">
                    Log In
                </label>
              </div>
              <div class="field">
                <label class="label has-text-weight-bold">
                    Username
                </label>
                <div class="control has-icons-left">
                    <input type="text" placeholder="Username" class="input" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
              </div>
              <div class="field">
                <label class="label has-text-weight-bold">
                    Password
                </label>
                <div class="control has-icons-left">
                    <input type="password" placeholder="Password" class="input"  maxlength="8" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </div>
              </div>
              <div class="field my-4">
                <label for="" class="checkbox has-text-weight-bold">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <button class="button is-success is-lg">Login</button>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <span><br>Need an account? <a class="has-text-link">Sign up</a></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  </section>
</template>

<style>
  .bg-img{
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    background-image: url("../assets/BG_CarParts.jpg");
    background-size: cover;
    opacity: 0.3;
  }
</style>