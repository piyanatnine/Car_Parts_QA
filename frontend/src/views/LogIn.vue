<template>
  <section class="hero is-primary is-fullheight video">
    <div class="hero-video">
      <video-bg :sources="['../assets/Car_Engine_Parts_3.mov']"> </video-bg>
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-4">
            <form action="" class="box">
              <div class="field">
                <label class="label">
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
                <label class="label">
                    Password
                </label>
                <div class="control has-icons-left">
                    <input type="password" placeholder="Password" class="input"  maxlength="8" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <div class="field">
                <button class="button is-success">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div class="has-text-centered">// Scroll down arrow here?</div>
    </div>
  </section>
</template>