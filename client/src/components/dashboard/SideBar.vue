<template>
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">
        Admin Panel
      </div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item" v-on:click="setActive('home')" :class="{ active: isActive('home') }">
      <router-link to="/dashboard" class="nav-link">
        <i class="fas fa-fw fa-home"></i>
        <span>Home</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">MENU</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item" v-on:click="setActive('users')" :class="{ active: isActive('users') }">
      <router-link to="/dashboard/users" class="nav-link">
        <i class="fas fa-fw fa-users"></i>
        <span>Users</span>
      </router-link>
    </li>

    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
      <router-link to="/dashboard/products" class="nav-link">
        <i class="fas fa-fw fa-shopping-basket"></i>
        <span>Products</span>
      </router-link>
    </li>
    <!-- Nav Item - Utilities Collapse Menu -->
    <li class="nav-item">
      <router-link to="/dashboard/addproduct" class="nav-link">
        <i class="fas fa-fw fa-plus"></i>
        <span>Add Product</span>
      </router-link>
    </li>


    <!-- Divider -->
    <hr class="sidebar-divider" />
    <li class="nav-item">
      <router-link to="/" class="nav-link">
        <i class="fas fa-fw fa-arrow-right"></i>
        <span>Main Page</span>
      </router-link>
    </li>

    
  </ul>
</template>/

<script>
export default {
  name: "SideBar",
  data() {
    return { activeItem: 'home' }
  },
  methods: {
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    setActive: function (menuItem) {
      this.activeItem = menuItem // no need for Vue.set()
    }
  }
}
</script>

<style>

</style>