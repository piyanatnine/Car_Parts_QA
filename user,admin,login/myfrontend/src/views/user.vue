<template>
    <section>
        <nav class="navbar py-3 pl-5 pr-5 is-dark is-fixed-top">
            <div class="navbar-brand">
                <a @click="loaderpage('/home')">
                    <span class="has-text-primary">
                    <i class="fas fa-cog fa-spin fa-3x"></i>
                    </span>
                </a>
            <span class="pl-5 pt-3 textIcon"> CarPart QA</span>
            </div>
            <div class="navbar-start pl-5">
                <span class="navbar-start navbar-item icon-text" @click="sidebar = !sidebar">
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
                <div class="navbar-item">
                    <span class="icon-text">
                        <span class="icon pt-1">
                            <i class="fas fa-user-circle"></i>
                        </span>
                        <span @click="dropdown = !dropdown" style="height: 40px;">
                            {{ user.first_name }}
                            <i class="fas fa-angle-down is-2x" aria-hidden="true"></i>
                        </span>
                    </span>
                </div>
            </div>
        </nav>
        <aside
            style="
                height: 100px;
                width: 100px;
                position: relative;
                top: 60px;
                left: 90%;
                z-index: 30;
                position: fixed
            "
            class="dropdown-content'
        ">
            <div class="dropdown-content" :class="dropdown ? 'is-active' : 'is-hidden'">
                <a
                    class="dropdown-item"
                    @click="modal=!modal"
                >
                    userpage
                </a>
            <hr class="dropdown-divider" />
                <a class="dropdown-item" @click="loaderpage('/login')"> Logout </a>
            </div>
        </aside>
        <div style='
            height: 80px;
        '></div>
        <div style='
            position: relative;
            top: 20px;
            left: 42%;
            height: 40px;
            width: 300px;
            text-align: center;
            padding-top: 4px;
        '>
            <button
                style="border-radius: 12px;"
                class="btn btn-info btn-sm"
                @click="loaderpage('/home')"
            >
                homepage
            </button>
            <span style="font-weight: 700;"> /{{user.employee_id}}</span>
        </div>
        <div style='
            position: relative;
            top: 25px;
            left: 10px;
            height: 900px;
            width: 1160px;
            background-color: lightblue;
            border-radius: 40px;
        '>
            <div style='
                height: 300px;
                width: 300px;
                display: inline;
                position: relative;
                top: 40px;
            '>
                <img src="user.png" alt="">
            </div>
            <div style='
                height: 150px;
                width: 500px;
                display: inline-block;
                position: relative;
                top: 40px;
                font-size: 36px;
                font-weight: 700;
            '>
                Employee ID: {{user.employee_id}} <br>
                Name: {{user.first_name}} {{user.last_name}} <br>
            </div>
            <div style='
                height: 150px;
                width: 300px;
                display: inline-block;
                position: relative;
                top: -40px;
                left: 100px;
            ' :class="isAdmin ? 'is-active': 'is-hidden'">
                <button
                    style="border-radius: 12px;"
                    class="btn btn-danger btn-lg"
                    @click="loaderpage('/adminpanel')"
                >
                    <span class="icon">
                        <i class="fas fa-user"></i>
                    </span>
                    <span> AdminPanel</span>
                </button>
            </div>
            <br> <br>
            <div style='
                height: 100px;
                width: 600px;
                position: relative;
                left: 30px;
                font-size: 36px;
                font-weight: 700;
            '>
                Position: {{user.position}}
            </div>
            <div style='
                height: 600px;
                width: 90%;
                position: relative;
                left: 30px;
                font-size: 36px;
                font-weight: 700;
                '>
                <span style="text-decoration: underline;">
                    Acivity Record(s)
                </span>
                <br> <hr style="border-top: 3px solid navy;">
                <div style='
                    background-color: white;
                    width: 1050px;
                    height: 400px;
                    text-decoration: normal;
                    font-size: 18px;
                    overflow-y: scroll;
                '>
                    <ul>
                        <li v-for="item in docs" :key="item.upload_datetime">
                            - upload {{ item.file_name }}
                            to part number {{ ((item.part_number + 100) + '').substring(1, 3) }}
                            on {{ item.upload_datetime.substring(0, 10) }}
                            at {{ item.upload_datetime.substring(11, 19) }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div style="
        background-color: white;
            height: 400px;
            width: 600px;
            position: fixed;
            top: 150px;
            left: 350px;
        "
            :class="modal ? 'is-active' : 'is-hidden'"
            class="modal" tabindex="-1" role="dialog"
        >
            <div class="model-dialog" role="document">
                <div class="model-content">
                    <div class="modal-header">
                        <h5 style="font-weight: 700">
                            Account Setting
                        </h5>
                        <button type="button" style="
                            height: 30px;
                            width: 30px;
                            border-radius: 15px;
                            position: relative;
                            left: 20px;
                        " @click="modal=false;">
                            <span style="
                                position: relative;
                                top: -2px;
                            ">
                                x
                            </span>
                        </button>
                    </div>
                    <div
                        class="modal-body"
                        style="height: 300px; width: 550px; overflow-y: scroll;"
                    >
                        <label>Current Password</label> <br>
                        <input type="password" v-model="c_pw"> <br>
                        <label>New Password</label> <br>
                        <input type="password" v-model="n_pw_one"> <br>
                        <input type="password" v-model="n_pw_two"> <br>
                    </div>
                    <div class="modal-footer">
                        <button @click="info()">submit</button>
                    </div>
                </div>
            </div>
        </div>
        <div
            id="sidebar"
            class="has-background-grey-darker has-text-light"
            :style="{ left: sidebar ? 0 : -50 + 'vw' }"
            style="opacity: 0.8;"
        >
            <div style='
                border-bottom: 4px solid gray;
                border-radius: 200vw;
                width: 90%;
                position: relative;
                left: 5%;
            '></div>
        </div>
    </section>
</template>


<script>
    import axios from 'axios';
    import router from "../router/index.js";
    export default {
        data() {
            return {
                user: [],
                docs: [],
                first_name: null,
                last_name: null,
                sidebar: false,
                dropdown: false,
                isLoggingIn: false,
                isAdmin: false,
                modal: false,
                c_pw: '',
                n_pw_one: '',
                n_pw_two: ''
            }
        },
        created() {
            let user_ = localStorage.getItem('user')
            axios.get("http://localhost:3000/user/" + user_)
                .then((response) => {
                    this.user = response.data[0];
                    if (this.user.position == 'Admin')
                    {
                        this.isAdmin = true;
                    }
                    console.log(this.user.first_name + ', ' + this.isAdmin + ', ' + this.user.last_name)
                })
                .catch((err) => {
                    console.log(err)
                })
            axios.get("http://localhost:3000/docs")
                .then((response) => {
                    this.docs = response.data;
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        methods: {
            loaderpage(path) {
                console.log(path + ' ' + localStorage.getItem('user'))
                router.push({ path: path })
            },
            logout() {
                this.isLoggingIn = false;
            },
            info() {
                let error = 0
                if (this.n_pw_one != this.n_pw_two)
                {
                    alert('new password do not match')
                    error = 1;
                }
                if ((this.n_pw_one.length < 8) || (this.n_pw_two.length < 8))
                {
                    alert('new password is too short')
                    error = 1;
                }
                axios.get('http://localhost:3000/acc/' + this.user.Username + '/' + this.c_pw + '/' + this.n_pw_one + '/' + this.n_pw_two + '/' + error)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.length == 0)
                    {
                        alert('old password is wrong')
                        error = 1;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
                if (error == 0)
                {
                    this.modal = false;
                }
            }
        }
    }
</script>

<style scoped>
</style>
