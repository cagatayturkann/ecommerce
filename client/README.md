# Logo Siber Güvenlik ve Ağ Teknolojileri Full Stack Bootcamp Graduation Project Client Side

<h2>Details</h2>
<p>Client for E-commerce Project</p>

<h3>File Structure</h3>  
<p>You can go directly the file by clicking the name</p>  
  
   - [package.json](package.json)
     - [index.html](public/index.html)
     - __js__
       - [main.js](public/js/main.js)
   - __src__
     - [App.vue](src/App.vue)
     - __api__
       - [api.js](src/api/api.js)
     - __components__
       - [ErrorVue.vue](src/components/ErrorVue.vue)
       - [FooterVue.vue](src/components/FooterVue.vue)
       - [HelloWorld.vue](src/components/HelloWorld.vue)
       - [NavigationVue.vue](src/components/NavigationVue.vue)
       - [TopBarVue.vue](src/components/TopBarVue.vue)
       - __dashboard__
         - [LogOut.vue](src/components/dashboard/LogOut.vue)
         - [NavBar.vue](src/components/dashboard/NavBar.vue)
         - [SideBar.vue](src/components/dashboard/SideBar.vue)
     - [main.js](src/main.js)
     - __router__
       - [index.js](src/router/index.js)
     - __services__
       - [AuthService.js](src/services/AuthService.js)
       - [ProductService.js](src/services/ProductService.js)
       - [UserService.js](src/services/UserService.js)
     - __views__
       - [AboutView.vue](src/views/AboutView.vue)
       - [ContactView.vue](src/views/ContactView.vue)
       - [DashboardView.vue](src/views/DashboardView.vue)
       - [EditProductView.vue](src/views/EditProductView.vue)
       - [HomeView.vue](src/views/HomeView.vue)
       - [LoginView.vue](src/views/LoginView.vue)
       - [ProductDetailView.vue](src/views/ProductDetailView.vue)
       - [ProductView.vue](src/views/ProductView.vue)
       - [RegisterView.vue](src/views/RegisterView.vue)
       - [SearchResultView.vue](src/views/SearchResultView.vue)
       - __adminPanel__
         - [AddProduct.vue](src/views/adminPanel/AddProduct.vue)
         - [AdminDashboard.vue](src/views/adminPanel/AdminDashboard.vue)
         - [Home.vue](src/views/adminPanel/Home.vue)
         - [Product.vue](src/views/adminPanel/Product.vue)
         - [User.vue](src/views/adminPanel/User.vue)
     - [vuex.js](src/vuex.js)

<h4>Some Development Notes</h4>
<ul>
<li>I used two different themes. For main page <a href="https://themewagon.com/themes/eshopper-free-responsive-bootstrap-4-e-commerce-website-template/">EShopper Theme</a> and for admin panel <a href="https://startbootstrap.com/theme/sb-admin-2">SB Admin 2</a></li>
<li>Product and user crud process can be done inside the admin panel</li>
<li>For authentication and authorization I used role and jwt token system</li>
<li>You can register and login as a normal user. To login as admin: <br>
username: admin@gmail.com<br>
pass: admin123</li>
</ul>


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```