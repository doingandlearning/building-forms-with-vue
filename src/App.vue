<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>

    <header style=";">
      <nav>
        <RouterLink to="/" class="link" active-class="active">Home</RouterLink>
        <RouterLink to="/nolibrary" class="link" active-class="active">No library</RouterLink>
        <RouterLink to="/veevalidate" class="link" active-class="active">VeeValidate</RouterLink>
        <RouterLink to="/formkit" class="link" active-class="active">FormKit</RouterLink>
      </nav>
    </header>
  </div>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.active {
  font-weight: bold;
}

header {
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  margin-left: auto;
  margin-right: auto;
}
</style>
