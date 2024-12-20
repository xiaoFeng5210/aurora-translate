<script setup lang="ts">
onBeforeMount(async () => {
  const res = await $fetch('/api/ping', {
    headers: {
      'Content-Type': 'application/json',
    },
    onRequest({ request, options }) {
      console.log('request路径是:', request)
    },
  })
})
</script>

<template>
  <div class="flex-1 flex flex-col">
    <TransitionArea />
    <div class="w-full h-[86px] mt-[10px]" />
  </div>
</template>

<style scoped></style>
