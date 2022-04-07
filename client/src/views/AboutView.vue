<template>
  <div>
    <!-- Topbar Start -->
    <TopBarVue></TopBarVue>
    <!-- Topbar End -->
    <!-- Navigation Start -->
    <NavigationVue></NavigationVue>
    <!-- Navigation End -->
    <!-- Detail Start -->
    <section class="section about-section gray-bg" id="about">
      <div class="container">
        <div class="row">          
          <div class="col-lg-6">
            <div class="about-text">
              <h3 class="dark-color">Trust me! I am an Engineer.</h3>
              <h4 class="theme-color">Computer Engineer &amp; Jr. Full Stack Developer</h4>
              <p>I’am a Computer Engineer who is focused to become a Full Stack Web Developer at the moment and located in Izmir Turkey. I have a serious passion for computers, mobile and web. Both domestically and abroad, I am trying to follow latest technologies and developments in the most up-to-date manner with some various blogs, magazines etc.</p>
              <p>In order to become a Full Stack Web Developer, to succeed this goal, I take courses through online platforms such as Udemy and Youtube etc. to repeat what I know and learn deeply what I do not know. Aside this journey I build websites with WordPress for individual or corporate companies as freelance. You can check two of them in my portfolio. I love sharing and contributing contents about tech, science etc. to the tech or any other related communities and it has become a significant part of my life.</p>
              <p>With lectures & courses that I studied and projects that I made; I developed my English skills in a technical way and general way, I improved my research and learning skills and I gained more sense of responsibility. Also through my job experiences, social responsibility projects and volunteering projects, I developed my problem solving, teamwork and communication skills. I think that; approaching humans with empathy, being positive and good-humored, giving value of team work, working peacefully and harmoniously with working area will help me in my working life.</p>
              <p>When I’m not doing anyting related to coding etc. you can find me geeking about games, books, cycling or watcing sports games, trying new restaurants, and exploring different places to visit. I’m an engineer who has a social life. 🙂</p>
              <div class="btn-bar">
                <a class="px-btn theme" href="https://cagatayturkan.com/portfolio/">View Works</a>
                <a
                  class="px-btn theme-t"
                  href="https://cagatayturkan.com/wp-content/uploads/2022/03/Cagatay-Turkan-portfolio.pdf"
                >Download CV</a>
              </div>
            </div>
          </div>
          <div class="col-lg-3 text-center">
            <div class="about-img">
              <img
                src="https://i2.wp.com/cagatayturkan.com/wp-content/uploads/2021/12/about-content-bg.jpg?w=640&ssl=1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Detail End -->
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
import { store } from '../vuex';


export default {
  name: "AboutView",
  components: {
    TopBarVue,
    NavigationVue,
    FooterVue,
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
  }
}
</script>

<style scoped>
/* About Me 
---------------------*/
@media (max-width: 991px) {
  .about-text {
    margin-top: 40px;
  }
}
.about-text h3 {
  font-size: 45px;
  font-weight: 700;
  margin: 0 0 10px;
}
@media (max-width: 767px) {
  .about-text h3 {
    font-size: 35px;
  }
}
.about-text h4 {
  font-weight: 600;
  margin-bottom: 15px;
}
@media (max-width: 767px) {
  .about-text h4 {
    font-size: 15px;
  }
}
.about-text p {
  font-size: 15px;
}
.about-text p mark {
  font-weight: 600;
  color: #3a3973;
}
.about-text .btn-bar {
  padding-top: 8px;
}
.about-text .btn-bar a {
  min-width: 150px;
  text-align: center;
  margin-right: 10px;
}

.about-list {
  padding-top: 10px;
}
.about-list .media {
  padding: 5px 0;
}
.about-list label {
  color: #3a3973;
  font-weight: 600;
  width: 88px;
  margin: 0;
  position: relative;
}
.about-list label:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 11px;
  width: 1px;
  height: 12px;
  background: #3a3973;
  -moz-transform: rotate(15deg);
  -o-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  -webkit-transform: rotate(15deg);
  transform: rotate(15deg);
  margin: auto;
  opacity: 0.5;
}
.about-list p {
  margin: 0;
  font-size: 15px;
}

.about-img {
  box-shadow: 0 5px 14px 0 rgba(0, 0, 0, 0.06);
  padding: 10px;
  background: #ffffff;
}
@media (max-width: 991px) {
  .about-img {
    margin-top: 30px;
  }
}

.counter-section {
  padding: 40px 20px;
}
.counter-section .count-data {
  margin-top: 10px;
  margin-bottom: 10px;
}
.counter-section .count {
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 10px;
}
.counter-section p {
  font-weight: 500;
  margin: 0;
  color: #fe4f6c;
}
.theme-color {
  color: #fe4f6c;
}

.section {
  padding: 100px 0;
  position: relative;
}
.gray-bg {
  background-color: #fff;
}
.px-btn.theme {
  background: #fe4f6c;
  color: #ffffff;
  border: 2px solid #fe4f6c;
}
.px-btn {
  padding: 0 20px;
  line-height: 42px;
  border: 2px solid transparent;
  position: relative;
  display: inline-block;
  background: none;
  border: none;
  -moz-transition: ease all 0.35s;
  -o-transition: ease all 0.35s;
  -webkit-transition: ease all 0.35s;
  transition: ease all 0.35s;
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
}

.px-btn.theme-t {
  background: transparent;
  border: 2px solid #fe4f6c;
  color: #fe4f6c;
}
</style>