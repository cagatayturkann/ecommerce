<template>
  <div style="margin-top: 7%">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form class="user" v-on:submit.prevent="signIn">
                      <ErrorVue v-if="error" :error="error"></ErrorVue>
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          v-model="email"
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          class="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          v-model="password"
                        />
                      </div>
                      <button class="btn btn-primary btn-user btn-block">Login</button>
                    </form>
                    <hr />
                    <div class="text-center">
                      <a class="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div class="text-center">
                      <router-link to="/register">
                        <span class="small">Create an Account!</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService"
import ErrorVue from "@/components/ErrorVue.vue"
export default {
  name: "LoginView",
  components: {
    ErrorVue
},
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
     signIn() {

      let user = {
        email: this.email,
        password: this.password
      }
       AuthService.signIn(user).then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          this.$store.dispatch('user', response.data.user)
          console.log(`login ${JSON.stringify(response.data.user)}`)
          if(this.$store.getters.user.role !== 'admin'){
            this.$router.push('/profile')
          } else if (this.$store.getters.user.role === 'admin'){
            this.$router.push('/dashboard')
          }
        }
      }).catch(err => {
        this.error = err.response.data.title
        console.log(`test ${err.response.data.title}`);
      })

    }
  }
}
</script>

<style scoped>
.bg-login-image {
  background: url("https://source.unsplash.com/K4mSJ7kc0As/600x800");
  background-position: center;
  background-size: cover;
}

form.user .custom-checkbox.small label {
  line-height: 1.5rem;
}

form.user .form-control-user {
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 1.5rem 1rem;
}

form.user .btn-user {
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 0.75rem 1rem;
}
</style>