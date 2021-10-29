<template>
  <section class="hero is-light is-fullheight">
    <div class="bg-img">
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-4">
            <div class="box ">
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
                    <input type="text" placeholder="Username" class="input" required v-model="$v.username.$model">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                    <template v-if="$v.username.$error">
                      <p class="help is-danger" v-if="!$v.username.required">Username can be blank</p>
                      <p class="help is-danger" v-if="!$v.username.maxLength">Password is maxlength = 20</p>
                    </template>
                </div>
              </div>
              <div class="field">
                <label class="label has-text-weight-bold">
                    Password
                </label>
                <div class="control has-icons-left">
                    <input type="password" placeholder="Password" class="input"  maxlength="20" v-model="$v.password.$model"> 
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                    <template v-if="$v.password.$error">
                      <p class="help is-danger" v-if="!$v.password.required">Password can be blank</p>
                      <p class="help is-danger" v-if="!$v.password.minLength">Password is minlength = 4</p>
                    </template>
                </div>
              </div>
              <div class="field my-4">
                <label for="" class="checkbox has-text-weight-bold">
                  <input type="checkbox" />
                  Remember me
                </label>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <button class="button is-success is-lg" @click="loginCheck()">Login</button>
              </div>
              <template v-if="error_msg != null">
                <div class="field my-2">
                <p class="help is-danger" v-if="error_msg != null">
                    {{ error_msg }}
                </p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="pageloader" class="pageloader is-bottom-to-top is-dark">
      <span class="title">Pageloader</span>
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
    background-image: url("../assets/img/BG_CarParts.jpg");
    background-size: cover;
    opacity: 0.3;
  }
</style>

<script>
import axios from 'axios';
import router from "../router/index.js";
import { required, minLength, maxLength  } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      pageloader: 'is-active',
      username: '',
      password: '',
      error_msg: ''
    }
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
    async loginCheck(){
      this.$v.$touch();
      if (!this.$v.invalid) {
      axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      .then((response) => {
        if ('user' in localStorage){
          localStorage.removeItem('user');
        }
        console.log(response.data[0]);
        localStorage.setItem("user", JSON.stringify(response.data[0]));
        this.loaderPage('/');
      })
      .catch(() => {
        this.error_msg = 'Username or password is Incorrect';
      });
      }
    }
  },
  created: async function() {
      let afterloader = new Promise(function (myResolve) {
        setTimeout(() => {
          return myResolve("");
        }, 1000);
      });

      this.pageloader = await afterloader;
  },
  validations: {
    password: {
       required: required,
       minLength: minLength(4),
     },
     username: {
       required: required,
       minLength: minLength(4),
       maxLength: maxLength(20)
     }
  } 
}
</script>