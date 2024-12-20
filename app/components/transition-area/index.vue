<script setup lang="ts">
import TransitionInput from '~/components/transition-area/TransitionInput.vue'
</script>

<template>
  <div class="transition_area_box flex-1">
    <TransitionInput />
    <div class="transition_output" />
  </div>
</template>

<style scoped lang="scss">
.transition_area_box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(514px, 1fr));
  gap: 12px;

  .transition_input,
  .transition_output {
    width: 100%;
    height: 100%;
    background: white;
    border: 1px solid transparent;
    box-shadow: 0 6px 18px #41a36f0f;
    padding: 15px 20px 20px;
    color: #333;
    border-radius: 5px;
  }
}
</style>
