<script setup lang="ts">
import SimpleForm from '@/components/SimpleForm.vue';
import MultiStepForm from "@/components/MultiStepForm.vue"
</script>

<template>
  <div class="content">
    <SimpleForm />
    <MultiStepForm />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .content {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
