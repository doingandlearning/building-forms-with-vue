<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>

    <header>
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
</style>
