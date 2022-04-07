<template>
  <div style="margin-top: 9%;">
    <div class="">
      <div class="container">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form class="user" action="POST" v-on:submit.prevent="signUp">
                    <ErrorVue v-if="error" :error="error"></ErrorVue>
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control form-control-user"
                        placeholder="Name Surname"
                        v-model="name"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        placeholder="Email Address"
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
                    <button href="login.html" class="btn btn-primary btn-user btn-block">Register</button>
                  </form>
                  <hr />
                  <!-- <div class="text-center">
                  <a class="small" href="forgot-password.html">Forgot Password?</a>
                  </div>-->
                  <div class="text-center">
                    <router-link to="/signin">
                      <span class="small">Already have an account? Login!</span>
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
</template>

<script>
import AuthService from "../services/AuthService"
import ErrorVue from "@/components/ErrorVue.vue"

export default {
  name: "RegisterView",
  components: {
    ErrorVue
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async signUp() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      await AuthService.signUp(newUser).then((response) => {
        this.$router.push({ name: 'signin', params: { message: response.message } })
      }).catch(err => {
        this.error = err.response.data.error
        console.log(err);
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

.bg-register-image {
  background: url("https://source.unsplash.com/Mv9hjnEUHR4/600x800");
  background-position: center;
  background-size: cover;
}

.bg-password-image {
  background: url("https://source.unsplash.com/oWTW-jNGl9I/600x800");
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

.error {
  color: #5a5c69;
  font-size: 7rem;
  position: relative;
  line-height: 1;
  width: 12.5rem;
}
</style>