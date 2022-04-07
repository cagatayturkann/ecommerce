<template>
  <div class="alert alert-danger" role="alert">
    {{error}}
  </div>
</template>

<script>
  export default {
    name: "ErrorVue",
    props: ['error']
  }
</script>

<style lang="scss" scoped>

</style>