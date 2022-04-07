<template>
  <div>
    <!-- Topbar Start -->
    <TopBarVue></TopBarVue>
    <!-- Topbar End -->
    <!-- Navigation Start -->
    <NavigationVue></NavigationVue>
    <!-- Navigation End -->
    <!-- Contact Start -->
    <div class="container-fluid pt-5">
      <div class="text-center mb-4">
        <h2 class="section-title px-5">
          <span class="px-2">Contact For Any Queries</span>
        </h2>
      </div>
      <div class="row px-xl-5">
        <div class="col-md-8 offset-md-2 mb-5">
          <div class="contact-form">
            <div id="success"></div>
            <form name="sentMessage" id="contactForm" novalidate="novalidate">
              <div class="control-group">
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Your Name"
                  required="required"
                  data-validation-required-message="Please enter your name"
                />
                <p class="help-block text-danger"></p>
              </div>
              <div class="control-group">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Your Email"
                  required="required"
                  data-validation-required-message="Please enter your email"
                />
                <p class="help-block text-danger"></p>
              </div>
              <div class="control-group">
                <input
                  type="text"
                  class="form-control"
                  id="subject"
                  placeholder="Subject"
                  required="required"
                  data-validation-required-message="Please enter a subject"
                />
                <p class="help-block text-danger"></p>
              </div>
              <div class="control-group">
                <textarea
                  class="form-control"
                  rows="6"
                  id="message"
                  placeholder="Message"
                  required="required"
                  data-validation-required-message="Please enter your message"
                ></textarea>
                <p class="help-block text-danger"></p>
              </div>
              <div>
                <button class="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">
                  Send
                  Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Contact End -->
    <!-- Footer Start -->
    <FooterVue></FooterVue>
    <!-- Footer End -->
  </div>
</template>

<script>
import TopBarVue from "../components/TopBarVue.vue"
import NavigationVue from "../components/NavigationVue.vue"
import FooterVue from "../components/FooterVue.vue"
import { mapGetters } from 'vuex'

export default {
  name: "ContactView",
  components: {
    TopBarVue,
    NavigationVue,
    FooterVue,
  },
  computed: {
    ...mapGetters(['user'])
  },
}
</script>

<style lang="scss" scoped>
</style>