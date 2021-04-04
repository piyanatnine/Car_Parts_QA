<template>
    <section>
        <nav class="navbar is-dark py-1 pr-5">
            <!-- <div class="navbar-brand">
                <a class="navbar-item" href= "/">
                </a>
            </div> -->
            <div class="navbar-start pl-4">
                <span class="navbar-item icon-text">
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
                <template v-if = "!loginStatus">
                    <!-- ปุ่ม login -->  
                    <div class="navbar-item ">
                    <a href="/login">      
                    <button class="button is-rounded is-small">
                        <span class='has-text-weight-bold'>Login</span>
                    </button>
                    </a>
                    </div>
                </template>
                <template v-if = "loginStatus">
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


<script>
/* eslint-disable */
export default {
    data() {
        return {
            loginStatus: true //loginStatus
        };
    }
}
</script>
